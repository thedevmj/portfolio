
const {
    SUPPORTED,
    RULES,
    CATALOG,
    PACKAGE_MANAGERS,
} = require("../config/capabilities");

const JUNAID_CONTEXT = `
You are the AI Assistant & Architecture Copilot on Mohammad Junaid Mansoori's portfolio.

DEVELOPER PROFILE:
- Name: Mohammad Junaid Mansoori (also goes by "Junaid")
- Title: Full Stack Developer | MERN Specialist | React Native
- Location: India. Entering the professional field as a fresher with substantial hands-on, end-to-end project experience.
- Contact: junaidmansuri71@gmail.com | +91-9649354858 | GitHub: github.com/thedevmj
- Core strengths: problem solving, continuous learning, user-centric development,
  full-stack thinking, adaptability across technologies, genuine interest in emerging AI/LLM tooling.

TECH STACK:
- Frontend: React.js (Vite + Tailwind CSS), React Native (cross-platform mobile), Redux, Redux Saga
- Backend: Node.js & Express.js (REST API, JWT Authentication), Java + Spring Boot, Python, PHP
- Database: MongoDB (Indexing, Aggregation Pipelines), MySQL, PostgreSQL
- AI & Tools: LLM Integration (Claude API, OpenAI, Prompt Engineering, MCP Servers), TypeScript, Babel AST
- DevOps: Git/GitHub, Vercel Deployment, GitHub Actions CI/CD, System Design

PROJECTS (all real, from his portfolio — never invent others):
1. AI Resume Analyzer — Full stack MERN app where users upload resumes and receive
   AI-powered analysis, scoring, and improvement suggestions (Claude API, file upload
   & text extraction, real-time analysis, JWT auth, CI/CD).
2. Online Book Shopping Center — Full stack e-commerce: product catalog, cart &
   checkout managed with Redux + Redux Saga, secure JWT auth, optimized MongoDB
   indexing for fast checkout queries.
3. Scaffold Generator — Developer tool that auto-generates project boilerplates from
   selected frameworks and features to speed up setup.
4. MCP Code Project Analyzer — TypeScript/Node MCP server that analyzes code
   structure via Babel AST and renders dependency graphs and code-flow visualizations.
5. Wall-E — React Native Android live-wallpaper studio with native Kotlin modules:
   video, doodle, static and dynamic wallpaper modes, color customization, and
   home/lock screen apply.

RESPONSE RULES:
- RECRUITER QUESTIONS (about Junaid's skills, tech stack, experience, background,
  fit for a role, why he should be hired, how to contact him, or prompts phrased like
  "tell me about...", "what makes him...", "who is...", "can he build...", "is he right for..."):
  the "answer" field MUST be a DETAILED, ready-to-share professional response of at least
  6-10 sentences across multiple paragraphs. Reference specific projects (with stack and
  features), tie his skills + strengths to the specific role or stack being asked about,
  and end with contact details (junaidmansuri71@gmail.com, +91-9649354858,
  github.com/thedevmj). You may also set "projectName" to something like
  "Mohammad Junaid Mansoori — Full Stack Developer" and put his key talking points in "features".
  Do NOT invent experience, employers, metrics, or achievements not listed in this profile.
- PROJECT REQUESTS: keep "answer" a confident 2-4 sentence summary of the build.

FORMATTING RULES (apply to the "answer" field):
- Keep paragraphs short and separate them with a blank line; never paste one giant block of text.
- Use "- " bullet lists to break key points into readable chunks.
- Bold important keywords and technologies with **double asterisks** (e.g. **MERN**,
  **React Native**, **JWT Authentication**, **CI/CD**) so recruiters can scan them.
- Use short ALL-CAPS section headers (e.g. "WHAT HE BRINGS TO THE TEAM", "CONTACT")
  followed by a blank line.
- Always include the relevant tech keywords for the question (MERN, React Native,
  TypeScript, MongoDB, Node.js, Express, Redux, JWT, GitHub Actions, Vercel, etc.).

Allowed stack values:
- frontend: "react", "react_native", "html_tailwind", "none"
- backend: "node_express", "none"
- language: "javascript", "typescript"
- database: "mongodb", "postgresql", "mysql", "none"
- authentication: "jwt", "oauth", "none"

Given the user's prompt (which could be a project request, technical question, or recruiter inquiry), generate a structured blueprint in STRICT JSON format with this exact structure:
{
  "projectName": "Project Title",
  "projectType": "Full Stack Web App | Cross-Platform Mobile App | AI Platform",
  "difficulty": "Intermediate | Advanced | Production-Ready",
  "description": "2-3 sentences explaining what this project builds or how it solves the prompt",
  "targetUsers": "Developers, Recruiters, End Users, etc.",
  "stack": {
    "frontend": "react",
    "backend": "node_express",
    "language": "typescript",
    "database": "mongodb",
    "authentication": "jwt"
  },
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  "aiCapabilities": ["AI Capability 1", "AI Capability 2"],
  "learningGoals": ["Architecture Pattern", "Performance Optimization"],
  "rationale": {
    "stack": "Technical justification explaining why this MERN/React Native stack was chosen based on Junaid's expertise"
  },
  "answer": "Conversational response (length depends on the RESPONSE RULES above)"
}
Do NOT return markdown backticks or any conversational text outside the JSON object.
`;

