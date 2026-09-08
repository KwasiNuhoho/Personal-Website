export interface ProjectEvidence {
  /** Path under /public, e.g. /project-media/ad-homelab/diagram.png */
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  blog?: string;
  /** Path under /public to a full write-up or report PDF. */
  report?: string;
}

export interface ProjectDetail {
  overview: string;
  problem: string;
  architecture: string;
  implementation: string;
  challenges: string;
  whatLearned: string;
  results: string;
  evidence: ProjectEvidence[];
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  category: string[];
  technologies: string[];
  skillsDemonstrated: string[];
  featured: boolean;
  image?: string;
  links: ProjectLinks;
  detail: ProjectDetail;
}

export const projectCategories = [
  'Azure',
  'Cloud',
  'Cybersecurity',
  'Networking',
  'Automation',
  'Homelab',
  'Telecom',
] as const;

export const projects: Project[] = [
  {
    title: 'Azure Infrastructure Build',
    slug: 'azure-infrastructure-lab',
    description:
      'A four-day build of a governed Azure environment: management hierarchy and custom RBAC, hub-and-spoke networking with Bastion, compute behind an Application Gateway, and storage locked down with private endpoints.',
    category: ['Azure', 'Cloud', 'Networking'],
    technologies: [
      'Azure Policy',
      'Entra ID',
      'Custom RBAC',
      'Azure Virtual Network',
      'Azure Bastion',
      'Application Gateway',
      'Private Endpoints',
      'Azure Monitor',
    ],
    skillsDemonstrated: [
      'Cloud governance and policy enforcement',
      'Least-privilege access design with custom RBAC roles',
      'Network segmentation, NSGs, and user-defined routes',
      'Secure administrative access without public IPs',
      'Storage security, private connectivity, and lifecycle management',
    ],
    featured: true,
    links: {
      blog: '/blog/azure-governance-and-identity',
    },
    detail: {
      overview:
        'A structured, multi-day build of a secure Azure environment, done end to end rather than as isolated exercises. Each day tackled one layer — governance and identity, then networking and secure access, then compute and application delivery, then storage — with the previous day as its foundation. The full write-up for each stage is on the blog.',
      problem:
        'Deploying virtual machines and virtual networks before there is any governance structure is a fast route to security gaps, surprise costs, and an environment nobody can reason about. I wanted to do it in the order a real platform team would: define the boundaries and access model first, then build inside them.',
      architecture:
        'A management group and subscription hierarchy sets the resource boundaries, with custom RBAC roles applied at the right scope for least privilege. Networking follows a hub-and-spoke topology — segmented subnets with network security groups controlling east-west traffic, user-defined routes steering flows, and Azure Bastion providing administrative access so no VM needs a public IP. Compute sits behind an Application Gateway for application delivery. Storage accounts are reached over private endpoints rather than public service endpoints, with lifecycle rules moving data between access tiers.',
      implementation:
        'Day 1 established the identity and governance baseline: resource hierarchy, custom RBAC role definitions, Azure Policy for mandatory resource tagging, and cost safeguards. Day 2 built the network — virtual networks and subnets, NSG rules, user-defined routes, and Bastion for secure access. Day 3 deployed virtual machines into that topology and put an Application Gateway in front of them. Day 4 covered storage: private endpoints, data protection settings, and lifecycle management policies.',
      challenges:
        'The most instructive problem was Azure Policy evaluation. After assigning a tagging policy, the compliance view did not reflect what I had just changed, which reads at first as a broken assignment. Policy evaluation runs on its own schedule, so the fix was understanding the evaluation cycle and triggering on-demand compliance scans rather than troubleshooting an assignment that was working correctly. The investigation is written up in the Day 1 post.',
      whatLearned:
        'That governance is a prerequisite rather than a cleanup task, and that audit mode should come before deny mode — you need to know how much of the existing estate a rule would break before you enforce it. Also that segmentation is cheap while an environment is empty and expensive to retrofit once workloads depend on the IP ranges.',
      results:
        'A working, segmented Azure environment with enforced tagging, least-privilege access, no publicly exposed management surface, and privately reachable storage — plus four detailed write-ups documenting how each layer was built and what went wrong along the way.',
      evidence: [
        {
          src: '/project-media/azure-infrastructure-lab/policy-assignment.png',
          alt: 'Azure Policy assignment configuration screen',
          caption: 'Assigning the resource tagging policy at the correct scope.',
        },
        {
          src: '/project-media/azure-infrastructure-lab/environment-tag-policy.png',
          alt: 'Custom policy definition requiring an environment tag',
          caption: 'The custom policy definition requiring an environment tag on resources.',
        },
        {
          src: '/project-media/azure-infrastructure-lab/policy-not-started.png',
          alt: 'Policy compliance view showing evaluation not started',
          caption:
            'Compliance showing "not started" — the evaluation cycle had not run yet, which is what sent me investigating.',
        },
        {
          src: '/project-media/azure-infrastructure-lab/policy-compliance.png',
          alt: 'Policy and compliance overview dashboard',
          caption: 'The policy and compliance overview once evaluation completed.',
        },
        {
          src: '/project-media/azure-infrastructure-lab/policy-compliant.png',
          alt: 'Resources showing as compliant after remediation',
          caption: 'Resources reporting compliant after an on-demand scan.',
        },
        {
          src: '/project-media/azure-infrastructure-lab/asc-default.png',
          alt: 'Default security policy initiative in Azure',
          caption: 'The built-in security initiative applied alongside the custom policies.',
        },
      ],
    },
  },
  {
    title: 'Automated Security Playbooks for Telecom',
    slug: 'automated-security-playbooks',
    description:
      'MSc thesis with the cyber defence centre at TDC NET: converting legacy incident-response playbooks into machine-readable CACAO 2.0, and designing a MISP-based sharing model that addresses why operators do not share in the first place.',
    category: ['Cybersecurity', 'Automation', 'Telecom'],
    technologies: ['CACAO 2.0', 'MISP', 'SOAR', 'Threat Intelligence', 'Incident Response', 'STIX'],
    skillsDemonstrated: [
      'Security playbook design and formalisation',
      'Machine-readable threat intelligence formats',
      'Qualitative research — expert interviews and workshop facilitation',
      'Security operations process analysis',
      'Trust and information-sharing model design',
    ],
    featured: true,
    links: {
      blog: '/blog/machine-readable-playbooks',
      report: '/reports/master-thesis-cacao-playbooks.pdf',
    },
    detail: {
      overview:
        "A six-month master's thesis carried out with TDC NET, investigating the move from human-readable legacy security playbooks to machine-readable, vendor-agnostic ones using the CACAO 2.0 specification — and, more importantly, what stops mobile network operators sharing those playbooks with each other.",
      problem:
        'Mobile network operators face sophisticated threats, including state-sponsored actors targeting specialised protocols such as SS7 and Diameter. Despite facing the same adversaries, they lack the information sharing that is routine in enterprise IT, which makes a unified defence difficult to establish.',
      architecture:
        "The proposed model is decentralised rather than a single platform everyone must trust. Playbooks are expressed in CACAO 2.0 so the process logic is decoupled from any vendor's SOAR tooling. Distribution runs through MISP, with two additions: functional anonymity provided by trade-association intermediaries that strip attribution before distribution, and a community credibility loop where peer feedback and quantitative ratings accumulate against the artefact rather than the author.",
      implementation:
        "The work ran in three phases. Exploration covered the transformation of existing legacy playbooks into CACAO 2.0 structures. Investigation used expert interviews and a questionnaire with security analysts at TDC NET's cyber defence centre. Validation took the form of a practical workshop with those analysts, testing the approach against how they actually work.",
      challenges:
        'The technical conversion was tractable; the barrier was human. Interviews surfaced three distinct blockers to external sharing — reciprocity (nobody wants to be the only contributor), attribution (a playbook reveals what you can detect, and by omission what you cannot), and trust in quality (why act on a playbook from an unknown source). The anonymity and credibility mechanisms exist specifically to answer those three.',
      whatLearned:
        "That formalising a process is itself valuable independently of automation — writing a playbook in a structured format exposes every step that was really a shared assumption. And that automation inside one organisation is a tooling problem, while sharing across organisations is a trust problem wearing a tooling problem's clothes.",
      results:
        'A demonstrated transformation path from legacy to machine-readable playbooks, evidence that automation and orchestration reduce mean time to detect and mean time to respond, and a proposed sharing framework validated against practitioner feedback. The full thesis is linked above.',
      evidence: [],
    },
  },
  {
    title: 'Enterprise Active Directory Lab',
    slug: 'active-directory-homelab',
    description:
      'A Windows Server 2022 domain built from scratch — DNS, DHCP, domain-joined clients, Group Policy, and file services secured by AD security groups, administered through PowerShell.',
    category: ['Cybersecurity', 'Networking', 'Homelab'],
    technologies: [
      'Windows Server 2022',
      'Active Directory Domain Services',
      'DNS',
      'DHCP',
      'Group Policy',
      'PowerShell',
    ],
    skillsDemonstrated: [
      'Active Directory Domain Services deployment',
      'Group Policy design and troubleshooting',
      'DNS and DHCP configuration',
      'Centralised identity and access management',
      'PowerShell administration',
    ],
    featured: true,
    links: {},
    detail: {
      overview:
        'An enterprise-style Active Directory environment built to get hands-on with the identity layer that sits underneath most corporate networks — the same ground I covered on the service desk at Volta River Authority, but this time building it rather than supporting it.',
      problem:
        'Active Directory is assumed knowledge in most infrastructure and security roles and rarely taught in depth. Standing up a domain, joining clients to it, and then deliberately breaking things is the fastest way to understand how identity, name resolution, and policy actually interact.',
      architecture:
        'A Windows Server 2022 domain controller providing Active Directory Domain Services, DNS, and DHCP, with domain-joined client machines. Organisational units separate users and devices so Group Policy can be scoped meaningfully, and file services are shared with permissions driven by AD security groups rather than per-user access.',
      implementation:
        'Promoting the domain controller and configuring the DNS zones it depends on, setting up DHCP scopes, joining clients to the domain, and building an OU structure. Group Policy objects were then created for access control and device configuration, security groups were used to manage file share permissions, and routine administration was done through PowerShell and the Windows Server management tools.',
      challenges:
        'Most of the instructive failures were name resolution and policy propagation — a client that will not join the domain almost always turns out to be pointed at the wrong DNS server, and a GPO that appears not to apply is usually scoped to the wrong OU or waiting on a refresh interval.',
      whatLearned:
        'How identity, DNS, and policy depend on one another, and why permissions granted to groups rather than individuals is the difference between an access model you can audit and one you cannot.',
      results:
        'A working domain with centralised identity, enforced Group Policy, and file services secured by group membership — administered largely from the command line.',
      evidence: [],
    },
  },
  {
    title: 'Wi-Fi Security: Attacks and Countermeasures',
    slug: 'wifi-security-lab',
    description:
      'Deauthentication, evil twin, and WPA2 handshake capture executed in a controlled lab to measure real impact, then evaluated against WPA3 and VPN mitigations — ending in a demonstration built for a non-expert audience.',
    category: ['Cybersecurity', 'Networking'],
    technologies: ['WPA2 / WPA3', 'Wireshark', '802.11', 'Aircrack-ng', 'VPN'],
    skillsDemonstrated: [
      'Wireless attack execution in a controlled environment',
      'Packet capture and traffic analysis',
      'Security control evaluation',
      'Communicating technical risk to non-technical audiences',
    ],
    featured: true,
    links: {
      blog: '/blog/wifi-attacks-in-a-lab',
      report: '/reports/wifi-security-report.pdf',
    },
    detail: {
      overview:
        'A group project exploring wireless vulnerabilities by demonstrating real attack scenarios in a controlled environment, analysing their impact, and proposing countermeasures — closing with an educational demonstration aimed at raising awareness among non-experts.',
      problem:
        'Wireless attacks are widely described and rarely observed first-hand. Running them against a network you built yourself makes the difference between knowing that deauthentication exists and understanding that it is the protocol behaving exactly as specified.',
      architecture:
        'An isolated lab network with an access point, client devices, and an attacker machine, allowing each attack to be run and captured without touching anything outside the environment.',
      implementation:
        'Three attacks were executed end to end: deauthentication to force clients off the network, an evil twin access point broadcasting a duplicate SSID, and capture of the WPA2 four-way handshake for offline analysis. WPA3 and VPN-based mitigations were then evaluated against the same attacks.',
      challenges:
        "The evil twin was the uncomfortable result, because none of it touches cryptography — it exploits the fact that a network's identity is a name a human recognises. The technical mitigations addressed the other two attacks; this one comes down largely to whether the user notices. Building the non-expert demonstration was harder than any of the attacks, since it forces you to reduce the findings to things a person can actually act on.",
      whatLearned:
        "That WPA3's Simultaneous Authentication of Equals genuinely removes the offline dictionary attack and protected management frames close the deauthentication hole — but that mixed-mode deployments and unsupported devices mean the defence is real while the rollout is the problem.",
      results:
        'Three working attack demonstrations with captures, a comparative evaluation of WPA3 and VPN mitigations, and an awareness session delivered to a non-technical audience. Full report linked above.',
      evidence: [],
    },
  },
  {
    title: 'Incident Response Runbook: Server Misuse',
    slug: 'incident-response-runbook',
    description:
      'A full incident-response runbook for the case where a university compute server is reported as being used for illegal activity — covering the lifecycle from preparation and evidence preservation through to post-incident review.',
    category: ['Cybersecurity', 'Automation'],
    technologies: ['Incident Response', 'Digital Forensics', 'Log Analysis', 'IR Lifecycle'],
    skillsDemonstrated: [
      'Incident response process design',
      'Evidence preservation and documentation',
      'False-positive triage criteria',
      'Legal and policy considerations in security incidents',
      'Technical documentation under operational constraints',
    ],
    featured: false,
    links: {
      blog: '/blog/writing-a-runbook',
      report: '/reports/incident-response-runbook.pdf',
    },
    detail: {
      overview:
        'A group runbook written for a realistic scenario: DTU Compute is notified that one of its servers is suspected of involvement in illegal or unauthorised activity — hosting illegal content, phishing or denial-of-service infrastructure, or command and control.',
      problem:
        'This is not a purely technical incident. A university server implicated in a crime is simultaneously an IT, legal, HR, and reputational problem, and a technical response taken in the wrong order can damage the other three. The runbook had to be usable by someone under pressure who is not thinking clearly.',
      architecture:
        'Structured around the incident response lifecycle rather than the organisation chart: preparation, detection, verification, assessment, containment, eradication, recovery, and post-incident reflection — the order in which someone responding actually needs the information.',
      implementation:
        'Preparation defines roles and responsibilities, runbook activation criteria, critical asset identification, legal and policy review, and user access controls. Detection covers receiving the notification, collecting relevant data and logs, and preserving and documenting evidence. Verification adds initial validation, technical log validation, explicit false-positive checks, and legal assessment before any containment action is taken.',
      challenges:
        'The instinct on receiving a notification is to log in and look, which can destroy evidence and may exceed the authority you actually have. Making verification a real gate with real criteria — rather than a formality between detection and containment — was the design decision that mattered most, because abuse notifications are frequently misattributed.',
      whatLearned:
        'That every step needs a named role attached before the step that uses it, or responsibility diffuses and nothing gets done. And that the post-incident review is the only mechanism keeping a runbook accurate; without it the document decays into a record of how you used to respond.',
      results:
        'A complete, reviewable runbook covering the full lifecycle with defined roles, evidence handling procedures, and false-positive criteria. Full document linked above.',
      evidence: [],
    },
  },
  {
    title: '5G Wireline Backhaul Upgrade Design',
    slug: '5g-backhaul-design',
    description:
      'Modernising an 18-site backhaul network running 1 Gbps copper in a tree topology — replacing copper with fibre, selecting D-WDM, and validating four-nines availability through reliability block diagram analysis.',
    category: ['Networking', 'Telecom'],
    technologies: [
      'D-WDM',
      'Fibre Optics',
      'Network Redundancy',
      'Reliability Analysis',
      'Capacity Planning',
    ],
    skillsDemonstrated: [
      'Transport network design',
      'Traffic demand projection',
      'Redundancy scheme selection (1+1, 1:1, 1:N)',
      'Availability modelling with reliability block diagrams',
    ],
    featured: false,
    links: {
      report: '/reports/5g-backhaul-design.pdf',
    },
    detail: {
      overview:
        'A design study modernising an existing backhaul network to support 5G demand, working from an already-deployed infrastructure rather than a greenfield design — identifying its weaknesses and proposing an evolved architecture.',
      problem:
        'The starting network connects 18 base stations to a single core site over 1 Gbps copper Ethernet in a tree topology. It is simple, and it has one aggregation site with no alternate path: if that site goes down, everything goes down. Rising data consumption and the move to 5G also push it past its capacity and scalability limits.',
      architecture:
        'Legacy copper links replaced with fibre, D-WDM selected as the transport technology, redundancy introduced at multiple layers, and the topology redesigned to remove bottlenecks and single points of failure.',
      implementation:
        'The work covers current-state assessment, future demand projection, fundamental reliability metrics, classification of 1+1 dedicated standby, 1:1 deterministic pair, and 1:N shared standby redundancy schemes, a copper-versus-fibre comparison, and justification for the D-WDM selection.',
      challenges:
        'Balancing the cost of redundancy against the availability it buys. Every scheme trades capital expenditure against recovery behaviour, and the reliability block diagram analysis is what turns that from an opinion into a number.',
      whatLearned:
        'How availability targets translate into concrete topology decisions, and why four-nines is a design constraint rather than a marketing figure.',
      results:
        'A backhaul architecture sized for higher traffic loads, future base station growth, and critical communication services, with availability validated against a 99.99% target. Full design document linked above.',
      evidence: [],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
