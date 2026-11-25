/* ==========================================================================
   data.js — single source of truth for the whole site.
   Edit this file to change brand details, countries, programs, news,
   testimonials and FAQs. Navigation, footer, cards and forms update
   automatically. See README.md for step-by-step instructions.
   ========================================================================== */

/* Unsplash image helper: U("photo-id", width) */
const U = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

/* --------------------------------------------------------------------------
   1. Site-wide settings
   -------------------------------------------------------------------------- */
const site = {
  brand: "Credible Immigration Consultants",
  monogram: "CIC",
  descriptor: "Immigration Consultancy",
  phone: "+91 76960 76199",
  phoneHref: "+917696076199",
  email: "info@credibleimmigrationconsultant.com",
  whatsapp: "917696076199", // digits only, with country code
  whatsappMessage: "Hello, I would like to discuss my immigration plans.",
  booking: "https://calendly.com/your-booking-link", // <- replace with your Calendly URL
  formEndpoint: "https://formspree.io/f/YOUR_FORM_ID", // <- replace with your Formspree endpoint
  hours: [
    ["Monday – Friday", "9:00 am – 6:00 pm"],
    ["Saturday", "10:00 am – 2:00 pm"],
    ["Sunday", "Closed"]
  ],
  regulators: {
    cicc: "https://college-ic.ca/",
    mara: "https://www.mara.gov.au/"
  },
  social: {
    facebook: "https://www.facebook.com/credibleimmigrationconsultants/",
    instagram: "https://www.instagram.com/credibleimmigration?igsh=MWc2ZTAxMnYzYXlsNA=="
  },
  /* Hero statistics (placeholders: replace with figures you can substantiate) */
  stats: [
    { value: 98, suffix: "%", label: "Success Rate" },
    { value: 500, suffix: "+", label: "Files Reviewed" },
    { value: 2, suffix: "", label: "Countries" }
  ],
  showFeeFrom: true, // set to false to hide the "Starting from" line on the DIY page
  feeFrom: "$___"
};

/* --------------------------------------------------------------------------
   2. Service domains
   -------------------------------------------------------------------------- */
