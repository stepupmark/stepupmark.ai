import {
  CodeIcon,
  CompassIcon,
  FileTextIcon,
  ImageIcon,
  MailIcon,
  MessageSquareIcon,
  MusicIcon,
  PaletteIcon,
  PhoneIcon,
  PresentationIcon,
  SparklesIcon,
  VideoIcon,
  WandSparklesIcon,
  type LucideIcon,
} from "lucide-react";

export type NavLink = { href: string; label: string };

// Root-relative so they work from /about and the legal pages too: on the landing
// page the browser treats them as same-document scrolls, elsewhere as a
// navigation to `/` that then scrolls.
export const MARKETING_NAV_LINKS: NavLink[] = [
  { href: "/#about-us", label: "About us" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
];

export type AboutStep = {
  step: string;
  tag: string;
  title: string;
  description: string;
  pills: string[];
};

export const ABOUT_STEPS: AboutStep[] = [
  {
    step: "01",
    tag: "Generative AI",
    title: "We are StepUpMark, a groundbreaking AI studio.",
    description: "We build tools for images, video, code, voiceovers, and presentations.",
    pills: ["Images", "Video", "Code", "Voiceovers", "Presentations"],
  },
  {
    step: "02",
    tag: "Search ready",
    title: "Our AI doesn't just create assets — it makes them search ready.",
    description:
      "Every asset is optimized with SEO meta tags to improve visibility from the very moment it is generated.",
    pills: ["SEO Optimized", "Meta Tags", "Search Ready"],
  },
  {
    step: "03",
    tag: "Visibility",
    title: "Rank higher on search engines.",
    description:
      "Reach the right audience instantly with creative assets that are natively built for discovery and maximum engagement.",
    pills: ["Higher Rankings", "Audience Reach", "Discovery"],
  },
  {
    step: "04",
    tag: "Online presence",
    title: "Grow your online presence without extra effort.",
    description:
      "Focus on creating stunning content while our AI handles the technical growth on autopilot.",
    pills: ["Growth", "Autopilot", "Automation"],
  },
];

export type FeatureCard = {
  number: string;
  name: string;
  icon: LucideIcon;
  description: string;
  points: string[];
  image: string;
  // Bespoke scatter geometry — each card is nudged and tilted so the row reads
  // as a loose stack rather than a grid. No design-token equivalent.
  offsetY: number;
  rotate: number;
};

// The two illustrations that actually ship, cycled behind the cards at low
// opacity. Sized to twice their rendered width, not their original 4K.
const BG = ["/marketing/seo-illustration.webp", "/marketing/seo-illustration-v2.webp"] as const;

export const FEATURE_CARDS: FeatureCard[] = [
  {
    number: "01",
    name: "Prompt Elevate",
    icon: SparklesIcon,
    description: "Supercharge basic text prompts into studio-grade AI instructions automatically.",
    points: ["Smart context expansion", "Style & lighting modifiers", "Multi-model optimization"],
    image: BG[0],
    offsetY: -25,
    rotate: -8,
  },
  {
    number: "02",
    name: "AI AutoCad",
    icon: CompassIcon,
    description:
      "Generate architectural blueprints, CAD designs, and precision technical drawings from text.",
    points: ["2D & 3D drafting", "Exact scale & measurement metrics", "Instant DWG export"],
    image: BG[1],
    offsetY: 30,
    rotate: 6,
  },
  {
    number: "03",
    name: "AI Image Recreator",
    icon: WandSparklesIcon,
    description:
      "Upload any existing photo or sketch and reimagine it in limitless styles and variations.",
    points: ["Style transfer engine", "High-res upscaling", "Background replacement"],
    image: BG[0],
    offsetY: -15,
    rotate: -11,
  },
  {
    number: "04",
    name: "Creative Studio",
    icon: PaletteIcon,
    description:
      "An all-in-one workspace blending canvas editing, infinite layers, and multi-modal AI tools.",
    points: ["Infinite AI canvas", "Real-time collaboration", "Unified asset library"],
    image: BG[1],
    offsetY: 35,
    rotate: 9,
  },
  {
    number: "05",
    name: "AI Image",
    icon: ImageIcon,
    description: "Photorealistic text-to-image generation powered by next-gen diffusion models.",
    points: ["4K & 8K rendering", "Custom aspect ratios", "Photo-real texture mastery"],
    image: BG[0],
    offsetY: -30,
    rotate: -6,
  },
  {
    number: "06",
    name: "AI Video",
    icon: VideoIcon,
    description:
      "Transform static text or images into fluid, high-definition cinematic video clips.",
    points: [
      "Text-to-video & Image-to-video",
      "Consistent character motion",
      "Camera pan & zoom controls",
    ],
    image: BG[1],
    offsetY: 20,
    rotate: 10,
  },
  {
    number: "07",
    name: "AI Writer",
    icon: FileTextIcon,
    description:
      "Generate long-form articles, marketing copy, scripts, and stories with human-like nuance.",
    points: [
      "SEO keyword optimization",
      "Custom tone & voice training",
      "Grammar & structure refinement",
    ],
    image: BG[0],
    offsetY: -25,
    rotate: -12,
  },
  {
    number: "08",
    name: "AI Chat",
    icon: MessageSquareIcon,
    description:
      "An intelligent, context-aware assistant built right into your workspace for instant brainstorming.",
    points: ["Real-time web research", "Deep document analysis", "Multi-turn reasoning"],
    image: BG[1],
    offsetY: 30,
    rotate: 7,
  },
  {
    number: "09",
    name: "AI Audio",
    icon: MusicIcon,
    description:
      "Generate studio-quality voiceovers, custom sound effects, and adaptive background music.",
    points: [
      "Ultra-realistic voice cloning",
      "Multilingual speech synthesis",
      "Royalty-free music generation",
    ],
    image: BG[0],
    offsetY: -15,
    rotate: -7,
  },
  {
    number: "10",
    name: "AI Presentation",
    icon: PresentationIcon,
    description:
      "Build full-scale slide decks with persuasive copy, layouts, and visuals generated in seconds.",
    points: ["Auto-formatted layouts", "Brand style matching", "One-click export to PPTX"],
    image: BG[1],
    offsetY: 25,
    rotate: 8,
  },
  {
    number: "11",
    name: "AI Code",
    icon: CodeIcon,
    description:
      "Generate, debug, refactor, and optimize code across dozens of programming languages instantly.",
    points: [
      "Full-stack app generation",
      "Automated unit test creation",
      "Instant bug fixing & explanation",
    ],
    image: BG[0],
    offsetY: -35,
    rotate: -9,
  },
];

export type PricingPlan = {
  name: string;
  price: string;
  period: string;
  isPopular: boolean;
  features: string[];
};

// Each tier states what the one below it does not. A shared feature list makes
// the table decorative — there has to be a reason to move up a row.
export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Basic",
    price: "₹99",
    period: "per month",
    isPopular: false,
    features: [
      "200 generation tokens",
      "Image, writer and chat tools",
      "Standard generation queue",
      "Email support",
      "Personal-use licence",
    ],
  },
  {
    name: "Standard",
    price: "₹999",
    period: "per month",
    isPopular: false,
    features: [
      "2,100 generation tokens",
      "Adds video and audio generation",
      "Priority generation queue",
      "Email and chat support",
      "Commercial-use licence",
    ],
  },
  {
    name: "Premium",
    price: "₹1,999",
    period: "per month",
    isPopular: true,
    features: [
      "4,300 generation tokens",
      "Adds AutoCad and presentations",
      "4K and 8K rendering",
      "Brand style matching",
      "Priority support, 24-hour response",
    ],
  },
  {
    name: "Enterprise",
    price: "₹2,999",
    period: "per month",
    isPopular: false,
    features: [
      "6,500 generation tokens",
      "Adds API access",
      "Team workspaces and shared library",
      "SSO and audit log",
      "Dedicated account manager",
    ],
  },
];

