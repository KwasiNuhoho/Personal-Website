---
title: "Azure Governance and Identity"
description: "Enforcing governance in Azure using ."
date: "2026-08-08"
category: "Cloud Infrastructure"
tags:
  - Azure Governance
  - Azure Policy
  - Custom RBAC
featured: false
---

# Building a Governance Foundation in Azure: Enterprise Hierarchy, Custom RBAC, and Policy Debugging

When setting up an enterprise cloud environment, jumping straight into deploying Virtual Machines or virtual networks without a governance structure is a fast track to security vulnerabilities, unexpected costs, and management chaos.

As part of a multi-day project to build a secure, observable Azure infrastructure, my first priority (**Day 1**) was establishing a solid identity and governance baseline. I needed to define resource boundaries, set up role-based access control (RBAC) following least-privilege principles, enforce resource tagging using Azure Policy, and set cost safeguards.

Here is how I implemented the identity and governance foundation, the unexpected behavior I hit when working with Azure Policy evaluation engine, and how I investigated it.

## What I Built

Before configuring network rules or virtual machines, I built an administrative boundary that enforces operational constraints.

```text
+--------------------------------------------------+
|              Tenant Root Group                   |
+------------------------+-------------------------+
                         |
                         v
+--------------------------------------------------+
|             Esmee Corporation                   |
|             Management Group                    |
|              (mg-esmee-corp)                     |
+------------------------+-------------------------+
                         |
                         v
+---------------------------------------------------------------------------+
|              Azure Subscription 1                                         |
+---+----------+----------+----------+---------------+--------------+-------+
    |          |          |          |               |              |
    v          v          v          v               v              v
+---------+ +---------+ +---------+ +---------+ +------------+ +-----------+
|rg-      | |rg-      | |rg-      | |rg-      | |rg-         | |rg-        |
|network  | |compute  | |storage  | |identity | |monitoring  | |backup     |
+---------+ +---------+ +---------+ +---------+ +------------+ +-----------+


```

The foundation consists of:

- A structured **Management Group hierarchy** to group subscriptions under a central administrative boundary.
- Standardized Resource Groups (`rg-network`, `rg-compute`, `rg-storage`, `rg-identity`, `rg-monitoring`, `rg-backup`) to organize resources by lifecycle and management responsibility.
- **Entra ID groups and default RBAC assignments** to grant permissions at specific scopes rather than subscription-wide.
- A **Custom RBAC Role** granting operational control over VMs (start and restart) while preventing modifications or deallocations.
- A **Cost Budget** with email alerts to catch spending before it escalates.
- An **Azure Policy** designed to enforce an `Environment` tag (`Prod` or `Dev`) on resource groups.
- A **CanNotDelete Resource Lock** applied to critical networking infrastructure.

## Architecture & Governance Design

### Management Hierarchy

When I created my Azure account, the root level started with the default Tenant Root Group. I created a custom Management Group named **Esmee Corporation (`mg-esmee-corp`)** directly under the Tenant Root Group, moving my primary subscription (**Azure subscription 1**) into it.

This creates a logical boundary where policies and permissions can be applied at scale.


## Creating Resource Groups

```bash
az group create --name rg-network --location denmarkeast
az group create --name rg-compute --location denmarkeast
az group create --name rg-storage --location denmarkeast
az group create --name rg-identity --location denmarkeast
az group create --name rg-monitoring --location denmarkeast
az group create --name rg-backup --location denmarkeast
```

**Takeaway:** Running individual CLI commands repeatedly highlighted an obvious operational inefficiency. Manual, imperative commands don't scale well. Automating this deployment with declarative Infrastructure as Code (Bicep or ARM templates) is a logical optimization that I will address on Day 6.

To create the resource groups, I used the bash command:

```bash
az group create --name <resource-name> --location denmarkeast
```

Where the resource names were `rg-network`, `rg-compute`, etc., as in my project plan.

> **Side note:** With this, I had to write the commands 6 times because I wanted to create 6 resource groups. This might be an IaC problem that can be solved by using either ARM or Bicep to automate it. I will investigate it further when I get to **Day 6** in the project plan.

## Assigning Roles to Groups

### Step 1

Look up the unique Object ID for your group by its display name:

```bash
az ad group show --group "grp-developers" --query id -o tsv
```

Example output for developers group:

```text
d3f3c115-61b8-48af-****-73219df8****
```

### Step 2

To actually assign the role, use the command below:

