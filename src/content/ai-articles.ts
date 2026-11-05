import type { Topic } from "./topics";

/**
 * AI hub articles, by section. Plain-language explainers for Indian readers.
 * Tool names, prices and free tiers change often — every page carries a
 * "last reviewed" date and the editor re-checks these before publishing.
 */

const basics: Topic[] = [
  {
    hub: "ai",
    section: "basics",
    slug: "how-ai-works",
    name: "How AI works",
    title: "How AI *actually* works",
    summary: "Patterns, not rules: what is really happening inside the AI tools you use every day.",
    lede: "No maths degree needed. In ten minutes you'll know what's happening when you type into ChatGPT, Gemini or Claude — and why it sometimes gets things wrong.",
    minutes: 10,
    tone: "mint",
    sections: [
      {
        heading: "AI learns patterns, not rules",
        body: "Traditional software follows rules a programmer wrote by hand. Machine learning flips this: you show a system millions of examples and it adjusts itself until its guesses match them. The result is a model — a very large set of numbers that captures the patterns in those examples.",
      },
      {
        heading: "What a large language model is",
        body: "A large language model (LLM) is trained on huge amounts of text to do one thing: predict the next small piece of text, called a token. Do that well enough, at enough scale, and the model can answer questions, write, summarise, translate and even write code.",
        points: [
          "Training: the model reads text and slowly adjusts billions of numbers.",
          "Prompting: you give it context and instructions; it continues from there.",
          "Limits: it predicts what sounds right, so it can state false things confidently (“hallucinate”).",
        ],
      },
      {
        heading: "Images, voice and video work the same way",
        body: "Image and video generators learn patterns between words and pictures; speech tools learn patterns between sound and text. Different data, same idea: learn from examples, then generate something that fits the pattern you ask for.",
      },
      {
        heading: "Why this matters for money",
        body: "Banks, insurers, brokers and payment apps in India already use AI for fraud checks, credit decisions and support. Knowing how it reasons — and how it fails — helps you use it well and spot when it's being used on you.",
      },
    ],
    takeaways: [
      "AI learns patterns from examples instead of following written rules.",
      "LLMs predict the next token: fluent, but not always correct.",
      "Always check important facts an AI gives you.",
    ],
    comingNext: ["Illustrated lessons from basics to agents", "Short quizzes with badges"],
  },
  {
    hub: "ai",
    section: "basics",
    slug: "machine-learning-without-code",
    name: "Machine learning, without code",
    title: "How machine learning is *built*",
    summary: "From data to a working model — the full process explained without a single line of code.",
    lede: "You don't need to code to understand how a model is made. Every AI system you use went through the same five steps.",
    minutes: 9,
    tone: "linen",
    sections: [
      {
        heading: "Step 1 — Collect the right data",
        body: "Everything starts with examples: emails marked spam or not spam, photos of healthy and diseased leaves, past loan applications and how they turned out. The model can only be as good, and as fair, as this data.",
      },
      {
        heading: "Step 2 — Label and clean it",
        body: "People tag the examples with the right answer and remove duplicates, errors and private details. This slow, human work is often most of the effort.",
      },
      {
        heading: "Step 3 — Train",
        body: "The computer makes a guess for each example, measures how wrong it was, and nudges its internal numbers to be a little less wrong next time — millions of times over.",
        points: [
          "Training data: what the model learns from.",
          "Validation data: kept aside to check it is really learning, not memorising.",
          "Overfitting: when a model memorises its examples and fails on new ones.",
        ],
      },
      {
        heading: "Step 4 — Test honestly",
        body: "The model is tested on examples it has never seen. Good teams also test for bias: does it work equally well for different languages, regions and groups of people?",
      },
      {
        heading: "Step 5 — Deploy and watch",
        body: "Once live, the world changes and the model's accuracy can drift. Teams keep monitoring results and retrain when needed.",
      },
    ],
    takeaways: [
      "Data → label → train → test → deploy and monitor.",
      "Most of the work is data, not code.",
      "A model that memorises instead of learning fails in the real world.",
    ],
    comingNext: ["No-code tools to train a small model yourself", "Case study: a crop-disease classifier"],
  },
  {
    hub: "ai",
    section: "basics",
    slug: "types-of-ai-tools",
    name: "The kinds of AI tools",
    title: "What kinds of AI tools *exist*",
    summary:
      "Chat assistants, image and video makers, voice tools, coding helpers and agents — what each one is for.",
    lede: "There are thousands of AI products, but they fall into a handful of families. Know the families and you can understand any new tool in minutes.",
    minutes: 7,
    tone: "sand",
    sections: [
      {
        heading: "The main families",
        body: "Most tools are built on a small number of underlying models and sold for different jobs.",
        points: [
          "Chat assistants — answer, write, summarise, explain (ChatGPT, Gemini, Claude, Copilot, Meta AI).",
          "Search and research — answers with sources (Perplexity, Google's AI search, NotebookLM).",
          "Image — create or edit pictures from text (Midjourney, Adobe Firefly, Ideogram, Stable Diffusion).",
          "Video — generate or edit clips (Runway, Google Veo, OpenAI Sora, Kling).",
          "Voice and audio — speech-to-text, dubbing, voices (ElevenLabs, Whisper, Sarvam AI for Indian languages).",
          "Coding — write and explain code (GitHub Copilot, Cursor, Claude Code).",
          "Automation and agents — connect apps and act on your behalf (Zapier, n8n, Make, agent builders).",
        ],
      },
      {
        heading: "Wrappers vs models",
        body: "Many apps are “wrappers”: a nice interface on top of someone else's model. That's fine — but it means two apps can give similar answers, and the price difference is often just the interface.",
      },
      {
        heading: "Made for India",
        body: "Indian-language support is improving fast. Projects like Bhashini (government) and companies like Sarvam AI focus on Hindi, Gujarati, Tamil and other Indian languages — worth trying if English isn't your first language.",
      },
    ],
    takeaways: [
      "Learn the family, not every product.",
      "Many apps share the same underlying models.",
      "Try Indian-language tools if they suit you better.",
    ],
    comingNext: ["Hands-on: one task in five different tools", "Filterable tools directory"],
  },
  {
    hub: "ai",
    section: "basics",
    slug: "how-ai-answers",
    name: "How AI tools answer you",
    title: "How an AI tool *gives* you an answer",
    summary: "What happens between pressing Enter and the reply: context, tokens, search and tools.",
    lede: "An AI answer feels instant, but a lot happens in those few seconds. Understanding it makes you far better at asking.",
    minutes: 7,
    tone: "mint",
    sections: [
      {
        heading: "1. Your message becomes tokens",
        body: "Your words are split into tokens — pieces of words — and combined with hidden instructions from the app and any earlier messages. This bundle is the “context”.",
      },
      {
        heading: "2. The model may look things up",
        body: "Many tools first search the web or your files and paste what they find into the context. This is called retrieval, and it's why some answers come with sources.",
      },
      {
        heading: "3. It predicts the reply, token by token",
        body: "The model writes the answer one token at a time, each time choosing a likely next piece. Settings like “temperature” make it more creative or more predictable.",
      },
      {
        heading: "4. Tools and checks",
        body: "Advanced assistants can call tools mid-answer — a calculator, code runner or app — and safety filters review the output before you see it.",
        points: [
          "Give context: who you are, what you need, what format.",
          "Give examples of a good answer.",
          "Ask for sources, then open them.",
        ],
      },
    ],
    takeaways: [
      "Answers are predicted from your context — so give good context.",
      "Sources come from retrieval; still check them.",
      "Better questions get better answers.",
    ],
    comingNext: ["Prompt lab with copy-ready examples", "How retrieval (RAG) works, with diagrams"],
  },
];

