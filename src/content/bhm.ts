export type NavItem = {
  label: string;
  to: string;
};

export type ExternalLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  kind: "facebook" | "instagram" | "linkedin" | "x" | "youtube";
};

export type Office = {
  label: string;
  address: string;
};

export type ServiceHighlight = {
  title: string;
  emphasis: string;
  summary: string;
  href: string;
};

export type EvidenceGroup = {
  title: string;
  items: string[];
};

export type PublishedCaseStudy = {
  id: string;
  client: string;
  title: string;
  campaign: string;
  format: string;
  image: string;
  imageAlt: string;
  assetUrl: string;
  assetLabel: string;
};

export const companyInfo = {
  name: "BHM",
  legalName: "Blackhouse Media Limited",
  summary:
    "BHM is an international public relations and communications company working from Nigeria and the United Kingdom.",
  email: "hello@bhmng.com",
  phones: [
    {
      label: "Nigeria",
      value: "+234 909 841 1081",
      href: "tel:+2349098411081",
    },
    {
      label: "United Kingdom",
      value: "+44 204 537 2731",
      href: "tel:+442045372731",
    },
  ],
  offices: [
    {
      label: "Lagos Office",
      address: "32 Community Road, Ikeja, Lagos.",
    },
    {
      label: "London Office",
      address: "Fora Soho, 33 Broadwick St, London W1F 0DQ.",
    },
    {
      label: "Edinburgh Office",
      address: "CodeBase Edinburgh, 37A Castle Terrace, Edinburgh EH1 2EL. By appointment only.",
    },
  ] satisfies Office[],
  socialLinks: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/blackhousemedia",
      kind: "facebook",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/bhmng",
      kind: "instagram",
    },
    {
      label: "X",
      href: "https://twitter.com/bhmng",
      kind: "x",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/black-house-media",
      kind: "linkedin",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/user/bhmgroup",
      kind: "youtube",
    },
  ] satisfies SocialLink[],
  externalPages: {
    website: "https://bhmng.com/",
    about: "https://bhmng.com/about/",
    services: "https://bhmng.com/services/",
    clients: "https://bhmng.com/clients/",
    caseStudies: "https://bhmng.com/case-studies/",
    faqs: "https://bhmng.com/faqs/",
    privacy: "https://bhmng.com/privacy-policy/",
  },
};

export const siteNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Contact BHM", to: "/contact-us" },
];

export const homeHeroContent = {
  topActionLabel: "Contact BHM",
  topActionHref: "/contact-us",
  lineOneLead: "International",
  lineOneAccent: "public relations.",
  lineTwoLead: "Built in Nigeria.",
  lineTwoAccent: "Working across the UK.",
  description:
    "BHM helps brands and institutions navigate media relations, crisis moments, research and intelligence, and broader communications strategy from teams working across Nigeria, the United Kingdom, and partner markets.",
  primaryCta: {
    label: "View case studies",
    href: "/case-studies",
  },
  secondaryCta: {
    label: "Talk to BHM",
    href: "/contact-us",
  },
};

export const integratedSectionContent = {
  eyebrow: "BHM Services",
  headingLead: "Communications",
  headingAccent: "With Range",
  description:
    "BHM combines senior communications thinking with execution across media, crisis, intelligence, and content so teams can move with more control.",
  services: [
    {
      title: "Media",
      emphasis: "Relations",
      summary:
        "Deep local and global media understanding that helps brands shape coverage, manage narratives, and create useful press momentum.",
      href: companyInfo.externalPages.services,
    },
    {
      title: "Crisis",
      emphasis: "Management",
      summary:
        "Strategic support for sensitive moments, helping organisations respond with clarity when pressure rises and reputational risk accelerates.",
      href: companyInfo.externalPages.services,
    },
    {
      title: "Research &",
      emphasis: "Intelligence",
      summary:
        "Decision support rooted in monitoring, market signals, and flagship research outputs that help partners act on evidence, not instinct.",
      href: companyInfo.externalPages.services,
    },
  ] satisfies ServiceHighlight[],
};

export const workWithSectionContent = {
  leftTitleLead: "We Are",
  leftTitleAccent: "BHM",
  leftParagraph:
    "BHM consultants and advisers support clients and partners in more than 100 cities, with offices in Lagos, London, and Edinburgh.",
  facts: [
    "Partners across\n100+ cities",
    "Lagos, London &\nEdinburgh offices",
    "People before profit,\nintegrity before image",
    "Media, crisis &\nintelligence depth",
  ],
  rightTitleLead: "How Clients",
  rightTitleAccent: "Use BHM",
  rightParagraph:
    "Teams engage BHM when they need communications support that blends strategic thinking, execution discipline, and on-the-ground media understanding.",
  pillars: [
    {
      title: "Media and Reputation",
      description:
        "Media relations, crisis management, brand management, and community relations for organisations under real visibility pressure.",
    },
    {
      title: "Strategy and Intelligence",
      description:
        "Research and intelligence, creative strategy, and communications planning that keep decisions anchored in context.",
    },
    {
      title: "Execution and Enablement",
      description:
        "Content strategy, experiential communication, training, and asset management for teams that need ideas turned into working programs.",
    },
  ],
  cta: {
    label: "Start a conversation",
    href: "/contact-us",
  },
};

export const evidenceSectionContent = {
  eyebrow: "Why BHM",
  headingLead: "Public Proof",
  headingAccent: "Across The Work",
  description:
    "BHM's public footprint spans current client relationships, flagship research, and specialist communications capabilities built for high-visibility organisations.",
  cta: {
    label: "Contact BHM",
    href: "/contact-us",
  },
  groups: [
    {
      title: "Selected Current Clients",
      items: ["MTN", "MultiChoice", "FCMB"],
    },
    {
      title: "Flagship Research",
      items: [
        "Nigeria PR Report",
        "Concept of Virality",
        "BHM Guide to Public Relations",
      ],
    },
    {
      title: "Core Capability Areas",
      items: [
        "Media Relations",
        "Crisis Management",
        "Research & Intelligence",
      ],
    },
  ] satisfies EvidenceGroup[],
};