const services = [
  {
    id: "pr",
    anchor: "pr",
    href: "pr.html",
    image: "photo-1517935706615-2717063c2225",
    lead: "Permanent residence is a long-term decision. I help you choose the program that fits your profile, then prepare every form and document to the standard an officer expects.",
    includes: [
      "A personal assessment of your eligibility and score",
      "Program strategy for Canada and Australia",
      "Skills, education and language planning",
      "Complete application preparation and review",
      "Follow-up until a decision is made"
    ],
    steps: [
      {
        "t": "Consultation",
        "d": "We discuss your background and goals, and I explain which programs are realistic."
      },
      {
        "t": "Preparation",
        "d": "Documents, assessments and forms are prepared and checked carefully."
      },
      {
        "t": "Submission & follow-up",
        "d": "Your application is filed and monitored, and I keep you informed at every stage."
      }
    ],
    faqs: [
      {
        "q": "Which country is better for permanent residence?",
        "a": "Neither is better for everyone. It depends on your occupation, age, language ability and where you want to build your life. A consultation will compare both honestly."
      },
      {
        "q": "Can you guarantee approval?",
        "a": "No consultant can. What I can do is present the strongest, most accurate application possible and tell you plainly about any risks."
      }
    ],
    title: "Permanent Residency",
    short: "PR",
    icon: "landmark",
    menu: "Express Entry, PNP and skilled migration",
    desc: "Build a lasting future with a carefully prepared permanent residence application, from strategy to submission."
  },
  {
    id: "study",
    anchor: "study",
    href: "study-visa.html",
    image: "photo-1523050854058-8df90110c9f1",
    lead: "A student application succeeds when your course, finances and future plans form one clear story. I help you build that story and support it with the right evidence.",
    includes: [
      "Course and institution guidance",
      "Study plan or statement of purpose review",
      "Proof of funds planning",
      "Complete student application preparation",
      "Advice on work rights and pathways after study"
    ],
    steps: [
      {
        "t": "Choose your path",
        "d": "We match your goals with suitable courses, institutions and countries."
      },
      {
        "t": "Build your file",
        "d": "Offer letters, funds and your written statement are prepared together."
      },
      {
        "t": "Apply with confidence",
        "d": "Your application is reviewed in full before it is submitted."
      }
    ],
    faqs: [
      {
        "q": "Can I work while studying?",
        "a": "Most student visas allow limited work, but the rules differ by country and change over time. I will explain the current position for your destination."
      },
      {
        "q": "Can study lead to permanent residence?",
        "a": "It can be part of a longer plan. We will map out whether and how study fits your wider goals."
      }
    ],
    title: "Study Visa",
    short: "Study",
    icon: "graduation-cap",
    menu: "Canada, Australia, USA, NZ and UK",
    desc: "Choose the right course, institution and pathway, then present a clear, credible student application."
  },
  {
    id: "visitor",
    anchor: "visitor",
    href: "visitor-visa.html",
    image: "photo-1436491865332-7a61a109cc05",
    lead: "Whether you are visiting family, travelling or attending an event, a visitor application should be honest, organised and complete. Small details often decide the outcome.",
    includes: [
      "Assessment of your purpose and ties to home",
      "Invitation letter guidance",
      "Document checklist and review",
      "Previous refusal analysis",
      "Super Visa guidance for parents and grandparents (Canada)"
    ],
    steps: [
      {
        "t": "Share your plans",
        "d": "Tell me who is travelling, why and for how long."
      },
      {
        "t": "Prepare the evidence",
        "d": "We gather funds, ties and supporting documents that fit your story."
      },
      {
        "t": "Submit",
        "d": "Your application is checked for consistency before it is filed."
      }
    ],
    faqs: [
      {
        "q": "Why do visitor visas get refused?",
        "a": "Common reasons include unclear purpose, weak ties to the home country, insufficient funds and inconsistent documents. A careful review helps avoid each of these."
      },
      {
        "q": "Can I apply again after a refusal?",
        "a": "Often yes, but a new application should address the reasons given. Share the refusal letter and we will assess it."
      }
    ],
    title: "Visitor Visa",
    short: "Visitor",
    icon: "plane",
    menu: "Tourism, family visits and short stays",
    desc: "Visit family, travel or explore with a well-documented visitor application that tells your story clearly."
  },
  {
    id: "business",
    anchor: "business",
    href: "business-visa.html",
    image: "photo-1521791136064-7986c2920216",
    lead: "Investor and entrepreneur pathways are being prepared. This service will launch once the programs and supporting processes are ready to the standard my clients expect.",
    includes: [
      "Pathway assessment for investors and founders",
      "Business plan and funds documentation guidance",
      "Program strategy by country",
      "Application preparation and review"
    ],
    steps: [
      {
        "t": "Register your interest",
        "d": "Leave your email below and you will be told as soon as the service opens."
      },
      {
        "t": "Early conversation",
        "d": "Registered visitors may be offered an introductory call at launch."
      },
      {
        "t": "Launch",
        "d": "Full details, eligibility information and booking will be announced by email."
      }
    ],
    faqs: [
      {
        "q": "When will Business Visa services be available?",
        "a": "A launch date has not been set. Register your interest and you will be the first to hear."
      }
    ],
    title: "Business Visa",
    short: "Business",
    icon: "briefcase",
    menu: "Investor and entrepreneur pathways",
    desc: "Investor and entrepreneur pathways are being prepared. Register your interest and be the first to know.",
    soon: true
  }
];

/* --------------------------------------------------------------------------
   3. Countries and programs
   Add a country = add one object. Add a program = add one object to that
   country's programs[] array; it appears in the nav, footer, country page,
   home chips and services page automatically.
   -------------------------------------------------------------------------- */