```bash
az role assignment create \
  --assignee-object-id "d3f3c115-61b8-48af-****-73219df8****" \
  --assignee-principal-type Group \
  --role "Contributor" \
  --scope "/subscriptions/12345.../resourceGroups/rg-compute"
```

| Parameter / Component | Description |
|---|---|
| `az role assignment create` | Tells Azure: "Create a new permission link." |
| `--assignee-object-id` | **WHO:** The unique ID of the group you fetched in Step 1. |
| `--assignee-principal-type Group` | **WHO TYPE:** Tells Azure "This ID belongs to a Group (not a User or Service Principal)." Adding this saves processing time and prevents temporary lookup errors. |
| `--role` | **WHAT:** The permission level you want to grant (e.g., Reader, Contributor, Owner, or a custom role name). |
| `--scope` | **WHERE:** The boundary where this permission applies. Everything inside this path inherits the permission. |

Example for the auditors group:

```text
Grp-auditors id: d5e17eae-0b31-4990-9d5f-ed6b59693ee4
```

```bash
az role assignment create \
  --assignee-object-id "placeholder for object id" \
  --assignee-principal-type Group \
  --role "Reader" \
  --scope "/subscriptions/12345..."
```

To check if the roles have been assigned:

```bash
az role assignment list --assignee "Azure subscription id" --all -o table
```

| Flag / Component | What it actually means |
|---|---|
| `az role assignment list` | Tells Azure: "Show me existing permission links." |
| `--assignee` | Tells Azure: "Filter the list to show ONLY permissions assigned to this specific group ID." |
| `--all` | By default, Azure CLI only lists assignments for the current subscription. `--all` searches across all subscriptions you have access to. |
| `-o table` | Formats the output into neat text columns (Principal, Role, Scope) rather than raw JSON code, making it easy to read. |

## Custom RBAC Role Definition

Built-in roles are often either too permissive or too restrictive. To allow helpdesk or junior operations personnel to restart virtual machines without giving them permission to modify, reconfigure, or delete them, I created a custom RBAC JSON definition (`custom-vm-operator.json`):

```json
{
  "Name": "Virtual Machine Operator (Start/Restart Only)",
  "IsCustom": true,
  "Description": "Allows users to view, start, and restart Virtual Machines without allowing modification or deletion.",
  "Actions": [
    "Microsoft.Compute/virtualMachines/read",
    "Microsoft.Compute/virtualMachines/start/action",
    "Microsoft.Compute/virtualMachines/restart/action"
  ],
  "NotActions": [],
  "DataActions": [],
  "NotDataActions": [],
  "AssignableScopes": [
    "/subscriptions/d73aafc8-5ae3-4d55-97da-1e1603efe1a8"
  ]
}
```

I deployed the role definition via the CLI:

```bash
az role definition create --role-definition custom-vm-operator.json
```

The `custom-vm-operator.json` is the name of the JSON file.

## Cost Control & Resource Locking

### Budgeting Safeguards

I configured a monthly budget of **$100.00** named `Esmee_Budget` at the subscription level, with an email notification alert set to trigger when forecasted or actual spend hits the **80% threshold ($80.00)**.

## Problems and Troubleshooting: The Azure Policy Evaluation Delay

### Problem

I created a custom Azure Policy definition named **Environment Tag Policy** designed to enforce an `Environment` tag with allowed values of `Prod` or `Dev` on Resource Groups, denying creation or triggering non-compliance if the tag is missing.

The JSON rule logic was structured as follows:

```json
{
  "mode": "All",
  "policyRule": {
    "if": {
      "allOf": [
        {
          "field": "type",
          "equals": "Microsoft.Resources/resourceGroups"
        },
        {
          "anyOf": [
            {
              "field": "tags['Environment']",
              "exists": "false"
            },
            {
              "field": "tags['Environment']",
              "notIn": [
                "Prod",
                "Dev"
              ]
            }
          ]
        }
      ]
    },
    "then": {
      "effect": "deny"
    }
  }
}
```

However, after deploying resources without tags, I navigated to **Policy → Compliance** and found that while the Microsoft Defender / ASC Default initiative flagged 47 non-compliant states, my custom policy was nowhere to be seen.

### Investigation

1. **Definition vs. Assignment:** I checked the policy definition list and confirmed `Environment Tag Policy` existed as a Custom policy.
2. **Assignment Status:** I navigated to **Policy → Assignments**. I realized that while I had created the policy definition, I had forgotten to create a policy assignment to bind the rule to the subscription scope.
3. **Evaluating Compliance State:** After assigning the policy to Azure subscription 1, the policy finally appeared in the compliance dashboard. However, its state showed as **"Not started"**.

