export type Workflow = { title: string; body: string };

export type Industry = {
  slug: string;
  name: string;
  short: string;
  color: string;
  audience: string;
  summary: string;
  workflows: Workflow[];
  tools: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    short: "Healthcare",
    color: "#00D4AA",
    audience: "Independent practices and clinics",
    summary:
      "Front-desk and administrative workflows for independent practices, built to work alongside your EMR and scheduling tools.",
    workflows: [
      { title: "Patient intake", body: "Collect forms, insurance details and history before the visit, then file them to the patient record." },
      { title: "Appointment scheduling", body: "Offer open slots, confirm bookings, send reminders and handle reschedule requests." },
      { title: "Referral routing", body: "Read incoming referrals, match them to the right provider and flag missing information." },
      { title: "Administrative follow-ups", body: "Track outstanding paperwork, authorizations and callbacks so nothing sits in a queue." },
      { title: "EMR workflows", body: "Move structured data between your EMR and the tools around it, with staff reviewing where judgment is needed." },
    ],
    tools: ["EMR / EHR", "Practice management", "Scheduling", "E-fax", "Email & SMS"],
  },
  {
    slug: "home-services",
    name: "Home Services",
    short: "Home Services",
    color: "#F5A623",
    audience: "HVAC, plumbing, electrical and cleaning businesses",
    summary: "Keep leads, estimates and jobs moving from the first call to the finished job.",
    workflows: [
      { title: "Lead intake", body: "Capture calls, web forms and messages in one place and respond while the lead is still warm." },
      { title: "Estimate follow-ups", body: "Follow up on open estimates on a schedule and alert the team when a customer replies." },
      { title: "Job scheduling", body: "Book jobs into open slots based on job type, location and technician availability." },
      { title: "Dispatch coordination", body: "Update technicians and customers when jobs change, and keep the dispatch board current." },
      { title: "Customer reminders", body: "Send appointment confirmations, arrival notices and seasonal maintenance reminders." },
    ],
    tools: ["Field service software", "CRM", "Phone & SMS", "Calendar", "Accounting"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    short: "Professional Services",
    color: "#5B8DEF",
    audience: "Consulting firms and agencies",
    summary: "Take the coordination out of client delivery so your team can spend its time on the work itself.",
    workflows: [
      { title: "Client onboarding", body: "Send agreements, gather details and set up projects and folders as soon as a client signs." },
      { title: "Document collection", body: "Request files, track what’s outstanding and send reminders until everything is in." },
      { title: "Meeting follow-ups", body: "Turn meeting notes into summaries, action items and tasks in your project tool." },
      { title: "Project handoffs", body: "Pass context, files and next steps cleanly from sales to delivery and between teams." },
      { title: "Recurring reporting", body: "Pull data from your systems and assemble client-ready reports on a schedule." },
    ],
    tools: ["CRM", "Project management", "Document storage", "E-signature", "Email & calendar"],
  },
  {
    slug: "real-estate",
    name: "Real Estate & Property Management",
    short: "Real Estate",
    color: "#E8553D",
    audience: "Brokerages, property managers and landlords",
    summary: "Respond to inquiries, tenants and maintenance faster without adding to the front office.",
    workflows: [
      { title: "Inquiry routing", body: "Answer common listing questions and route qualified inquiries to the right agent or manager." },
      { title: "Viewing coordination", body: "Schedule showings around availability and send confirmations and directions." },
      { title: "Maintenance requests", body: "Log requests with photos, sort them by urgency and assign vendors or staff." },
      { title: "Tenant communications", body: "Send notices, renewal reminders and updates through one consistent channel." },
      { title: "Document organization", body: "File leases, applications and inspection reports to the right property and tenant." },
    ],
    tools: ["Property management software", "CRM", "Listings", "Email & SMS", "Document storage"],
  },
  {
    slug: "accounting",
    name: "Accounting & Bookkeeping",
    short: "Accounting",
    color: "#B48CFF",
    audience: "Accounting firms and bookkeeping practices",
    summary: "Cut down the chasing and sorting that builds up around every close and filing season.",
    workflows: [
      { title: "Client document collection", body: "Request statements and receipts, track what’s missing and follow up automatically." },
      { title: "Invoice processing", body: "Read invoices, extract key fields and prepare entries for review in your accounting system." },
      { title: "Transaction review queues", body: "Categorize routine transactions and surface the unusual ones for a person to review." },
      { title: "Deadline reminders", body: "Track filing and payment deadlines per client and send reminders well ahead of time." },
      { title: "Reporting preparation", body: "Assemble recurring reports and workpapers from your ledger and client data." },
    ],
    tools: ["Accounting software", "Client portal", "Spreadsheets", "Document storage", "Email"],
  },
  {
    slug: "logistics",
    name: "Logistics & Transportation",
    short: "Logistics",
    color: "#4FC8E8",
    audience: "Carriers, brokers, 3PLs and delivery operators",
    summary: "Keep orders, shipments and paperwork in sync across dispatch, drivers and billing.",
    workflows: [
      { title: "Order intake", body: "Read orders from emails, PDFs and portals and enter them into your system." },
      { title: "Shipment updates", body: "Send customers status updates and flag delays as soon as they’re known." },
      { title: "Dispatch workflows", body: "Assign loads based on capacity and notify drivers when plans change." },
      { title: "Proof-of-delivery processing", body: "Collect POD documents, match them to shipments and file them for billing." },
      { title: "Invoice reconciliation", body: "Match carrier invoices to rates and shipments and flag discrepancies for review." },
    ],
    tools: ["TMS", "ERP", "Email", "Driver apps", "Accounting"],
  },
  {
    slug: "construction",
    name: "Construction & Trades",
    short: "Construction",
    color: "#FF8A4C",
    audience: "General contractors, subcontractors and trade businesses",
    summary: "Less paperwork between the bid, the job site and the back office.",
    workflows: [
      { title: "Bid intake", body: "Collect bid invitations and plans, log key dates and route them for a go/no-go decision." },
      { title: "Subcontractor onboarding", body: "Gather insurance certificates, tax forms and agreements, and track expirations." },
      { title: "Project documentation", body: "Organize daily logs, photos and RFIs by project so they’re easy to find." },
      { title: "Purchase-order routing", body: "Route POs for approval by project and amount, and keep vendors updated." },
      { title: "Progress reporting", body: "Compile updates from the field into regular reports for owners and stakeholders." },
    ],
    tools: ["Project management", "Accounting", "Document storage", "Email", "Spreadsheets"],
  },
  {
    slug: "retail",
    name: "Retail & E-commerce",
    short: "Retail",
    color: "#FF6FAE",
    audience: "Online stores and multi-channel retailers",
    summary: "Handle the operational load behind every order, product and supplier.",
    workflows: [
      { title: "Product catalog updates", body: "Keep product details, pricing and images consistent across your store and channels." },
      { title: "Order support", body: "Answer order status questions and handle routine requests, escalating the rest to your team." },
      { title: "Returns routing", body: "Check return eligibility, issue labels and route items to restock, repair or write-off." },
      { title: "Inventory alerts", body: "Watch stock levels across locations and alert the team before items run out." },
      { title: "Supplier coordination", body: "Send reorder requests, confirm delivery dates and track open purchase orders." },
    ],
    tools: ["E-commerce platform", "Help desk", "Inventory", "Shipping", "Email"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    short: "Hospitality",
    color: "#7ED957",
    audience: "Hotels, restaurants and venues",
    summary: "Give guests quick answers and give staff fewer things to keep track of.",
    workflows: [
      { title: "Guest inquiries", body: "Answer common questions about availability, policies and amenities across channels." },
      { title: "Reservation follow-ups", body: "Confirm bookings, collect missing details and follow up on special requests." },
      { title: "Staff coordination", body: "Share shift changes, tasks and event details with the right people." },
      { title: "Review requests", body: "Ask guests for feedback after a stay or visit and route issues to a manager." },
      { title: "Vendor administration", body: "Track supplier orders, invoices and contracts in one place." },
    ],
    tools: ["Reservation system", "POS", "Messaging", "Scheduling", "Accounting"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & Distribution",
    short: "Manufacturing",
    color: "#9FB4CC",
    audience: "Manufacturers and wholesale distributors",
    summary: "Speed up the order, quote and supplier work that surrounds production.",
    workflows: [
      { title: "Purchase-order processing", body: "Read incoming POs, check them against pricing and stock, and enter them into your ERP." },
      { title: "Quote preparation", body: "Pull specs, pricing and lead times together into a draft quote for review." },
      { title: "Inventory notifications", body: "Alert purchasing and production when materials or finished goods reach set levels." },
      { title: "Supplier follow-ups", body: "Chase confirmations, ship dates and missing documents from suppliers." },
      { title: "Operational reporting", body: "Compile production, order and inventory data into regular reports." },
    ],
    tools: ["ERP", "Inventory", "EDI", "Email", "Spreadsheets"],
  },
];

export const getIndustry = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
