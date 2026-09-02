// Central searchable index of the portfolio content.
// Each entry maps to a section + optional href so the search modal can
// navigate and highlight the relevant content.

export const searchIndex = [
  { section: 'home', label: 'Hero — Full Stack Developer', keywords: ['junaid', 'mansoori', 'full stack', 'developer', 'mern', 'react', 'ai', 'react native', 'ui/ux'] },
  { section: 'about', label: 'About Me', keywords: ['about', 'bio', 'profile', 'full stack', 'problem solving', 'continuous learning', 'ai', 'llm'] },
  {
    section: 'skills',
    label: 'Skills & Technologies',
    keywords: ['skills', 'frontend', 'backend', 'react', 'javascript', 'typescript', 'redux', 'redux saga', 'responsive ui', 'ui ux', 'node', 'express', 'java', 'spring boot', 'php', 'rest api', 'jwt', 'bcrypt', 'microservices', 'python', 'mongodb', 'postgresql', 'neo4j', 'sql', 'database', 'react native', 'ai', 'llm', 'prompt engineering', 'mcp', 'mcp sdk', 'babel ast', 'developer tools', 'automation', 'scaffold', 'code analysis', 'graph visualization', 'debouncing', 'throttling', 'rate limiting', 'memoization', 'optimization', 'code splitting', 'lazy loading', 'virtualization']
  },
  { section: 'experience', label: 'Experience — Fresher', keywords: ['experience', 'fresher', 'entry level', 'projects', 'mern', 'react native', 'ai', 'java', 'spring boot', 'python', 'php'] },
  {
    section: 'services',
    label: 'Services',
    keywords: ['services', 'web development', 'mobile app', 'react native', 'ui ux', 'ai integration', 'llm', 'api', 'backend', 'developer tools', 'mcp', 'automation']
  },
  {
    section: 'projects',
    label: 'Projects',
    keywords: ['projects', 'ai resume analyzer', 'resume', 'online book shopping', 'book', 'e-commerce', 'scaffold generator', 'scaffold', 'mcp code project analyzer', 'mcp', 'code analyzer', 'babel ast', 'graph visualization', 'typescript', 'redux saga', 'wall-e', 'wallpaper', 'react native app', 'android', 'kotlin', 'live wallpaper']
  },
  { section: 'education', label: 'Education', keywords: ['education', 'bsc', 'bachelor of science', 'computer science', 'mohanlal sukhadia university', 'mca', 'master of computer applications', 'aravali institute'] },
  { section: 'contact', label: 'Contact', keywords: ['contact', 'email', 'junaidmansuri71', 'gmail', 'phone', '9649354858', 'whatsapp', 'github', 'thedevmj', 'hire', 'freelance', 'internship'] }
]

// Skill detail index for fine-grained results
export const skillDetails = [
  'React.js', 'JavaScript', 'TypeScript', 'Redux', 'Redux Saga', 'Responsive UI', 'UI/UX Development',
  'Node.js', 'Express.js', 'Java', 'Spring Boot', 'PHP', 'REST APIs', 'JWT Authentication', 'bcrypt', 'Microservices Architecture',
  'Python', 'MongoDB', 'PostgreSQL', 'Neo4j', 'SQL', 'React Native', 'AI Integration', 'LLM Applications', 'Prompt Engineering', 'AI Tools',
  'MCP Servers', 'MCP SDK', 'Babel AST', 'Project Automation', 'Scaffold Generators', 'Code Analysis',
  'Dependency Analysis', 'Graph Visualization', 'Database development',
  'Debouncing', 'Throttling', 'Rate Limiting', 'Memoization', 'Code Splitting', 'Lazy Loading', 'Virtualization', 'React Optimization'
]

export const projectDetails = [
  {
    title: 'AI Resume Analyzer',
    keywords: ['ai', 'resume', 'analyzer', 'full stack', 'react', 'node', 'express', 'mongodb', 'jwt', 'bcrypt', 'scoring', 'job seeker'],
    section: 'projects'
  },
  {
    title: 'Online Book Shopping Center',
    keywords: ['book', 'e-commerce', 'shopping', 'cart', 'order', 'redux', 'redux saga', 'authentication', 'catalog'],
    section: 'projects'
  },
  {
    title: 'Scaffold Generator',
    keywords: ['scaffold', 'generator', 'boilerplate', 'automation', 'javascript', 'developer tool'],
    section: 'projects'
  },
  {
    title: 'MCP Code Project Analyzer',
    keywords: ['mcp', 'code', 'analyzer', 'babel', 'ast', 'graph', 'visualization', 'typescript', 'dependency'],
    section: 'projects'
  },
  {
    title: 'Wall-E',
    keywords: ['wall-e', 'wallpaper', 'react native', 'android', 'kotlin', 'live wallpaper', 'dynamic', 'mobile'],
    section: 'projects'
  }
]

export const serviceDetails = [
  'Web Development', 'Mobile App Development', 'UI/UX Development',
  'AI Integration', 'API & Backend Development', 'AI & Developer Tools'
]