const countries = {
  canada: {
    name: "Canada",
    flag: "🇨🇦",
    tagline: "A welcoming path to permanent residence, world-class education and a balanced life.",
    heroImage: U("photo-1517935706615-2717063c2225", 1920),
    cardImage: U("photo-1517935706615-2717063c2225", 900),
    overview:
      "Canada continues to welcome newcomers through a range of federal and provincial pathways. Choosing the route that genuinely fits your profile is the difference between a smooth application and a costly delay.",
    authority: "IRCC",
    programs: [
      {
        id: "express-entry",
        category: "pr",
        title: "Express Entry",
        short: "Fast-track PR for skilled workers",
        heroImage: U("photo-1559511260-66a654ae982a", 1920),
        overview:
          "Express Entry is the federal system Canada uses to manage applications for permanent residence from skilled workers. You create an online profile and receive a ranking score. Candidates with the strongest profiles are invited to apply in regular draws. Because the system is competitive, the quality and accuracy of your profile matter as much as your qualifications.",
        eligibility: [
          "Skilled work experience in an eligible occupation, or Canadian experience",
          "Language test results (English or French) at the required level",
          "An education credential, with an assessment if it was earned outside Canada",
          "Proof of settlement funds where required",
          "Good health and no inadmissibility concerns"
        ],
        steps: [
          { t: "Assess your profile", d: "We review your age, education, language ability and experience to estimate your ranking and identify improvements." },
          { t: "Prepare your credentials", d: "Language tests, education assessment and supporting evidence are arranged before you enter the pool." },
          { t: "Create your profile", d: "Your online profile is completed carefully, because errors here can follow you through the whole process." },
          { t: "Receive an invitation", d: "If your score meets a draw's cut-off, you are invited to apply and given a limited time to respond." },
          { t: "Submit and follow up", d: "A complete application is filed with all documents, then monitored until a decision is made." }
        ],
        documents: [
          "Valid passport or travel document",
          "Language test results",
          "Education credential and assessment report",
          "Employment reference letters",
          "Police certificates and medical examination",
          "Proof of funds"
        ],
        processingNote: "Processing times and draw requirements change often. Always check the current figures on the official IRCC website before making decisions.",
        faqs: [
          { q: "Do I need a job offer for Express Entry?", a: "No. Many candidates are invited without one, although a valid offer can add to your score in some cases." },
          { q: "Can I improve my ranking score?", a: "Often, yes. Stronger language results, additional education, further experience or a provincial nomination can all raise your score." },
          { q: "How long is my profile valid?", a: "A profile stays in the pool for a limited period. If you are not invited in that time, you can usually submit a new one." }
        ]
      },
      {
        id: "pnp",
        category: "pr",
        title: "PNP (Provincial Nominee Programs)",
        short: "Province-led nominations for permanent residence",
        heroImage: U("photo-1517935706615-2717063c2225", 1920),
        overview:
          "Provinces and territories nominate candidates whose skills match local labour needs. A nomination can strengthen an Express Entry profile significantly or lead to a direct application for permanent residence. Each province designs its own streams, so the best match depends on your occupation and your plans for where to live.",
        eligibility: [
          "A genuine intention to live and work in the nominating province",
          "Skills, experience or a job offer aligned with the province's priorities",
          "Language ability that meets the stream's minimum",
          "Education or work history that fits the chosen stream",
          "Documents showing financial stability and settlement readiness"
        ],
        steps: [
          { t: "Choose a province", d: "We compare provincial priorities with your occupation, family needs and long-term goals." },
          { t: "Select the right stream", d: "Each stream has its own criteria. We identify the one where your profile is strongest." },
          { t: "Apply for nomination", d: "A complete provincial application is prepared and submitted, sometimes through an expression of interest." },
          { t: "Receive your nomination", d: "Once nominated, you proceed to the federal stage of the application." },
          { t: "Apply for permanent residence", d: "The federal application is filed with your nomination and full supporting documents." }
        ],
        documents: [
          "Valid passport",
          "Language test results",
          "Education credentials and assessment",
          "Proof of work experience",
          "Job offer letter, where the stream requires one",
          "Proof of funds and settlement plan"
        ],
        processingNote: "Provincial streams open, close and change their criteria frequently. Verify current requirements on the province's official website.",
        faqs: [
          { q: "Can I apply to more than one province?", a: "In many cases you can, but each stream has its own rules. A focused application to the right province is usually stronger than a scattered approach." },
          { q: "Do I have to stay in the province that nominated me?", a: "Provinces nominate people who intend to settle there, so you should be ready to live and work in that province after you arrive." }
        ]
      }
    ],
    study: {
      desc: "Canada is home to respected universities and colleges, and many programs offer a route to post-graduation work experience. A well-chosen institution and a clear study plan make your permit application far more convincing.",
      points: [
        "Acceptance from a designated learning institution",
        "Proof of tuition payment and living funds",
        "A clear, honest statement of purpose",
        "Provincial attestation where it applies to your program",
        "Post-graduation work permit planning from day one"
      ]
    },
    visitor: {
      desc: "Whether you are visiting family, travelling or attending an event, a visitor application should show a genuine purpose, adequate funds and strong ties to your home country.",
      points: [
        "Clear purpose and itinerary for your visit",
        "Evidence of funds and employment or business ties",
        "Invitation letter when visiting family or friends",
        "Travel history and previous visa outcomes",
        "Super Visa guidance for parents and grandparents"
      ]
    },
    faqs: [
      { q: "Which Canadian program is right for me?", a: "It depends on your age, education, work experience, language results and goals. In a consultation I compare your options, such as Express Entry and provincial streams, and recommend the route with the strongest chance and the fewest risks." },
      { q: "Do I need a job offer to apply for permanent residence?", a: "Not always. Many Express Entry candidates are invited without a job offer, while some provincial streams do require one. We will check what applies to your occupation and province." },
      { q: "How long does a Canadian application take?", a: "Processing times change often and differ by program. I will explain the current estimates from IRCC during your consultation and help you prepare so that avoidable delays do not add to the wait." },
      { q: "Can I bring my spouse and children?", a: "In most pathways, yes. Accompanying family members can usually be included, and a spouse's profile can sometimes improve the overall application." }
    ]
  },

  australia: {
    name: "Australia",
    flag: "🇦🇺",
    tagline: "Skilled migration, outstanding universities and a lifestyle that rewards ambition.",
    heroImage: U("photo-1506973035872-a4ec16b8e8d9", 1920),
    cardImage: U("photo-1514395462725-fb4566210144", 900),
    overview:
      "Australia's skilled migration programs reward in-demand skills, strong English and thoughtful planning. Each subclass has its own rules, so the right strategy begins with understanding which one suits you.",
    authority: "Department of Home Affairs",
    programs: [
      {
        id: "subclass-189",
        category: "pr",
        title: "Subclass 189",
        subtitle: "Skilled Independent",
        short: "Points-tested PR with no sponsor required",
        heroImage: U("photo-1506973035872-a4ec16b8e8d9", 1920),
        overview:
          "Subclass 189 is a points-tested permanent visa for skilled workers who are not sponsored by an employer, state or family member. You submit an expression of interest, and the highest-ranked candidates are invited to apply. It offers freedom to live and work anywhere in Australia, but it is also the most competitive skilled route.",
        eligibility: [
          "An occupation on the relevant skilled occupation list",
          "A positive skills assessment from the assessing authority",
          "Meeting or exceeding the points threshold",
          "Competent English or higher, depending on your points",
          "Age, health and character requirements"
        ],
        steps: [
          { t: "Check your occupation", d: "We confirm that your occupation is eligible and identify the right assessing authority." },
          { t: "Obtain a skills assessment", d: "Your qualifications and experience are assessed against the occupation's standard." },
          { t: "Calculate and improve points", d: "We calculate your score and look at realistic ways to raise it before you submit." },
          { t: "Submit an expression of interest", d: "Your details enter the pool and are ranked against other candidates." },
          { t: "Apply after invitation", d: "If invited, a complete visa application is lodged within the time allowed." }
        ],
        documents: [
          "Valid passport",
          "Skills assessment outcome",
          "English test results",
          "Education and qualification certificates",
          "Employment references and evidence",
          "Police certificates and health examinations"
        ],
        processingNote: "Invitation rounds, occupation lists and points requirements change regularly. Confirm current details on the Department of Home Affairs website.",
        faqs: [
          { q: "Do I need an employer or state to sponsor me?", a: "No. Subclass 189 is independent, which is why the points requirement can be demanding." },
          { q: "What if my points are too low?", a: "We can look at improving English results, adding a partner's skills, gaining experience or considering a state-nominated option such as Subclass 190." }
        ]
      },
      {
        id: "subclass-190",
        category: "pr",
        title: "Subclass 190",
        subtitle: "Skilled Nominated",
        short: "State or territory nominated permanent visa",
        heroImage: U("photo-1514395462725-fb4566210144", 1920),
        overview:
          "Subclass 190 is a permanent visa for skilled workers nominated by an Australian state or territory. Nomination adds points to your score and shows a commitment to living and working in that region. Each state sets its own occupation lists and requirements, so choosing the right one is a key part of the strategy.",
        eligibility: [
          "An occupation on the state or territory's nomination list",
          "A positive skills assessment",
          "Nomination from a state or territory government",
          "Meeting the points requirement with nomination points included",
          "A commitment to live in the nominating state or territory"
        ],
        steps: [
          { t: "Select a state", d: "We match your occupation and circumstances with state nomination criteria." },
          { t: "Complete your skills assessment", d: "A positive assessment is required before nomination can be considered." },
          { t: "Lodge an expression of interest", d: "Your details are submitted, and you indicate the state you wish to be nominated by." },
          { t: "Apply for nomination", d: "When the state invites you, a full nomination application is prepared with supporting evidence." },
          { t: "Lodge your visa application", d: "After nomination you are invited to apply for the visa, with all documents in order." }
        ],
        documents: [
          "Valid passport",
          "Skills assessment outcome",
          "English test results",
          "State nomination application documents",
          "Employment and education evidence",
          "Police certificates and health examinations"
        ],
        processingNote: "State nomination rules and allocations change often. Always confirm requirements on the relevant state government and Home Affairs websites.",
        faqs: [
          { q: "Must I live in the nominating state?", a: "You are expected to live and work in the nominating state or territory for a period after the visa is granted, so choose a place you genuinely intend to settle." },
          { q: "Is Subclass 190 easier than 189?", a: "It can be, because nomination adds points. However, states have their own priorities and conditions, so it is not always simpler." }
        ]
      },
      {
        id: "subclass-491",
        category: "pr",
        title: "Subclass 491",
        subtitle: "Skilled Work Regional (Provisional)",
        short: "Provisional regional visa with a pathway to PR",
        heroImage: U("photo-1506973035872-a4ec16b8e8d9", 1920),
        overview:
          "Subclass 491 is a provisional visa for skilled workers who will live and work in a designated regional area of Australia. After meeting the requirements, holders can apply for permanent residence. It is often a practical route for candidates who need additional points or who are drawn to life outside the major cities.",
        eligibility: [
          "Nomination by a state or territory, or sponsorship by an eligible relative in a regional area",
          "A positive skills assessment for your occupation",
          "Meeting the points requirement",
          "Willingness to live and work in a designated regional area",
          "Competent English and standard health and character checks"
        ],
        steps: [
          { t: "Confirm regional eligibility", d: "We check whether your occupation and plans fit a regional nomination or family sponsorship." },
          { t: "Obtain a skills assessment", d: "Your skills are assessed by the relevant authority." },
          { t: "Lodge an expression of interest", d: "Your details are entered into the pool, indicating the regional pathway." },
          { t: "Secure nomination or sponsorship", d: "A state or an eligible relative supports your application." },
          { t: "Apply, then plan for permanent residence", d: "After the provisional visa is granted, we map out the requirements for a later permanent residence application." }
        ],
        documents: [
          "Valid passport",
          "Skills assessment outcome",
          "English test results",
          "Nomination or sponsorship documents",
          "Employment and education evidence",
          "Police certificates and health examinations"
        ],
        processingNote: "Regional area definitions and the permanent residence pathway can change. Verify the current rules on the Department of Home Affairs website.",
        faqs: [
          { q: "Is Subclass 491 permanent?", a: "No. It is a provisional visa. Holders who meet the conditions can later apply for permanent residence." },
          { q: "Can I move out of the regional area?", a: "There are conditions about where you live and work while holding the visa. We will explain these clearly before you apply." }
        ]
      }
    ],
    study: {
      desc: "Australia's universities and vocational institutions attract students from around the world. A strong application connects your course choice to your career goals and demonstrates that you are a genuine student.",
      points: [
        "Confirmation of Enrolment from a registered provider",
        "Evidence of funds for tuition and living costs",
        "A convincing Genuine Student statement",
        "Overseas Student Health Cover arrangements",
        "English proficiency evidence where required"
      ]
    },
    visitor: {
      desc: "Visiting Australia for tourism, family or short business activities calls for an application that is consistent, well documented and honest about your plans.",
      points: [
        "A clear purpose for travel and a realistic stay length",
        "Evidence of funds and ties to your home country",
        "Invitation or sponsor details when visiting relatives",
        "Accurate travel history and previous visa details",
        "Guidance on the right visitor subclass for your situation"
      ]
    },
    faqs: [
      { q: "What is the difference between subclasses 189, 190 and 491?", a: "Subclass 189 is independent and not tied to a state. Subclass 190 requires state or territory nomination and gives permanent residence. Subclass 491 is a provisional regional visa with a later pathway to permanent residence." },
      { q: "Do I need a skills assessment first?", a: "In most skilled migration pathways, yes. The assessing authority depends on your occupation, so selecting the right one at the start saves both time and money." },
      { q: "How are points calculated?", a: "Points are awarded for factors such as age, English ability, education, skilled employment and, in some cases, nomination or partner skills. I will calculate your score and show where it can realistically be improved." },
      { q: "Can I study in Australia and later apply for residence?", a: "Study can be part of a longer plan, but a student visa must reflect a genuine intention to study. We will map out your goals honestly so that every step supports the next." }
    ]
  }
};