// Helper: Safely parse JSON from LLM output (handles ```json fences if returned)
const cleanAndParseJson = (text) => {
    if (!text || typeof text !== "string") return null;
    let cleaned = text.trim();
    if (cleaned.startsWith("```")) {
        cleaned = cleaned.replace(/^```[a-zA-Z]*\n?/, "").replace(/\n?```$/, "").trim();
    }
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }
    return JSON.parse(cleaned);
};

// Fallback generator when API key is missing or external provider fails
const generateLocalBlueprint = (prompt) => {
    const p = prompt.toLowerCase();
    const isMobile = p.includes("mobile") || p.includes("app") || p.includes("native") || p.includes("android") || p.includes("ios");
    const isAi = p.includes("ai") || p.includes("llm") || p.includes("claude") || p.includes("gpt") || p.includes("model") || p.includes("resume");
    const isEcom = p.includes("shop") || p.includes("e-commerce") || p.includes("store") || p.includes("cart") || p.includes("order");

    const isRecruiter = /hire|hiring|recruit(er|ing)?|candidate|opening|job\b|good fit|fit for|fit a|role\b|tech stack|project experience|experience working|tell me about|who is|about junaid|about him|about his|recommend|resume|skills\b|strengths|background|why should|what makes|best fit|profile|how to contact|reaching him|work with junaid|work with him|contact\b|email\b|freelance|portfolio/.test(p);

    if (isRecruiter) {
        return {
            projectName: "Mohammad Junaid Mansoori — Full Stack Developer",
            projectType: "Candidate Profile / Recruiter Brief",
            difficulty: "Production-Ready",
            description: `Recruiter-focused profile of Mohammad Junaid Mansoori — a MERN specialist and React Native developer based in India who ships full-stack, AI-integrated, and cross-platform mobile applications end-to-end.`,
            targetUsers: "Recruiters, Hiring Managers, Engineering Teams",
            stack: {
                frontend: "react",
                backend: "node_express",
                language: "typescript",
                database: "mongodb",
                authentication: "jwt"
            },
            features: [
                "Full-stack MERN development (React, Node.js, Express, MongoDB)",
                "React Native mobile apps with native Android (Kotlin) modules",
                "AI/LLM integrations — Claude API, OpenAI, MCP servers, prompt engineering",
                "DevOps & delivery — GitHub Actions CI/CD, Vercel, system design"
            ],
            aiCapabilities: [
                "AI Resume Analyzer — Claude API resume scoring & improvement suggestions",
                "MCP Code Project Analyzer — Babel AST dependency graph visualization"
            ],
            learningGoals: [
                "Deepening production system design & scalability patterns",
                "Advanced React Native performance and native module work"
            ],
            rationale: {
                stack: "MERN + React Native is the exact stack Junaid ships today; his projects (AI Resume Analyzer, Online Book Shopping, MCP Code Project Analyzer, Wall-E) prove depth across web, mobile, AI, and tooling."
            },
            answer: `**Mohammad Junaid Mansoori** is a Full Stack Developer (**MERN** + **React Native**) based in India. He is entering the professional field as a fresher, backed by hands-on experience shipping complete applications end-to-end.

WHAT HE BRINGS TO THE TEAM

- **Full stack MERN** — React.js (Vite + Tailwind CSS), Node.js/Express REST APIs, MongoDB with indexed queries & aggregation pipelines, **JWT** authentication.
- **React Native mobile** — native Android modules (Kotlin); built **Wall-E**, a live-wallpaper studio with video, doodle, static & dynamic modes.
- **AI & LLM** — Claude API, OpenAI, prompt engineering, MCP servers; built **AI Resume Analyzer** and **MCP Code Project Analyzer**.
- **E-commerce & state** — **Online Book Shopping Center** built with Redux + Redux Saga (catalog, cart, checkout, secure auth).
- **DevOps & tools** — **Scaffold Generator**, GitHub Actions **CI/CD**, Vercel, TypeScript, system design.

WHY HE FITS

Problem solver, full-stack thinker, user-centric and adaptable, with genuine interest in emerging AI/LLM tooling. Java + Spring Boot, Python, and PHP add extra flexibility.

CONTACT

junaidmansuri71@gmail.com | +91-9649354858 | GitHub: github.com/thedevmj`
        };
    }

    let projectName = "Next-Gen MERN Platform";
    let projectType = "Full Stack Web App";
    let frontend = "react";
    let backend = "node_express";
    let language = "typescript";
    let database = "mongodb";
    let authentication = "jwt";
    let features = [
        "RESTful API with Node.js & Express",
        "Reactive UI with Tailwind CSS & Motion",
        "Secure JWT Authentication & Protected Routes",
        "MongoDB Aggregation Pipelines & Query Indexing"
    ];
    let aiCapabilities = [
        "Claude API Integration for Automated Intelligence",
        "Custom Prompt Engineering & MCP Server Connectors"
    ];
    let learningGoals = [
        "End-to-end type safety with TypeScript & MERN",
        "Production-ready CI/CD via GitHub Actions & Vercel"
    ];
    let answer = `This is right in Junaid's wheelhouse. He would deliver it end-to-end with:
- **React.js (Vite + Tailwind CSS)** for the UI
- **Node.js/Express** REST API
- **MongoDB** with indexed queries
- **JWT** authentication & protected routes
- **CI/CD** via GitHub Actions + Vercel

The same production patterns he uses in his shipped projects.`;

    if (isMobile) {
        projectName = "Cross-Platform React Native App";
        projectType = "Cross-Platform Mobile App";
        frontend = "react_native";
        features = [
            "Native Android Module Integration & GPU rendering",
            "Smooth 60fps animations with React Native Reanimated",
            "Offline-first caching & Redux state persistence",
            "Push notifications and device hardware APIs"
        ];
        learningGoals = [
            "Mobile memory optimization & frame-rate preservation",
            "Bridge between native Java/Kotlin and React Native"
        ];
        answer = `**React Native** is exactly where Junaid shines. He already shipped **Wall-E** — an Android live-wallpaper studio with native **Kotlin** modules (video, doodle, static & dynamic wallpapers).

This build would get the same:
- **60fps** animations & fluid UI with React Native Reanimated
- **Offline-first** caching and **Redux** state persistence
- Native **device APIs** & push notifications
- **Memory-optimized** native bridging for smooth performance`;
    } else if (isAi) {
        projectName = "AI-Driven Intelligent Document Analyzer";
        projectType = "AI & LLM Platform";
        features = [
            "File upload pipeline with multipart text extraction",
            "Claude API streaming analysis & structured JSON output",
            "MongoDB storage with fast indexed lookups",
            "Real-time progress updates via WebSockets"
        ];
        aiCapabilities = [
            "Claude LLM API with fine-tuned prompt system",
            "MCP Server for local tool execution and safe context sandboxing"
        ];
        learningGoals = [
            "Efficient token usage and structured prompt validation",
            "Streaming response UX with minimal latency"
        ];
        answer = `Junaid has shipped exactly this kind of AI product before:
- **AI Resume Analyzer** — Claude API, file upload & text extraction, real-time scoring and improvement suggestions.
- **MCP Code Project Analyzer** — Babel AST dependency graph visualization.

His approach:
- Strong **prompt engineering** with structured **JSON** output
- **Streaming response** UX with minimal latency
- **Efficient token** usage and prompt validation`;
    } else if (isEcom) {
        projectName = "Scalable E-Commerce Engine";
        projectType = "Full Stack E-Commerce";
        features = [
            "Product catalog with multi-facet filtering & search",
            "Redux & Redux Saga global cart & order management",
            "Secure checkout flow with JWT and token verification",
            "Optimized MongoDB indexing for fast checkout queries"
        ];
        learningGoals = [
            "Complex state management with Redux Saga generators",
            "Database transaction integrity during checkout"
        ];
        answer = `Junaid has built a full e-commerce platform before — the **Online Book Shopping Center**:
- **Redux + Redux Saga** for catalog, cart & checkout state
- **Secure JWT** authentication and order management
- Optimized **MongoDB** indexing for fast queries

He would replicate that proven architecture end-to-end for this store.`;
    }

    return {
        projectName,
        projectType,
        difficulty: "Production-Ready",
        description: `Architecture tailored to: "${prompt.slice(0, 120)}...". Designed using Mohammad Junaid Mansoori's verified production stack.`,
        targetUsers: "Recruiters, Engineering Teams, and End Users",
        stack: {
            frontend,
            backend,
            language,
            database,
            authentication
        },
        features,
        aiCapabilities,
        learningGoals,
        rationale: {
            stack: `Leverages Junaid's expertise in ${frontend === "react_native" ? "React Native and Native Modules" : "React.js, Node.js, and MongoDB"} to deliver maximum performance, fast TTFB, and strict type safety.`
        },
        answer
    };
};

