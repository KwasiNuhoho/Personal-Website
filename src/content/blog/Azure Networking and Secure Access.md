---
title: "Azure Networking"
description: "Implementing secure networking principles."
date: "2026-11-08"
category: "Cloud Infrastructure"
tags:
  - Azure Virtual Networks
  - Azure Bastion
  - Network Security Groups
  - User Defined Routes
featured: true
---

# Building Core Networking and Secure Access in Microsoft Azure --- Day 2 of My Azure Infrastructure Project

After establishing governance and identity controls on Day 1, Day 2 of
my Azure infrastructure project focused on one of the most important
foundations of a cloud environment: **network architecture and secure
access**.

The objective was to architect a secure Azure Virtual Network (VNet),
implement routing controls, manage inbound and outbound connectivity,
and create clear security boundaries between application tiers.

During this phase, I worked with several core Azure networking services:

-   Azure Virtual Network and subnets
-   Azure NAT Gateway
-   Azure Bastion
-   Network Security Groups (NSGs)
-   User Defined Routes (UDRs)

Rather than treating these as isolated Azure services, the exercise
helped me understand how they work together to form a layered network
architecture.

## Designing the Virtual Network

I started by creating the main Azure Virtual Network,
**`Esmee_Network`**, with the following private address space:

``` text
10.0.0.0/16
```

A `/16` address space gives the environment enough room to be divided
into smaller subnets while leaving capacity for future expansion.

I divided the VNet into five subnets:

  -----------------------------------------------------------------------
  Subnet                  Address Range           Purpose
  ----------------------- ----------------------- -----------------------
  `AzureBastionSubnet`    `10.0.0.0/26`           Dedicated subnet for
                                                  Azure Bastion

  `AppGatewaySubnet`      `10.0.0.64/26`          Dedicated subnet for
                                                  Application Gateway

  `WebSubnet`             `10.0.1.0/24`           Web-tier resources

  `AppSubnet`             `10.0.2.0/24`           Application-tier
                                                  resources

  `DatabaseSubnet`        `10.0.3.0/24`           Database-tier resources
  -----------------------------------------------------------------------

The purpose of this segmentation was to create clear boundaries between
different workload tiers. Instead of placing every resource into one
large subnet, each tier can have its own security and routing policies.

Conceptually, the workload architecture is:

``` text
Internet
   |
   v
Application Gateway
   |
   v
WebSubnet (10.0.1.0/24)
   |
   v
AppSubnet (10.0.2.0/24)
   |
   v
DatabaseSubnet (10.0.3.0/24)
```

Dedicated subnets for Azure Bastion and Application Gateway keep those
platform services separated from application workloads.

## Why Subnet Segmentation Matters

Subnet segmentation creates the structure needed to apply the principle
of least privilege at the network layer.

For example, the database tier should not accept arbitrary connections
simply because another resource exists inside the same VNet. Similarly,
administrative access to virtual machines should use a controlled
management path instead of requiring public IP addresses on individual
VMs.

Separating the web, application, database, Bastion, and Application
Gateway tiers gives each part of the environment a defined role and
makes later security policies easier to understand and maintain.

It also prepares the network for later phases of the project, when
compute resources and other Azure services will be deployed into these
subnets.

## Controlling Outbound Traffic with Azure NAT Gateway

The next part of the build focused on outbound connectivity.

I deployed an Azure NAT Gateway named **`NATGateway`** and associated it
with:

-   `WebSubnet`
-   `AppSubnet`

This provides an outbound connectivity path for resources in those
subnets without requiring each workload to have its own public IP
address.

The traffic flow can be represented as:

``` text
Workload
   |
   v
WebSubnet / AppSubnet
   |
   v
NAT Gateway
   |
   v
Internet
```

This reinforced an important networking concept: **allowing a workload
to initiate outbound internet connections does not require exposing that
workload directly to inbound internet traffic**.

The NAT Gateway therefore supports a cleaner architecture in which
application resources can remain privately addressed while still having
outbound connectivity when required.

## Implementing Secure Administrative Access with Azure Bastion

For administrative connectivity, I deployed Azure Bastion into the
dedicated subnet:

``` text
AzureBastionSubnet
10.0.0.0/26
```

The purpose of Bastion is to provide a controlled path for SSH or RDP
access to Azure virtual machines without requiring public IP addresses
directly on those VMs.

Instead of an architecture such as:

``` text
Administrator
     |
     v
Public IP on VM
     |
     v
Virtual Machine
```

Bastion enables a model closer to:

``` text
Administrator
     |
     v
Azure Bastion
     |
     v
Private IP
     |
     v
Virtual Machine
```

This prepares the environment for the compute phase of the project,
where Windows and Linux virtual machines can be deployed using private
network addresses while retaining an administrative access path.

## Securing Traffic with Network Security Groups

Subnet segmentation defines where resources live, but it does not by
itself define which traffic should be permitted between them.

For traffic filtering, I created two Network Security Groups:

``` text
nsg-web
nsg-db
```

Each NSG has a different responsibility based on the tier it protects.

### Securing the Web Tier with `nsg-web`

The web-tier NSG was designed so that application traffic reaches the
web tier from the Application Gateway subnet, while administrative
traffic originates from the Bastion subnet.

