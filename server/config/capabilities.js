// AI Blueprint Generator Capabilities Configuration
// Tuned to Mohammad Junaid Mansoori's specialized tech stack:
// MERN Stack (React, Node.js, Express, MongoDB), React Native, TypeScript,
// LLM Integration (Claude/OpenAI, MCP), and DevOps (CI/CD, Vercel).

// ------------------------------------------------------------
// 1. Catalog – definitions & human-readable labels
// ------------------------------------------------------------
const CATALOG = {
    frontend: {
        none: { label: "None (API / Headless)" },
        react: { label: "React.js (Vite + Tailwind CSS)" },
        react_native: { label: "React Native (Cross-Platform Mobile)" },
        html_tailwind: { label: "HTML5 / Tailwind CSS (Responsive Web)" }
    },
    backend: {
        none: { label: "No Backend (Client-only)" },
        node_express: { label: "Node.js & Express.js (REST API)" }
    },
    language: {
        javascript: { label: "JavaScript (ES6+)" },
        typescript: { label: "TypeScript" }
    },
    database: {
        none: { label: "No Database" },
        mongodb: { label: "MongoDB (Mongoose, Indexing, Aggregations)" },
        postgresql: { label: "PostgreSQL" },
        mysql: { label: "MySQL" }
    },
    authentication: {
        none: { label: "No Authentication" },
        jwt: { label: "JWT Auth (Stateless Tokens & Security)" },
        oauth: { label: "OAuth 2.0 (Google / GitHub)" }
    },
    features: {
        ai_integration: {
            label: "AI & LLM Integration",
            hint: "Claude API / OpenAI, Prompt Engineering & MCP Servers",
            requires: ["backend"]
        },
        file_extraction: {
            label: "File Upload & Text Extraction",
            hint: "Resume analysis pipeline & document parsing",
            requires: ["backend"]
        },
        ecommerce: {
            label: "E-Commerce & State Management",
            hint: "Product catalog, cart, Redux & Redux Saga workflows",
            requires: ["backend", "database"]
        },
        realtime: {
            label: "Real-time & WebSockets",
            hint: "Live analysis display, real-time messaging & drawing engine",
            requires: ["backend"]
        },
        db_optimization: {
            label: "Database Optimization",
            hint: "Schema indexing & high-performance aggregation pipelines",
            requires: ["database"]
        },
        cicd: {
            label: "CI/CD & Deployment",
            hint: "GitHub Actions workflows & Vercel deployment pipeline",
            requires: []
        }
        , redis: {
            label: "Redis & docker",
            hint: "caching with redis and deployment with docker",
            requires: ["backend"]
        },
        responsive_design: {
            label: "Responsive Design",
            hint: "Mobile-first responsive styling with Tailwind CSS",
            requires: []
        }
    }
};

// ------------------------------------------------------------
// 2. Supported option groups (Must strictly match CATALOG keys)
// ------------------------------------------------------------
const SUPPORTED = {
    frontend: ["none", "react", "react_native", "html_tailwind"],
    backend: ["none", "node_express"],
    language: ["javascript", "typescript"],
    database: ["none", "mongodb", "postgresql", "mysql"],
    authentication: ["none", "jwt", "oauth"],
    packageManager: ["npm", "yarn", "pnpm"],
    features: [
        "ai_integration",
        "file_extraction",
        "ecommerce",
        "realtime",
        "db_optimization",
        "cicd",
        "responsive_design"
    ]
};

// ------------------------------------------------------------
// 3. Package manager definitions
// ------------------------------------------------------------
const PACKAGE_MANAGERS = {
    npm: { label: "npm" },
    yarn: { label: "Yarn" },
    pnpm: { label: "pnpm" }
};

// ------------------------------------------------------------
// 4. Validation rules – ensures compatible stack combinations
// ------------------------------------------------------------
const RULES = [
    // Database requires a backend
    (req) => {
        if (req.database && req.database !== "none" && (!req.backend || req.backend === "none")) {
            return "A database can only be selected when a backend is chosen.";
        }
        return null;
    },
    // Authentication requires a backend
    (req) => {
        if (req.authentication && req.authentication !== "none" && (!req.backend || req.backend === "none")) {
            return "Authentication requires a backend service.";
        }
        return null;
    },
    // Frontend frameworks require JavaScript or TypeScript
    (req) => {
        const { frontend, language } = req;
        if (frontend && frontend !== "none" && !["javascript", "typescript"].includes(language)) {
            return "Frontend frameworks require JavaScript or TypeScript.";
        }
        return null;
    },
    // Feature dependency checks
    (req) => {
        if (Array.isArray(req.features)) {
            for (const featKey of req.features) {
                const feat = CATALOG.features[featKey];
                if (feat && feat.requires) {
                    for (const reqKey of feat.requires) {
                        if (!req[reqKey] || req[reqKey] === "none") {
                            return `Feature "${feat.label}" requires a valid ${reqKey}.`;
                        }
                    }
                }
            }
        }
        return null;
    }
];

module.exports = { SUPPORTED, RULES, CATALOG, PACKAGE_MANAGERS };