// Main blueprint builder: checks process.env for any configured LLM key
const buildBlueprint = async (prompt) => {
    // Check whichever key the user has configured in process.env without exposing or logging it
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;
    const genericKey = process.env.AI_API || process.env.AI_API_KEY || process.env.API_KEY;
    const aiModel = process.env.AI_MODEL;
    const aiBaseUrl = process.env.AI_BASE_URL;

    const apiKey = geminiKey || openaiKey || anthropicKey || groqKey || genericKey;

    if (!apiKey) {
        // Graceful intelligent fallback if no API key is set
        return generateLocalBlueprint(prompt);
    }

    try {
        let rawContent = null;

        // 0. Custom OpenAI-compatible endpoint (configured via AI_API + AI_BASE_URL + AI_MODEL)
        if (genericKey && aiBaseUrl) {
            const url = `${aiBaseUrl.replace(/\/+$/, "")}/chat/completions`;
            const candidates = [aiModel || "gemini-3.5-flash", "gemini-3.6-flash", "gemini-3.1-flash-lite", "gemini-3.8-flash"]
                .filter(Boolean)
                .filter((m, i, arr) => arr.indexOf(m) === i);

            for (const model of candidates) {
                if (rawContent) break;
                for (let attempt = 0; attempt < 3; attempt++) {
                    const res = await fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${genericKey}`
                        },
                        body: JSON.stringify({
                            model,
                            messages: [
                                { role: "system", content: JUNAID_CONTEXT },
                                { role: "user", content: prompt }
                            ],
                            temperature: 0.3,
                            response_format: { type: "json_object" }
                        })
                    });

                    if (res.ok) {
                        const data = await res.json();
                        rawContent = data?.choices?.[0]?.message?.content || null;
                        if (rawContent) break;
                    } else {
                        const body = (await res.text()).slice(0, 120);
                        console.warn(`[ai] Custom endpoint response status for model "${model}" (attempt ${attempt + 1}):`, res.status, body);
                        const retryable = res.status === 429 || res.status === 503;
                        if (!retryable || attempt === 2) break;
                        await new Promise((r2) => setTimeout(r2, (attempt + 1) * 1500));
                    }
                }
            }
        }
        // 1. Google Gemini API
        else if (geminiKey || (genericKey && genericKey.startsWith("AIza"))) {
            const key = geminiKey || genericKey;
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: `${JUNAID_CONTEXT}\n\nUSER PROMPT: ${prompt}` }]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.3,
                        responseMimeType: "application/json"
                    }
                })
            });

            if (res.ok) {
                const data = await res.json();
                rawContent = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            } else {
                console.warn("[ai] Gemini response status:", res.status);
            }
        }
        // 2. OpenAI API
        else if (openaiKey || (genericKey && genericKey.startsWith("sk-") && !genericKey.startsWith("sk-ant-"))) {
            const key = openaiKey || genericKey;
            const res = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${key}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        { role: "system", content: JUNAID_CONTEXT },
                        { role: "user", content: prompt }
                    ],
                    temperature: 0.3,
                    response_format: { type: "json_object" }
                })
            });

            if (res.ok) {
                const data = await res.json();
                rawContent = data?.choices?.[0]?.message?.content;
            } else {
                console.warn("[ai] OpenAI response status:", res.status);
            }
        }
        // 3. Anthropic Claude API
        else if (anthropicKey || (genericKey && genericKey.startsWith("sk-ant-"))) {
            const key = anthropicKey || genericKey;
            const res = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": key,
                    "anthropic-version": "2023-06-01"
                },
                body: JSON.stringify({
                    model: "claude-3-5-haiku-20241022",
                    max_tokens: 1500,
                    system: JUNAID_CONTEXT,
                    messages: [{ role: "user", content: prompt }]
                })
            });

            if (res.ok) {
                const data = await res.json();
                rawContent = data?.content?.[0]?.text;
            } else {
                console.warn("[ai] Anthropic response status:", res.status);
            }
        }
        // 4. Groq API
        else if (groqKey || (genericKey && genericKey.startsWith("gsk_"))) {
            const key = groqKey || genericKey;
            const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${key}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        { role: "system", content: JUNAID_CONTEXT },
                        { role: "user", content: prompt }
                    ],
                    temperature: 0.3,
                    response_format: { type: "json_object" }
                })
            });

            if (res.ok) {
                const data = await res.json();
                rawContent = data?.choices?.[0]?.message?.content;
            } else {
                console.warn("[ai] Groq response status:", res.status);
            }
        }

        if (rawContent) {
            const parsed = cleanAndParseJson(rawContent);
            if (parsed && parsed.projectName && parsed.stack) {
                return parsed;
            }
        }

        // If LLM call didn't yield clean JSON, use local fallback
        return generateLocalBlueprint(prompt);
    } catch (error) {
        console.error("[ai] LLM call error, using fallback blueprint:", error.message);
        return generateLocalBlueprint(prompt);
    }
};

const createBlueprint = async (req, res) => {
    const { prompt } = req.body || {};

    if (typeof prompt !== "string" || !prompt.trim()) {
        return res
            .status(400)
            .json({ success: false, message: "prompt (a non-empty string) is required" });
    }

    if (prompt.trim().length > 2000) {
        return res
            .status(400)
            .json({ success: false, message: "prompt is too long (max 2000 chars)" });
    }

    try {
        const result = await buildBlueprint(prompt.trim());
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        console.error("[ai] blueprint failed:", err.message);
        return res.status(502).json({
            success: false,
            message: err.message || "Failed to generate a blueprint",
        });
    }
};

// Serves the generator's capability catalog so the UI renders from the same
// source of truth as the AI prompt and the config validator.
const getCapabilities = (req, res) => {
    const option = (group, value) => ({
        value,
        label: CATALOG[group][value]?.label || value,
    });

    const groups = ["frontend", "backend", "language", "database", "authentication"];
    const base = {};
    for (const group of groups) {
        base[group] = SUPPORTED[group].map((value) => option(group, value));
    }

    base.packageManager = SUPPORTED.packageManager.map((value) => ({
        value,
        label: PACKAGE_MANAGERS[value]?.label || value,
    }));

    const features = SUPPORTED.features.map((value) => {
        const feature = CATALOG.features[value] || {};
        return {
            value,
            label: feature.label || value,
            hint: feature.hint || "",
            requires: feature.requires || [],
        };
    });

    return res.status(200).json({
        success: true,
        data: { ...base, features, rules: RULES },
    });
};

module.exports = { createBlueprint, getCapabilities };