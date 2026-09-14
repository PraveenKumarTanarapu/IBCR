/**
 * Single source of truth for IBCR site content.
 *
 * PLACEHOLDER NOTICE — member companies, testimonials, people, event dates and
 * statistics below are illustrative sample content used to build out the
 * experience. Replace them with verified IBCR data (or wire this module to the
 * CMS) before the site goes live. See README.md → "Replacing sample content".
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
      { label: "Leadership & Board", href: "/about#leadership", note: "Governance" },
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
      { label: "Categories", href: "/membership#categories", note: "Corporate to startup" },
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
      { label: "Event Registration", href: "/events#upcoming" },
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

/* ------------------------------------------------------------- hero slides */

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  accent?: string;
  copy: string;
  cta: { label: string; href: string };
  secondary: { label: string; href: string };
  video: string;
  poster: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "corridor",
    eyebrow: "India × Rwanda",
    title: "Connecting India.",
    accent: "Empowering Rwanda.",
    copy: "Building stronger India–Rwanda business relations through trade, investment, networking, advocacy and strategic partnerships.",
    cta: { label: "Become a Member", href: "/membership/join" },
    secondary: { label: "Explore Opportunities", href: "/india-rwanda#opportunities" },
    video: "hero-corridor",
    poster: "/video/hero-corridor-poster.jpg",
  },
  {
    id: "filaments",
    eyebrow: "Trade & Investment",
    title: "Where opportunity",
    accent: "meets ambition.",
    copy: "From agribusiness to advanced manufacturing, we help Indian enterprise find its footing in one of Africa's fastest-reforming economies.",
    cta: { label: "Explore Opportunities", href: "/india-rwanda#opportunities" },
    secondary: { label: "Our Services", href: "/services" },
    video: "hero-filaments",
    poster: "/video/hero-filaments-poster.jpg",
  },
  {
    id: "lattice",
    eyebrow: "The Network",
    title: "Connect. Collaborate.",
    accent: "Grow.",
    copy: "A working network of businesses, investors, institutions and decision-makers across Kigali, Delhi, Mumbai and beyond.",
    cta: { label: "Join the Chamber", href: "/membership/join" },
    secondary: { label: "Member Directory", href: "/members" },
    video: "hero-lattice",
    poster: "/video/hero-lattice-poster.jpg",
  },
];

/* ------------------------------------------------------------ at a glance */

export const PILLARS = [
  {
    id: "trade",
    number: "01",
    title: "Trade",
    copy: "Facilitating India–Rwanda commercial opportunities, from first enquiry to signed contract.",
    icon: "exchange",
  },
  {
    id: "investment",
    number: "02",
    title: "Investment",
    copy: "Connecting capital with credible, well-structured opportunities across Rwanda's priority sectors.",
    icon: "trending",
  },
  {
    id: "networking",
    number: "03",
    title: "Networking",
    copy: "Creating meaningful connections between businesses, institutions and decision-makers.",
    icon: "network",
  },
  {
    id: "advocacy",
    number: "04",
    title: "Advocacy",
    copy: "Representing the interests of the Indian business community in constructive public-private dialogue.",
    icon: "shield",
  },
] as const;

export const STATS = [
  { value: 250, suffix: "+", label: "Businesses in the network" },
  { value: 12, suffix: "", label: "Priority sectors covered" },
  { value: 40, suffix: "+", label: "Engagements each year" },
  { value: 2, suffix: "", label: "Markets, one corridor" },
] as const;

export const WHY_IBCR = [
  {
    title: "Connect",
    copy: "Meet businesses, investors, institutions and decision-makers across both markets — in rooms that are difficult to reach alone.",
  },
  {
    title: "Discover",
    copy: "Access market intelligence, regulatory guidance and emerging opportunities before they become common knowledge.",
  },
  {
    title: "Grow",
    copy: "Build partnerships, find distribution and expand your footprint into Rwanda and the wider East African market.",
  },
  {
    title: "Influence",
    copy: "Participate in the dialogue that shapes the business environment for Indian enterprise in Rwanda.",
  },
] as const;

/* ---------------------------------------------------------------- services */