export const caseStudiesPageContent = {
  heroTitle: "Case Studies",
  heroParagraph:
    "A selection of public BHM case-study assets covering campaigns, brand programs, and communications work for major organisations.",
  intro: {
    eyebrow: "Published Work",
    leadingText: "Campaign Assets.",
    accentText: "Client Work.",
    trailingText: "Public Reference.",
    paragraphOne:
      "This page brings together public BHM case-study files in a format that is easier to scan than the source archive while still staying faithful to the published material.",
    paragraphTwo:
      "Each card links directly to the original BHM asset so visitors can review the public case-study files themselves.",
  },
  studies: [
    {
      id: "mtn-wcwdt-2019",
      client: "MTN Foundation",
      title: "MTN WCWDT 2019",
      campaign: "Public BHM case-study asset for MTN Foundation's WCWDT 2019 work.",
      format: "PDF",
      image:
        "https://bhmng.com/wp-content/uploads/2022/09/mtn-foundation-2019.jpg",
      imageAlt: "Preview image for the MTN WCWDT 2019 BHM case-study asset.",
      assetUrl:
        "https://bhmng.com/wp-content/uploads/2022/09/MTN-Foundation-WCWDT-min.pdf",
      assetLabel: "Open PDF",
    },
    {
      id: "heineken-ucl-2019",
      client: "Heineken",
      title: "HEINEKEN UCL 2019",
      campaign:
        "Public BHM case-study asset for Heineken's UEFA Champions League 2019 campaign.",
      format: "PDF",
      image:
        "https://bhmng.com/wp-content/uploads/2022/09/heineken-ucl-2019-bhm.jpg",
      imageAlt: "Preview image for the HEINEKEN UCL 2019 BHM case-study asset.",
      assetUrl:
        "https://bhmng.com/wp-content/uploads/2022/09/Heineken-UCL-2019-min.pdf",
      assetLabel: "Open PDF",
    },
    {
      id: "heineken-share-the-drama",
      client: "Heineken",
      title: "HEINEKEN SHARE THE DRAMA",
      campaign:
        "Public BHM case-study asset for Heineken's Share the Drama campaign.",
      format: "PDF",
      image:
        "https://bhmng.com/wp-content/uploads/2022/09/Heineken-Share-The-Drama.png",
      imageAlt:
        "Preview image for the HEINEKEN Share the Drama BHM case-study asset.",
      assetUrl:
        "https://bhmng.com/wp-content/uploads/2022/09/Heineken-UCL.pdf",
      assetLabel: "Open PDF",
    },
    {
      id: "heineken-192-countries",
      client: "Heineken",
      title: "HEINEKEN 192 COUNTRIES",
      campaign:
        "Public BHM campaign asset covering Heineken's 192 Countries work.",
      format: "Image",
      image:
        "https://bhmng.com/wp-content/uploads/2022/09/Heineken-192.png",
      imageAlt:
        "Preview image for the HEINEKEN 192 Countries BHM campaign asset.",
      assetUrl:
        "https://bhmng.com/wp-content/uploads/2022/09/Heineken-scaled.jpg",
      assetLabel: "Open image",
    },
    {
      id: "mtn-this-is-naija",
      client: "MTN",
      title: "MTN THIS IS NAIJA",
      campaign:
        "Public BHM infographic asset for MTN's This Is Naija campaign.",
      format: "PDF",
      image: "https://bhmng.com/wp-content/uploads/2022/09/MTN-Naija.png",
      imageAlt: "Preview image for the MTN This Is Naija BHM campaign asset.",
      assetUrl:
        "https://bhmng.com/wp-content/uploads/2022/09/MTN-infographics.pdf",
      assetLabel: "Open PDF",
    },
  ] satisfies PublishedCaseStudy[],
};

export const contactPageContent = {
  heroTitle: "Contact BHM",
  heroParagraph:
    "Speak with BHM about media relations, crisis management, research and intelligence, or broader communications support across Nigeria, the United Kingdom, and partner markets.",
  heroActionLabel: "Call BHM",
  heroActionHref: companyInfo.phones[0].href,
  formEyebrow: "Contact BHM",
  formTitle: "Reach The BHM Team",
  formDescription:
    "Share a brief note about what you are navigating and the BHM team will have the right office or adviser pick it up from there.",
  submitLabel: "Send enquiry",
};

export const footerContent = {
  summary:
    "BHM supports organisations that need serious communications work across media, crisis, research, and reputation.",
  localLinks: [
    { label: "Home", href: "/" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact BHM", href: "/contact-us" },
  ] satisfies ExternalLink[],
  bhmLinks: [
    { label: "About", href: companyInfo.externalPages.about },
    { label: "Services", href: companyInfo.externalPages.services },
    { label: "Clients", href: companyInfo.externalPages.clients },
    { label: "FAQs", href: companyInfo.externalPages.faqs },
  ] satisfies ExternalLink[],
  resourceLinks: [
    { label: "Privacy Policy", href: companyInfo.externalPages.privacy },
    { label: "Visit bhmng.com", href: companyInfo.externalPages.website },
  ] satisfies ExternalLink[],
};

export function getDocumentTitle(pathname: string) {
  if (pathname === "/case-studies") {
    return "Case Studies | BHM";
  }

  if (pathname === "/contact-us") {
    return "Contact BHM | BHM";
  }

  return "BHM";
}