const tools: Topic[] = [
  {
    hub: "ai",
    section: "tools",
    slug: "ai-tools-market-map",
    name: "The AI tools market",
    title: "The best AI tool for *each* job",
    summary:
      "What's in the market and which tools work best for writing, research, images, video, voice, code and automation.",
    lede: "There's no single best AI tool — there's a best tool for each job. Here's how the market looks and where each kind of tool shines.",
    minutes: 9,
    tone: "linen",
    sections: [
      {
        heading: "Writing, studying and everyday help",
        body: "General assistants like ChatGPT, Gemini and Claude are strong all-rounders. Try the same task in two of them — each has strengths in tone, reasoning or length of documents it can read.",
      },
      {
        heading: "Research with sources",
        body: "Perplexity and Google's AI search answer with links; NotebookLM works only from documents you upload — ideal for studying a syllabus or a long report.",
      },
      {
        heading: "Images, design and video",
        body: "Canva and Adobe Firefly suit quick marketing graphics; Midjourney and Ideogram for striking images; Runway, Veo and Kling for short video. Check each tool's licence before using output commercially.",
      },
      {
        heading: "Voice, code and automation",
        body: "ElevenLabs for voice-overs and dubbing, Whisper-based apps for transcription; GitHub Copilot and Cursor for code; Zapier, Make and n8n to automate repetitive work across apps.",
        points: [
          "Small business: Canva + a chat assistant + WhatsApp automation.",
          "Students: NotebookLM + a chat assistant for practice questions.",
          "Freelancers: the tool for your craft + an assistant for proposals and invoices.",
        ],
      },
    ],
    takeaways: [
      "Pick tools by job, not by hype.",
      "Test two tools on the same task before paying.",
      "Check licences and data policies.",
    ],
    comingNext: ["Filterable directory with rupee pricing", "Monthly ‘what changed’ round-up"],
  },
  {
    hub: "ai",
    section: "tools",
    slug: "free-and-low-cost-ai",
    name: "Free & low-cost AI",
    title: "Free and low-cost AI, *local* or cloud",
    summary:
      "Run AI on your own computer for free, or use cloud free tiers — which to choose for which task.",
    lede: "You can do a surprising amount with AI without paying. The big choice is whether it runs on your own machine (local) or on someone else's servers (cloud).",
    minutes: 8,
    tone: "emerald",
    sections: [
      {
        heading: "Local: on your own computer",
        body: "Open-weight models (such as Llama, Qwen, Mistral, Gemma and DeepSeek families) can run on a decent laptop using free apps like Ollama or LM Studio.",
        points: [
          "Free after setup, works offline, your data stays on your device.",
          "Needs a good amount of RAM; smaller models are less capable.",
          "Great for private documents, practice and learning.",
        ],
      },
      {
        heading: "Cloud: free tiers and pay-as-you-go",
        body: "Most big assistants have a free tier with limits, and paid plans for heavier use. Pay-as-you-go APIs charge per token, which is often very cheap for small projects.",
      },
      {
        heading: "Which to use when",
        body: "Use local for private data and unlimited practice; cloud for the strongest models, images, video and anything you need from your phone.",
      },
      {
        heading: "Watch the hidden costs",
        body: "Free tiers can change, and some use your data to improve their models. Read the data settings, and set spending limits on any paid API.",
      },
    ],
    takeaways: [
      "Local = private and free; cloud = more powerful and convenient.",
      "Start free, pay only when a tool saves you real time.",
      "Always set a spending limit on APIs.",
    ],
    comingNext: ["Step-by-step: run a model locally with Ollama", "Laptop requirements explained"],
  },
  {
    hub: "ai",
    section: "tools",
    slug: "free-ai-platforms-apis",
    name: "Free AI platforms & APIs",
    title: "Platforms with free AI *tools* and APIs",
    summary: "Where builders and learners can try models and APIs for free or very cheaply.",
    lede: "If you want to build something — a chatbot, an automation, a small app — these platforms let you start without a big bill. Free limits change, so check each one's current terms.",
    minutes: 8,
    tone: "mint",
    sections: [
      {
        heading: "Model hubs",
        body: "Hugging Face hosts hundreds of thousands of open models and datasets, plus free demo “Spaces”. It's the best place to explore what's possible.",
      },
      {
        heading: "Developer free tiers",
        body: "Many providers offer free or low-cost API access for learning and prototypes.",
        points: [
          "Google AI Studio — try Gemini models and get an API key.",
          "OpenRouter — one API for many models, including some free ones.",
          "Groq and Cloudflare Workers AI — fast, low-cost inference on open models.",
          "GitHub Models — try leading models from inside GitHub.",
          "Mistral and other model makers — developer tiers for experimentation.",
        ],
      },
      {
        heading: "Build without much code",
        body: "n8n (which you can self-host), Make and Zapier connect models to Gmail, Sheets, WhatsApp and more. Many people build useful automations with almost no code.",
      },
      {
        heading: "Keep keys safe",
        body: "An API key is like a password with your money behind it. Never paste it into public code or share it in chats, and set a monthly limit.",
      },
    ],
    takeaways: [
      "Hugging Face to explore, free tiers to prototype.",
      "No-code tools turn models into real automations.",
      "Treat API keys like passwords.",
    ],
    comingNext: ["Build your first API call, step by step", "Comparison table of free limits (kept current)"],
  },
  {
    hub: "ai",
    section: "tools",
    slug: "what-is-alibaba",
    name: "What is Alibaba?",
    title: "What is *Alibaba* in AI?",
    summary: "The Chinese tech giant behind the Qwen models and Alibaba Cloud — and why it matters.",
    lede: "Most people know Alibaba as a shopping company. In AI it's one of the biggest players in the world, mainly through its open Qwen models.",
    minutes: 6,
    tone: "sand",
    sections: [
      {
        heading: "The company",
        body: "Alibaba Group is a Chinese technology company that runs e-commerce marketplaces (Taobao, Tmall, AliExpress), payments through its affiliate Ant Group, and Alibaba Cloud — one of Asia's largest cloud platforms.",
      },
      {
        heading: "Qwen, its AI models",
        body: "Alibaba's Qwen family of language and multimodal models is widely used around the world. Many Qwen models are released as open weights, so anyone can download and run them — including locally.",
      },
      {
        heading: "Why it matters to you",
        body: "Open models like Qwen keep prices down and let small teams build without paying per question. Through Alibaba Cloud's model platform, businesses can also use them as a paid API.",
      },
      {
        heading: "Things to consider",
        body: "As with any foreign cloud service, think about where your data is stored and processed, and follow your employer's and Indian regulations on data. Running open models locally avoids sending data abroad.",
      },
    ],
    takeaways: [
      "Alibaba = e-commerce + cloud + the Qwen AI models.",
      "Qwen open models can run on your own machine.",
      "Mind where your data goes when using any cloud API.",
    ],
    comingNext: ["Try a Qwen model locally", "Open vs closed models explained"],
  },
  {
    hub: "ai",
    section: "tools",
    slug: "chinese-ai-tools",
    name: "The best Chinese AI tools",
    title: "The best *Chinese* AI tools",
    summary: "DeepSeek, Qwen, Kimi, Doubao and more — what they're good at and what to watch out for.",
    lede: "Chinese labs now build some of the world's most capable — and cheapest — AI models. Here's who's who, and how to use them sensibly from India.",
    minutes: 8,
    tone: "linen",
    sections: [
      {
        heading: "Who's who",
        body: "Several Chinese companies compete at the frontier.",
        points: [
          "DeepSeek — strong reasoning and coding models, many released as open weights.",
          "Alibaba Qwen — a wide open family for text, vision and code.",
          "Moonshot AI's Kimi — known for reading very long documents.",
          "ByteDance's Doubao and Zhipu's GLM — popular assistants and models in China.",
          "Kling (Kuaishou) — a well-known AI video generator.",
          "Baidu's ERNIE and Tencent's Hunyuan — models from China's internet giants.",
        ],
      },
      {
        heading: "Why people use them",
        body: "Many are free or very low-cost, and open-weight versions can be run privately on your own hardware — popular with developers and researchers on a budget.",
      },
      {
        heading: "What to watch out for",
        body: "Hosted apps may store data on servers outside India, and some answers can reflect the content rules of where they're made. Several Indian organisations limit AI tools on official devices — check your workplace policy.",
      },
      {
        heading: "The sensible way to use them",
        body: "Prefer running open models locally for private work, use hosted apps only for non-sensitive tasks, and compare answers with another tool on anything important.",
      },
    ],
    takeaways: [
      "Chinese open models are powerful and cheap.",
      "Run them locally for anything private.",
      "Follow your workplace and government guidance on data.",
    ],
    comingNext: ["Side-by-side tests on Indian tasks", "Guide: open-weight models on a laptop"],
  },
  {
    hub: "ai",
    section: "tools",
    slug: "why-learn-ai-tools",
    name: "Why learn AI tools?",
    title: "Why you *need* to learn these tools",
    summary: "The jobs, businesses and services that are changing — and why the gap is opening now.",
    lede: "AI won't replace most people — but people who use AI well will replace many who don't. Here's why now is the time to learn.",
    minutes: 6,
    tone: "mint",
    sections: [
      {
        heading: "Work is being re-shaped, task by task",
        body: "Writing, research, design, customer support, coding and data work are all getting faster with AI. Employers increasingly expect people to use these tools.",
      },
      {
        heading: "Small teams can do big things",
        body: "A shop owner, teacher or freelancer can now produce marketing, translations, reports and simple software that once needed a team.",
      },
      {
        heading: "India's opportunity",
        body: "With a huge young workforce, strong IT services and government programmes like the IndiaAI Mission, India is well placed — if people build practical skills.",
      },
      {
        heading: "Protect yourself, too",
        body: "AI is also used in scams: deepfake voices, fake videos and convincing phishing messages. Understanding the tools helps you spot misuse.",
      },
    ],
    takeaways: [
      "AI skills are becoming basic work skills.",
      "Small teams gain the most.",
      "Knowing AI also protects you from AI scams.",
    ],
    comingNext: ["Role guides with salary ranges", "Free, recognised courses"],
  },
  {
    hub: "ai",
    section: "tools",
    slug: "earning-with-ai-tools",
    name: "Earning with AI tools",
    title: "How people *earn* with AI tools",
    summary:
      "Real, honest ways to earn: skills, freelancing, services and products — not get-rich-quick schemes.",
    lede: "There's real money in AI — mostly for people who use it to do valuable work faster. Here are the honest paths, and the scams to avoid.",
    minutes: 8,
    tone: "emerald",
    sensitive: true,
    sections: [
      {
        heading: "Get better pay at your current job",
        body: "Use AI to do your work faster and better — reports, analysis, presentations, customer replies — and show the results. This is the most reliable path.",
      },
      {
        heading: "Freelancing and services",
        body: "Content writing, translation into Indian languages, design, video editing, chatbot setup, automation for small businesses, and AI training for teams are all in demand.",
        points: [
          "Start with one service and three sample projects.",
          "Charge for outcomes (time saved, leads won), not for “using AI”.",
          "Be open with clients about where AI is used.",
        ],
      },
      {
        heading: "Build small products",
        body: "Templates, prompt packs, simple apps, niche newsletters and courses. Start small and validate with real customers before investing more.",
      },
      {
        heading: "Avoid the traps",
        body: "Be wary of “AI trading bots with guaranteed returns”, paid “AI money” courses that promise passive income, and anything asking for an upfront fee to unlock earnings.",
      },
    ],
    takeaways: [
      "Most AI income comes from doing useful work faster.",
      "Sell outcomes, not tools.",
      "Guaranteed-returns offers are scams.",
    ],
    comingNext: ["Freelance starter kit", "Pricing your AI services in India"],
  },
];