The intended application flow is:

``` text
AppGatewaySubnet
10.0.0.64/26
      |
      | HTTP / HTTPS
      v
WebSubnet
10.0.1.0/24
```

Administrative access follows a separate path:

``` text
AzureBastionSubnet
10.0.0.0/26
      |
      | SSH / RDP
      v
WebSubnet
10.0.1.0/24
```

This demonstrates an important security principle: **network access
should exist because there is a specific communication requirement, not
simply because two resources share the same VNet**.

### Restricting the Database Tier with `nsg-db`

The database tier requires tighter restrictions because it sits deeper
within the application architecture.

I configured the database NSG so that database traffic is allowed from
`AppSubnet`, while other inbound traffic is restricted.

The intended communication path is:

``` text
AppSubnet
10.0.2.0/24
      |
      | Database traffic
      v
DatabaseSubnet
10.0.3.0/24
```

This creates a security boundary between the application and data tiers.
A resource should not gain database access merely because it exists
somewhere inside the VNet.

This type of tiered filtering is a useful foundation for building
applications where each layer communicates only with the services it
actually needs.

## Controlling Traffic Paths with a User Defined Route

The final networking task was to introduce custom routing for
`AppSubnet`.

Azure automatically provides system routes, but a **User Defined Route
(UDR)** allows an administrator to influence where selected traffic is
sent.

I created a route table named:

``` text
rt-appsubnet
```

The route was configured as:

``` text
Route name:       default-via-firewall
Address prefix:   0.0.0.0/0
Next hop type:    Virtual appliance
Next hop IP:      10.0.2.4
```

The route table provides a pattern for directing traffic through a
firewall or Network Virtual Appliance rather than allowing it to follow
the normal default path.

Conceptually:

``` text
AppSubnet
10.0.2.0/24
     |
     | UDR: 0.0.0.0/0
     v
Virtual Appliance
10.0.2.4
     |
     v
Destination
```

For this project, the next-hop address represents a mock firewall IP.
The purpose was to practise the routing pattern rather than deploy a
complete production firewall implementation.

The same general concept is important in larger Azure architectures
where organizations centralize traffic inspection through firewalls or
other Network Virtual Appliances.

## Bringing the Architecture Together

By the end of Day 2, the network consisted of multiple controls working
together rather than relying on a single security feature.

A simplified view is:

``` text
                       Internet
                          |
                 +--------+--------+
                 |                 |
                 v                 v
        Application Gateway   NAT Gateway
                 |                 ^
                 v                 |
          +-------------+          |
          |  WebSubnet  |----------+
          | 10.0.1.0/24 |
          +-------------+
                 |
                 v
          +-------------+
          |  AppSubnet  |----------> UDR
          | 10.0.2.0/24 |             |
          +-------------+             v
                 |              Mock Firewall
                 |                10.0.2.4
                 v
        +------------------+
        | DatabaseSubnet   |
        |  10.0.3.0/24     |
        +------------------+

Administrative access:

Administrator
     |
     v
Azure Bastion
10.0.0.0/26
     |
     v
Private workloads
```

Each component addresses a different part of the networking problem:

-   **VNet and subnets** provide logical segmentation.
-   **NAT Gateway** provides outbound connectivity for the web and
    application tiers.
-   **Azure Bastion** provides an administrative access path to private
    workloads.
-   **NSGs** restrict which network traffic is permitted between tiers.
-   **UDRs** influence where traffic is routed.

The important lesson is that none of these controls should be viewed in
isolation. Secure cloud networking comes from combining them
appropriately.

## What I Learned

One of my main takeaways from Day 2 was that Azure networking is not
simply about creating a VNet and assigning IP addresses. The real
architecture comes from defining **how different parts of the
environment are allowed to communicate**.

Subnetting provides structure. NSGs add traffic filtering. NAT Gateway
handles outbound connectivity. Bastion creates a controlled
administrative path. Route tables determine how selected traffic should
travel through the network.

Working through these components together made their individual purposes
much clearer.

I also saw why IP address planning matters early in an Azure deployment.
Services such as Azure Bastion and Application Gateway require dedicated
subnet space. Planning those ranges before deploying workloads reduces
the likelihood of having to redesign the network later.

Another useful lesson was the difference between **security and
routing**. An NSG can determine whether traffic is allowed or denied,
while a route table determines where that traffic should go. They solve
related but different problems.

## Final Thoughts

Day 2 moved the project from Azure governance into infrastructure
architecture.

The result is a network with defined application tiers, controlled
outbound connectivity, a secure administrative access path,
network-level traffic filtering, and custom routing.

The overall approach can be summarized as:

``` text
Network segmentation
        +
Traffic filtering
        +
Controlled routing
        +
Secure administration
        +
Controlled outbound connectivity
        =
A stronger Azure network foundation
```

More importantly, this networking layer establishes the foundation for
the next phase of the project: **Compute and High Availability**. With
the network boundaries now defined, Windows and Linux virtual machines
can be deployed into their appropriate subnets, followed by Application
Gateway and scalability components.

Day 2 reinforced a core cloud architecture lesson for me: **a secure
network is not created by one Azure service. It is created by multiple
layers of controls working together.**
