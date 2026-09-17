/**
 * Single source of truth for IBCR site content.
 *
 * FROM THE CHAMBER — membership categories and pricing, the board, the mission
 * and vision statements, the key sectors and the sub-committees come from the
 * IBCR presentation deck and are verified content.
 *
 * PLACEHOLDER NOTICE — member companies, testimonials, event dates, insight
 * articles and the secretariat units below are still illustrative sample
 * content used to build out the experience. Replace them with verified IBCR
 * data (or wire this module to the CMS) before the site goes live. See
 * README.md → "Replacing sample content".
 */

export const SITE = {
  name: "Indian Business Chamber in Rwanda",
  shortName: "IBCR",
  tagline: "Connect · Collaborate · Grow",
  positioning: "Connecting India. Empowering Rwanda. Creating Opportunities.",
  description:
    "IBCR is a business platform strengthening trade, investment and economic collaboration between India and Rwanda.",
  url: "https://ibcr.rw",
  email: "info@ibcr.rw",
  membershipEmail: "membership@ibcr.rw",
  phone: "+250 788 000 000",
  phoneHref: "+250788000000",
  whatsapp: "+250788000000",
  address: {
    line1: "Kigali Heights, KG 7 Ave",
    line2: "Kimihurura, Kigali",
    country: "Rwanda",
  },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/", handle: "IBCR Rwanda" },
    { label: "Facebook", href: "https://www.facebook.com/", handle: "IBCR Rwanda" },
    { label: "X", href: "https://x.com/", handle: "@ibcr_rw" },
    { label: "Instagram", href: "https://www.instagram.com/", handle: "@ibcr.rw" },
    { label: "YouTube", href: "https://www.youtube.com/", handle: "IBCR Rwanda" },
  ],
} as const;

/* -------------------------------------------------------------- navigation */

export type NavChild = { label: string; href: string; note?: string };
export type NavItem = {
  label: string;
  href: string;
  summary?: string;
  children?: NavChild[];
};

