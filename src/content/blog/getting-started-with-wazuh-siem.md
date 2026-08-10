---
title: "Getting Started with Wazuh as a Home SIEM"
description: "Deploying Wazuh to collect and investigate endpoint activity, and the difference between installing a SIEM and actually using one."
date: "2026-06-02"
category: "Cybersecurity"
tags:
  - SIEM
  - Wazuh
  - Detection
featured: false
---

> This is a sample post. Replace the content below with the specifics of your own monitoring lab.

## Why a SIEM lab

Installing security tools is easy; using them to actually notice something is the harder skill. A small Wazuh deployment is a low-cost way to practice the full loop: collect logs, write or tune a detection, generate the activity, and investigate the alert.

## Components

- **Wazuh manager** — ingests events, applies rules, generates alerts
- **Agents** — installed on endpoints to forward logs and file integrity data
- **Dashboard** — for searching events and reviewing alerts

```text
[ Endpoint + Agent ] --logs--> [ Wazuh Manager ] --alerts--> [ Dashboard ]
```

## A basic workflow

1. Deploy the Wazuh manager and dashboard
2. Enroll one or two endpoint agents
3. Confirm logs are flowing before touching any detection rules
4. Generate a known, benign "suspicious" action (e.g. a failed login burst)
5. Find the resulting alert and trace it back to the raw log

```bash
systemctl status wazuh-manager
/var/ossec/bin/agent_control -l
```

## What's worth practicing

The valuable exercise isn't the installation — it's triage. Given an alert, can you explain what happened, whether it's a false positive, and what you'd do next? That habit of reading logs and reasoning about them is exactly what's expected in a SOC analyst or security monitoring role.
