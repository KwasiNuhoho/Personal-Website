---
title: "Azure Storage"
description: "Building Secure Azure Storage with Private Endpoints and Lifecycle Management."
date: "2026-08-13"
category: "Cloud Infrastructure"
tags:
  - Azure Storage
  - Private Endpoints
  - Lifecycle Management
  - Service Endpoints
featured: true
---
# Day 4: Building Secure Azure Storage with Private Endpoints and Lifecycle Management

After working on compute during Day 3, Day 4 of my Azure infrastructure
project shifted toward **storage security, data protection, lifecycle
management, and private connectivity**.

The original Day 4 plan had three main areas:

1.  Configure an Azure Storage Account and its data-protection features.
2.  Secure access to the Storage Account with a Private Endpoint,
    Private DNS, and a read-only Shared Access Signature (SAS).
3.  Configure Azure Key Vault for secret management.

I completed the storage and private-connectivity tasks, but I did
**not** complete the Azure Key Vault section. Rather than presenting Key
Vault as completed work, this post focuses only on what I actually
implemented.

------------------------------------------------------------------------

## Creating the Storage Account

I started by deploying the Storage Account planned for the environment:

``` text
stesmeecorp001
```

The account was configured to use **Locally Redundant Storage (LRS)**.

LRS keeps multiple copies of data within a single Azure region. For this
lab, it provided the required redundancy model while allowing me to
focus on the other storage-management and security features.

At this point, the basic architecture was:

``` text
Azure Subscription
      |
      v
rg-storage
      |
      v
Storage Account
stesmeecorp001
      |
      +-- Blob Storage
      |
      +-- Azure Files
```

Creating the Storage Account itself was only the starting point. The
more interesting part of Day 4 was configuring how the data would be
protected, retained, accessed, and eventually moved between storage
tiers.

------------------------------------------------------------------------

## Enabling Blob Versioning

The first data-protection feature I enabled was **Blob Versioning**.

Versioning allows Azure Blob Storage to maintain previous versions of a
blob when the blob is modified or overwritten.

Conceptually:

``` text
report.pdf
   |
   +-- Version 1
   |
   +-- Version 2
   |
   +-- Current Version
```

Without versioning, replacing an object can make the previous state
unavailable. With versioning enabled, previous versions can be retained
and recovered when necessary.

This introduced an important storage-management lesson: protecting data
is not only about backing up an entire system. Azure Storage includes
native features that can help protect individual objects from accidental
changes.

------------------------------------------------------------------------

## Configuring Soft Delete

I also enabled **Soft Delete** with a retention period of **7 days**.

Soft Delete provides protection against accidental deletion by retaining
deleted data for a configured period before it is permanently removed.

The basic idea is:

``` text
Blob deleted
     |
     v
Soft-deleted state
     |
     | 7-day retention period
     v
Permanent deletion
```

This means deletion does not necessarily have to be immediately
permanent.

I also enabled **Container Delete Retention**, extending the protection
beyond individual blobs to deleted blob containers.

Together, versioning and soft delete provide different forms of
protection:

``` text
Versioning
    |
    +--> Protects against unwanted changes/overwrites

Soft Delete
    |
    +--> Protects against accidental deletion
```

They solve related but different problems, which is an important
distinction when designing storage protection.

------------------------------------------------------------------------

## Configuring Lifecycle Management

Storage security was only one part of the exercise. I also needed to
think about **storage cost and data lifecycle**.

Not every file needs to remain in the same storage tier forever.

I created a Lifecycle Management rule that moves blobs through different
access tiers as they age:

``` text
Blob created
     |
     | First 30 days
     v
Hot / active data
     |
     | After 30 days
     v
Cool tier
     |
     | After 90 days
     v
Archive tier
```

The rule was configured so that blobs move to **Cool storage after 30
days** and **Archive storage after 90 days**.

The purpose is to align the storage tier with how frequently the data is
expected to be accessed.

Recently created or frequently accessed data can remain in an
appropriate active tier, while older data can automatically move into
lower-cost tiers.

This was one of the clearest examples in the project of using automation
to control cloud costs rather than relying on someone to manually move
old data.

------------------------------------------------------------------------

## Creating the Blob Container

Next, I created the planned Blob Storage container:

``` text
corporate-files
```

The container provides a logical location for storing unstructured
objects such as documents, images, logs, exports, and other files.

The hierarchy can be viewed simply as:

``` text
Storage Account
stesmeecorp001
      |
      v
Blob Service
      |
      v
corporate-files
      |
      +-- Blob
      +-- Blob
      +-- Blob
```

This also gave the lifecycle and data-protection settings something
practical to operate against.

------------------------------------------------------------------------

## Creating the Azure File Share

Alongside Blob Storage, I created an Azure File Share named:

``` text
shared-docs
```

