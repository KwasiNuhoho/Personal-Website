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
    '[PROFESSIONAL SUMMARY — 2-3 sentences describing your background and the entry-level Cloud/Cybersecurity role you are targeting.]',

  education: [
    {
      institution: '[SCHOOL / UNIVERSITY NAME]',
      credential: '[DEGREE / PROGRAM]',
      period: '[START YEAR] – [END YEAR]',
      details: ['[RELEVANT COURSEWORK OR HONORS]'],
    },
  ] as EducationEntry[],

  experience: [
    {
      role: '[JOB TITLE]',
      organization: '[COMPANY / ORGANIZATION NAME]',
      period: '[START DATE] – [END DATE]',
      location: '[CITY, COUNTRY / REMOTE]',
      highlights: [
        '[RESPONSIBILITY OR ACCOMPLISHMENT]',
        '[RESPONSIBILITY OR ACCOMPLISHMENT]',
      ],
    },
  ] as ExperienceEntry[],

  certifications: [
    { name: 'AZ-104: Microsoft Azure Administrator', issuer: 'Microsoft', status: 'In Progress' },
    { name: '[CERTIFICATION NAME]', issuer: '[ISSUER]', status: 'Planned' },
  ] as CertificationEntry[],

  training: [
    '[RELEVANT TRAINING, BOOTCAMP, OR ONLINE COURSE]',
    '[RELEVANT TRAINING, BOOTCAMP, OR ONLINE COURSE]',
  ],
};
