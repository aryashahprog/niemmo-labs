export type Workflow = { title: string; body: string };

export type FlowExample = {
  name: string;
  trigger: string;
  steps: string[];
  review: string;
  result: string;
};

export type Industry = {
  slug: string;
  name: string;
  short: string;
  color: string;
  audience: string;
  summary: string;
  workflows: Workflow[];
  tools: string[];
  example: FlowExample;
  /** Shown on the homepage and in primary industry navigation. */
  featured?: boolean;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "healthcare",
    name: "Clinics & Private Practices",
    short: "Clinics",
    color: "#00D4AA",
    featured: true,
    audience: "Independent clinics and private practices",
    summary: "Less front-desk paperwork before, between and after appointments.",
    workflows: [
      { title: "Patient intake", body: "Intake forms and documents collected before the visit, checked for missing fields, with reminders until complete." },
      { title: "Confirmations and rescheduling", body: "Appointment confirmations sent through your scheduling tools, with reschedule requests routed to the front desk." },
      { title: "Referral paperwork", body: "Incoming referrals read, sorted to the right queue and checked for missing documents before staff pick them up." },
      { title: "Follow-ups and EMR handoffs", body: "Outstanding paperwork and callbacks tracked, and details prepared for staff to confirm in the EMR." },
    ],
    tools: ["EMR / EHR", "Practice management", "Scheduling", "E-fax", "Email & SMS"],
    example: {
      name: "New patient intake",
      trigger: "A new patient books a visit.",
      steps: [
        "The practice’s own intake forms go out by text or email.",
        "Responses are checked for missing fields, with reminders until they’re complete.",
        "Completed details are prepared for the patient record.",
      ],
      review: "Front-desk staff review flagged items, such as an unreadable insurance card, and approve what goes into the EMR. Clinical questions stay with clinicians.",
      result: "The patient arrives with paperwork done and the front desk knows what’s still outstanding.",
    },
  },
  {
    slug: "accounting",
    name: "Accounting & Bookkeeping",
    short: "Accounting",
    color: "#B48CFF",
    featured: true,
    audience: "Accounting firms and bookkeeping practices",
    summary: "Less chasing for documents, and a clear view of where every client stands at month-end.",
    workflows: [
      { title: "Client document collection", body: "Recurring checklists built from your engagement templates, with reminders until every item is in." },
      { title: "Client onboarding setup", body: "New engagements turned into client folders, checklists and tasks in the tools your firm already uses." },
      { title: "Invoice data for review", body: "Bills and receipts read into structured entries, prepared for a bookkeeper to approve." },
      { title: "Month-end status reporting", body: "A regular summary of which clients are complete, waiting on documents or ready for review." },
    ],
    tools: ["Accounting software", "Client portal", "Document storage", "Spreadsheets", "Email"],
    example: {
      name: "Client document collection",
      trigger: "A client’s month-end checklist opens, built from the firm’s approved engagement template.",
      steps: [
        "Requests for statements and receipts go out through the firm’s approved portal or channel.",
        "Incoming files are matched to the right client and period, and the missing-items tracker updates.",
        "Scheduled reminders go out for anything still outstanding.",
      ],
      review: "Staff check mismatched or unreadable files. Advice, filings and payments stay with the firm.",
      result: "An organized document set for each client, and a tracker that shows exactly what’s still missing.",
    },
  },
  {
    slug: "real-estate",
    name: "Property Management",
    short: "Property Management",
    color: "#E8553D",
    featured: true,
    audience: "Residential and commercial property managers",
    summary: "Keep maintenance requests, vendor paperwork and owner reporting organized across every property.",
    workflows: [
      { title: "Maintenance inbox to work order", body: "Tenant emails and forms turned into structured requests, ready for a manager to act on." },
      { title: "Vendor document tracking", body: "Insurance certificates and tax forms kept on file, with reminders before anything expires." },
      { title: "Invoice coding drafts", body: "Vendor invoices read and coded to the right property and account, then queued for approval." },
      { title: "Owner report assembly", body: "Statements, work-order summaries and notes gathered into a draft owner report for review." },
    ],
    tools: ["Property management software", "Tenant portal & email", "Accounting", "Document storage", "Spreadsheets"],
    example: {
      name: "Maintenance inbox to work order",
      trigger: "A tenant emails or submits a form about a maintenance issue.",
      steps: [
        "The message becomes a structured request tied to the property and unit.",
        "Missing photos or details are requested from the tenant.",
        "The request is classified using rules the manager approves, and anything that looks urgent is flagged for immediate human handling.",
      ],
      review: "The manager approves the vendor assignment. Emergencies and tenant decisions stay with your team.",
      result: "A work order with its status kept in sync, and a completion summary ready when the job closes.",
    },
  },
  {
    slug: "home-services",
    name: "Home Services",
    short: "Home Services",
    color: "#F5A623",
    featured: true,
    audience: "HVAC, plumbing, electrical and commercial cleaning businesses",
    summary: "Less office admin between the quote, the job and the invoice.",
    workflows: [
      { title: "Quote-to-job admin", body: "Accepted quotes turned into scheduled jobs and checklists, with the office confirming each step." },
      { title: "Incoming lead routing", body: "Calls, web forms and messages logged in your CRM and routed to the right person." },
      { title: "Supplier invoice capture", body: "Supplier bills read and matched to jobs, ready for the office to review." },
      { title: "Technician paperwork summaries", body: "Job notes, photos and forms from the field condensed into a clear summary for the office." },
    ],
    tools: ["Field service software", "CRM", "Phone & SMS", "Accounting", "Spreadsheets"],
    example: {
      name: "Quote-to-job admin",
      trigger: "A quote is sent from your existing CRM or field service software.",
      steps: [
        "Follow-ups run only where your software’s built-in reminders leave a gap.",
        "Customer replies are routed to the office with the quote attached.",
        "An accepted quote creates a job checklist, and completion paperwork becomes an invoice draft.",
      ],
      review: "The office confirms the schedule and approves the invoice. Pricing and discounts are always set by your team.",
      result: "Accepted quotes become scheduled jobs and ready-to-review invoice drafts without re-keying.",
    },
  },
  {
    slug: "professional-services",
    name: "Agencies & Consulting",
    short: "Agencies & Consulting",
    color: "#5B8DEF",
    featured: true,
    audience: "Marketing, creative and consulting firms",
    summary: "Spend less time coordinating client work.",
    workflows: [
      { title: "Signed client to project kickoff", body: "A signed agreement sets up the project, folders and kickoff steps your team has approved." },
      { title: "Client report assembly", body: "Data and updates gathered into a draft report for your team to review before it goes out." },
      { title: "Meeting actions to tracker", body: "Action items from meeting notes added to your project tracker with owners and dates." },
      { title: "Invoice reminders and receivables", body: "Reminders on overdue invoices and a clear view of what’s outstanding." },
    ],
    tools: ["CRM", "Project management", "Document storage", "E-signature", "Email & calendar"],
    example: {
      name: "Signed client to project kickoff",
      trigger: "A client signs the agreement.",
      steps: [
        "A structured intake captures scope, contacts and key dates.",
        "Approved folder and project templates are created.",
        "A kickoff email is drafted, access requests go out through approved channels and missing inputs are flagged.",
      ],
      review: "The account or project manager reviews the setup and approves the handoff.",
      result: "The team starts with the project set up, the right access and a clear brief.",
    },
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
    example: {
      name: "Proof of delivery to invoice",
      trigger: "A driver uploads a signed proof of delivery.",
      steps: [
        "The document is read and matched to the shipment.",
        "Delivery details are checked against the order and agreed rate.",
        "An invoice is drafted with the proof of delivery attached.",
      ],
      review: "Billing staff review mismatches, such as quantity or rate differences.",
      result: "Invoices go out with the right documents attached.",
    },
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
    example: {
      name: "Subcontractor onboarding",
      trigger: "A subcontractor is awarded work on a project.",
      steps: [
        "The insurance certificate, tax form and agreement are requested.",
        "Documents are checked for required fields and expiration dates.",
        "The subcontractor record is updated and renewal reminders are scheduled.",
      ],
      review: "The project manager approves the subcontractor before work starts.",
      result: "Required documents are on file and expirations are tracked.",
    },
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
    example: {
      name: "Return request",
      trigger: "A customer requests a return through your store.",
      steps: [
        "The order is checked against your return policy.",
        "A return label is issued and the customer is updated.",
        "The returned item is routed to restock, repair or write-off.",
      ],
      review: "Your team handles exceptions, such as items outside the return window.",
      result: "Routine returns are handled the same way every time, and exceptions reach a person.",
    },
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
    example: {
      name: "Guest inquiry",
      trigger: "A guest sends a question by email, chat or message.",
      steps: [
        "The question is matched to your policies, availability and amenities.",
        "A reply is drafted in your voice.",
        "Booking-related requests are added to the reservation.",
      ],
      review: "Staff approve replies to anything unusual, such as special requests or complaints.",
      result: "Guests get quick, consistent answers and staff focus on the exceptions.",
    },
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
    example: {
      name: "Purchase-order entry",
      trigger: "A customer emails a purchase order as a PDF.",
      steps: [
        "Line items, quantities and dates are extracted.",
        "Items are checked against pricing and available stock.",
        "A draft order is prepared in your ERP.",
      ],
      review: "Customer service approves the order and resolves any price or stock differences.",
      result: "Orders are entered consistently and discrepancies are caught before confirmation.",
    },
  },
];

export const getIndustry = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);

export const FEATURED_INDUSTRIES = INDUSTRIES.filter((i) => i.featured);
export const OTHER_INDUSTRIES = INDUSTRIES.filter((i) => !i.featured);
