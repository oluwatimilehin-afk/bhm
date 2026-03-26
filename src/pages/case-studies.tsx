import KronusContactHero from "../components/KronusContactHero";
import KronusCaseStudiesIntroSection from "../components/KronusCaseStudiesIntroSection";
import KronusCaseStudiesListSection, {
  type KronusCaseStudy,
} from "../components/KronusCaseStudiesListSection";

const caseStudies: KronusCaseStudy[] = [
  {
    id: "hotboxin",
    image: "https://picsum.photos/seed/kronus-podcast/846/988?grayscale",
    imageAlt:
      "Two people reaching toward a football in a black-and-white promotional image.",
    title:
      "Scaling a Global Celebrity Podcast into a Seven-Figure Social Media Asset",
    meta: [
      "Celebrity media brand",
      "Global audience",
      "High-engagement social growth",
    ],
    challengeQuote:
      "With unfiltered conversations and a larger-than-life persona, the challenge was translating the raw intensity of the show into consistent, high-impact digital moments that could scale across platforms.",
    whatWeDid:
      "We assumed full control of social media strategy and execution for Hotboxin' with Mike Tyson, developing an organic content framework designed to capture the show's authenticity while maximizing reach, engagement, and audience loyalty across platforms.",
    result:
      "The social channels surpassed 1 million followers, built a highly engaged global community, and generated over $300,000 in sponsorship revenue, transforming the show’s digital presence into a meaningful commercial engine.",
    href: "#hotboxin",
  },
  {
    id: "founder-reputation",
    image: "https://picsum.photos/seed/kronus-founder/846/988?grayscale",
    imageAlt:
      "Black-and-white portrait style business image used for a founder reputation case study.",
    title:
      "Repositioning a Founder Under Pressure Into a Credible Industry Voice",
    meta: [
      "Founder-led company",
      "Executive positioning",
      "Thought-leadership strategy",
    ],
    challengeQuote:
      "After months of inconsistent press and fragmented messaging, the founder needed a public-facing narrative that felt authoritative, calm, and commercially aligned with the next phase of growth.",
    whatWeDid:
      "We rebuilt the executive narrative from the ground up, aligning earned media, social content, and speaking strategy around a tighter positioning framework that clarified the founder's expertise and reinforced the company's market relevance.",
    result:
      "Within one quarter, the brand re-entered key conversations with stronger message consistency, higher-quality media opportunities, and a materially improved perception among customers, investors, and partners.",
    href: "#founder-reputation",
  },
  {
    id: "crisis-response",
    image: "https://picsum.photos/seed/kronus-crisis/846/988?grayscale",
    imageAlt:
      "Black-and-white city image used for a crisis communications case study.",
    title:
      "Turning a Fast-Moving Reputation Event Into a Controlled Crisis Response",
    meta: ["National brand", "Rapid response", "Crisis communications"],
    challengeQuote:
      "The issue escalated quickly across digital channels, creating a volatile environment where delayed communication would have amplified confusion, speculation, and reputational harm.",
    whatWeDid:
      "We created a centralized response architecture spanning stakeholder messaging, executive guidance, media handling, and real-time narrative monitoring so the organization could respond quickly without sounding reactive or fragmented.",
    result:
      "The organization regained message discipline, reduced narrative drift, and moved from defensive reaction to proactive control in the most visible phase of the incident.",
    href: "#crisis-response",
  },
  {
    id: "digital-reputation",
    image: "https://picsum.photos/seed/kronus-digital/846/988?grayscale",
    imageAlt:
      "Black-and-white architecture image used for a digital reputation management case study.",
    title:
      "Rebuilding Search and Social Trust for a High-Visibility Personal Brand",
    meta: ["Personal brand", "Search visibility", "Reputation management"],
    challengeQuote:
      "Legacy coverage and uncontrolled commentary were shaping first impressions online, making it difficult for the client's current work, expertise, and credibility to surface clearly.",
    whatWeDid:
      "We developed a multi-channel reputation strategy that paired high-authority content creation with platform-by-platform social management, allowing the client to publish a more accurate and compelling narrative across the digital ecosystem.",
    result:
      "The refreshed presence improved search quality, elevated brand trust, and created a more investable online footprint for future partnerships, media, and business development.",
    href: "#digital-reputation",
  },
  {
    id: "corporate-launch",
    image: "https://picsum.photos/seed/kronus-launch/846/988?grayscale",
    imageAlt:
      "Black-and-white corporate skyline image used for a launch communications case study.",
    title:
      "Launching a New Corporate Narrative With Clearer Market Positioning",
    meta: ["B2B company", "Market entry", "Strategic communications"],
    challengeQuote:
      "The company had the capability and momentum to grow, but its external story lacked the clarity needed to resonate with media, customers, and strategic partners at the same time.",
    whatWeDid:
      "We translated a complex service offering into a tighter market story, then built a rollout plan across leadership messaging, website copy, media angles, and supporting content to ensure every touchpoint reinforced the same narrative.",
    result:
      "The launch created a more coherent market identity, improved message retention across stakeholders, and gave the business a stronger platform for awareness and pipeline growth.",
    href: "#corporate-launch",
  },
];

const CaseStudies = () => {
  return (
    <>
      <KronusContactHero
        title="Case Studies"
        paragraph="Real-World Examples Of How Kronus Communications Protects Reputation, Controls Narratives, And Delivers Measurable Impact In High-Stakes Environments."
      />
      <KronusCaseStudiesIntroSection />
      <KronusCaseStudiesListSection caseStudies={caseStudies} />
    </>
  );
};

export default CaseStudies;
