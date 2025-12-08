export const manifestoEn = {
  // Meta information
  title: "The L4YERCAK3 Manifesto",
  subtitle: "A Declaration of How Software Should Work",
  publishedOn: "Published",
  readMore: "Read the full manifesto",

  // Preview text for landing page
  preview: `"The boilerplate era is over. For the past decade, founders have rebuilt the same infrastructure for every project. Auth. Database. Email. Payments. AI integration. The same 60% of work, repeated endlessly.

The result? Talented builders spending months on plumbing instead of products. First-mover advantage lost to setup time. Ideas dying in development hell because the boring parts took too long.

Here's what nobody tells you: that "simple" auth system will cost you three weeks. Payments integration? Another two. Email deliverability debugging? Don't ask. By the time you've wired it all together, your competitor has already shipped.

We built the boring parts. All of them. Auth that works. Payments that reconcile. Email that lands in inboxes. AI that's already connected. Database that scales. One codebase. One invoice. Zero plumbing.

Stop being an infrastructure engineer. Start being a founder again."`,

  // Full manifesto sections
  sections: {
    pointSolutionEra: {
      title: "The Boilerplate Era is Over",
      content: `For the past decade, founders have been trapped in a loop.

Build auth. Configure database. Set up email. Integrate payments. Connect AI. Deploy infrastructure. Repeat for every single project.

This is insanity.

The average founder spends 60% of their development time on infrastructure that has nothing to do with their actual product. Auth that could be a library. Database that could be a service. Payments that could be an integration.

But "could be" isn't "is." So founders keep rebuilding the same boring parts while their competitors ship.

The boilerplate era gave us development hell.

The compound builder era gives us time to actually build.`
    },

    whatWeBelieve: {
      title: "What We Believe",
      systemsThinking: {
        title: "1. Ship Speed is Everything",
        content: `The window for first-mover advantage is measured in weeks, not years.

Every day you spend on auth is a day your competitor spends on features. Every week configuring infrastructure is a week they're talking to customers. Every month in development hell is a month they're generating revenue.

We believe in relentless shipping speed.

The founders who win aren't the ones with the best ideas. They're the ones who validate fastest, iterate fastest, and get to revenue fastest.

Your job is to build what's unique. Our job is to make everything else instant.`
      },
      humansAI: {
        title: "2. Systems Over Services",
        content: `SaaS products don't need "better auth" or "better payments" or "better email."

They need auth that talks to payments that triggers emails that updates the dashboard that feeds analytics—all working together as one system.

We believe in building systems, not services.

Point solutions optimize one piece. You figure out the other nine.

Compound platforms optimize the entire stack because they own all the pieces.

The whole is faster than the sum of its parts. Always.`
      },
      expansionOverAcquisition: {
        title: "3. Builders + AI, Not Builders vs. AI",
        content: `The narrative around AI is broken.

One side fears replacement. The other side promises magic. Both are wrong.

AI doesn't build products. Builders do. AI accelerates builders.

The founder who can leverage AI to ship 3x faster isn't being replaced—they're becoming unstoppable. AI that handles boilerplate doesn't eliminate development. It eliminates the boring parts of development.

We build AI that multiplies builder capacity, not replaces builder creativity.

This isn't replacement. This is amplification.`
      },
      privacyAsRight: {
        title: "4. Expansion Over Acquisition",
        content: `Traditional SaaS is addicted to new logos.

Sell once. Pray for renewal. Burn cash acquiring customers. Repeat until exit or death.

This model is broken.

We believe in a different model: Prove value, then expand.

Start with one project. Deliver results. Earn the right to grow the relationship. Expand only when you experience value firsthand.

Our success depends entirely on your success.

If the Build Sprint doesn't deliver results, you don't continue. If we don't help you ship, we don't deserve your business.

We grow with you. Or we don't grow at all.`
      },
      compoundLearning: {
        title: "5. Privacy as a Right, Not a Feature",
        content: `Your users' data isn't a monetization opportunity. It's a responsibility.

Your data lives in the EU. Processed by EU-sovereign AI. Protected by German law.

No US server transmission. No compliance shortcuts. No "we're working on certifications." Either you're compliant on day one, or you're not.

We believe privacy is a right, not a feature you pay extra for.`
      },
      invisibleIntegration: {
        title: "6. Integration Should Be Invisible",
        content: `If you're writing custom code to connect your auth to your database to your email to your payments, someone failed.

If you're maintaining Zapier workflows between your own systems, someone failed.

If you're the glue between your own infrastructure, someone failed.

Integration should be invisible.

Applications built on a unified data model talk to each other automatically. Events trigger workflows. Data flows seamlessly. You build features instead of connections.

We believe software should work together without you thinking about it.`
      },
      compoundPlatforms: {
        title: "7. Compound Platforms Win",
        content: `This isn't opinion. This is market reality.

Vercel started with deployment. Now they sell the entire frontend cloud.
Supabase started with database. Now they have auth, storage, edge functions.
Stripe started with payments. Now they have billing, invoicing, identity, radar.

The pattern is unmistakable: Compound platforms are eating point solutions for breakfast.

Why? Because real products span multiple domains. Founders don't want ten specialized tools. They want one system that handles the boring parts so they can focus on the interesting ones.

Point solutions optimize for simplicity. Compound platforms optimize for shipping.`
      }
    },

    whatWeReject: {
      title: "What We Reject",
      items: [
        {
          title: "We Reject: Infrastructure That Fights You",
          content: "If you're spending more time configuring tools than building features, your tools have failed you.\n\nInfrastructure should accelerate building, not slow it down."
        },
        {
          title: "We Reject: AI Hype Without AI Substance",
          content: "\"AI-powered\" means nothing if it doesn't ship faster.\n\nTechnology should multiply your output, not your buzzword count."
        },
        {
          title: "We Reject: Boilerplate as a Business Model",
          content: "Charging founders to rebuild the same infrastructure every project is not a service—it's a tax on ambition.\n\nThe boring parts should be solved once, for everyone."
        },
        {
          title: "We Reject: Privacy as a Negotiable Feature",
          content: "If your infrastructure transmits user data to foreign servers by default, you're not providing a platform—you're creating liability.\n\nCompliance is not optional."
        },
        {
          title: "We Reject: Complexity Disguised as Flexibility",
          content: "\"You can customize anything\" often means \"you have to configure everything.\"\n\nWe build what works by default, not what works after a week of setup."
        }
      ]
    },

    whyNow: {
      title: "Why Now?",
      subtitle: "Three forces are converging:",
      forces: [
        {
          title: "1. AI Has Crossed the Threshold",
          content: "Private LLMs work reliably. EU-sovereign hosting is available. Agent frameworks are mature.\n\nAI is no longer experimental. It's production-ready.\n\nFounders deploying AI-accelerated development in 2025 will have shipped twice as much by 2027."
        },
        {
          title: "2. Boilerplate Economics Have Collapsed",
          content: "Every founder rebuilding auth is wasting time. Every team configuring payments from scratch is burning money. Nobody wants to solve solved problems.\n\nThe market is consolidating around platforms that eliminate setup."
        },
        {
          title: "3. Founders Are Ready",
          content: "The tolerance for development friction is at an all-time low. Founders have seen what's possible with modern tooling. They expect to ship fast.\n\nThe appetite for speed has never been higher."
        }
      ]
    },

    theStakes: {
      title: "The Stakes",
      ifRight: {
        title: "If We're Right:",
        content: "Founders who build on compound platforms become:\n- First to market (while competitors configure)\n- Capital efficient (ship more with less)\n- Attractive to investors (velocity matters)\n- Free to focus (on problems worth solving)"
      },
      ifWrong: {
        title: "If We're Wrong:",
        content: "We go out of business. Founders go back to rebuilding auth for the 47th time.\n\nBut we're not wrong."
      }
    },

    theMovement: {
      title: "Our Commitment",
      content: `To Our Builders:

We will never prioritize new customers over existing builder success. Our business model depends on you shipping—which means we only win when you win.

Your launch is not a side effect. It's the entire business model.

To Our Team:

We will build infrastructure that solves real problems, not features that look good in demos.

Shipping code is not the goal. Helping builders ship is.

To Ourselves:

We will not compromise on these beliefs to chase short-term revenue. We will not sacrifice privacy for convenience.

We will build the platform we wish existed when we were starting.`
    },

    theInvitation: {
      title: "The Invitation",
      content: `This is not just about l4yercak3. This is about how software should be built.

We're building proof that compound platforms can serve founders profitably. That AI can multiply builder capacity. That the boring parts can be solved once, for everyone.

If we succeed, we prove the model works. Then every founder has a blueprint for shipping faster.

This is bigger than one company.`
    },

    ourCommitment: {
      title: "Our Commitment",
      toCustomers: {
        title: "To Our Builders:",
        content: "We will never prioritize new customers over existing builder success. Our business model depends on you shipping—which means we only win when you win.\n\nYour launch is not a side effect. It's the entire business model."
      },
      toTeam: {
        title: "To Our Team:",
        content: "We will build infrastructure that solves real problems, not features that look good in demos.\n\nShipping code is not the goal. Helping builders ship is."
      },
      toIndustry: {
        title: "To Our Industry:",
        content: "We will publish our learnings openly. We will share our mistakes transparently. We will prove that compound platforms can serve founders profitably.\n\nIf we succeed, the entire industry benefits."
      },
      toOurselves: {
        title: "To Ourselves:",
        content: "We will not compromise on these beliefs to chase short-term revenue. We will not sacrifice privacy for convenience.\n\nWe will build the platform we wish existed when we were starting."
      }
    },

    bottomLine: {
      title: "The Bottom Line",
      content: "The boilerplate era gave us development hell.\n\nCompound platforms give us time to build.\n\nL4YERCAK3 gives founders the freedom to focus on what matters instead of what's been solved.\n\nThis is our manifesto. This is what we believe. This is what we're building."
    },

    joinUs: {
      title: "Join Us",
      content: `If you believe:
- Ship speed beats perfectionism
- Systems beat services
- AI should multiply builders, not replace them
- Software should work together invisibly
- Privacy is a right, not a feature
- Compound platforms win

Then you're part of this movement.

The compound builder era is here. Be part of building it.`
    },

    signature: {
      content: "Signed,\nThe L4YERCAK3 Team"
    }
  },

  // Call to action
  cta: {
    title: "Ready to Ship?",
    description: "Join the founders who are building faster by starting with more.",
    buttons: {
      scheduleCall: "Book a Strategy Call",
      calculateROI: "Do More with Less",
      readStory: "Apply for Build Sprint"
    }
  }
};