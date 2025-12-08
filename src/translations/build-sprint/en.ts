export const buildSprintEn = {
  // Meta information
  title: "Build Sprint",
  subtitle: "12 weeks from idea to launched product.",

  // Hero section
  hero: {
    headline: "You bring the idea. We bring the platform.",
    subheadline: "Ship your SaaS product in 12 weeks with production-ready infrastructure already built.",
    cta: "Apply for Build Sprint"
  },

  // The Problem section
  problem: {
    title: "The Problem",
    headline: "Most founders spend 60% of their time on infrastructure.",
    story: {
      intro: "It's 2 AM on a Tuesday. Alex, a funded founder, is debugging OAuth tokens instead of building the feature that will differentiate their product.",
      middle: "Three months into development, the product is still almost ready. Auth took a month. Database schema took three weeks. Stripe integration took two weeks. Email templates, another week. The actual product—the thing that makes it unique—has gotten maybe 30% of the time.",
      conflict: "Meanwhile, a competitor with worse ideas but better tooling just launched.",
      conclusion: "Alex is still configuring middleware."
    },
    math: {
      title: "The Math",
      items: [
        { task: "Auth integration", time: "2-4 weeks" },
        { task: "Payment setup", time: "2-3 weeks" },
        { task: "Email system", time: "1-2 weeks" },
        { task: "Database + API", time: "3-4 weeks" },
        { task: "Admin dashboard", time: "2-3 weeks" }
      ],
      total: "Total: 10-16 weeks before you write a line of product code."
    }
  },

  // The Solution section
  solution: {
    title: "The Solution",
    headline: "What if the boring parts were already done?",
    description: "Imagine starting your next project with:",
    features: [
      "Authentication already working (email, OAuth, 2FA)",
      "Database already configured (Convex, real-time sync)",
      "Email already integrated (transactional, marketing, templates)",
      "Payments already connected (Stripe, subscriptions, invoicing)",
      "AI already available (private EU-hosted, ready to use)",
      "Admin dashboard already built (user management, analytics)"
    ],
    conclusion: "Now imagine having an expert in your corner for 12 weeks to help you ship.",
    tagline: "That's Build Sprint."
  },

  // How It Works section
  howItWorks: {
    title: "How It Works",
    phases: [
      {
        name: "Phase 1: Discovery",
        weeks: "Week 1-2",
        tasks: [
          "Deep dive into your product vision",
          "Technical architecture design",
          "Timeline and milestone planning",
          "Platform onboarding and setup"
        ]
      },
      {
        name: "Phase 2: Build",
        weeks: "Week 3-10",
        tasks: [
          "Weekly development calls",
          "Platform access and integration support",
          "Code review and architecture guidance",
          "Progress tracking and accountability"
        ]
      },
      {
        name: "Phase 3: Launch",
        weeks: "Week 11-12",
        tasks: [
          "Pre-launch testing and optimization",
          "Deployment to production",
          "Post-launch monitoring setup",
          "Handoff documentation"
        ]
      }
    ],
    outcome: "Outcome: You ship. For real. In 12 weeks."
  },

  // What's Included section
  whatsIncluded: {
    title: "What's Included",
    platform: {
      title: "Platform Access",
      features: [
        { name: "Authentication", description: "Email, OAuth (Google, GitHub, etc.), magic links, 2FA" },
        { name: "Database", description: "Convex real-time database, automatic backups" },
        { name: "Email", description: "Transactional email, marketing campaigns, templates" },
        { name: "Payments", description: "Stripe integration, subscriptions, invoicing, webhooks" },
        { name: "AI Integration", description: "Private EU-hosted LLMs, ready-to-use APIs" },
        { name: "Admin Dashboard", description: "User management, analytics, monitoring" },
        { name: "File Storage", description: "Secure file uploads, CDN delivery" },
        { name: "Edge Functions", description: "Serverless compute, global deployment" }
      ]
    },
    support: {
      title: "Expert Support",
      levels: [
        { name: "Weekly Calls", description: "1-2 calls per week depending on tier" },
        { name: "Async Support", description: "Slack/email access for questions" },
        { name: "Code Review", description: "Architecture guidance and best practices" },
        { name: "Launch Support", description: "Deployment, monitoring, optimization" }
      ]
    }
  },

  // Pricing section
  pricing: {
    title: "Pricing",
    tiers: [
      {
        name: "Starter",
        price: "7,500",
        currency: "€",
        description: "For first-time founders, simple MVPs",
        features: [
          "12-week program",
          "Weekly calls (1x per week)",
          "1 project",
          "Full platform access",
          "Email support"
        ],
        bestFor: "Best for: Validating an idea, getting to first customers"
      },
      {
        name: "Growth",
        price: "15,000",
        currency: "€",
        description: "For funded founders, complex products",
        features: [
          "12-week program",
          "Priority calls (2x per week)",
          "2 projects",
          "Full platform access",
          "Priority Slack support",
          "Architecture deep-dives"
        ],
        bestFor: "Best for: Building a serious product with funding",
        popular: true
      },
      {
        name: "Scale",
        price: "25,000",
        currency: "€",
        description: "For agencies, enterprise, multi-product teams",
        features: [
          "12-week program",
          "Unlimited calls",
          "3+ projects",
          "Full platform access",
          "Dedicated Slack channel",
          "Post-launch support (30 days)",
          "White-glove onboarding"
        ],
        bestFor: "Best for: Agencies or teams shipping multiple products"
      }
    ],
    paymentOptions: {
      title: "Payment Options",
      payInFull: {
        title: "Pay in Full",
        description: "10% discount when you pay upfront."
      },
      splitPayment: {
        title: "Split Payment",
        description: "50% to reserve your spot → 50% at Week 1."
      }
    }
  },

  // Who This Is For section
  whoIsThisFor: {
    title: "Who This Is For",
    ideal: {
      title: "Ideal Candidate:",
      points: [
        "You have a product idea you're ready to build",
        "You have funding or resources to invest in speed",
        "You can commit 15-20+ hours/week to building",
        "You want to ship in weeks, not months",
        "You're comfortable with guidance, not just tools"
      ]
    },
    notFor: {
      title: "Not For You If:",
      points: [
        "You want to learn to code (this is for builders, not beginners)",
        "You're looking for a no-code solution (we work with code)",
        "You can't commit the time (this is intensive)",
        "You want to explore, not ship (we're focused on launching)"
      ]
    }
  },

  // Limited Availability section
  availability: {
    title: "Limited Availability",
    why: {
      title: "Why Only 3 Spots?",
      description: "Build Sprint is high-touch. I personally work with every participant. That doesn't scale to hundreds of people.",
      emphasis: "3 spots per quarter. That's it."
    },
    status: {
      title: "Current Status",
      remaining: "{spots} spots remaining",
      quarter: "{quarter} {year}"
    }
  },

  // What You Walk Away With section
  outcomes: {
    title: "What You Walk Away With",
    items: [
      { title: "A launched product", description: "In production, ready for users" },
      { title: "Production infrastructure", description: "Auth, database, payments, email, AI" },
      { title: "Technical documentation", description: "Everything you need to maintain and extend" },
      { title: "Ongoing platform access", description: "Continue building after the sprint" },
      { title: "A relationship", description: "Not a vendor, a partner" }
    ]
  },

  // FAQ section
  faq: {
    title: "FAQ",
    items: [
      {
        question: "What if I don't have a technical background?",
        answer: "Build Sprint is for builders. You need to be comfortable writing code or have a technical co-founder."
      },
      {
        question: "What tech stack do you use?",
        answer: "React/Next.js, Convex (real-time database), TypeScript throughout."
      },
      {
        question: "Can I use this for an existing project?",
        answer: "Yes, if it makes sense to migrate. We'll discuss during the application call."
      },
      {
        question: "What happens after 12 weeks?",
        answer: "You keep platform access. You continue building. Ongoing support available if needed."
      },
      {
        question: "Is there a money-back guarantee?",
        answer: "No. But we don't accept people we don't believe we can help."
      }
    ]
  },

  // Apply section
  apply: {
    title: "Apply Now",
    process: {
      title: "Process",
      steps: [
        { step: "Apply", description: "Fill out the form (5 minutes)" },
        { step: "Review", description: "We review within 48 hours" },
        { step: "Call", description: "30-minute strategy conversation" },
        { step: "Decision", description: "Mutual decision within 48 hours" },
        { step: "Start", description: "Reserve your spot, begin onboarding" }
      ]
    }
  },

  // CTA section
  cta: {
    title: "Stop configuring. Start shipping.",
    description: "12 weeks from now, you could have a launched product. Or you could still be setting up auth.",
    button: "Apply for Build Sprint"
  }
};