const agents: Topic[] = [
  {
    hub: "ai",
    section: "agents",
    slug: "what-are-ai-agents",
    name: "What are AI agents?",
    title: "What are AI *agents*?",
    summary: "AI that doesn't just answer but acts: plans steps, uses tools and checks its own work.",
    lede: "A chatbot answers. An agent gets things done — it plans steps, uses tools and checks results, within limits you set.",
    minutes: 6,
    tone: "mint",
    sections: [
      {
        heading: "From answers to actions",
        body: "An AI agent is a language model given a goal, some tools (search, email, calendar, code, an app's API) and permission to take several steps on its own to reach the goal.",
      },
      {
        heading: "Everyday examples",
        body: "Booking a meeting after reading your email, comparing prices across sites, filing an expense report, or researching a topic and writing a summary with sources.",
      },
      {
        heading: "Why limits matter",
        body: "Because agents act, mistakes have consequences. Good agents ask before spending money, sending messages or deleting anything, and log every step.",
      },
    ],
    takeaways: [
      "Agent = model + goal + tools + a loop.",
      "They act, so they need limits and approvals.",
      "Every step should be visible to a human.",
    ],
    comingNext: ["Live demo: a research agent", "Agent safety checklist"],
  },
  {
    hub: "ai",
    section: "agents",
    slug: "how-agents-work",
    name: "How agents work",
    title: "How an agent *thinks* and acts",
    summary: "The plan → act → observe → repeat loop, memory, tools and guardrails, explained simply.",
    lede: "Under the hood, every agent runs the same loop. Once you see it, you'll understand what agents can — and can't — do.",
    minutes: 8,
    tone: "linen",
    sections: [
      {
        heading: "The loop",
        body: "The model reads the goal and decides the next step; a tool carries it out; the result is fed back; the model decides again — until the goal is met or a limit is hit.",
        points: [
          "Plan — break the goal into steps.",
          "Act — call a tool (search, calculator, app).",
          "Observe — read what happened.",
          "Repeat or stop — with a maximum number of steps.",
        ],
      },
      {
        heading: "Memory",
        body: "Short-term memory is the conversation so far; long-term memory is notes or a database the agent can search later.",
      },
      {
        heading: "Guardrails",
        body: "Permissions (which tools it may use), budgets (time, money, steps), human approval for risky actions, and logs of every decision.",
      },
      {
        heading: "Where they fail",
        body: "Agents can loop, misread a page, or confidently take a wrong step. That's why testing on safe, fake data comes first.",
      },
    ],
    takeaways: [
      "Plan, act, observe, repeat — with a step limit.",
      "Guardrails matter more than cleverness.",
      "Test on safe data before real use.",
    ],
    comingNext: ["Diagram walkthrough of an agent run", "Common failure patterns"],
  },
  {
    hub: "ai",
    section: "agents",
    slug: "how-to-build-an-agent",
    name: "How to build an agent",
    title: "How to *build* your first agent",
    summary: "A step-by-step path — from a no-code automation to a simple agent with tools and limits.",
    lede: "You can build a useful agent without being a software engineer. Start with a narrow job, give it a few tools, and add limits from day one.",
    minutes: 9,
    tone: "sand",
    sections: [
      {
        heading: "1. Pick one narrow job",
        body: "“Summarise new customer emails and draft replies for me to approve” is a great first agent. “Run my business” is not.",
      },
      {
        heading: "2. Choose a builder",
        body: "No-code: n8n, Make or Zapier with an AI step. Low-code: agent builders from the major AI companies. Code: open-source agent frameworks if you want full control.",
      },
      {
        heading: "3. Give it tools and instructions",
        body: "Connect only the tools it needs, write clear instructions with examples of good output, and decide what it must never do.",
      },
      {
        heading: "4. Add limits and a human check",
        body: "Set a step limit and spending cap, require approval before anything is sent or bought, and keep a log.",
      },
      {
        heading: "5. Test, then improve",
        body: "Run it on old or fake examples, note every mistake, adjust instructions, and only then let it handle real work.",
      },
    ],
    takeaways: [
      "Narrow job first.",
      "Least tools, clear rules, human approval.",
      "Test on old or fake data before going live.",
    ],
    comingNext: ["Build-along video: an email assistant agent", "Templates you can copy"],
  },
  {
    hub: "ai",
    section: "agents",
    slug: "trading-with-agents",
    name: "Trading with agents",
    title: "Trading with AI agents, *honestly*",
    summary: "What AI trading agents really do, what they can't do, and how to learn safely on paper money.",
    lede: "You'll see ads for AI bots that “trade for you and never lose”. Here's the honest picture — taught as engineering, never as tips.",
    minutes: 9,
    tone: "emerald",
    sensitive: true,
    sections: [
      {
        heading: "What they actually are",
        body: "A trading agent is software that reads data, applies a strategy, checks risk rules and — if allowed — places orders. AI can help analyse information and explain decisions, but it cannot see the future.",
      },
      {
        heading: "What they can't do",
        body: "No system wins every trade. Markets change, costs add up, and a strategy that worked in the past can stop working. Anyone promising guaranteed returns is not telling the truth.",
      },
      {
        heading: "The rules in India",
        body: "SEBI regulates algorithmic trading and investment advice. Offering trading tips or “signals” for money needs SEBI registration, and retail algo trading through brokers follows SEBI's framework. We teach how systems work — we don't give calls.",
      },
      {
        heading: "Learn on paper money first",
        body: "In the club you build and test agents only on virtual money with historical or synthetic data. It's how professionals learn too.",
      },
    ],
    takeaways: [
      "Agents follow strategies; they don't predict the future.",
      "Guaranteed-return bots are scams.",
      "Learn on paper money. We never give signals.",
    ],
    comingNext: ["Paper-trading arena for members", "Build a rule-based bot, step by step"],
  },
  {
    hub: "ai",
    section: "agents",
    slug: "how-trading-agents-work",
    name: "How a trading agent works",
    title: "Inside a trading *agent*",
    summary: "Data, strategy, risk rules, execution and monitoring — the five parts of every trading system.",
    lede: "Every automated trading system, simple or AI-driven, has the same five parts. Understanding them is the real skill.",
    minutes: 9,
    tone: "mint",
    sensitive: true,
    sections: [
      {
        heading: "The five parts",
        body: "Get any one wrong and the whole system fails.",
        points: [
          "Data — prices and other inputs, cleaned and checked.",
          "Strategy — the logic that decides when it would act.",
          "Risk rules — position limits, stop-losses, maximum daily loss.",
          "Execution — how orders are placed (in our lessons: only on paper).",
          "Monitoring — logs and alerts so a human can see and stop it.",
        ],
      },
      {
        heading: "Where the AI fits",
        body: "An AI model can summarise news, classify signals or explain a decision — but it should sit inside hard limits it cannot override.",
      },
      {
        heading: "Back-testing and its traps",
        body: "Back-testing runs a strategy on past data. It's useful and easy to fool yourself with: overfitting, ignoring costs and look-ahead bias all make results look better than reality.",
      },
    ],
    takeaways: [
      "Data, strategy, risk, execution, monitoring.",
      "AI sits inside the risk rules, never above them.",
      "Back-tests flatter — assume reality is worse.",
    ],
    comingNext: ["Back-testing lab on synthetic data", "Risk-rule templates"],
  },
  {
    hub: "ai",
    section: "agents",
    slug: "agent-profit-and-loss",
    name: "Profit & loss with agents",
    title: "Profit and *loss*, the honest maths",
    summary:
      "Costs, slippage, drawdowns and taxes — why most automated traders lose money, and how to measure it.",
    lede: "Studies of retail traders in India show most lose money. Understanding the maths of profit and loss is the best protection you have.",
    minutes: 8,
    tone: "sand",
    sensitive: true,
    sections: [
      {
        heading: "The numbers most people ignore",
        body: "Every trade has costs that quietly eat returns.",
        points: [
          "Brokerage, exchange and regulatory charges.",
          "Taxes, including STT on equity trades and income tax on gains.",
          "Slippage — the gap between the price you expected and the price you got.",
          "Data, software and server costs for running a bot.",
        ],
      },
      {
        heading: "Drawdown: the number that matters",
        body: "Drawdown is how far your money falls from its peak before recovering. A strategy that makes 20% but can drop 40% on the way is far riskier than it sounds.",
      },
      {
        heading: "What the research says",
        body: "SEBI's studies of the futures and options segment found that a large majority of individual traders lost money over the periods studied. Automation doesn't change the maths; it can make losses faster.",
      },
      {
        heading: "Measure honestly",
        body: "Track every cost, compare against simply holding an index fund, and judge results over long periods — not a few lucky weeks.",
      },
    ],
    takeaways: [
      "Costs, slippage and tax decide real results.",
      "Watch drawdown, not just returns.",
      "Most retail traders lose — learn on paper first.",
    ],
    comingNext: ["P&L calculator with all Indian charges", "Drawdown explained with charts"],
  },
];

export const aiTopics: Topic[] = [...basics, ...tools, ...agents];
