// Generates a branded gradient "card" image (SVG data URL) for each skill so
// the circular gallery reads as a premium developer-skills showcase instead of
// random stock photos. The text label is baked into the image so it stays crisp
// at any GPU texture size.

const dark = {
  back: '#0a1020',
  text: '#e5ecff'
};

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
}

// A gentle two-stop gradient fit to the blue/cyan/violet brand palette.
function gradientId() {
  return Math.random().toString(36).slice(2, 9);
}

export function skillGradientImage(label, from, to) {
  const id = gradientId();
  // Color pairs get passed in as Tailwind-ish hex without '#' sometimes;
  // normalise to '#'.
  const c0 = from.startsWith('#') ? from : `#${from}`;
  const c1 = to.startsWith('#') ? to : `#${to}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c0}"/>
        <stop offset="100%" stop-color="${c1}"/>
      </linearGradient>
      <radialGradient id="${id}g" cx="50%" cy="35%" r="70%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.35)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
      </radialGradient>
    </defs>
    <rect width="800" height="600" fill="url(#${id})"/>
    <rect width="800" height="600" fill="url(#${id}g)"/>
    <g stroke="rgba(255,255,255,0.18)" stroke-width="1">
      <line x1="0" y1="150" x2="800" y2="150"/>
      <line x1="0" y1="300" x2="800" y2="300"/>
      <line x1="0" y1="450" x2="800" y2="450"/>
      <line x1="200" y1="0" x2="200" y2="600"/>
      <line x1="400" y1="0" x2="400" y2="600"/>
      <line x1="600" y1="0" x2="600" y2="600"/>
    </g>
    <text x="400" y="305" font-family="'Segoe UI', Roboto, Arial, sans-serif" font-size="56" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${escapeXml(label)}</text>
    <text x="400" y="520" font-family="'Consolas','Courier New',monospace" font-size="22" fill="rgba(255,255,255,0.7)" text-anchor="middle">SKILL</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Skill -> [label, brand gradient pair]
export const skillsForGallery = [
  ['React.js', '2563eb', '06b6d4'],
  ['Node.js', '16a34a', '4ade80'],
  ['Express.js', '475569', '94a3b8'],
  ['MongoDB', '15803d', '22c55e'],
  ['PostgreSQL', '155e75', '22d3ee'],
  ['Neo4j', '0f766e', '2dd4bf'],
  ['SQL', '1e3a8a', '3b82f6'],
  ['MERN Stack', '1d4ed8', '7c6cf6'],
  ['JavaScript', 'd97706', 'fbbf24'],
  ['TypeScript', '1d4ed8', '60a5fa'],
  ['Redux', '7c3aed', 'a78bfa'],
  ['Redux Saga', '7c3aed', 'c084fc'],
  ['REST APIs', '0f766e', '2dd4bf'],
  ['Java', 'b91c1c', 'f87171'],
  ['Spring Boot', '166534', '4ade80'],
  ['Python', '1e40af', '3b82f6'],
  ['PHP', '6d28d9', 'a78bfa'],
  ['React Native', '0e7490', '22d3ee'],
  ['AI Integration', '6d28d9', '818cf8'],
  ['LLM Apps', '5808a0', 'c084fc'],
  ['MCP Servers', '0f172a', '64748b'],
  ['MCP SDK', '0f172a', '475569'],
  ['Babel AST', 'b45309', 'f59e0b'],
  ['UI/UX', 'be185d', 'f472b6'],
  ['Graph Viz', '065f46', '34d399'],
  ['Microservices', '1e3a8a', '60a5fa'],
  ['JWT / Auth', '7e22ce', 'c084fc']
];

// Build the props array the CircularGallery consumes.
export function buildSkillItems() {
  return skillsForGallery.map(([label, from, to]) => ({
    image: skillGradientImage(label, from, to),
    text: label
  }));
}

export { dark };
