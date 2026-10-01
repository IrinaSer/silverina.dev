// An empty string means "not available yet": the corresponding UI is omitted.
export const site = {
  name: 'Silverina',
  email: 'hello@silverina.dev',

  stack: ['TypeScript', 'Angular', 'React'],

  links: {
    github: 'https://github.com/IrinaSer',
    linkedin: 'https://www.linkedin.com/in/irina-pukhkaia/',
    cv: '',
  },

  projects: [
    {
      name: 'Hushfeed',
      description: 'A quieter way to browse the web.',
      type: 'Chrome Extension',
      technologies: ['Manifest V3'],
      status: 'In development',
      url: '',
    },
  ],

  experiments: [
    {
      name: 'Meal AI',
      description: 'An AI nutrition agent that runs in Claude Code: photo meal logging, weekly digests, no server.',
      technologies: ['Claude Code', 'Python', 'Shell'],
      url: 'https://github.com/IrinaSer/Meal-AI-template',
    },
    {
      name: 'Notebook',
      description: 'A browser-native Jupyter-style notebook for JS/TS, built during training at coders.su.',
      technologies: ['TypeScript', 'FastAPI', 'Postgres', 'Docker'],
      url: 'https://github.com/larchanka-training/dmc-1-t2-notebook-mono',
    },
  ],
};
