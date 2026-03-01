// Seed data for Chicago local vendors
export interface VendorSeed {
  name: string;
  category: string;
  description: string;
  neighborhood: string;
  zipCode: string;
  isLocal: boolean;
  isPromoted: boolean;
  website: string;
  phone: string;
  offers: {
    title: string;
    description: string;
    discountPct?: number;
    discountAmt?: number;
    code: string;
  }[];
}

export const VENDOR_SEEDS: VendorSeed[] = [
  {
    name: "Loop Tech Repairs",
    category: "mobile",
    description: "Chicago's trusted phone repair shop since 2015. Screen repairs, battery replacement, and phone unlocking.",
    neighborhood: "The Loop",
    zipCode: "60601",
    isLocal: true,
    isPromoted: true,
    website: "https://looptechrepairs.com",
    phone: "(312) 555-0101",
    offers: [
      { title: "15% Off Screen Repair", description: "Any smartphone screen repair for WindyWallet users", discountPct: 15, code: "WINDY15" },
    ],
  },
  {
    name: "Windy City Wireless",
    category: "mobile",
    description: "Independent wireless dealer offering prepaid and no-contract plans. Serving Chicagoland since 2012.",
    neighborhood: "Wicker Park",
    zipCode: "60622",
    isLocal: true,
    isPromoted: false,
    website: "https://windycitywireless.com",
    phone: "(312) 555-0102",
    offers: [
      { title: "$20 Off Activation", description: "New line activation discount", discountAmt: 20, code: "WCW20" },
    ],
  },
  {
    name: "Chi-Town Internet Co.",
    category: "internet",
    description: "Local fiber internet provider covering Chicago neighborhoods. No contracts, no data caps.",
    neighborhood: "Lincoln Park",
    zipCode: "60614",
    isLocal: true,
    isPromoted: true,
    website: "https://chitowninternet.com",
    phone: "(312) 555-0201",
    offers: [
      { title: "First Month Free", description: "Free first month on any plan for new customers", discountPct: 100, code: "FREE1" },
    ],
  },
  {
    name: "Lakefront WiFi Solutions",
    category: "internet",
    description: "Fixed wireless internet for lakefront buildings. Fast installation, local support.",
    neighborhood: "Streeterville",
    zipCode: "60611",
    isLocal: true,
    isPromoted: false,
    website: "https://lakefrontwifi.com",
    phone: "(312) 555-0202",
    offers: [
      { title: "Free Installation", description: "Waived $99 installation fee", discountAmt: 99, code: "FREEINSTALL" },
    ],
  },
  {
    name: "CTA Smart Commuter",
    category: "transit",
    description: "Transit planning and Ventra card services. Helping Chicagoans optimize their commute.",
    neighborhood: "The Loop",
    zipCode: "60602",
    isLocal: true,
    isPromoted: true,
    website: "https://ctasmartcommuter.com",
    phone: "(312) 555-0301",
    offers: [
      { title: "$5 Ventra Credit", description: "Bonus credit when loading $50+ on Ventra", discountAmt: 5, code: "SMART5" },
    ],
  },
  {
    name: "Divvy Pro Shop",
    category: "transit",
    description: "Bike accessories, maintenance, and Divvy membership assistance for Chicago cyclists.",
    neighborhood: "Bucktown",
    zipCode: "60647",
    isLocal: true,
    isPromoted: false,
    website: "https://divvyproshop.com",
    phone: "(312) 555-0302",
    offers: [
      { title: "10% Off Accessories", description: "Helmets, locks, and lights for Divvy riders", discountPct: 10, code: "DIVVY10" },
    ],
  },
  {
    name: "Prairie State Insurance",
    category: "insurance",
    description: "Independent insurance broker specializing in Chicago renters and auto coverage. Local since 1998.",
    neighborhood: "Hyde Park",
    zipCode: "60615",
    isLocal: true,
    isPromoted: true,
    website: "https://prairiestateins.com",
    phone: "(312) 555-0401",
    offers: [
      { title: "Free Quote + $25 Gift Card", description: "Get a free quote and receive a $25 gift card", discountAmt: 25, code: "PRAIRIE25" },
    ],
  },
  {
    name: "Midwest Coverage Group",
    category: "insurance",
    description: "Affordable renters and auto insurance tailored for Chicago residents. Bilingual support available.",
    neighborhood: "Pilsen",
    zipCode: "60608",
    isLocal: true,
    isPromoted: false,
    website: "https://midwestcoverage.com",
    phone: "(312) 555-0402",
    offers: [
      { title: "5% Multi-Policy Discount", description: "Bundle renters + auto for extra savings", discountPct: 5, code: "BUNDLE5" },
    ],
  },
  {
    name: "South Side Savings Hub",
    category: "mobile",
    description: "Community-focused mobile plan comparison and setup assistance. Walk-in welcome.",
    neighborhood: "Bronzeville",
    zipCode: "60653",
    isLocal: true,
    isPromoted: false,
    website: "https://southsidesavings.com",
    phone: "(312) 555-0103",
    offers: [
      { title: "Free SIM Kit", description: "Free SIM card with any new plan signup", discountAmt: 10, code: "FREESIM" },
    ],
  },
  {
    name: "North Shore Connect",
    category: "internet",
    description: "High-speed internet solutions for North Side Chicago. Business and residential plans.",
    neighborhood: "Rogers Park",
    zipCode: "60626",
    isLocal: true,
    isPromoted: false,
    website: "https://northshoreconnect.com",
    phone: "(312) 555-0203",
    offers: [
      { title: "50% Off First 3 Months", description: "Half price for your first quarter", discountPct: 50, code: "NORTH50" },
    ],
  },
  {
    name: "L Train Coffee & Cowork",
    category: "internet",
    description: "Coworking space with blazing fast WiFi. Day passes and monthly memberships.",
    neighborhood: "Logan Square",
    zipCode: "60647",
    isLocal: true,
    isPromoted: true,
    website: "https://ltraincoffee.com",
    phone: "(312) 555-0204",
    offers: [
      { title: "Free Day Pass", description: "One free coworking day for WindyWallet users", discountAmt: 25, code: "LTRAIN1" },
    ],
  },
  {
    name: "Chicago Bike Hub",
    category: "transit",
    description: "Full-service bike shop and commuter resource center. E-bike sales and rentals.",
    neighborhood: "West Loop",
    zipCode: "60607",
    isLocal: true,
    isPromoted: false,
    website: "https://chicagobikehub.com",
    phone: "(312) 555-0303",
    offers: [
      { title: "$50 Off E-Bike Rental", description: "Monthly e-bike rental discount", discountAmt: 50, code: "EBIKE50" },
    ],
  },
];
