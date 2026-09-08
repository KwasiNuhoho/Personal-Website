export interface EducationEntry {
  institution: string;
  credential: string;
  period: string;
  details?: string[];
}

export interface ExperienceEntry {
  role: string;
  organization: string;
  period: string;
  location?: string;
  highlights: string[];
}

export interface CertificationEntry {
  name: string;
  issuer: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  date?: string;
}

export const resumeData = {
  summary:
    'Infrastructure and cloud engineer with hands-on experience across Microsoft Azure, Windows Server and Active Directory, networking, and security operations. MSc in Communication Technologies & System Design from DTU with a specialisation in cloud and cybersecurity, and a thesis written with the cyber defence centre at TDC NET on automating incident response for telecom operators. Looking for a role in Denmark where I can keep working across cloud infrastructure, identity, and security monitoring.',

  education: [
    {
      institution: 'Danmarks Tekniske Universitet (DTU)',
      credential: 'MSc, Communication Technologies & System Design',
      period: 'Feb 2024 – Feb 2026',
      details: [
        'Specialisation: Cloud and Cybersecurity',
        'Cloud Networking, Network Security, Computer Security Incident Response, Ethical Hacking',
        'Thesis with TDC NET: automated security playbook collaboration in critical infrastructure',
      ],
    },
    {
      institution: 'Kwame Nkrumah University of Science and Technology',
      credential: 'BSc, Telecommunication Engineering',
      period: '2017 – 2021',
      details: ['Computer Networking, Data Communication'],
    },
  ] as EducationEntry[],

  experience: [
    {
      role: 'Technical Worker (part-time)',
      organization: 'Thiim A/S',
      period: 'Feb 2025 – Present',
      location: 'Denmark',
      highlights: [
        'Configure software on electronic units and support the assembly and testing of monitoring equipment against quality standards.',
        'Operate technical equipment and embedded software tooling in the preparation of electronic products.',
      ],
    },
    {
      role: 'MSc Thesis Project',
      organization: 'TDC NET',
      period: 'Aug 2025 – Feb 2026',
      location: 'Denmark',
      highlights: [
        'Designed and evaluated automated security playbooks to improve incident detection and response in telecom environments, transforming legacy playbooks into the machine-readable CACAO 2.0 format.',
        'Ran expert interviews and a hands-on workshop with analysts at the cyber defence centre to test the approach against real operational constraints.',
        'Analysed collaboration models between network operators and proposed a decentralised MISP-based sharing framework with functional anonymity and a peer-driven credibility loop.',
      ],
    },
    {
      role: 'Data Extraction Volunteer',
      organization: 'Claryo',
      period: 'Jan 2025 – Mar 2025',
      location: 'Denmark',
      highlights: [
        'Built automated ingestion scripts to parse structural sensor data from IO-Link hardware.',
        'Converted raw sensor output into schemas optimised for relational SQL database operations.',
      ],
    },
    {
      role: 'Cybersecurity Intern (remote)',
      organization: 'SenseLearner Technologies Pvt Ltd.',
      period: 'Sep 2023 – Nov 2023',
      location: 'India',
      highlights: [
        'Identified system vulnerabilities through network scanning and penetration testing with Nmap, Nessus, and Metasploit.',
        'Analysed findings and recommended mitigation strategies to improve overall security posture.',
        'Documented security findings and proposed remediation to reduce identified vulnerabilities.',
      ],
    },
    {
      role: 'Network Engineering Intern',
      organization: 'Volta River Authority',
      period: 'Oct 2021 – Aug 2022',
      location: 'Ghana',
      highlights: [
        'Configured and troubleshot L2/L3 switches, routers, and firewalls, optimising routing and system uptime.',
        'Provided end-user IT support for Windows laptops and desktops — hardware troubleshooting, software installation, device setup, and Microsoft 365 support.',
        'Supported user account administration and employee onboarding/offboarding as part of the Client Service team.',
      ],
    },
  ] as ExperienceEntry[],

  certifications: [
    {
      name: 'AZ-104: Microsoft Azure Administrator Associate',
      issuer: 'Microsoft',
      status: 'Completed',
    },
    { name: 'AZ-900: Microsoft Azure Fundamentals', issuer: 'Microsoft', status: 'Completed' },
    { name: 'Certified in Cybersecurity (CC)', issuer: 'ISC2', status: 'Completed' },
  ] as CertificationEntry[],

  training: [
    'Azure infrastructure build-out: governance, networking, compute, and storage (documented on the blog)',
    'Enterprise Active Directory homelab — Windows Server 2022, DNS, DHCP, Group Policy',
    'Ethical hacking and penetration testing coursework, DTU',
    'Danish language study — ongoing',
  ],
};
