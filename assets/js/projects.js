/*
  PROJECT DATA: the single source for every project card on the site.
  Home shows the ones with featured:true. The Projects page shows all of them, in this order.

  TO ADD A NEW PROJECT: copy one block below, paste it where you want it in the list, change the values.
  Nothing else needs touching (the numbers 01, 02... are added automatically).

  status:  "live"    -> Live (pulsing dot)
           "dev"     -> In development (spinning dot)
           "done"    -> Complete (tick)
           "paused"  -> Paused (two bars)
  statusLabel: the exact words shown on the pill.
  logo:    path from the site root, e.g. "assets/img/projects/leo.png". Use null for a letter tile.
  tile:    "light" = white tile (most logos), "dark" = dark tile (for logos made for dark backgrounds).
  page:    case-study page, from the site root.
  featured: true = also shown on the Home page.
  links:   extra buttons on the case-study page. type is "video" (LinkedIn walkthrough), "github" or "site".
           Leave as [] when there is nothing to link.
*/
window.PROJECTS = [
  {
    id: "kairos",
    name: "Kairos",
    kicker: "AI decision-intelligence platform",
    desc: "Separates what you actually know from what you're only assuming, then runs the measurable part of a decision through a dedicated quantitative engine instead of asking an LLM to guess.",
    short: "A decision-intelligence platform where a real quantitative engine (MCDA, Monte Carlo, sensitivity analysis) does the measurable reasoning, instead of asking an LLM to guess.",
    status: "dev",
    statusLabel: "In development",
    logo: "assets/img/projects/kairos.svg",
    tile: "light",
    chips: ["Python", "FastAPI", "SQLite", "Groq API"],
    page: "projects/kairos.html",
    links: [
      { type: "video", label: "Watch the walkthrough", url: "https://lnkd.in/p/dYfFFiMv" }
    ],
    featured: true
  },
  {
    id: "spinzar-gems",
    name: "Spinzar Gems Co.",
    kicker: "Luxury gemstone showcase & inquiry platform",
    desc: "A production site for a Bangkok gemstone dealer, built end to end from database schema to live deployment, with an admin dashboard, multi-currency prices and typo-tolerant search.",
    short: "Production showcase and inquiry platform for a Bangkok luxury gemstone dealer, built end to end from database schema to deployment, with an admin dashboard and multi-currency support.",
    status: "live",
    statusLabel: "Live",
    logo: "assets/img/projects/spinzar-gems.svg",
    tile: "light",
    chips: ["Next.js", "FastAPI", "PostgreSQL", "Railway", "Cloudflare R2"],
    page: "projects/spinzar-gems.html",
    links: [
      { type: "site", label: "Visit the live site", url: "https://spinzargems.com" }
    ],
    featured: false
  },
  {
    id: "leo",
    name: "LEO",
    kicker: "Locally-run AI assistant with Khowar language memory",
    desc: "Runs fully offline on 8GB of RAM with no GPU, and recalls Khowar vocabulary from a database instead of generating it, so it can't invent words. The core is done; taking it further needs more time and compute.",
    short: "A fully local, privacy-preserving AI assistant that runs offline on 8GB RAM with no GPU, and remembers Khowar vocabulary from a database instead of inventing it.",
    status: "paused",
    statusLabel: "Paused · core complete",
    logo: "assets/img/projects/leo.png",
    tile: "dark",
    chips: ["Tauri", "React", "FastAPI", "Ollama", "faster-whisper"],
    page: "projects/leo.html",
    links: [
      { type: "video", label: "Watch the walkthrough", url: "https://lnkd.in/p/d3C5pxTR" },
      { type: "github", label: "View on GitHub", url: "https://github.com/aadilkk18/leo" }
    ],
    featured: true
  },
  {
    id: "khimiyaar-ai",
    name: "KhimiYaar AI",
    kicker: "Health information chatbot",
    desc: "A lab test analyzer, emergency detection with Pakistan-specific contacts (including KPK and Chitral), and a fine-tuned X-ray fracture model at over 96% accuracy.",
    short: "Health information chatbot with a lab test analyzer, emergency detection with Pakistan-specific contacts, and a separate X-ray fracture model at over 96% accuracy.",
    status: "done",
    statusLabel: "v1 complete",
    logo: "assets/img/projects/khimiyaar-ai.png",
    tile: "light",
    chips: ["FastAPI", "React", "Groq API", "EfficientNetB0"],
    page: "projects/khimiyaar-ai.html",
    links: [
      { type: "video", label: "Watch the walkthrough", url: "https://lnkd.in/p/duH7NrVa" },
      { type: "github", label: "View on GitHub", url: "https://github.com/aadilkk18/khimiyaar-ai" }
    ],
    featured: true
  },
  {
    id: "hirelens",
    name: "HireLens",
    kicker: "AI-powered CV rating platform",
    desc: "Rates CVs against Pakistani hiring norms. Hybrid OCR reads scanned and photographed CVs, and semantic matching covers 115+ job roles, with a deterministic scoring layer so ratings stay consistent.",
    short: "AI CV rating platform tuned to Pakistani hiring norms, with hybrid OCR for scanned CVs and semantic role matching across 115+ job roles.",
    status: "live",
    statusLabel: "Live",
    logo: "assets/img/projects/hirelens.png",
    tile: "light",
    chips: ["React", "FastAPI", "Gemini API", "Sentence-Transformers"],
    page: "projects/hirelens.html",
    links: [
      { type: "site", label: "Visit the live site", url: "https://hire-lens-lime.vercel.app" },
      { type: "github", label: "View on GitHub", url: "https://github.com/aadilkk18/HireLens" }
    ],
    featured: false
  },
  {
    id: "srms-dinenest",
    name: "SRMS / DineNest",
    kicker: "Multi-tenant restaurant management system · Final year project",
    desc: "A multi-tenant restaurant management system. One installation runs many restaurants, each with its own menu, staff, orders and finances, and every restaurant's data stays isolated from the others.",
    short: "",
    status: "done",
    statusLabel: "Complete",
    logo: null,
    tile: "light",
    chips: ["Laravel 12", "MySQL", "Tailwind CSS", "Alpine.js"],
    page: "projects/srms-dinenest.html",
    links: [],
    featured: false
  }
];