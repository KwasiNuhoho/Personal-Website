---
title: "Writing a Runbook Someone Will Actually Follow"
description: "We wrote an incident-response runbook for a university server suspected of hosting illegal activity. The step everyone forgets is the one before containment."
date: "2026-04-18"
category: "Cybersecurity"
tags:
  - Incident Response
  - Runbook
  - Digital Forensics
featured: false
---

The scenario we were given was uncomfortably realistic: DTU Compute gets a notification that one of its servers is being used for something illegal. Hosting illegal content, running phishing infrastructure, sitting in a command-and-control chain. Write the runbook.

What made it interesting is that this isn't a purely technical incident. A compromised laptop is an IT problem. A university server implicated in a crime is simultaneously an IT problem, a legal problem, an HR problem, and a reputational one — and the technical response can actively damage the other three if you get the order wrong.

## The step everyone skips

The instinct when you get that notification is to go look. Log in, check the processes, see what's running. That instinct is wrong, and it's the reason the verification phase exists as its own stage.

Before touching the system you need to know what you're allowed to touch. Who has authority to activate the runbook? Is this server carrying research data that belongs to someone who has to be informed? Does examining a user's files require approval you don't currently have? If the activity turns out to be real, does the evidence you're about to disturb need to survive contact with an actual legal process?

Preparation isn't paperwork you do so the runbook looks complete. It's the part that determines whether the rest of the response is usable afterwards.

## False positives are the common case

We built explicit false-positive checks into the verification stage, and I'd argue that's the highest-value section in the document. Notifications about server misuse arrive from automated abuse-reporting systems, from other institutions, occasionally from people who have misread something.

Treating every notification as confirmed compromise means you'll eventually take a production research server offline over a misattributed IP address. Once you've done that, the next report gets taken less seriously — which is exactly the wrong outcome.

So verification has to be a real gate with real criteria, not a formality between detection and containment.

## Structure follows the lifecycle, not the org chart

We organised the runbook around the incident response lifecycle: preparation, detection, verification, assessment, containment, eradication, recovery, and post-incident reflection. That's the standard shape and there's a good reason for it — it matches the order in which a person under pressure needs information.

Writing it, the temptation is to organise by team, because that's how the organisation is arranged. Resist it. At two in the morning nobody is reading a runbook to find out what their department does. They're reading it to find out what happens next.

## Roles before procedures

Every step needs a named role attached, and those roles need to be defined before the steps that use them. It sounds obvious. It's routinely missing.

A runbook that says "preserve the logs" without saying who does it produces a room full of people who each assume someone else has done it. A runbook that says "the incident lead assigns log preservation to a system administrator, who documents the hash of each preserved file" produces preserved logs.

## The last section matters more than it looks

The post-incident reflection is easy to write as a formality and easy to skip when you're tired and the server is back up. But a runbook is a living document, and the only mechanism that keeps it accurate is the discipline of updating it after every use.

Every incident tells you something the runbook got wrong: a contact who's left, a system that no longer exists, a step that assumed access somebody doesn't have. Without the retrospective, the document quietly decays until it's a historical record of how you used to respond.

The full runbook is [available here](/reports/incident-response-runbook.pdf). It was written with Metehan Gelgi, Yashasvi Tirpur Vishwanath, and Stefano Licinio.