export const NAV: NavItem[] = [
  {
    label: "About",
    href: "/about",
    summary: "Who we are, what we stand for and the people behind the Chamber.",
    children: [
      { label: "Who We Are", href: "/about#who-we-are", note: "The Chamber in brief" },
      { label: "Vision & Mission", href: "/about#vision", note: "What we are building" },
      { label: "Board Members", href: "/about#leadership", note: "The seven who govern" },
      { label: "Secretariat Team", href: "/about#team", note: "Day-to-day delivery" },
      { label: "Partners", href: "/about#partners", note: "Institutions we work with" },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
    summary: "Join a network built for market access, visibility and influence.",
    children: [
      { label: "Why Become a Member", href: "/membership#why", note: "The case for joining" },
      { label: "Benefits", href: "/membership#benefits", note: "What you receive" },
      { label: "Categories & Fees", href: "/membership#categories", note: "Silver to Corporate" },
      { label: "Member Directory", href: "/members", note: "Search the network" },
      { label: "Become a Member", href: "/membership/join", note: "Apply online" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    summary: "Practical support across market entry, trade, capital and policy.",
    children: [
      { label: "Market Entry", href: "/services#market-entry" },
      { label: "Trade Facilitation", href: "/services#trade-facilitation" },
      { label: "Investment Advisory", href: "/services#investment-advisory" },
      { label: "Business Delegations", href: "/services#business-delegations" },
      { label: "Business Intelligence", href: "/services#business-intelligence" },
      { label: "Advocacy & Policy", href: "/services#advocacy-policy" },
    ],
  },
  {
    label: "India × Rwanda",
    href: "/india-rwanda",
    summary: "Two markets, one growing relationship — and where it is heading.",
    children: [
      { label: "Why Rwanda", href: "/india-rwanda#why-rwanda" },
      { label: "Why India", href: "/india-rwanda#why-india" },
      { label: "The Trade Corridor", href: "/india-rwanda#corridor" },
      { label: "Investment Opportunities", href: "/india-rwanda#opportunities" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    summary: "Forums, delegations and B2B engagements across both markets.",
    children: [
      { label: "Upcoming Events", href: "/events#upcoming" },
      { label: "Past Events", href: "/events#past" },
      { label: "Event Registration", href: "/events#register" },
    ],
  },
  {
    label: "Insights",
    href: "/insights",
    summary: "News, market intelligence and publications from the Chamber.",
    children: [
      { label: "All Insights", href: "/insights" },
      { label: "IBCR News", href: "/insights?category=IBCR+News" },
      { label: "Market Intelligence", href: "/insights?category=Market+Intelligence" },
      { label: "Reports & Publications", href: "/insights?category=Reports" },
    ],
  },
];

/* -------------------------------------------------------------------- hero */

export const HERO = {
  eyebrow: "India × Rwanda",
  title: "Connecting India.",
  accent: "Empowering Rwanda.",
  copy: "Building stronger India–Rwanda business relations through trade, investment, networking, advocacy and strategic partnerships.",
  cta: { label: "Become a Member", href: "/membership/join" },
  secondary: { label: "Explore Opportunities", href: "/india-rwanda#opportunities" },
  video: "/video/hero-corridor.mp4",
  poster: "/video/hero-corridor-poster.jpg",
} as const;

/* ------------------------------------------------------------ at a glance */

/** The tagline, carried as the Chamber's three working pillars. */
export const PILLARS = [
  {
    id: "connect",
    number: "01",
    title: "Connect",
    copy: "Meet the businesses, investors, institutions and decision-makers who shape trade between India and Rwanda.",
    icon: "connect",
  },
  {
    id: "collaborate",
    number: "02",
    title: "Collaborate",
    copy: "Turn introductions into partnerships — joint ventures, distribution, supply agreements and co-investment.",
    icon: "collaborate",
  },
  {
    id: "grow",
    number: "03",
    title: "Grow",
    copy: "Expand into Rwanda and the wider East African market with intelligence, advocacy and the Chamber behind you.",
    icon: "grow",
  },
] as const;

export const STATS = [
  {
    value: 445,
    prefix: "USD ",
    suffix: "M",
    label: "Committed Indian investment in Rwanda in 2024",
  },
  { value: 9, prefix: "", suffix: "", label: "Key sectors driving the corridor today" },
  { value: 4, prefix: "", suffix: "", label: "Membership categories, professional to corporate" },
  { value: 3, prefix: "", suffix: "", label: "Sub-committees turning plans into delivery" },
] as const;

/**
 * Kept distinct from PILLARS above — the tagline covers connect/collaborate/
 * grow, so these describe what the Chamber puts behind those three.
 */
export const WHY_IBCR = [
  {
    title: "A bridge between communities",
    copy: "The place where the Indian and Rwandan business communities actually meet, and a platform for collaboration with government and international stakeholders.",
  },
  {
    title: "A voice for business",
    copy: "A unified voice representing Indian enterprise in Rwanda, and representation for members in front of government.",
  },
  {
    title: "An advisory body",
    copy: "Trade, business, market and legal advice — and a business growth ecosystem for entrepreneurs once the advice has been taken.",
  },
  {
    title: "A gateway to Africa",
    copy: "Trade and investment facilitation that opens doors for Indian companies into Rwanda and the wider continent.",
  },
] as const;

/* ---------------------------------------------------------- mission/vision */

export const MISSION = {
  statement:
    "IBCR drives meaningful business connectivity between India and Rwanda by enabling investment opportunities, facilitating trade relations, advocating for member interests, and delivering strategic business support that contributes to long-term economic prosperity.",
} as const;

export const VISION = {
  statement:
    "To position IBCR as the premier platform advancing India–Rwanda commercial excellence, economic diplomacy, and sustainable cross-border partnerships.",
  points: [
    "To be the most influential and respected India–Africa bilateral business chamber",
    "To position Rwanda as the premier gateway for Indian business into Africa",
    "To create a thriving ecosystem of commerce, collaboration and shared growth",
    "To achieve sustainable bilateral trade growth aligned with IBCR Vision 2030",
  ],
} as const;

/* ---------------------------------------------------------------- services */

export const SERVICES = [
  {
    id: "market-entry",
    image: "/images/services/market-entry.jpg",
    short: "Understand the market before you commit",
    number: "01",
    title: "Market Entry",
    copy: "Helping Indian companies understand and enter the Rwandan market — company formation, licensing, local partners and a realistic view of what it takes.",
    detail: [
      "Market scan and entry-mode assessment",
      "Company registration and licensing guidance",
      "Introductions to legal, tax and banking partners",
      "Local partner and distributor identification",
    ],
    icon: "door",
  },
  {
    id: "trade-facilitation",
    image: "/images/services/trade-facilitation.jpg",
    short: "Buyers, suppliers and the logistics between",
    number: "02",
    title: "Trade Facilitation",
    copy: "Connecting businesses with buyers, suppliers and strategic partners, and smoothing the practical friction in between.",
    detail: [
      "Buyer and supplier matchmaking",
      "Trade documentation and logistics guidance",
      "Standards, certification and customs orientation",
      "Sector-specific trade missions",
    ],
    icon: "route",
  },
  {
    id: "investment-advisory",
    image: "/images/services/investment-advisory.jpg",
    short: "Turning interest into commitment",
    number: "03",
    title: "Investment Advisory",
    copy: "Identifying investment opportunities and facilitating the stakeholder connections that turn interest into commitment.",
    detail: [
      "Opportunity pipeline across priority sectors",
      "Investor–promoter introductions",
      "Incentives, permits and RDB engagement",
      "Post-investment aftercare",
    ],
    icon: "chart",
  },
  {
    id: "business-delegations",
    image: "/images/services/business-delegations.jpg",
    short: "B2B meetings in both directions",
    number: "04",
    title: "Business Delegations",
    copy: "Organising B2B meetings, trade missions and institutional engagements in both directions — Kigali to India, India to Kigali.",
    detail: [
      "Inbound and outbound delegations",
      "Curated B2B meeting schedules",
      "Institutional and government meetings",
      "Site visits and industrial park tours",
    ],
    icon: "users",
  },
  {
    id: "business-intelligence",
    image: "/images/services/business-intelligence.jpg",
    short: "Briefings written for decision-makers",
    number: "05",
    title: "Business Intelligence",
    copy: "Market insights, sector briefings, regulatory updates and opportunity analysis written for people who have to make decisions.",
    detail: [
      "Quarterly India–Rwanda trade briefings",
      "Sector deep-dives and demand mapping",
      "Regulatory and policy monitoring",
      "Bespoke research for members",
    ],
    icon: "compass",
  },
  {
    id: "advocacy-policy",
    image: "/images/services/advocacy-policy.jpg",
    short: "A collective voice in the dialogue",
    number: "06",
    title: "Advocacy & Policy",
    copy: "Representing business interests and supporting constructive public-private dialogue on the issues that affect trade and investment.",
    detail: [
      "Position papers and policy submissions",
      "Public-private dialogue platforms",
      "Issue escalation for member companies",
      "Bilateral institutional engagement",
    ],
    icon: "shield",
  },
] as const;

/* --------------------------------------------------------- opportunities */

export const OPPORTUNITIES = [
  {
    id: "agriculture",
    title: "Agriculture & Agribusiness",
    copy: "Value addition, cold chain, irrigation technology and export-grade processing.",
    metric: "Priority sector",
    image: "/images/opportunities/agriculture.jpg",
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    copy: "Light manufacturing, pharmaceuticals, packaging and building materials.",
    metric: "Made in Rwanda",
    image: "/images/opportunities/manufacturing.jpg",
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    copy: "Roads, housing, industrial parks, water and urban development projects.",
    metric: "Long horizon",
    image: "/images/opportunities/infrastructure.jpg",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    copy: "Hospitals, diagnostics, medical devices and pharmaceutical distribution.",
    metric: "High demand",
    image: "/images/opportunities/healthcare.jpg",
  },
  {
    id: "technology",
    title: "Technology & Innovation",
    copy: "Fintech, digital public infrastructure, IT services and engineering talent.",
    metric: "Fast growth",
    image: "/images/opportunities/technology.jpg",
  },
  {
    id: "tourism",
    title: "Tourism & Hospitality",
    copy: "Hotels, MICE facilities, eco-tourism and destination services.",
    metric: "Premium market",
    image: "/images/opportunities/tourism.jpg",
  },
  {
    id: "energy",
    title: "Energy",
    copy: "Solar, mini-grids, energy storage and productive-use appliances.",
    metric: "Access agenda",
    image: "/images/opportunities/energy.jpg",
  },
  {
    id: "logistics",
    title: "Logistics",
    copy: "Freight, warehousing, cold storage and regional distribution hubs.",
    metric: "Regional gateway",
    image: "/images/opportunities/logistics.jpg",
  },
] as const;

/* -------------------------------------------------------------- membership */

/**
 * The four categories, their annual fees and their benefits, exactly as the
 * Chamber's deck sets them out.
 *
 * `price` is keyed by the two rates the deck quotes — the standard annual fee
 * and the exclusive limited offer — which is what the toggle above the cards
 * switches between. A string price (Corporate) is printed as written.
 */
export const MEMBERSHIP_RATES = ["standard", "launch offer"] as const;
export type MembershipRate = (typeof MEMBERSHIP_RATES)[number];

export type MembershipTier = {
  id: string;
  name: string;
  /** The deck's one-line positioning for the category. */
  label: string;
  price: Record<MembershipRate, number | string>;
  currency: string;
  period: string;
  who: string;
  /** Named tier whose benefits this one builds on, per the deck. */
  inherits?: string;
  benefits: string[];
  eligibility: string;
  featured?: boolean;
};

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "silver",
    name: "Silver",
    label: "Professional & SME",
    price: { standard: 250_000, "launch offer": 124_999 },
    currency: "RWF",
    period: "/yr",
    who: "Designed for startups, professionals, freelancers and emerging entrepreneurs who want to become part of the India\u2013Rwanda business ecosystem.",
    benefits: [
      "Representative participation in the Board",
      "Sub-committee participation opportunity",
      "Access to general networking events",
      "Invitations to selected chamber activities",
      "Access to newsletters and business updates",
      "Networking with fellow Indian and Rwandan entrepreneurs",
      "Educational and awareness sessions",
      "Basic participation in chamber initiatives",
      "Startup and entrepreneurship guidance sessions",
      "Discounted rates for selected events",
      "Community engagement and relationship building",
    ],
    eligibility: "Startups, professionals, freelancers and emerging entrepreneurs.",
  },
  {
    id: "gold",
    name: "Gold",
    label: "Growth Business",
    price: { standard: 1_000_000, "launch offer": 449_999 },
    currency: "RWF",
    period: "/yr",
    who: "Designed for small and medium businesses seeking visibility, networking and market expansion opportunities.",
    inherits: "Silver",
    benefits: [
      "Business listing in the member directory",
      "Participation in selected trade events",
      "Showcase products and services at chamber activities",
      "Referral support within the chamber ecosystem",
      "Business collaboration opportunities with members",
      "Representative participation in the Board",
      "Sub-committee participation opportunity",
    ],
    eligibility: "Registered small and medium-sized businesses.",
  },
  {
    id: "platinum",
    name: "Platinum",
    label: "Leadership Business",
    price: { standard: 2_000_000, "launch offer": 999_999 },
    currency: "RWF",
    period: "/yr",
    who: "Designed for growing enterprises, medium-sized businesses, exporters, technology firms, consultants and high-potential entrepreneurs.",
    inherits: "Gold",
    benefits: [
      "Premium brand visibility",
      "C-suite network access",
      "Government and institutional engagement",
      "VIP event connectivity",
      "International connectivity",
      "Priority sponsorship",
      "B2B networking opportunities and business referrals",
      "Invitations to trade missions, seminars and workshops",
      "Priority access to sector-specific investment opportunities",
      "Participation in business delegation meetings",
      "Listing on the IBCR website and promotional materials",
      "Chamber business advisory support",
    ],
    eligibility: "Growing enterprises, exporters, technology firms and consultancies.",
    featured: true,
  },
  {
    id: "corporate",
    name: "Corporate",
    label: "Premium Strategic Partner",
    price: { standard: "On request", "launch offer": "On request" },
    currency: "RWF",
    period: "",
    who: "A special category engaging Indian, Rwandan and international multi-million-dollar corporates as part of this prestigious chamber.",
    inherits: "Platinum",
    benefits: [
      "Everything in Platinum",
      "Partnership terms scoped directly with the Board",
      "Reserved for multi-million-dollar corporates",
      "Indian, Rwandan and international enterprises",
    ],
    eligibility: "By discussion with the Board. Talk to the secretariat.",
  },
];

export const MEMBERSHIP_BENEFITS = [
  { title: "Access", copy: "Rooms, relationships and institutions that are hard to reach on your own." },
  { title: "Visibility", copy: "A credible presence in front of buyers, investors and partners in both markets." },
  { title: "Intelligence", copy: "Briefings, sector research and regulatory updates written for decision-makers." },
  { title: "Representation", copy: "A collective voice on the issues that shape the operating environment." },
  { title: "Matchmaking", copy: "Curated introductions to buyers, suppliers, distributors and co-investors." },
  { title: "Soft landing", copy: "Practical help with registration, licensing, banking and hiring." },
] as const;

/* -------------------------------------------------------- member directory */

export type Member = {
  id: string;
  name: string;
  sector: string;
  city: string;
  country: "Rwanda" | "India" | "UAE" | "Kenya";
  tier: "Corporate Member" | "SME Member" | "Startup Member" | "Institutional Member" | "International Member";
  summary: string;
  since: number;
};

export const MEMBER_SECTORS = [
  "Agriculture & Agribusiness",
  "Manufacturing",
  "Infrastructure",
  "Healthcare",
  "Technology",
  "Tourism & Hospitality",
  "Energy",
  "Logistics",
  "Financial Services",
  "Professional Services",
] as const;

export const MEMBERS: Member[] = [
  { id: "m01", name: "Kigali Agro Processing", sector: "Agriculture & Agribusiness", city: "Kigali", country: "Rwanda", tier: "Corporate Member", summary: "Grain milling and export-grade processing for regional markets.", since: 2024 },
  { id: "m02", name: "Deccan Pharma East Africa", sector: "Healthcare", city: "Kigali", country: "Rwanda", tier: "Corporate Member", summary: "Distribution of generics and medical consumables across the region.", since: 2024 },
  { id: "m03", name: "Sahyadri Infra Projects", sector: "Infrastructure", city: "Pune", country: "India", tier: "International Member", summary: "Civil contracting and industrial park development.", since: 2025 },
  { id: "m04", name: "Virunga Cold Chain", sector: "Logistics", city: "Musanze", country: "Rwanda", tier: "SME Member", summary: "Refrigerated storage and last-mile distribution for perishables.", since: 2025 },
  { id: "m05", name: "Nyanza Textiles", sector: "Manufacturing", city: "Nyanza", country: "Rwanda", tier: "SME Member", summary: "Made in Rwanda apparel manufacturing and contract production.", since: 2024 },
  { id: "m06", name: "Bharat Solar Systems", sector: "Energy", city: "Ahmedabad", country: "India", tier: "International Member", summary: "Rooftop solar and mini-grid engineering for African markets.", since: 2025 },
  { id: "m07", name: "Umuganda Digital", sector: "Technology", city: "Kigali", country: "Rwanda", tier: "Startup Member", summary: "Payments infrastructure for SMEs and informal retail.", since: 2025 },
  { id: "m08", name: "Ganges Steel Trading", sector: "Manufacturing", city: "Mumbai", country: "India", tier: "Corporate Member", summary: "Structural steel and building materials supply.", since: 2024 },
  { id: "m09", name: "Akagera Hospitality Group", sector: "Tourism & Hospitality", city: "Kigali", country: "Rwanda", tier: "Corporate Member", summary: "Business hotels and MICE venues in Kigali.", since: 2024 },
  { id: "m10", name: "Kaveri Irrigation Technologies", sector: "Agriculture & Agribusiness", city: "Bengaluru", country: "India", tier: "International Member", summary: "Drip irrigation systems and agronomy support.", since: 2025 },
  { id: "m11", name: "Rwanda Freight Partners", sector: "Logistics", city: "Kigali", country: "Rwanda", tier: "SME Member", summary: "Regional freight forwarding and customs brokerage.", since: 2024 },
  { id: "m12", name: "Indo-Rwanda Advisory", sector: "Professional Services", city: "Kigali", country: "Rwanda", tier: "SME Member", summary: "Cross-border tax, audit and corporate structuring.", since: 2024 },
  { id: "m13", name: "Nile Diagnostics", sector: "Healthcare", city: "Kigali", country: "Rwanda", tier: "SME Member", summary: "Pathology laboratories and imaging services.", since: 2025 },
  { id: "m14", name: "Chennai Engineering Works", sector: "Manufacturing", city: "Chennai", country: "India", tier: "International Member", summary: "Food processing machinery and after-sales service.", since: 2025 },
  { id: "m15", name: "Muhanga Cement Partners", sector: "Manufacturing", city: "Muhanga", country: "Rwanda", tier: "Corporate Member", summary: "Cement blending and construction material supply.", since: 2024 },
  { id: "m16", name: "Kigali Fintech Labs", sector: "Financial Services", city: "Kigali", country: "Rwanda", tier: "Startup Member", summary: "Cross-border remittance and treasury tooling.", since: 2025 },
  { id: "m17", name: "Sunrise Agro Exports", sector: "Agriculture & Agribusiness", city: "Nashik", country: "India", tier: "International Member", summary: "Horticulture exports and post-harvest technology.", since: 2025 },
  { id: "m18", name: "East Africa Power Solutions", sector: "Energy", city: "Nairobi", country: "Kenya", tier: "International Member", summary: "Distributed generation and energy storage integration.", since: 2025 },
  { id: "m19", name: "Gorilla Trails Travel", sector: "Tourism & Hospitality", city: "Kigali", country: "Rwanda", tier: "SME Member", summary: "Inbound corporate travel and destination management.", since: 2024 },
  { id: "m20", name: "Bengaluru Cloud Services", sector: "Technology", city: "Bengaluru", country: "India", tier: "International Member", summary: "Managed IT services and enterprise software delivery.", since: 2025 },
  { id: "m21", name: "Rwanda Polytechnic Enterprise", sector: "Professional Services", city: "Kigali", country: "Rwanda", tier: "Institutional Member", summary: "Skills development and industry training partnerships.", since: 2024 },
  { id: "m22", name: "Gulf Trade Bridge", sector: "Logistics", city: "Dubai", country: "UAE", tier: "International Member", summary: "Transhipment and consolidation between India and East Africa.", since: 2025 },
  { id: "m23", name: "Kivu Aqua Farms", sector: "Agriculture & Agribusiness", city: "Rubavu", country: "Rwanda", tier: "SME Member", summary: "Aquaculture production and cold-chain distribution.", since: 2025 },
  { id: "m24", name: "Meridian Capital Advisors", sector: "Financial Services", city: "Kigali", country: "Rwanda", tier: "Corporate Member", summary: "Transaction advisory and private capital raising.", since: 2024 },
];

/* ------------------------------------------------------------------ events */

export type IbcrEvent = {
  id: string;
  slug: string;
  title: string;
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  city: string;
  type: "Forum" | "Delegation" | "Roundtable" | "Networking" | "Webinar";
  summary: string;
  flagship?: boolean;
  status: "upcoming" | "past";
  attendance?: string;
};

export const EVENTS: IbcrEvent[] = [
  {
    id: "e1",
    slug: "ibcr-business-investment-forum-2026",
    title: "IBCR Business & Investment Forum 2026",
    date: "2026-03-12",
    endDate: "2026-03-13",
    time: "09:00 – 17:30 CAT",
    venue: "Kigali Convention Centre",
    city: "Kigali",
    type: "Forum",
    summary:
      "The Chamber's flagship gathering: two days of sector sessions, curated B2B meetings and institutional dialogue on the India–Rwanda corridor.",
    flagship: true,
    status: "upcoming",
  },
  {
    id: "e2",
    slug: "agribusiness-value-chain-roundtable",
    title: "Agribusiness Value Chain Roundtable",
    date: "2026-01-29",
    time: "14:00 – 17:00 CAT",
    venue: "Kigali Heights",
    city: "Kigali",
    type: "Roundtable",
    summary: "Processors, exporters and technology providers on closing the post-harvest gap.",
    status: "upcoming",
  },
  {
    id: "e3",
    slug: "india-rwanda-trade-mission-mumbai",
    title: "India–Rwanda Trade Mission: Mumbai",
    date: "2026-02-17",
    endDate: "2026-02-20",
    time: "Full programme",
    venue: "Multiple venues",
    city: "Mumbai",
    type: "Delegation",
    summary: "An outbound delegation of Rwandan enterprises meeting Indian manufacturers and investors.",
    status: "upcoming",
  },
  {
    id: "e4",
    slug: "members-evening-kigali",
    title: "Members' Evening — Kigali",
    date: "2026-02-05",
    time: "18:30 – 21:00 CAT",
    venue: "Norrsken House Kigali",
    city: "Kigali",
    type: "Networking",
    summary: "An informal evening for members, partners and invited guests.",
    status: "upcoming",
  },
  {
    id: "e5",
    slug: "doing-business-in-rwanda-webinar",
    title: "Doing Business in Rwanda: A Practical Briefing",
    date: "2025-11-14",
    time: "12:00 – 13:15 CAT",
    venue: "Online",
    city: "Online",
    type: "Webinar",
    summary: "Registration, licensing, tax and hiring — the questions Indian companies ask most.",
    status: "past",
    attendance: "180 participants",
  },
  {
    id: "e6",
    slug: "healthcare-investment-roundtable",
    title: "Healthcare Investment Roundtable",
    date: "2025-09-24",
    time: "15:00 – 18:00 CAT",
    venue: "Kigali Marriott Hotel",
    city: "Kigali",
    type: "Roundtable",
    summary: "Hospital groups, diagnostics providers and pharmaceutical distributors on scaling capacity.",
    status: "past",
    attendance: "60 delegates",
  },
  {
    id: "e7",
    slug: "ibcr-founding-members-reception",
    title: "IBCR Founding Members' Reception",
    date: "2025-06-19",
    time: "18:00 – 21:00 CAT",
    venue: "Kigali Serena Hotel",
    city: "Kigali",
    type: "Networking",
    summary: "The launch of the Chamber and its founding member cohort.",
    status: "past",
    attendance: "120 guests",
  },
];

/* ---------------------------------------------------------------- insights */

export type Insight = {
  id: string;
  slug: string;
  category: "IBCR News" | "Market Intelligence" | "India–Rwanda Trade" | "Reports";
  title: string;
  date: string;
  readingTime: string;
  summary: string;
  body: string[];
  featured?: boolean;
};

export const INSIGHTS: Insight[] = [
  {
    id: "i1",
    slug: "rwanda-as-a-gateway-to-east-africa",
    category: "Market Intelligence",
    title: "Rwanda as a gateway: what the numbers actually say",
    date: "2026-01-20",
    readingTime: "6 min read",
    summary:
      "Ease of doing business is only part of the story. A closer look at logistics costs, regional access and the practical realities of setting up in Kigali.",
    featured: true,
    body: [
      "Rwanda's reputation as one of Africa's easiest places to start a company is well established. For Indian businesses weighing an East African base, the more useful question is what happens after incorporation.",
      "This briefing looks at three variables that determine whether a Kigali base works commercially: inbound logistics cost from Mombasa and Dar es Salaam, the depth of the local supplier base in your sector, and the speed at which you can hire and retain technical staff.",
      "For businesses whose inputs are largely imported and whose output serves the regional market, the arithmetic increasingly works. For businesses that need deep local supply chains today, the case is more mixed — and the Chamber's role is to say so plainly.",
      "Members can request the underlying sector data and a tailored assessment from the secretariat.",
    ],
  },
  {
    id: "i2",
    slug: "ibcr-announces-investment-forum-2026",
    category: "IBCR News",
    title: "IBCR announces the Business & Investment Forum 2026",
    date: "2026-01-08",
    readingTime: "3 min read",
    summary:
      "The Chamber's flagship forum returns to the Kigali Convention Centre in March with an expanded programme of sector sessions and curated B2B meetings.",
    body: [
      "The Indian Business Chamber in Rwanda will host its Business & Investment Forum on 12–13 March 2026 at the Kigali Convention Centre.",
      "The programme brings together Indian and Rwandan enterprises, institutional partners and investors across agribusiness, manufacturing, healthcare, technology and infrastructure.",
      "Delegates will have access to a curated B2B meeting platform, sector roundtables and site visits to industrial facilities around Kigali.",
      "Member registration opens first; general registration follows.",
    ],
  },
  {
    id: "i3",
    slug: "india-rwanda-trade-in-review",
    category: "India–Rwanda Trade",
    title: "India–Rwanda trade in review: composition, not just volume",
    date: "2025-12-11",
    readingTime: "8 min read",
    summary:
      "Headline trade figures hide a more interesting shift in what is being traded — and where the next tranche of value addition is likely to sit.",
    body: [
      "Bilateral trade between India and Rwanda has grown steadily, but volume alone is a poor guide to opportunity. The composition of that trade tells a more useful story.",
      "Pharmaceuticals, machinery and vehicles dominate the Indian export basket. On the Rwandan side, the export mix remains concentrated in a small number of primary commodities.",
      "The interesting question for members is where value addition moves next: processing that currently happens elsewhere and could credibly happen in Rwanda, given power costs, skills and regional market access.",
      "This review sets out four candidate value chains and the conditions each would need to become investable.",
    ],
  },
  {
    id: "i4",
    slug: "manufacturing-in-rwanda-a-practical-checklist",
    category: "Reports",
    title: "Manufacturing in Rwanda: a practical setup checklist",
    date: "2025-11-27",
    readingTime: "10 min read",
    summary:
      "A step-by-step reference covering incorporation, industrial land, power connections, import duty relief and the timelines you should plan for.",
    body: [
      "This reference document is written for operators, not analysts. It sets out the sequence of decisions and approvals involved in establishing a manufacturing operation in Rwanda.",
      "Sections cover company incorporation and investment certificate, industrial land and special economic zone options, utility connections, capital goods duty relief, environmental clearance and staffing.",
      "Each section includes indicative timelines drawn from member experience, with a note on where delays most often occur.",
      "The full report is available to members through the secretariat.",
    ],
  },
  {
    id: "i5",
    slug: "why-advocacy-matters-for-smaller-members",
    category: "IBCR News",
    title: "Why advocacy matters most for smaller members",
    date: "2025-11-06",
    readingTime: "4 min read",
    summary:
      "Large companies can usually get a meeting. The Chamber's advocacy work exists mainly so that smaller members do not have to.",
    body: [
      "Advocacy is often presented as a service for the largest members. In practice, the opposite is closer to the truth.",
      "A multinational with a country office can generally secure a meeting on a licensing delay. A twelve-person exporter cannot, and the cost of that delay is proportionally far higher.",
      "The Chamber aggregates these issues, separates the systemic from the specific, and takes the systemic ones into structured dialogue.",
      "Members can raise an issue with the secretariat at any time; recurring issues shape the Chamber's annual position papers.",
    ],
  },
  {
    id: "i6",
    slug: "digital-payments-and-the-sme-gap",
    category: "Market Intelligence",
    title: "Digital payments and the SME gap",
    date: "2025-10-15",
    readingTime: "5 min read",
    summary:
      "Consumer payment adoption in Rwanda has outpaced business-to-business settlement. That gap is where a number of member businesses are now building.",
    body: [
      "Rwanda's consumer payment landscape has changed quickly. Business-to-business settlement has not kept pace, and much of it still runs on bank transfer and cash.",
      "For Indian technology firms with experience of a comparable transition, the parallels are instructive — and the addressable problem is well defined.",
      "This note sets out where the friction currently sits and which segments are most ready for change.",
    ],
  },
];

/* ------------------------------------------------------------ testimonials */

export const TESTIMONIALS = [
  {
    quote:
      "IBCR gave us a realistic picture of the market before we committed capital, and then made the introductions that got us operating. That sequence matters.",
    name: "Managing Director",
    role: "Pharmaceutical distribution",
    company: "Corporate Member, Kigali",
  },
  {
    quote:
      "We came on a delegation expecting a week of presentations. We left with three signed distribution conversations and a clear view of the regulatory path.",
    name: "Export Head",
    role: "Agricultural machinery",
    company: "International Member, Pune",
  },
  {
    quote:
      "As a small exporter, the value is access. Rooms we could not have entered alone, and a secretariat that answers the phone.",
    name: "Founder",
    role: "Horticulture exports",
    company: "SME Member, Nashik",
  },
  {
    quote:
      "The Chamber's briefings are written for people who have to decide something. That is rarer than it should be.",
    name: "Country Manager",
    role: "Infrastructure & construction",
    company: "Corporate Member, Kigali",
  },
] as const;

/* ---------------------------------------------------------------- partners */

export const PARTNERS = [
  { name: "High Commission of India", category: "Diplomatic" },
  { name: "Rwanda Development Board", category: "Government" },
  { name: "Private Sector Federation", category: "Industry" },
  { name: "Rwanda Revenue Authority", category: "Government" },
  { name: "FICCI", category: "Industry" },
  { name: "CII", category: "Industry" },
  { name: "Bank of Kigali", category: "Financial" },
  { name: "Norrsken East Africa", category: "Innovation" },
  { name: "Kigali Chamber of Commerce", category: "Industry" },
  { name: "EXIM Bank of India", category: "Financial" },
] as const;

/* ------------------------------------------------------------- about pages */

/** What a collective voice is for, in the Chamber's own four words. */
export const VALUES = [
  {
    title: "Better networking",
    copy: "Not a social platform but a business acceleration platform — the right people, quality referrals and collaboration across sectors.",
  },
  {
    title: "Stronger representation",
    copy: "Many businesses operate independently. The Chamber turns them into one voice in front of government and institutions.",
  },
  {
    title: "Shared growth",
    copy: "Trust, credibility and ethical practice, so partnerships hold up over the long term rather than the length of one deal.",
  },
  {
    title: "Faster solutions",
    copy: "Regulatory understanding, market intelligence and a first point of support, so problems get answered in days rather than quarters.",
  },
] as const;

/* ------------------------------------------------------------------- board */

export type BoardMember = {
  id: string;
  name: string;
  role: string;
  /** One line under the name in the list. */
  company: string;
  bio: string;
  highlights: string[];
  image: string;
};

/**
 * The Chamber's board, as listed in the IBCR deck. Two titles are spelled as
 * the deck intends rather than as it prints them ("Treasure" → Treasurer,
 * "Memership" → Membership).
 *
 * `image` paths are empty slots until the portraits are supplied — see
 * public/images/README.md. A member with no portrait shows their initials on
 * a drawn plate, so the section is complete either way.
 */
export const BOARD: BoardMember[] = [
  {
    id: "mangesh-kumar-verma",
    name: "Mr. Mangesh Kumar Verma",
    role: "Chairman",
    company: "CEO, CIMERWA",
    bio: "Chairman of the Indian Business Chamber in Rwanda and Chief Executive Officer of CIMERWA, with over 25 years of leadership experience across Africa.",
    highlights: [
      "CEO of CIMERWA",
      "Over 25 years of leadership experience across Africa",
      "Serves on multiple boards",
      "Leads several companies across the region",
    ],
    image: "/images/board/mangesh-kumar-verma.jpg",
  },
  {
    id: "suman-alla",
    name: "Mr. Suman Alla",
    role: "Vice Chairman",
    company: "Founder & Managing Director, Bizoneer International LLC",
    bio: "Vice Chairman of the Chamber and a techno-commercial leader in ICT and cybersecurity, working across several sectors as an entrepreneur.",
    highlights: [
      "Founder & Managing Director, Bizoneer International LLC",
      "Techno-commercial leader in ICT & cybersecurity",
      "Multi-sector entrepreneur",
      "Rotary leadership · Oxford alumnus",
    ],
    image: "/images/board/suman-alla.jpg",
  },
  {
    id: "tiwari-himanshu",
    name: "Mr. Tiwari Himanshu",
    role: "Treasurer & Director, Corporate Governance",
    company: "Director, A1 Group",
    bio: "Treasurer and Director of Corporate Governance for the Chamber, and a director of the A1 Group, managing operations in East Africa since 2007.",
    highlights: [
      "Director of A1 Group",
      "In East Africa since 2007",
      "Financial oversight and corporate governance for IBCR",
    ],
    image: "/images/board/tiwari-himanshu.jpg",
  },
  {
    id: "manoj-thaipparampil-skariah",
    name: "Mr. Manoj Thaipparampil Skariah",
    role: "General Secretary",
    company: "Founder & Managing Director, Eye Care Optical Ltd",
    bio: "General Secretary of the Chamber, running businesses in Rwanda across optical retail, home appliances and distribution since 2007.",
    highlights: [
      "Founder & Managing Director, Eye Care Optical Ltd",
      "Hotpoint Appliances (Rwanda) Ltd",
      "Afroind Ltd",
      "In Rwanda since 2007",
    ],
    image: "/images/board/manoj-thaipparampil-skariah.jpg",
  },
  {
    id: "thomas-binoy",
    name: "Mr. Thomas Binoy",
    role: "Director, Membership",
    company: "Managing Director, T&C Africa Ltd",
    bio: "Director of Membership for the Chamber, and managing director of a group of construction, trading and services companies operating in Rwanda.",
    highlights: [
      "Managing Director, T&C Africa Ltd",
      "Thomas & Company Rwanda Ltd",
      "RS Build Tech Ltd",
      "Eccetra Rwanda Ltd",
    ],
    image: "/images/board/thomas-binoy.jpg",
  },
  {
    id: "harlalka-natwarlal-murarilal",
    name: "Mr. Harlalka Natwarlal Murarilal",
    role: "Director, Public Relations & Events",
    company: "Chairman, Vplus Group Africa",
    bio: "Director of Public Relations and Events for the Chamber, with over 15 years in Rwanda's packaging industry and interests across several African markets.",
    highlights: [
      "Chairman of Vplus Group Africa",
      "Over 15 years in the packaging industry in Rwanda",
      "Serving multiple industries across Africa",
      "Leads industry growth, corporate relations and business opportunities",
    ],
    image: "/images/board/harlalka-natwarlal-murarilal.jpg",
  },
  {
    id: "palaparthy-vinay",
    name: "Mr. Palaparthy Vinay",
    role: "Director, Investment & International Trading",
    company: "International trade, hospitality, real estate and mining",
    bio: "Director of Investment and International Trading for the Chamber, with nearly four decades of business experience across 19 African countries.",
    highlights: [
      "Nearly four decades across 19 African countries",
      "Specialises in international trade",
      "Hospitality and real estate",
      "Mining",
    ],
    image: "/images/board/palaparthy-vinay.jpg",
  },
];

/* --------------------------------------------------------- sub-committees */

/**
 * The Chamber's delivery structure: focused committees that expand leadership
 * participation among active members.
 */
export const SUB_COMMITTEES = [
  {
    title: "Membership",
    copy: "New members, renewals, onboarding and engagement.",
  },
  {
    title: "Trade & Investment",
    copy: "B2B connects, investor meetings, delegations and market opportunities.",
  },
  {
    title: "PR & Events",
    copy: "Networking sessions, seminars, business forums and sponsorships.",
  },
] as const;

/** Sector teams formed under the committees, each led by industry members. */
export const INDUSTRY_LEADERSHIP = [
  "ICT",
  "Construction",
  "Real estate",
  "Healthcare",
  "Agriculture",
  "Trade",
  "Hospitality",
  "Retail",
  "Finance",
  "Education",
  "Logistics",
] as const;

export const TEAM = [
  { name: "Secretariat", role: "Member services", focus: "First point of contact for members and enquiries" },
  { name: "Programmes", role: "Events & delegations", focus: "Forums, missions and B2B programming" },
  { name: "Research", role: "Business intelligence", focus: "Briefings, sector research and publications" },
  { name: "Communications", role: "Brand & outreach", focus: "Publications, media and digital channels" },
] as const;

/* ----------------------------------------------------------- india-rwanda */

export const WHY_RWANDA = [
  { title: "Gateway position", copy: "Access to the East African Community and a wider regional market from a single base." },
  { title: "Reform record", copy: "A consistent, well-documented record of business-environment reform and predictable administration." },
  { title: "Security & stability", copy: "One of the safest operating environments on the continent, with reliable institutions." },
  { title: "Digital government", copy: "Online registration, licensing and tax filing that materially shortens setup time." },
  { title: "Green ambition", copy: "A national agenda around clean energy, sustainable urbanism and climate-smart agriculture." },
  { title: "Talent pipeline", copy: "A young workforce and a growing technical and vocational training system." },
] as const;

export const WHY_INDIA = [
  { title: "Manufacturing depth", copy: "Cost-competitive capacity across pharmaceuticals, machinery, textiles and building materials." },
  { title: "Technology & services", copy: "Global-scale IT services, engineering talent and digital public infrastructure experience." },
  { title: "Development finance", copy: "Established lines of credit and project finance instruments active across Africa." },
  { title: "Frugal innovation", copy: "Products engineered for price-sensitive markets — directly transferable to Rwanda." },
  { title: "Diaspora networks", copy: "A long-established Indian business community across East Africa." },
  { title: "Institutional links", copy: "Deep bilateral ties across trade bodies, universities and government agencies." },
] as const;

/** The key sectors the Chamber names for the India–Rwanda relationship. */
export const CORRIDOR_FOCUS = [
  "Education",
  "ICT",
  "Healthcare",
  "Agriculture",
  "Trading",
  "Pharmaceuticals",
  "Infrastructure",
  "Real estate",
  "Hospitality & tourism",
] as const;

export const AREAS_OF_INTEREST = [
  "Membership",
  "Market entry into Rwanda",
  "Trade facilitation",
  "Investment opportunities",
  "Business delegations",
  "Events & sponsorship",
  "Media & partnerships",
  "Something else",
] as const;
