---
title: "Building an Active Directory Homelab"
description: "Notes on standing up an enterprise-style Active Directory environment in VirtualBox, and what it teaches about identity and access management."
date: "2026-08-08"
category: "Cybersecurity"
tags:
  - Active Directory
  - Windows Server
  - VirtualBox
  - Identity
featured: true
---

> This is a sample post. Replace the content below with what you actually built, including real screenshots and specifics from your own lab.

## Why build this

Most entry-level cybersecurity roles assume familiarity with Active Directory, even though it rarely shows up in a typical computer science curriculum. The fastest way to close that gap is to build a small domain from scratch and break it a few times.

## Lab layout

A minimal but realistic lab needs three machines:

- A **domain controller** running Windows Server, hosting AD DS and DNS
- A **member server** joined to the domain
- A **Windows client** to test Group Policy and login behavior

```text
[ Domain Controller ]---[ Internal Switch ]---[ Member Server ]
                                |
                         [ Windows Client ]
```

## What gets configured

1. Promote the server to a domain controller and create the forest
2. Configure DNS so all machines can resolve the domain
3. Create organizational units for users, groups, and computers
4. Apply Group Policy Objects (GPOs) to enforce basic settings
5. Join the client and member server to the domain

```powershell
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools
Install-ADDSForest -DomainName "lab.local"
```

## What this actually teaches

Beyond the click-through steps, the useful part is understanding *why* each piece exists: how DNS underpins domain membership, how GPOs propagate (and why they sometimes don't), and how OU structure affects delegation and policy scope. Those are the same fundamentals that show up in real enterprise environments and in interview questions about identity infrastructure.

## Next steps

Future iterations of this lab could add a second domain controller for redundancy, certificate services, or forward the security event log into a SIEM for detection practice.
