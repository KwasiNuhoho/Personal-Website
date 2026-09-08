---
title: "The Hard Part of Sharing Playbooks Isn't the Format"
description: "Six months of thesis work with TDC NET on CACAO 2.0 taught me the machine-readable part was the easy half. Getting competitors to hand each other their response procedures is the other one."
date: "2026-03-02"
category: "Cybersecurity"
tags:
  - CACAO
  - MISP
  - Threat Intelligence
  - SOAR
featured: true
---

I spent six months on a thesis with the cyber defence centre at TDC NET, and I went in expecting the difficult part to be technical. Converting a security playbook from a document a human reads into a structured format a machine can execute — that sounded like the challenge. It wasn't.

## Why telecom is a special case

Mobile network operators sit on protocols most of the security industry never touches. SS7 and Diameter were designed in an era when every party on the network was assumed to be a trusted carrier, and that assumption has aged badly. The operators know this. The people targeting them, including state-sponsored actors, know it too.

What surprised me is how little gets shared. In ordinary enterprise IT there's a reasonably mature culture of exchanging indicators and detection logic. Between network operators, that exchange is much thinner — even though they face the same adversaries using the same techniques against the same protocol stack.

## What CACAO actually gives you

The Collaborative Automated Course of Action Operations specification is a vendor-agnostic way of describing a response process: the steps, the conditions, the ordering, the targets. Version 2.0 is expressive enough to represent most of what a real playbook contains.

The value isn't automation for its own sake. It's decoupling. A playbook written as a runbook page in a wiki is bound to whoever wrote it and whatever tools they had. The same playbook expressed in CACAO describes the logic of the response separately from the product that executes it. That means you can hand it to someone whose SOAR platform is nothing like yours and it still means something.

Transforming existing playbooks was mechanical work — tedious, occasionally ambiguous where the original document had been vague about who does what, but tractable. Where the original said "escalate to the on-call analyst," I had to decide what that step actually was, and that exercise alone improved the playbooks.

## Then I talked to the analysts

I ran interviews and a workshop with people who do this work daily. Automation and orchestration clearly help: mean time to detect and mean time to respond both come down when the repetitive parts of an investigation stop requiring a human to remember them.

External sharing was a different conversation. The blockers weren't format or tooling. They were:

**Reciprocity.** Nobody wants to be the only contributor. If you share and receive nothing back, you've spent effort and given away information about your defences for free.

**Attribution.** A playbook reveals what you can detect, which reveals what you can't. Publishing that under your own name tells competitors and adversaries something about your posture.

**Trust in quality.** Even when something is shared, why act on it? A playbook from an unknown source might be wrong, outdated, or built for an environment nothing like yours.

## The model I ended up proposing

Rather than a central platform everyone has to trust, a decentralised model built on MISP, with two additions aimed squarely at the three problems above.

The first is functional anonymity through an intermediary. Instead of publishing directly, an operator submits through a trade association that strips attribution before distribution. You get the content without knowing which competitor produced it. That removes the attribution objection without requiring anyone to pretend it doesn't exist.

The second is a credibility loop. Anonymous contributions solve one problem and create another — you can no longer judge quality by source. So the community rates what it uses: peer feedback and quantitative ratings accumulate against the artefact rather than the author. A playbook earns standing by being useful.

## What I'd say to anyone starting here

If you're evaluating machine-readable playbooks, do the conversion work early. Not because the output is immediately useful, but because the act of formalising a process exposes every place where the process was actually a shared assumption rather than a documented step.

And be honest about which problem you're solving. Automation inside your own organisation is a tooling problem, and it's solvable. Sharing across organisations is a trust problem wearing a tooling problem's clothes.

The full thesis, including the methodology and the workshop findings, is [available here](/reports/master-thesis-cacao-playbooks.pdf).
