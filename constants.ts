import { ExperienceItem, SocialLink, NavItem, ProjectItem, TechItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Expertise', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/jamshedahmed19', iconClass: 'ri-linkedin-fill', label: 'LinkedIn' },
  { platform: 'Email', url: 'mailto:jamsheda4ahmed786@gmail.com', iconClass: 'ri-mail-line', label: 'Email' },
  { platform: 'Github', url: '#', iconClass: 'ri-github-fill', label: 'Github' },
  { platform: 'Phone', url: 'tel:+92318901744', iconClass: 'ri-phone-line', label: '+92 318 901744' },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Web App Developer',
    company: 'eSpark Consultants',
    location: 'Karachi, PK',
    period: 'May 2022 – Present',
    description: [
      'Overhauled the UI for a legacy project built with Nuxt.js and Vue 2, implementing a modern, user-friendly interface and introducing new features.',
      'Collaborated with the team to integrate OAuth-based authentication for GitHub, GitLab, Bitbucket, and Google, along with 2FA.',
      'Designed and developed complex multistep forms with advanced state management solutions to simplify workflows.',
      'Contributed to the integration of the GitHub API, allowing users to pull code directly from repositories and deploy to custom hosting.',
      'Built interactive data visualization using Highcharts, creating dynamic dashboards with real-time insights.',
      'Developed two new dashboards for additional services using Vue 3 and TypeScript, incorporating i18n and React Query.',
      'Contributed to several other projects using Next.js and React.js, leveraging headless CMS platforms like Sanity.'
    ],
    skills: ['Vue 3', 'Nuxt.js', 'TypeScript', 'Highcharts', 'OAuth', 'React Query']
  },
  {
    id: 'exp-2',
    role: 'Frontend Developer',
    company: 'The Magnit',
    location: 'Karachi, PK',
    period: 'April 2021 – April 2022',
    description: [
      'Engineered a fully responsive marketing site and its custom-built CMS using React and TypeScript.',
      'Architected a buy-and-sell platform for used cars with React, TypeScript, and GraphQL, integrating OAuth-based authentication.',
      'Implemented dynamic multistep form wizards with conditional rendering to streamline complex user onboarding.',
      'Developed advanced search and filtering mechanisms for the listing page.',
      'Effectively Designed and deployed a scalable admin panel with role-based access control (RBAC).',
      'Reduced the platform\'s JavaScript bundle size from 10 MB to under 300kb by implementing code-splitting and tree-shaking.',
      'Utilized a state management library to handle application state efficiently, ensuring data consistency.'
    ],
    skills: ['React', 'GraphQL', 'Performance Optimization', 'RBAC', 'TypeScript']
  }
];

export const PROJECT_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'AutoMarket Platform',
    category: 'E-Commerce / Platform',
    year: '2022',
    description: 'A comprehensive buy-and-sell platform for used cars featuring advanced search filtering, secure OAuth login, and a highly optimized React architecture reducing bundle size by 97%.',
    tags: ['React', 'GraphQL', 'OAuth', 'Performance']
  },
  {
    id: 'proj-2',
    title: 'Enterprise Analytics Dashboard',
    category: 'Data Visualization',
    year: '2023',
    description: 'Real-time business intelligence dashboard visualizing complex metrics using Highcharts. Built with Vue 3 and TypeScript, featuring internationalization and client-side caching.',
    tags: ['Vue 3', 'Highcharts', 'TypeScript', 'i18n']
  },
  {
    id: 'proj-3',
    title: 'Custom CMS & Marketing Suite',
    category: 'Content Management',
    year: '2021',
    description: 'A fully responsive marketing site paired with a custom-built Headless CMS, enabling dynamic content management for text and media without developer intervention.',
    tags: ['React', 'TypeScript', 'CMS Architecture']
  },
  {
    id: 'proj-4',
    title: 'Developer Deployment Tool',
    category: 'DevOps / Tooling',
    year: '2023',
    description: 'Integrated GitHub API to allow users to pull code directly from repositories and deploy to custom hosting services, streamlining the CI/CD pipeline.',
    tags: ['Nuxt.js', 'GitHub API', 'Automation']
  }
];

export const EDUCATION = {
  degree: 'Bachelor of Science — Computer Science',
  school: 'Karachi Institute of Economics and Technology'
};

export const TECH_ITEMS: TechItem[] = [
  {
    name: "React",
    icon: "Atom",
    color: "#61DAFB"
  },
  {
    name: "Next.js",
    icon: "Zap",
    color: "#FFFFFF"
  },
  {
    name: "Vue.js",
    icon: "Layout",
    color: "#4FC08D"
  },
  {
    name: "Nuxt",
    icon: "Mountain",
    color: "#00C58E"
  },
  {
    name: "TypeScript",
    icon: "FileCode",
    color: "#3178C6"
  },
  {
    name: "JavaScript",
    icon: "Code",
    color: "#F7DF1E"
  },
  {
    name: "Tailwind",
    icon: "Wind",
    color: "#06B6D4"
  },
  {
    name: "Highcharts",
    icon: "BarChart3",
    color: "#8085E9"
  },
  {
    name: "GraphQL",
    icon: "Network",
    color: "#E10098"
  },
  {
    name: "Firebase",
    icon: "Flame",
    color: "#FFCA28"
  }
];