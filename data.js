// Blog data — AI tooling & dev practice focus
window.BLOG_DATA = {
  articles: [
    {
      id: "LOG-0247",
      slug: "agent-evals-that-dont-lie",
      title: "Agent evaluations that don't lie to you",
      dek: "Most eval suites measure the wrong thing. Here's a harness that actually predicts production regressions — built on replay, canary tasks, and structured disagreement.",
      category: "EVALUATION",
      readTime: "12 MIN",
      date: "04.18.26",
      author: "M. Osei",
      authorRole: "TOOLING",
      feature: true,
      tags: ["agents", "eval", "testing"]
    },
    {
      id: "LOG-0246",
      slug: "prompt-caching-cost-model",
      title: "A cost model for prompt caching that survives contact with users",
      dek: "Cache hit rates decay faster than you think. We profile a production agent workload and derive a simple rule for when caching pays.",
      category: "INFRA",
      readTime: "8 MIN",
      date: "04.14.26",
      author: "R. Halden",
      authorRole: "INFRA",
      tags: ["caching", "cost", "infra"]
    },
    {
      id: "LOG-0244",
      slug: "mcp-production-checklist",
      title: "Shipping MCP servers: a production checklist",
      dek: "Auth, rate limits, tool schemas, and the three kinds of error that cause silent agent failure.",
      category: "TOOLING",
      readTime: "6 MIN",
      date: "04.08.26",
      author: "J. Liang",
      authorRole: "TOOLING",
      tags: ["mcp", "tools", "ops"]
    },
    {
      id: "LOG-0243",
      slug: "agent-loops-that-terminate",
      title: "Designing agent loops that actually terminate",
      dek: "Termination is not an afterthought. It's the single most important property of a tool-calling loop — and most teams get it wrong.",
      category: "DESIGN",
      readTime: "9 MIN",
      date: "04.04.26",
      author: "A. Bello",
      authorRole: "APPLIED",
      tags: ["agents", "design"]
    },
    {
      id: "LOG-0242",
      slug: "reading-traces-like-logs",
      title: "Read agent traces the way you read logs",
      dek: "A visual language for tool-calling traces, borrowed from distributed tracing. No new tools required.",
      category: "OBSERVABILITY",
      readTime: "7 MIN",
      date: "03.31.26",
      author: "S. Okafor",
      authorRole: "OBS",
      tags: ["tracing", "ops"]
    },
    {
      id: "LOG-0241",
      slug: "structured-outputs-failure-modes",
      title: "Five failure modes of structured outputs in production",
      dek: "The schema compiles. The model cooperates. And then everything falls apart at 3 AM. What to watch for.",
      category: "PRACTICE",
      readTime: "11 MIN",
      date: "03.27.26",
      author: "N. Petrov",
      authorRole: "APPLIED",
      tags: ["structured-output", "reliability"]
    },
    {
      id: "LOG-0240",
      slug: "rag-is-a-distributed-systems-problem",
      title: "RAG is a distributed systems problem, not an AI problem",
      dek: "Embedding drift, index staleness, and retrieval-as-consensus. Treating RAG as the distributed system it is.",
      category: "INFRA",
      readTime: "14 MIN",
      date: "03.22.26",
      author: "K. Vasquez",
      authorRole: "APPLIED",
      tags: ["rag", "infra"]
    },
    {
      id: "LOG-0239",
      slug: "diff-review-for-ai-generated-code",
      title: "Diff review is the interaction surface for AI code",
      dek: "Not chat. Not tab-complete. The diff is where humans and models should meet — and where the next generation of tooling will be built.",
      category: "DESIGN",
      readTime: "8 MIN",
      date: "03.18.26",
      author: "M. Osei",
      authorRole: "TOOLING",
      tags: ["codegen", "ux"]
    },
    {
      id: "LOG-0238",
      slug: "latency-budget-for-copilots",
      title: "A latency budget for copilots",
      dek: "200 ms feels instant. 800 ms feels broken. Here's how to allocate the budget across retrieval, inference, and UI.",
      category: "UX",
      readTime: "5 MIN",
      date: "03.14.26",
      author: "R. Halden",
      authorRole: "INFRA",
      tags: ["latency", "ux"]
    },
    {
      id: "LOG-0237",
      slug: "small-models-big-tools",
      title: "Small models, big tools: an architecture pattern",
      dek: "When the right move is a 4B param model orchestrating a large tool surface — and when it isn't.",
      category: "ARCHITECTURE",
      readTime: "10 MIN",
      date: "03.09.26",
      author: "J. Liang",
      authorRole: "TOOLING",
      tags: ["architecture", "agents"]
    },
    {
      id: "LOG-0236",
      slug: "building-internal-playbooks",
      title: "Internal playbooks: the artifact teams actually use",
      dek: "Forget the prompt library. The highest-leverage artifact in an applied AI team is a shared playbook of tactics that survived production.",
      category: "PRACTICE",
      readTime: "6 MIN",
      date: "03.05.26",
      author: "A. Bello",
      authorRole: "APPLIED",
      tags: ["team", "practice"]
    }
  ]
};