Blob Storage and Azure Files both store data, but they are designed
around different access patterns.

For this project, the Storage Account therefore provided two different
storage structures:

``` text
stesmeecorp001
      |
      +-- Blob Container
      |      |
      |      +-- corporate-files
      |
      +-- Azure File Share
             |
             +-- shared-docs
```

The exercise helped reinforce that a single Azure Storage Account can
expose different storage services rather than being limited to one type
of data storage.

------------------------------------------------------------------------

# Moving from Public to Private Storage Access

The next part of Day 4 was the most important from a networking
perspective.

Up to this point in the project, I had already worked with VNets,
subnets, NSGs, routing, NAT Gateway, and Azure Bastion.

Day 4 introduced another concept: **Private Endpoints**.

The goal was to prevent the Storage Account from depending on public
network access and instead provide private connectivity from the
existing Azure VNet.

------------------------------------------------------------------------

## Disabling Public Network Access

I disabled **Public Network Access** on the Storage Account.

This was a major architectural change.

Instead of treating the Storage Account as a service that workloads
should reach through its public network endpoint, the goal became to
provide an approved private path from inside my Azure network.

Conceptually, I was moving away from this:

``` text
Application
     |
     v
Public network path
     |
     v
Storage Account
```

and toward this:

``` text
Application
     |
     v
Azure VNet
     |
     v
Private Endpoint
     |
     v
Storage Account
```

This is an important security principle: if a service does not need to
be publicly reachable, its network exposure can be reduced.

------------------------------------------------------------------------

## Creating the Blob Private Endpoint

I then created a **Private Endpoint for the Blob service** and placed it
in:

``` text
AppSubnet
```

A Private Endpoint provides a network interface with a private IP
address from the VNet that represents access to the Azure service
through Azure Private Link.

The resulting architecture was conceptually:

``` text
Azure VNet
10.0.0.0/16
      |
      +-- AppSubnet
      |      |
      |      +-- Application workload
      |      |
      |      +-- Blob Private Endpoint
      |             |
      |             | Private connectivity
      |             v
      |        Azure Storage
      |
      +-- Other subnets
```

This connected Day 4 directly to the subnet design I created on Day 2.

The Storage Account itself was not being moved into `AppSubnet`.
Instead, the **Private Endpoint created a private network presence for
the Blob service inside the VNet**.

That distinction helped me understand Private Endpoints much better.

------------------------------------------------------------------------

## Private Endpoint vs Service Endpoint

While working through this task, an important Azure networking
distinction became clearer.

A **Service Endpoint** and a **Private Endpoint** are not the same
thing.

With a service endpoint, the Azure service still has its public
endpoint, while the subnet can be authorized to access the service.

With a Private Endpoint, the service is represented through a **private
IP address in the VNet**.

For this project, the requirement was private connectivity to Blob
Storage, so the Private Endpoint model was the appropriate design.

A useful way to remember the distinction is:

``` text
Service Endpoint
      |
      +--> Azure service public endpoint remains relevant

Private Endpoint
      |
      +--> Private IP presence inside the VNet
```

------------------------------------------------------------------------

# Configuring Private DNS

Creating the Private Endpoint introduced another problem: **name
resolution**.

Applications normally connect to services using DNS names rather than
hard-coded IP addresses.

If the application is supposed to use the Storage Account privately, DNS
needs to resolve the relevant storage name correctly for the Private
Endpoint architecture.

I linked the Private DNS zone:

``` text
privatelink.blob.core.windows.net
```

to my VNet.

The resulting relationship can be thought of as:

``` text
Application
     |
     | Request storage hostname
     v
DNS resolution
     |
     v
Private DNS
privatelink.blob.core.windows.net
     |
     v
Private Endpoint IP
     |
     v
Azure Blob Storage
```

This showed me why **Private Endpoint and Private DNS often need to be
considered together**.

Creating private connectivity is only part of the solution. Applications
also need to resolve the service name toward the correct private
endpoint.

This gives me a useful troubleshooting model for the future:

``` text
Can the application resolve the name?
              |
              v
Does it resolve toward private connectivity?
              |
              v
Is the network path valid?
              |
              v
Is access to the Storage Account permitted?
```

A connectivity problem that initially looks like a routing issue could
actually be a DNS problem.

------------------------------------------------------------------------

# Creating a Read-Only SAS Token

The final security task I completed was generating a **Shared Access
Signature (SAS)** with **read-only permissions** for testing.

A SAS provides delegated access to Azure Storage without simply handing
another user or application the Storage Account's full credentials.

For this exercise, the important part was restricting the SAS to the
permissions actually required:

``` text
SAS
 |
 +-- Read: Allowed
 |
 +-- Write: Not required
 |
 +-- Delete: Not required
```

This follows the principle of **least privilege**.

