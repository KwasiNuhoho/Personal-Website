export interface SkillCategory {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  skills: string[];
}

/**
 * Only list technologies you can actually speak to in an interview.
 * Add or remove entries from the `skills` arrays as your experience changes.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'cloud',
    label: 'Cloud',
    eyebrow: 'cat cloud.json',
    description: 'Deploying and operating infrastructure on Microsoft Azure.',
    skills: [
      'Microsoft Azure',
      'Azure Virtual Networks',
      'Azure Virtual Machines',
      'Azure Storage',
      'Azure Monitor',
      'Azure Entra ID',
      'Azure Networking',
      'Infrastructure as Code',
    ],
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    eyebrow: 'cat security.json',
    description: 'Detecting, investigating and responding to security events.',
    skills: [
      'SIEM',
      'SOAR',
      'Threat Intelligence',
      'Incident Response',
      'Security Automation',
      'Wazuh',
      'Microsoft Sentinel',
      'Splunk',
      'MISP',
    ],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure & Networking',
    eyebrow: 'cat network.json',
    description: 'The fundamentals underneath every cloud and security workload.',
    skills: [
      'TCP/IP',
      'Network Security',
      'Routing',
      'Firewalls',
      'VPNs',
      'DNS',
      'Active Directory',
      'Windows Server',
      'Linux',
    ],
  },
  {
    id: 'automation',
    label: 'Automation & DevOps',
    eyebrow: 'cat automation.json',
    description: 'Scripting and pipelines that make infrastructure repeatable.',
    skills: ['Python', 'Bash', 'Docker', 'Kubernetes', 'Git', 'CI/CD', 'Ansible', 'ARM / Bicep'],
  },
];