/* Helper: full display title, e.g. "Subclass 189 (Skilled Independent)" */
const programTitle = (p) =>
  p.subtitle ? `${p.title} (${p.subtitle.replace(/\s*\(([^)]*)\)/, ", $1")})` : p.title;


/* --------------------------------------------------------------------------
   4. Study destinations (flag tiles on the Services page)
   -------------------------------------------------------------------------- */
const studyDestinations = [
  { id: "canada", name: "Canada", flag: "🇨🇦", note: "Colleges, universities and work-experience pathways." },
  { id: "australia", name: "Australia", flag: "🇦🇺", note: "Highly ranked institutions and a vibrant student life." },
  { id: "usa", name: "USA", flag: "🇺🇸", note: "Diverse programs and globally recognised degrees." },
  { id: "nz", name: "New Zealand", flag: "🇳🇿", note: "Quality education in a welcoming, relaxed setting." },
  { id: "uk", name: "United Kingdom", flag: "🇬🇧", note: "Historic universities and shorter degree routes." }
];

/* --------------------------------------------------------------------------
   5. News (add an article by adding one object; newest date shows first)
   -------------------------------------------------------------------------- */
const news = [
  {
    id: "category-based-draws",
    title: "How category-based selection can shape your Express Entry strategy",
    date: "2026-10-28",
    category: "PR",
    country: "Canada",
    image: U("photo-1517935706615-2717063c2225", 900),
    excerpt: "Targeted draws reward specific skills and language profiles. Here is how to find out whether your background fits a category.",
    body: [
      "Express Entry does not rank every candidate on score alone. From time to time, invitations are directed at candidates with particular occupations, language abilities or other attributes.",
      "That means two profiles with the same score can have very different outcomes. A candidate in a targeted category may be invited earlier, while another waits for a general draw.",
      "Before you submit your profile, review the current categories on the official IRCC website and compare them with your work history. If you are close to qualifying, a small change in documentation or timing can make a real difference.",
      "This article is general information only. Categories change, so always check the official source before making decisions."
    ]
  },
  {
    id: "genuine-student",
    title: "Writing a convincing Genuine Student statement for Australia",
    date: "2026-10-12",
    category: "Study",
    country: "Australia",
    image: U("photo-1523050854058-8df90110c9f1", 900),
    excerpt: "Case officers want to understand why this course, why this country and why now. Learn how to answer clearly and honestly.",
    body: [
      "A strong statement connects your past, your chosen course and your future plans in a way that feels natural and specific to you.",
      "Avoid generic wording. Explain what you studied or did before, why this course is the next logical step, and how it supports your career at home or abroad.",
      "Be consistent. Your statement, your financial documents and your answers on the form should all tell the same story.",
      "If your study gap is long, or you are changing fields, address it directly rather than hoping it goes unnoticed."
    ]
  },
  {
    id: "document-mistakes",
    title: "Five document mistakes that quietly lead to refusals",
    date: "2026-09-30",
    category: "Guides",
    country: "Canada & Australia",
    image: U("photo-1569154941061-e231b4725ef1", 900),
    excerpt: "Most refusals are not dramatic. They come from small inconsistencies that a careful review would have caught.",
    body: [
      "Mismatched names, unexplained gaps, expired documents, unofficial translations and incomplete forms are among the most common causes of avoidable problems.",
      "Each one is easy to fix before you submit, and very hard to fix afterwards. This is why a professional review of the complete file is so valuable.",
      "Create a simple checklist for your application, check every date and spelling against your passport, and keep copies of everything you upload."
    ]
  },
  {
    id: "choosing-province",
    title: "Choosing a province: matching your profile to a nominee program",
    date: "2026-09-14",
    category: "PR",
    country: "Canada",
    image: U("photo-1559511260-66a654ae982a", 900),
    excerpt: "Provincial programs value different things. A thoughtful match often matters more than a higher score.",
    body: [
      "Every province designs its nominee streams around its own economy. Some prioritise health care, others technology, trades or agriculture.",
      "Rather than applying everywhere, choose where you can genuinely see yourself living and where your skills are in demand. Provinces look for candidates who will stay.",
      "Research living costs, job markets and community networks, then compare them with your goals. A short consultation can help you narrow the options quickly."
    ]
  },
  {
    id: "visitor-ties",
    title: "Showing strong ties to your home country in a visitor application",
    date: "2026-08-22",
    category: "Visitor",
    country: "Canada & Australia",
    image: U("photo-1436491865332-7a61a109cc05", 900),
    excerpt: "Officers need confidence that you will return. These are the documents and explanations that help most.",
    body: [
      "Ties are the reasons you will return home: employment, business interests, property, family responsibilities and a stable life.",
      "Provide evidence rather than statements. Employment letters, pay records, property documents and proof of family relationships all help to build a complete picture.",
      "Explain your trip in simple terms. A realistic itinerary and sensible funds are more persuasive than an elaborate plan."
    ]
  },
  {
    id: "limited-scope",
    title: "What is a Limited Scope Retainer, and why does it matter?",
    date: "2026-08-05",
    category: "Guides",
    country: "Canada",
    image: U("photo-1521791136064-7986c2920216", 900),
    excerpt: "For DIY file reviews, a Limited Scope Retainer defines exactly what is included, and what remains your responsibility.",
    body: [
      "A Limited Scope Retainer is a written agreement that sets out a defined piece of work, such as a review of your completed application, rather than full representation.",
      "It protects both sides. You know what you are paying for, and the consultant knows precisely what has been asked.",
      "In a DIY review, you remain the applicant of record and are responsible for submitting your application. The review exists to help you submit with greater confidence."
    ]
  }
];

