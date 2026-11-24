// Central searchable index of the portfolio content.
// Each entry maps to a section + optional href so the search modal can
// navigate and highlight the relevant content.

export const searchIndex = [
  { section: 'home', label: 'Hero — Full Stack & Mobile Developer', keywords: ['junaid', 'mansoori', 'full stack', 'full-stack', 'developer', 'websites', 'web applications', 'android', 'ios', 'mobile apps', 'frontend', 'backend', 'mern', 'react', 'node.js', 'rest apis', 'mongodb', 'ai'] },
  { section: 'about', label: 'About Me', keywords: ['about', 'bio', 'profile', 'full stack', 'problem solving', 'continuous learning', 'ai', 'llm'] },
  {
    section: 'skills',
    label: 'Skills & Technologies',
    keywords: ['skills', 'frontend', 'backend', 'react', 'next.js', 'nextjs', 'javascript', 'typescript', 'redux', 'redux saga', 'responsive ui', 'ui ux', 'node', 'express', 'java', 'spring boot', 'php', 'rest api', 'jwt', 'bcrypt', 'microservices', 'python', 'mongodb', 'postgresql', 'mysql', 'supabase', 'neo4j', 'sql', 'database', 'relational databases', 'relational database', 'relational schema design', 'joins', 'queries', 'react native', 'android', 'ios', 'mobile apps', 'websites', 'ai', 'llm', 'prompt engineering', 'mcp', 'mcp sdk', 'babel ast', 'developer tools', 'automation', 'scaffold', 'code analysis', 'graph visualization', 'debouncing', 'throttling', 'rate limiting', 'memoization', 'optimization', 'code splitting', 'lazy loading', 'virtualization', 'redis', 'docker', 'ci/cd']
  },
  { section: 'experience', label: 'Experience — 1+ year at Brainmatrix Solutions', keywords: ['experience', '1+ year', 'professional', 'brainmatrix solutions', 'arvana mall', 'udaipur', 'full stack developer', 'projects', 'mern', 'react native', 'ai', 'java', 'spring boot', 'python', 'php'] },
  {
    section: 'services',
    label: 'Services',
    keywords: ['services', 'web development', 'websites', 'full stack applications', 'android', 'ios', 'mobile apps', 'react native', 'ui ux', 'ai integration', 'llm', 'api', 'backend', 'developer tools', 'mcp', 'automation']
  },
  {
    section: 'projects',
    label: 'Projects',
    keywords: ['projects', 'ai resume analyzer', 'resume', 'online book shopping', 'book', 'e-commerce', 'scaffold generator', 'scaffold', 'mcp code project analyzer', 'mcp', 'code analyzer', 'babel ast', 'graph visualization', 'typescript', 'redux saga', 'wall-e', 'wallpaper', 'react native app', 'android', 'kotlin', 'live wallpaper', 'hk spices', 'hkspices.in', 'spices', 'b2b', 'bellarro', 'bellarro.com', 'fashion', 'leather', 'handbags', 'live projects', 'client websites']
  },
  {
    section: 'faq',
    label: 'FAQ — stack, experience, projects & availability',
    keywords: ['faq', 'questions', 'experience', 'brainmatrix solutions', '1+ year', 'udaipur', 'degrees', 'education', 'projects', 'freelance', 'remote', 'availability', 'contact', 'stack', 'android', 'ios']
  },
  {
    section: 'ai',
    label: 'AI Copilot — ask about skills and projects',
    keywords: ['ai', 'copilot', 'chatbot', 'ask', 'architecture', 'blueprint', 'recruiter', 'hire', 'consultant', 'idea', 'architect']
  },
  { section: 'education', label: 'Education', keywords: ['education', 'bsc', 'bachelor of science', 'computer science', 'mohanlal sukhadia university', 'mca', 'master of computer applications', 'aravali institute'] },
  { section: 'contact', label: 'Contact', keywords: ['contact', 'email', 'junaidmansuri71', 'gmail', 'phone', '9649354858', 'whatsapp', 'github', 'thedevmj', 'hire', 'freelance', 'internship'] }
]

// Skill detail index for fine-grained results
export const skillDetails = [
  'React.js', 'Next.js', 'JavaScript', 'TypeScript', 'Redux', 'Redux Saga', 'Responsive UI', 'UI/UX Development',
  'Node.js', 'Express.js', 'Java', 'Spring Boot', 'PHP', 'REST APIs', 'JWT Authentication', 'bcrypt', 'Microservices Architecture',
  'Python', 'MySQL', 'PostgreSQL', 'Supabase', 'SQL', 'Relational Databases', 'Relational Schema Design', 'Joins & Queries', 'MongoDB', 'Neo4j', 'React Native', 'Android', 'iOS', 'Websites', 'Full-Stack Applications', 'AI Integration', 'LLM Applications', 'Prompt Engineering', 'AI Tools',
  'MCP Servers', 'MCP SDK', 'Babel AST', 'Project Automation', 'Scaffold Generators', 'Code Analysis', 'Redis', 'Docker', 'CI/CD',
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
    keywords: ['wall-e', 'wallpaper', 'react native', 'android', 'kotlin', 'live wallpaper', 'dynamic', 'mobile', 'mobile apps'],
    section: 'projects'
  },
  {
    title: 'HK SPICES',
    keywords: ['hk spices', 'hkspices.in', 'spices', 'e-commerce', 'storefront', 'cart', 'checkout', 'b2b', 'enquiry', 'otp login', 'udaipur', 'live', 'react', 'django', 'docker', 'redis'],
    section: 'projects'
  },
  {
    title: 'Bellarro',
    keywords: ['bellarro', 'bellarro.com', 'fashion', 'lifestyle', 'leather', 'handbags', 'travel bags', 'messenger bags', 'e-commerce', 'storefront', 'live', 'react', 'django', 'docker', 'redis'],
    section: 'projects'
  }
]

export const serviceDetails = [
  'Websites & Full-Stack Apps', 'Android + iOS Apps', 'UI/UX Development',
  'AI Integration', 'API & Backend Development', 'AI & Developer Tools'
]
