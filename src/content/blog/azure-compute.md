---
title: "Azure Compute and Application Delivery"
description: "Day 3 — deploying virtual machines into the network architecture and putting an Application Gateway in front of them."
date: "2026-08-12"
category: "Cloud Infrastructure"
tags:
  - Azure Virtual Machine
  - Azure Bastion
  - Application Gateway
  - User Defined Routes
featured: true
---

After completing the core networking and secure-access configuration on
Day 2, Day 3 of my Azure project moved into the **compute layer**.

The objective was to begin deploying virtual machines into the network
architecture I had already created. The plan was to deploy both a
Windows Server VM and an Ubuntu Linux VM, placing them in separate
application tiers and eventually using the Linux VM as a backend for
Azure Application Gateway.

Not everything went according to plan.

The Windows VM deployment was successful, but I encountered a regional
availability issue when attempting to deploy the planned Ubuntu VM in
**Denmark East**. Rather than treating this as a failed project day, it
became a useful reminder that cloud deployments are affected by regional
service and image availability.

## Starting from the Existing Network

Before deploying compute resources, the network foundation was already
in place from Day 2.

The environment had been divided into dedicated subnets for different
responsibilities:

``` text
Azure VNet
10.0.0.0/16
│
├── AzureBastionSubnet
├── AppGatewaySubnet
├── WebSubnet
├── AppSubnet
└── DatabaseSubnet
```

This meant the virtual machines would not simply be placed into an
arbitrary network. Their placement would reflect their intended role in
the architecture.

The Windows VM was intended for `AppSubnet`, while the Ubuntu VM was
planned for `WebSubnet`.

This separation also builds on the security controls configured during
Day 2, where Network Security Groups were used to control traffic
between different parts of the environment.

## Deploying the Windows Virtual Machine

The first major task was deploying the Windows VM.

I provisioned the VM and connected it to **AppSubnet**, allowing it to
receive a private IP address from that subnet's address range.

Conceptually, the environment now looked like this:

``` text
Azure VNet
│
├── AzureBastionSubnet
│       └── Azure Bastion
│
├── WebSubnet
│
├── AppSubnet
│       └── Windows VM
│
└── DatabaseSubnet
```

One of the important design decisions was that administrative access did
not need to depend on exposing RDP directly to the internet.

Because Azure Bastion had already been configured, the management path
could instead be:

``` text
Administrator
      │
      ▼
Azure Bastion
      │
      │ RDP
      ▼
Windows VM
Private IP
```

This helped me understand why the networking work from Day 2 needed to
come before compute deployment.

Azure Bastion initially seemed somewhat abstract when there was no VM
available to connect to. Once the Windows VM existed, its purpose became
much clearer: it provides a managed path for administering private
virtual machines without requiring the VM itself to be directly exposed
through a public IP for RDP access.

## Applying Network Security to the VM

The Windows deployment also included a Network Security Group named:

``` text
vm-windows-nsg
```

This added another security layer around the VM's network connectivity.

From my previous work with NSGs, I had already learned that they answer
an important networking question:

> **Should this traffic be allowed or denied?**

This became especially relevant when testing RDP connectivity through
Bastion.

During my troubleshooting exercise, I had deliberately created a
higher-priority NSG rule that denied TCP port `3389`. The result was a
failed Bastion RDP connection.

Using Network Watcher IP Flow Verify then identified the NSG rule
responsible for denying the traffic.

That exercise became much more meaningful once there was an actual
Windows VM involved because it demonstrated that deploying Bastion does
not automatically guarantee connectivity.

Several components must work together:

``` text
Administrator
      │
      ▼
Azure Bastion
      │
      ▼
Network security rules
      │
      ▼
Windows VM
```

A valid management path can exist while an NSG still prevents the
connection.

## The Ubuntu Deployment Problem

The second planned compute resource was an **Ubuntu Linux VM**.

The intention was to deploy it into:

``` text
WebSubnet
```

The architecture would then become:

``` text
Azure VNet
│
├── AzureBastionSubnet
│       └── Azure Bastion
│
├── AppGatewaySubnet
│
├── WebSubnet
│       └── Ubuntu VM
│
├── AppSubnet
│       └── Windows VM
│
└── DatabaseSubnet
```