/* --------------------------------------------------------------------------
   6. Testimonials (sample content: replace with real, consented reviews)
   -------------------------------------------------------------------------- */
const testimonials = [
  {
    name: "Aarav & Meera S.",
    type: "PR",
    country: "Canada",
    rating: 5,
    photo: null,
    quote: "We had been confused by conflicting advice for months. A single clear conversation gave us a plan, and every document was reviewed with real care."
  },
  {
    name: "Daniel K.",
    type: "Study",
    country: "Australia",
    rating: 5,
    photo: null,
    quote: "My study statement went from vague to genuinely convincing. I always knew who was handling my file, and replies came quickly."
  },
  {
    name: "Priya N.",
    type: "PR",
    country: "Australia",
    rating: 5,
    photo: null,
    quote: "The points breakdown was honest and practical. I knew what to improve and in what order, with no false promises."
  },
  {
    name: "Samuel O.",
    type: "Visitor",
    country: "Canada",
    rating: 5,
    photo: null,
    quote: "I wanted my parents to visit and was nervous about a refusal. The application was organised so well that the process felt calm."
  },
  {
    name: "Hannah L.",
    type: "Study",
    country: "Canada",
    rating: 5,
    photo: null,
    quote: "From choosing a college to preparing my funds, every step was explained clearly. I felt looked after rather than processed."
  },
  {
    name: "Rohan & Isha M.",
    type: "PR",
    country: "Canada",
    rating: 5,
    photo: null,
    quote: "The DIY file review caught two errors that could have cost us dearly. For the price, it was remarkable value and total peace of mind."
  },
  {
    name: "Chloe T.",
    type: "Visitor",
    country: "Australia",
    rating: 4,
    photo: null,
    quote: "Straightforward, courteous and thorough. My visitor application was approved without any additional requests."
  },
  {
    name: "Mohammed A.",
    type: "Study",
    country: "Australia",
    rating: 5,
    photo: null,
    quote: "Honest advice, even when it was not what I hoped to hear. That honesty is exactly why I trust the result."
  }
];

/* --------------------------------------------------------------------------
   7. DIY File Review FAQs
   -------------------------------------------------------------------------- */
const diyFaqs = [
  {
    q: "How long does a review take?",
    a: "Most reviews are completed within a few working days of receiving your complete documents. Complex files may take a little longer, and I will confirm the timeline before we begin."
  },
  {
    q: "Is my information confidential?",
    a: "Yes. Your documents and personal details are used only for your review and are never shared without your consent, except where the law requires. Please see the Privacy Policy for details."
  },
  {
    q: "Do you submit the application for me?",
    a: "No. In a DIY review you remain the applicant of record and submit your own application. I review it beforehand and explain what to correct. If you would prefer full representation, we can discuss that separately."
  },
  {
    q: "What if my application was refused before?",
    a: "A previous refusal does not close the door. Share the refusal letter and any notes from your file, and the review will focus on the reasons given and how to address them in a stronger application."
  },
  {
    q: "Can you review Australian applications?",
    a: "Yes. Reviews are available for both Canadian and Australian applications, covering the programs listed on this website."
  },
  {
    q: "How are fees decided?",
    a: "Fees depend on the type and complexity of your application. You will receive a clear written quote before any work starts, with no hidden charges."
  }
];
