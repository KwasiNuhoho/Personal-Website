export interface ProjectEvidence {
  /** Path under /public, e.g. /projects/ad-homelab/diagram.png */
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  blog?: string;
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
  'DevOps',
] as const;

/**
 * Replace the placeholder text in each `detail` block with what you actually built.
 * Do not add results or outcomes you can't speak to in an interview.
 */
export const projects: Project[] = [
  {
    title: 'Azure Infrastructure Lab',
    slug: 'azure-infrastructure-lab',
    description:
      'A hub-and-spoke Azure network with segmented subnets, NSGs, and centralized monitoring, built to practice core cloud infrastructure patterns.',
    category: ['Azure', 'Cloud', 'Networking'],
    technologies: ['Azure Virtual Network', 'Azure VMs', 'NSGs', 'Azure Monitor', 'Bicep'],
    skillsDemonstrated: [
      'Azure networking and subnet segmentation',
      'Network security group design',
      'Infrastructure as Code with Bicep',
      'Centralized logging and monitoring',
    ],
    featured: true,
    links: {
      github: 'https://github.com/[YOUR-GITHUB-USERNAME]/azure-infrastructure-lab',
      blog: '/blog/[BLOG-SLUG]',
    },
    detail: {
      overview: '[PROJECT OVERVIEW — describe the Azure environment you built and its purpose.]',
      problem:
        '[PROBLEM / LEARNING OBJECTIVE — what you were trying to learn or replicate, e.g. a segmented hub-and-spoke topology used in production environments.]',
      architecture:
        '[ARCHITECTURE — describe the virtual networks, subnets, peering, and traffic flow. Add a diagram to /public/projects/azure-infrastructure-lab/.]',
      implementation:
        '[IMPLEMENTATION — walk through what you actually configured: resource groups, VNets, NSGs, VMs, monitoring.]',
      challenges: '[KEY CHALLENGES — a specific problem you hit and how you resolved it.]',
      whatLearned: '[WHAT YOU LEARNED — the concrete Azure/networking knowledge you gained.]',
      results: '[RESULTS — the working end-state of the environment.]',
      evidence: [],
    },
  },
  {
    title: 'Active Directory Homelab',
    slug: 'active-directory-homelab',
    description:
      'An enterprise-style Active Directory environment built in VirtualBox, covering domain services, DNS, Group Policy, and identity management.',
    category: ['Cybersecurity', 'Networking', 'Homelab'],
    technologies: ['Windows Server', 'Active Directory Domain Services', 'DNS', 'Group Policy', 'VirtualBox'],
    skillsDemonstrated: [
      'Active Directory Domain Services',
      'Group Policy administration',
      'DNS configuration',
      'User and group identity management',
    ],
    featured: true,
    links: {
      github: 'https://github.com/[YOUR-GITHUB-USERNAME]/active-directory-homelab',
      blog: '/blog/building-an-active-directory-homelab',
    },
    detail: {
      overview:
        '[PROJECT OVERVIEW — describe the domain you built: how many VMs, roles, and what the lab represents.]',
      problem:
        '[PROBLEM / LEARNING OBJECTIVE — the enterprise identity concepts you wanted hands-on experience with.]',
      architecture:
        '[ARCHITECTURE — describe the domain controller, member servers/workstations, and network layout. Add a diagram to /public/projects/active-directory-homelab/.]',
      implementation:
        '[IMPLEMENTATION — promoting the domain controller, configuring DNS, creating OUs/users/groups, applying GPOs.]',
      challenges: '[KEY CHALLENGES — a specific issue, e.g. DNS resolution or GPO propagation, and how you fixed it.]',
      whatLearned: '[WHAT YOU LEARNED — the identity and directory services concepts you now understand.]',
      results: '[RESULTS — the working domain and what it demonstrates.]',
      evidence: [],
    },
  },
  {
    title: 'Security Monitoring Lab',
    slug: 'security-monitoring-lab',
    description:
      'A Wazuh-based SIEM deployment for endpoint monitoring, log collection, and alert investigation across a small lab network.',
    category: ['Cybersecurity', 'Homelab'],
    technologies: ['Wazuh', 'SIEM', 'Endpoint Monitoring', 'Linux'],
    skillsDemonstrated: [
      'SIEM deployment and configuration',
      'Endpoint agent management',
      'Alert triage and investigation',
      'Log analysis',
    ],
    featured: true,
    links: {
      github: 'https://github.com/[YOUR-GITHUB-USERNAME]/security-monitoring-lab',
      blog: '/blog/[BLOG-SLUG]',
    },
    detail: {
      overview: '[PROJECT OVERVIEW — describe the monitoring stack and what it watches.]',
      problem: '[PROBLEM / LEARNING OBJECTIVE — the detection and monitoring concepts you wanted to practice.]',
      architecture:
        '[ARCHITECTURE — describe the Wazuh manager, agents, and data flow. Add a diagram to /public/projects/security-monitoring-lab/.]',
      implementation: '[IMPLEMENTATION — deploying the manager, enrolling agents, building detection rules.]',
      challenges: '[KEY CHALLENGES — a specific detection or configuration problem and how you solved it.]',
      whatLearned: '[WHAT YOU LEARNED — the SIEM/detection concepts you now understand.]',
      results: '[RESULTS — what the lab successfully detects or demonstrates.]',
      evidence: [],
    },
  },
  {
    title: 'Security Automation & Threat Intelligence',
    slug: 'security-automation-threat-intelligence',
    description:
      'A SOAR-style automation workflow using CACAO security playbooks and MISP to practice structured threat intelligence sharing and response.',
    category: ['Cybersecurity', 'Automation'],
    technologies: ['MISP', 'SOAR', 'CACAO Playbooks', 'Threat Intelligence', 'Python'],
    skillsDemonstrated: [
      'Threat intelligence platform administration',
      'Security playbook design',
      'Automation scripting',
      'Structured threat data (STIX/CACAO concepts)',
    ],
    featured: false,
    links: {
      github: 'https://github.com/[YOUR-GITHUB-USERNAME]/security-automation-threat-intel',
      blog: '/blog/[BLOG-SLUG]',
    },
    detail: {
      overview: '[PROJECT OVERVIEW — describe the automation workflow and what it responds to.]',
      problem: '[PROBLEM / LEARNING OBJECTIVE — the SOAR/threat-intel concepts you wanted hands-on practice with.]',
      architecture:
        '[ARCHITECTURE — describe how MISP, the playbook engine, and any scripts connect. Add a diagram to /public/projects/security-automation-threat-intelligence/.]',
      implementation: '[IMPLEMENTATION — deploying MISP, authoring a CACAO playbook, wiring up automation.]',
      challenges: '[KEY CHALLENGES — a specific integration or logic problem and how you solved it.]',
      whatLearned: '[WHAT YOU LEARNED — the automation/threat-intel concepts you now understand.]',
      results: '[RESULTS — what the workflow does end-to-end.]',
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