If a user or test process only needs to read data, there is no reason to
provide write or delete permissions as well.

The exercise also helped distinguish **network security** from
**authorization**.

A Private Endpoint answers a networking question:

> How should the workload privately reach the Storage Account?

A SAS answers an access question:

> What is this caller permitted to do with the storage resource?

Both can be part of securing the same service, but they operate at
different layers.

------------------------------------------------------------------------

# Bringing the Day 4 Architecture Together

By the end of the completed work, the storage architecture looked
conceptually like this:

``` text
                     Azure VNet
                         |
                     AppSubnet
                         |
               +---------+---------+
               |                   |
               v                   v
       Application workload   Private Endpoint
                                   |
                                   | Private Link
                                   v
                         +-------------------+
                         |  Storage Account  |
                         |  stesmeecorp001   |
                         +---------+---------+
                                   |
                      +------------+------------+
                      |                         |
                      v                         v
               corporate-files             shared-docs
               Blob Container              File Share

Private DNS
privatelink.blob.core.windows.net
        |
        +--> Supports private name resolution

Storage protection
        |
        +--> Blob Versioning
        +--> Soft Delete: 7 days
        +--> Container Delete Retention

Lifecycle management
        |
        +--> Cool after 30 days
        +--> Archive after 90 days

Delegated testing access
        |
        +--> Read-only SAS
```

What I liked about this stage of the project was that several Azure
concepts started working together.

This was no longer simply a task of creating a Storage Account. The
design included **data protection, cost management, private networking,
DNS, and access control**.

------------------------------------------------------------------------

# Azure Key Vault — Not Completed

The original Day 4 plan also included an Azure Key Vault section.

The intended tasks were to deploy:

``` text
kv-esmee-corp
```

store VM administrator passwords and Storage Account connection strings
as secrets, and grant a Linux VM's managed identity permission to
retrieve secrets using the **Key Vault Secrets User** RBAC role.

I did **not** complete this section, so Key Vault is intentionally not
presented as part of the implemented environment.

This also means the final Day 4 environment currently uses the storage
and private-connectivity controls described above without the planned
Key Vault secret-management integration.

I would rather document that gap accurately than describe a
configuration I did not actually implement.

------------------------------------------------------------------------

# What I Learned

Day 4 significantly improved my understanding of Azure Storage because
it moved beyond simply asking:

> "Where can I put files?"

Instead, I had to think about several different questions.

**How do I protect data from accidental changes?**

Blob Versioning provides a way to retain previous versions.

**How do I protect data from accidental deletion?**

Soft Delete and Container Delete Retention provide a recovery window.

**How do I manage the cost of older data?**

Lifecycle Management can automatically move aging blobs into Cool and
Archive tiers.

**How do I reduce public network exposure?**

Disable Public Network Access and use a Private Endpoint where the
architecture requires private connectivity.

**How does an application find that private endpoint?**

Private DNS provides the required name-resolution relationship.

**How do I provide limited temporary access?**

A SAS can delegate specific permissions rather than providing
unrestricted storage credentials.

These controls solve different problems:

``` text
Versioning / Soft Delete
        |
        +--> Data protection

Lifecycle Management
        |
        +--> Cost and data lifecycle

Private Endpoint
        |
        +--> Private network connectivity

Private DNS
        |
        +--> Name resolution

SAS
        |
        +--> Delegated authorization
```

That separation is probably the biggest lesson I took from Day 4.

------------------------------------------------------------------------

# Final Thoughts

Day 4 moved the project from traditional infrastructure resources into
**platform-service security**.

On earlier days, much of my networking work focused on VMs and subnets.
With Azure Storage, I had to understand how an Azure platform service
could still participate in a private network architecture through
Private Link and a Private Endpoint.

The completed work included:

- An LRS Storage Account.
- Blob Versioning.
- Seven-day Soft Delete.
- Container Delete Retention.
- Lifecycle Management moving blobs to Cool after 30 days and Archive
  after 90 days.
- The `corporate-files` Blob container.
- The `shared-docs` Azure File Share.
- Public Network Access disabled.
- A Blob Private Endpoint in `AppSubnet`.
- A Private DNS zone linked to the VNet.
- A read-only SAS for testing.

The planned **Azure Key Vault work remains incomplete** and will need to
be revisited separately.

The project has now progressed through several layers of Azure
infrastructure:

``` text
Day 1
Governance & Identity
        |
        v
Day 2
Networking & Secure Access
        |
        v
Day 3
Compute
        |
        v
Day 4
Storage, Data Protection
& Private Connectivity
```

Day 4 reinforced something that has become increasingly clear throughout
this project: securing Azure infrastructure is not achieved by one
setting or one service. It comes from combining controls at different
layers—network exposure, DNS, authorization, retention, and lifecycle
management—to build a more complete architecture.
