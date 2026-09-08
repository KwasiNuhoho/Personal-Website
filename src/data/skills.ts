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
 *
 * Removed from the original template because they aren't on the CV or in any
 * project here: Wazuh, Splunk, Ansible. Add them back if that's wrong.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'cloud',
    label: 'Cloud',
    eyebrow: 'cat cloud.json',
    description: 'Deploying and operating infrastructure on Microsoft Azure.',
    skills: [
      'Microsoft Azure',
      'Microsoft Entra ID',
      'Azure Policy',
      'Azure RBAC',
      'Azure Virtual Networks',
      'Azure Virtual Machines',
      'Azure Storage',
      'Azure Monitor',
      'Bicep / ARM',
      'Microsoft 365',
    ],
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    eyebrow: 'cat security.json',
    description: 'Detecting, investigating and responding to security events.',
    skills: [
      'Microsoft Sentinel',
      'Log Analytics / KQL',
      'Incident Response',
      'Threat Intelligence',
      'MISP',
      'CACAO Playbooks',
      'Vulnerability Assessment',
      'Nmap / Nessus / Metasploit',
      'Wireshark',
    ],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure & Networking',
    eyebrow: 'cat network.json',
    description: 'The fundamentals underneath every cloud and security workload.',
    skills: [
      'TCP/IP',
      'Routing & Switching',
      'DNS',
      'Network Security Groups',
      'Firewalls',
      'VPNs',
      'Windows Server',
      'Active Directory',
      'Linux',
    ],
  },
  {
    id: 'automation',
    label: 'Automation & DevOps',
    eyebrow: 'cat automation.json',
    description: 'Scripting and pipelines that make infrastructure repeatable.',
    skills: ['PowerShell', 'Bash', 'Python', 'SQL', 'Docker', 'Kubernetes', 'Git', 'CI/CD'],
  },
];