However, I wasn't able to complete this part of the deployment.

When I attempted to provision the planned Ubuntu VM in **Denmark East**,
the Ubuntu option I intended to use was not available to me in that
region.

I don't yet have enough evidence from the deployment itself to say
exactly why it was unavailable. Rather than assuming a cause, I recorded
it as a **regional availability constraint encountered during the lab**.

This is an important distinction. The fact that a resource or particular
configuration isn't available during a deployment does not necessarily
mean the architecture is incorrect.

Cloud environments have regional differences and constraints, so part of
working with Azure is learning how to investigate availability before
assuming that a configuration error has occurred.

## Impact on Application Gateway

The unavailable Ubuntu VM also affected another planned part of Day 3.

The Linux VM was intended to act as a web workload in `WebSubnet` and
eventually participate in the Application Gateway configuration.

The intended flow was:

``` text
Client
   │
   │ HTTP/HTTPS
   ▼
Application Gateway
AppGatewaySubnet
   │
   ▼
Ubuntu Web VM
WebSubnet
```

Without the Ubuntu VM, I did not have the intended Linux backend
available to complete that architecture as originally planned.

It would have been easy to create a blog post that simply described how
Application Gateway *should* have been configured. However, that would
not accurately represent what I actually built.

For this project, I want the documentation to distinguish between **what
I planned, what I successfully deployed, and what I could not
complete**.

That makes the project more useful as a record of actual hands-on
experience.

## An Important Cloud Lesson: Architecture vs Availability

One of the biggest lessons from Day 3 had very little to do with
clicking through the Azure portal.

It was understanding the difference between **architectural intent and
deployment reality**.

My intended architecture was:

``` text
                    Azure VNet
                        │
       ┌────────────────┼────────────────┐
       │                │                │
       ▼                ▼                ▼
Azure Bastion      Windows VM        Ubuntu VM
                      AppSubnet        WebSubnet
                                         │
                                         ▼
                                 Application Gateway
                                      backend
```

But the environment I actually reached was closer to:

``` text
                    Azure VNet
                        │
              ┌─────────┴─────────┐
              │                   │
              ▼                   ▼
       Azure Bastion          Windows VM
                                AppSubnet

       Ubuntu VM
       WebSubnet
          ✗
   Not deployed due to
   availability encountered
   in Denmark East
```

That's not something I consider worth hiding.

Real cloud engineering includes situations where the architecture says
one thing and the platform, subscription, quota, region, SKU, image
availability, or another constraint prevents you from immediately
implementing it exactly as designed.

The important part is knowing how to respond to that difference.

## What I Learned

Day 3 helped connect the **compute and networking layers** of Azure.

On Day 2, concepts such as Bastion, NSGs, subnets, NAT Gateway and
routing existed mostly as networking components. Once a VM was deployed,
those components started interacting with an actual workload.

I could now think about the Windows VM not simply as a server, but as a
resource sitting inside a larger network architecture:

``` text
Windows VM
    │
    ├── Private IP
    ├── AppSubnet
    ├── NSG
    ├── Bastion management path
    └── Existing VNet routing
```

I also learned not to automatically interpret an unavailable deployment
option as something I configured incorrectly.

When a planned Azure resource isn't available, the next step should be
to investigate the actual restriction rather than guess.

## Final Thoughts

Day 3 did not end exactly as the project plan originally intended.

The **Windows VM was successfully deployed**, providing the first real
compute workload inside the network architecture I had built.

The planned **Ubuntu VM could not be deployed in Denmark East using the
option I was trying to provision**, which meant the planned Linux web
tier and its Application Gateway integration could not yet be completed.

But that made Day 3 useful in a different way.

Cloud engineering is not just about following a list of deployment steps
until every resource turns green. It also involves understanding
dependencies, identifying platform constraints, documenting incomplete
work accurately, and deciding how the architecture should adapt.

My environment had now progressed from:

``` text
Day 1
Governance
    ↓
Day 2
Networking + Security
    ↓
Day 3
Compute
    ↓
Windows VM successfully deployed
    +
Ubuntu deployment constraint identified
```

The next step is to determine why the Ubuntu offering wasn't available
in Denmark East and decide whether the appropriate solution is a
different supported image/configuration or another design
adjustment—without changing the architecture blindly.
