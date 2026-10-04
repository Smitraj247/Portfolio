export type Skill = {
  name: string;
  category: string;
  level: string;
  icon: string;
  color: string;
  desc: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  summary: string;
  imageBg: string;
  tech: string[];
  highlight: string;
  demoUrl: string;
  githubUrl: string;
  caseStudy: {
    problem: string;
    architecture: string;
    metrics: string[];
    lessons: string;
  };
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  meta: string;
  color: string;
  bullets: string[];
  tech: string[];
};

export type Portfolio = {
  profile: {
    name: string;
    monogram: string;
    title: string;
    status: string;
    headlineLead: string;
    headlineAccent: string;
    headlineTail: string;
    summary: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    typingTitles: string[];
    metrics: { value: string; label: string; color: string }[];
    coreStack: string[];
  };
  about: {
    heading: string;
    body: string;
    education: { title: string; place: string; period: string }[];
    certifications: string[];
  };
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  snippets: { key: string; file: string; label: string }[];
  resumeFileName: string;
};
