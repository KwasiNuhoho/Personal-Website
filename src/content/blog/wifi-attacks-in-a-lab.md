---
title: "Three Wi-Fi Attacks, and Which Defences Held"
description: "Deauthentication, evil twin, and WPA2 handshake capture in a controlled lab — plus the awkward finding that the best mitigation is the one nobody has rolled out yet."
date: "2026-06-09"
category: "Cybersecurity"
tags:
  - WPA3
  - Wireless Security
  - Wireshark
  - 802.11
featured: false
---

Everyone who has taken a network security course can describe a deauthentication attack. Far fewer have watched one work on a network they set up themselves, which turns out to be a meaningfully different experience.

We built a controlled lab environment and ran three attacks end to end: deauthentication, evil twin, and WPA2 four-way handshake capture. Then we evaluated what actually mitigates each one.

## Deauthentication: the protocol working as designed

The uncomfortable thing about deauth is that it isn't exploiting a bug. Management frames in 802.11 were historically unauthenticated, so a frame telling a client to disconnect is indistinguishable from a legitimate one. The attack is the protocol doing what it was specified to do.

On its own it's a denial of service. Its real value to an attacker is as a setup move — it's how you force the reconnection that the other two attacks depend on.

## Evil twin: the one that doesn't need any cryptography

Stand up an access point broadcasting the same SSID, make it louder than the real one, and wait. Combine it with deauth and you don't even have to wait.

This is the attack I'd worry about most in practice, because none of it touches encryption. It targets the fact that a network's identity is a name a human recognises, and names are trivially copied. The user is the authentication mechanism, and the user is comparing a string.

What made it stick for me is that all of our technical defences addressed the other two attacks. This one mostly comes down to whether a person notices they're on the wrong network.

## Handshake capture: patience, then offline work

Capturing the WPA2 four-way handshake doesn't give you the key. It gives you the material to attempt the key offline, at whatever rate your hardware allows, with no further interaction with the target.

Which means the entire security of the network at that point rests on passphrase strength. A strong passphrase makes the captured handshake near-worthless. A weak one makes the capture the only hard part, and the capture isn't hard.

## What held up

WPA3 addresses the handshake problem properly. Simultaneous Authentication of Equals removes the offline dictionary attack — you can capture all you want, there's nothing to grind against. Protected management frames close the deauth hole. On paper it's a genuine fix.

In practice, mixed-mode deployments and the long tail of devices that don't support it mean many networks calling themselves WPA3 still fall back. The defence is real; the rollout is the problem.

A VPN doesn't stop any of the three attacks. What it does is make the evil twin much less valuable, because the attacker gets an encrypted tunnel instead of readable traffic. That's a meaningful reduction in impact, and it's the control an individual can actually deploy today without waiting for anyone's infrastructure to be upgraded.

## The demo was the hardest part

The last component of the project was an educational demonstration for a non-expert audience, and it was harder than any of the attacks.

Explaining a handshake capture to someone without a networking background, in a way that produces useful caution rather than vague dread, forces you to work out what you're actually asking them to do differently. "Use a VPN on public Wi-Fi" and "check the network name before connecting" are two things a person can act on. Most of the technical detail, however satisfying, isn't.

The full report, with the lab setup and captures, is [available here](/reports/wifi-security-report.pdf). Run these only on networks you own or have written permission to test.
