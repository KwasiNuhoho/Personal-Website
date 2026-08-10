---
title: "Segmenting an Azure Network: A Hub-and-Spoke Primer"
description: "Working through the hub-and-spoke topology in Azure — what problem it solves and how the pieces (VNets, peering, NSGs) fit together."
date: "2026-07-14"
category: "Azure"
tags:
  - Azure
  - Networking
  - Cloud
featured: true
---

> This is a sample post. Replace the content below with the specifics of your own Azure lab.

## The problem with one flat network

A single Azure Virtual Network with everything inside it works for a demo, but it doesn't reflect how real environments are segmented. Production workloads are typically split by function and trust level, with traffic between them explicitly controlled.

## The hub-and-spoke pattern

A hub VNet holds shared services — firewalls, VPN gateways, monitoring — and each spoke VNet holds a workload, peered back to the hub rather than to each other.

```text
                +-------------------+
                |     Hub VNet      |
                |  (firewall, VPN)  |
                +---------+---------+
                          |
        +-----------------+-----------------+
        |                                   |
+-------+-------+                   +-------+-------+
|  Spoke: App   |                   |  Spoke: Data  |
+---------------+                   +---------------+
```

## Building it

1. Create the hub VNet and a spoke VNet with non-overlapping address spaces
2. Peer the VNets in both directions
3. Apply a Network Security Group to each subnet, allowing only the traffic that's actually needed
4. Enable Azure Monitor / NSG flow logs so traffic is visible, not just blocked

```bicep
resource vnet 'Microsoft.Network/virtualNetworks@2023-09-01' = {
  name: 'hub-vnet'
  location: location
  properties: {
    addressSpace: {
      addressPrefixes: ['10.0.0.0/16']
    }
  }
}
```

## Why it matters

Segmentation is the difference between "everything can talk to everything" and a network where a compromised workload has a limited blast radius. Understanding this pattern — and being able to describe *why* each NSG rule exists — is a common thread across cloud infrastructure and security interviews alike.