export type Partner = { name: string; logo: string } | { name: string; note: string };

export const ASSOCIATED_PARTNERS: Partner[] = [
  { name: "IIT Patna", logo: "/marketing/logo_iit.webp" },
  { name: "Octo Spaces", logo: "/marketing/logo_octo.webp" },
  { name: "NVIDIA", note: "Partner" },
];

export type FooterLink = { label: string; href: string };

export const FOOTER_USEFUL_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/#about-us" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact us", href: "/#contact" },
];

export const FOOTER_TOP_FEATURES: FooterLink[] = [
  { label: "AI Video", href: "/#features" },
  { label: "AI Image", href: "/#features" },
  { label: "AI Writer", href: "/#features" },
  { label: "AI Presentation", href: "/#features" },
  { label: "AI Image Recreator", href: "/#features" },
  { label: "AI Code", href: "/#features" },
];

// Routed pages, not anchors — these have to be reachable for the paid plans
// above to be sellable.
export const FOOTER_LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
];

export type ContactRow = { label: string; value: string; href: string; icon: LucideIcon };

export const CONTACT_ROWS: ContactRow[] = [
  { label: "Mobile", value: "+91 94949 96237", href: "tel:+919494996237", icon: PhoneIcon },
  {
    label: "Mail",
    value: "contact@stepupmark.ai",
    href: "mailto:contact@stepupmark.ai",
    icon: MailIcon,
  },
];

export const REGISTERED_ADDRESS =
  "18/8 7-1-397/104 S.R. Nagar, near community hall, Sanjeev Reddy Nagar, Ameerpet, Hyderabad - 500038, Telangana.";