It finally appeared in the policy compliance section; however, since I just assigned it, it says the compliance state is **not started**.

### Diagnosis

Azure Policy evaluation does not run synchronously for all existing resources immediately upon assignment. Background compliance evaluations run periodically (typically every 24 hours) or after resource state changes. Because the background scan had not run yet, Azure reported **0 out of 0 evaluated resources**.

### Solution

Rather than waiting for the automated evaluation cycle, I triggered an on-demand compliance scan using Azure PowerShell:

```powershell
Start-AzPolicyComplianceScan
```

### Behavior Observation

Upon evaluation, the policy marked the compliance state as **Compliant (100%)**. Because the rule effect was set to `deny`, it prevents new non-compliant resource groups from being created, but existing untagged resource groups were evaluated as 0 non-compliant resources in this view.

To audit existing untagged resource groups without blocking creation, an `audit` effect would be used instead of `deny`.

## Azure Policy Rule Logic & Effects

Azure Policy acts as an engine for continuous compliance. The logic uses conditional operators (`allOf`, `anyOf`) to match resource properties.

- **`deny`**: Blocks the Resource Manager payload at execution time. The request never reaches the resource provider.
- **`audit`**: Allows resource creation but flags the resource as non-compliant in the compliance center.
- **`modify` / `append`**: Adds missing fields (such as adding default tags) during execution.

Connecting a policy definition to a scope via an **Assignment** is required before the engine evaluates resources.

## Scope Inheritances in Azure RBAC

Azure RBAC operates on a structured hierarchy:

```text
    Management Group --> Subscription --> Resource Group --> Resource
```

Permissions applied at a higher scope are inherited by lower scopes.

By assigning `grp-auditors` at the **Subscription** scope, members inherit read access across all child Resource Groups.

By assigning `grp-developers` at the **Resource Group** scope (`rg-compute`), developers get Contributor access to virtual machines without seeing or altering networking components in `rg-network`.

## Accidental Deletion Protection

To prevent accidental deletion of core networking infrastructure, I applied a **CanNotDelete** resource lock (`Network_lock`) directly to `rg-network`.


## Security Considerations

### What I Implemented

- **Least Privilege Access:** Used targeted RBAC scopes (`rg-compute` for developers) instead of broad subscription-wide Contributor permissions.
- **Group-Based Access Control:** Assigned permissions to Entra ID groups (`grp-developers`, `grp-auditors`) rather than individual user accounts to prevent permission drift.
- **Custom Role Restrictions:** Created a custom role restricting VM control actions to start and restart, removing the capability to delete virtual machines.
- **Resource Guardrails:** Applied CanNotDelete resource locks to protect infrastructure assets from accidental administrative deletion.

### What Could Still Be Improved

- **Privileged Identity Management (PIM):** Roles like Contributor are currently standing assignments. Implementing PIM would allow just-in-time (JIT) role elevation with approval workflows.
- **Tag Enforcement:** Modifying the Azure Policy from a strict `deny` to a `modify` effect using a managed identity could automatically append default tags to resources if omitted during deployment.

## What I Learned

1. **Policy Definitions vs. Assignments:** Creating an Azure Policy definition does nothing until it is bound to a scope via an Assignment.
2. **Asynchronous Policy Evaluation:** Azure Policy compliance scans run on a schedule. Knowing how to trigger an on-demand scan via `Start-AzPolicyComplianceScan` is essential when validating policy changes.
3. **Optimizing CLI Role Assignments:** Passing `--assignee-principal-type` during `az role assignment create` speeds up execution and avoids intermittent Entra ID lookup delays.
4. **Declarative vs. Imperative Automation:** Manually executing CLI commands to build multiple resource groups reinforces why Infrastructure as Code tools like Bicep are preferred for production deployments.

## What I Would Improve Next

- **Automate Management Group Setup via Bicep:** Refactor manual resource group and management group provisioning into modular Bicep files.
- **Implement Custom Policy Initiatives:** Combine multiple governance policies (tagging, allowed locations, allowed VM SKUs) into a single initiative assignment for simpler compliance tracking.

## Conclusion

Setting up governance first provided a structured, secure sandbox for the rest of the project. By establishing management groups, defining granular access through custom RBAC roles, enforcing locks, and understanding Azure Policy evaluation workflows, I built an environment ready for secure workload deployment.