export const SERVICES = [
  {
    id: "market-entry",
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
    title: "Agriculture & Agribusiness",
    copy: "Value addition, cold chain, irrigation technology and export-grade processing.",
    metric: "Priority sector",
  },
  {
    title: "Manufacturing",
    copy: "Light manufacturing, pharmaceuticals, packaging and building materials.",
    metric: "Made in Rwanda",
  },
  {
    title: "Infrastructure",
    copy: "Roads, housing, industrial parks, water and urban development projects.",
    metric: "Long horizon",
  },
  {
    title: "Healthcare",
    copy: "Hospitals, diagnostics, medical devices and pharmaceutical distribution.",
    metric: "High demand",
  },
  {
    title: "Technology & Innovation",
    copy: "Fintech, digital public infrastructure, IT services and engineering talent.",
    metric: "Fast growth",
  },
  {
    title: "Tourism & Hospitality",
    copy: "Hotels, MICE facilities, eco-tourism and destination services.",
    metric: "Premium market",
  },
  {
    title: "Energy",
    copy: "Solar, mini-grids, energy storage and productive-use appliances.",
    metric: "Access agenda",
  },
  {
    title: "Logistics",
    copy: "Freight, warehousing, cold storage and regional distribution hubs.",
    metric: "Regional gateway",
  },
] as const;

/* -------------------------------------------------------------- membership */

export type MembershipTier = {
  id: string;
  name: string;
  who: string;
  benefits: string[];
  eligibility: string;
  featured?: boolean;
};

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "corporate",
    name: "Corporate Member",
    who: "Established businesses and corporations operating in or entering Rwanda.",
    benefits: [
      "Priority access to delegations and forums",
      "Company profile in the member directory",
      "Bespoke market intelligence on request",
      "Direct advocacy support on business issues",
      "Speaking opportunities at IBCR events",
    ],
    eligibility: "Registered company with an established operating history.",
    featured: true,
  },
  {
    id: "sme",
    name: "SME Member",
    who: "Small and medium-sized enterprises building trade between the two markets.",
    benefits: [
      "Member directory listing",
      "Discounted event and delegation participation",
      "Buyer and supplier matchmaking",
      "Quarterly trade and policy briefings",
    ],
    eligibility: "Registered SME in India, Rwanda or the wider region.",
  },
  {
    id: "startup",
    name: "Startup Member",
    who: "Emerging and innovative businesses under five years old.",
    benefits: [
      "Concessional membership fee",
      "Introductions to investors and mentors",
      "Pitch slots at selected IBCR events",
      "Access to the Chamber's knowledge base",
    ],
    eligibility: "Incorporated within the last five years.",
  },
  {
    id: "institutional",
    name: "Institutional Member",
    who: "Institutions and organisations aligned with IBCR's objectives.",
    benefits: [
      "Joint programming and co-hosted events",
      "Institutional listing and recognition",
      "Policy dialogue participation",
      "Research and publication collaboration",
    ],
    eligibility: "Universities, associations, agencies and non-profits.",
  },
  {
    id: "international",
    name: "International Member",
    who: "Businesses outside Rwanda pursuing India–Rwanda opportunities.",
    benefits: [
      "Remote access to briefings and webinars",
      "Introductions ahead of market visits",
      "Delegation participation",
      "Directory listing with international tag",
    ],
    eligibility: "Organisations headquartered outside Rwanda.",
  },
  {
    id: "strategic",
    name: "Strategic Partner",
    who: "Organisations supporting IBCR's broader mission and programmes.",
    benefits: [
      "Headline visibility across IBCR platforms",
      "Board-level engagement",
      "Co-branded flagship programming",
      "First sight of the opportunity pipeline",
    ],
    eligibility: "By invitation and mutual agreement.",
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

export const VALUES = [
  {
    title: "Credibility first",
    copy: "We would rather tell a member that an opportunity is not ready than help them lose money on it.",
  },
  {
    title: "Two-way benefit",
    copy: "Every engagement should leave both the Indian and the Rwandan side materially better off.",
  },
  {
    title: "Practical over ceremonial",
    copy: "Signed agreements, shipped containers and operating companies — not photo opportunities.",
  },
  {
    title: "Open to all sizes",
    copy: "A twelve-person exporter should get the same quality of answer as a listed corporation.",
  },
] as const;

export const BOARD = [
  { name: "President", role: "Chair of the Board", focus: "Strategy, bilateral relations and institutional partnerships" },
  { name: "Vice President", role: "Deputy Chair", focus: "Membership growth and sector committees" },
  { name: "Secretary General", role: "Executive Office", focus: "Day-to-day operations and member services" },
  { name: "Treasurer", role: "Finance & Governance", focus: "Financial oversight, audit and compliance" },
  { name: "Director — Trade", role: "Board Director", focus: "Trade facilitation and delegations" },
  { name: "Director — Investment", role: "Board Director", focus: "Investment pipeline and investor relations" },
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

export const CORRIDOR_FOCUS = [
  "Trade",
  "Investment",
  "Technology",
  "Healthcare",
  "Agriculture",
  "Manufacturing",
  "Infrastructure",
  "Tourism",
  "Education",
  "Innovation",
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
