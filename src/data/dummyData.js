// src/data/dummyData.js
export const users = [
  {
    id: "user_123",
    name: "Kwame Asare",
    email: "kwame@example.com",
    profilePic: "/profiles/user1.jpg",
    role: "user",
    accountStatus: "Suspended",
    joinedDate: "2023-05-15T08:30:00Z",
    lastLogin: "2023-07-20T14:25:00Z",
    reviews: ["rev_001", "rev_003"],
    jobs: ["job-1", "job-3"],
    location: "Accra, Osu",
    phone: "0244123456",
  },

  {
    id: "user_456",
    name: "Ama Boateng",
    email: "ama@example.com",
    profilePic: "/profiles/user2.jpg",
    role: "user",
    accountStatus: "Active",
    joinedDate: "2023-06-20T10:15:00Z",
    lastLogin: "2023-07-18T09:45:00Z",
    reviews: ["rev_002"],
    jobs: ["job-2"],
    location: "Accra, Osu",
    phone: "0209876543",
  },
];

export const artisans = [
  {
    id: "art_789",
    name: "Kofi Mensah",
    email: "kofi@example.com",
    password: "password123", // Added from previous structure
    profilePic: "/profiles/artisan1.jpg",
    role: "artisan",
    businessName: "Adinkra Crafts",
    craft: "Plumber",
    description:
      "Professional wood carver with 10 years of experience. Specializing in traditional Adinkra symbols and custom designs.", // Added
    rating: 3,
    reviewCount: 42, // Added (matches completedJobs)
    hourlyRate: 25, // Added
    specialties: ["Traditional Carvings", "Furniture", "Sculptures"], // Added
    location: "Kumasi, Ashanti Region", // Added
    experience: "10 years", // Added
    accountStatus: "Active",
    whatsapp: "+233201234567", // Added
    phone: "+233201234567", // Added
    portfolio: [
      // Added
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    joinedDate: "2023-04-10T09:20:00Z",
    lastLogin: "2023-07-19T16:30:00Z",
    status: "active",
    verificationStatus: "verified",
    completedJobs: 42,
    jobs: ["job-1", "job-3"],
    reviews: ["rev_001"],
  },
  {
    id: "art_012",
    name: "Esi Johnson",
    email: "esi@example.com",
    password: "password123", // Added
    profilePic: "/profiles/artisan2.jpg",
    role: "artisan",
    businessName: "Kente Weavers",
    craft: "Electrician",
    description:
      "Master weaver preserving traditional Kente techniques with 8 years of experience. Creates custom patterns for special occasions.", // Added
    rating: 4.9,
    reviewCount: 67, // Added
    hourlyRate: 30, // Added
    specialties: ["Kente Cloth", "Custom Designs", "Textile Dyeing"], // Added
    location: "Accra, Greater Accra", // Added
    experience: "8 years", // Added
    accountStatus: "Active",
    whatsapp: "+233202345678", // Added
    phone: "+233202345678", // Added
    portfolio: [
      // Added
      "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    joinedDate: "2023-03-22T14:10:00Z",
    lastLogin: "2023-07-21T11:20:00Z",
    status: "active",
    verificationStatus: "pending",
    completedJobs: 67,
    jobs: ["job-2"],
    reviews: ["rev_002", "rev_003"],
  },
  // Add more artisans as needed
];

export const reviews = [
  {
    id: "rev_001",
    userId: "user_123",
    artisanId: "art_789",
    jobId: "job-1",
    rating: 4,
    comment:
      "Excellent craftsmanship! The wood carving was exactly as described and delivered on time.",
    date: "2023-07-12T14:30:00Z",
    status: "verified",
    flagged: false,
    flaggedReason: "",
    Name: "Kwame Asare",
  },
  {
    id: "rev_002",
    userId: "user_456",
    artisanId: "art_012",
    jobId: "job-2",
    rating: 5,
    comment:
      "Beautiful kente cloth! Esi was professional and delivered ahead of schedule.",
    date: "2023-07-15T10:45:00Z",
    status: "verified",
    flagged: false,
    flaggedReason: "",
    userName: "Ama Boateng",
  },
  {
    id: "rev_003",
    userId: "user_123",
    artisanId: "art_012",
    jobId: "job-3",
    rating: 2,
    comment: "Poor quality materials used. The colors faded after first wash.",
    date: "2023-07-18T16:20:00Z",
    status: "pending",
    flagged: true,
    flaggedReason: "Inappropriate language",
    userName: "Kwame Asare",
  },
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Artsans's Profile In Public VERIFIED
export const publicArtisanProfiles = [
  {
    id: "art_pl001",
    name: "Kwame Asante",
    email: "kwame.asante@example.com",
    profilePic: "/profiles/plumber1.jpg",
    role: "artisan",
    businessName: "Asante Plumbing Solutions",
    craft: "Plumber",
    description:
      "Master plumber with 15 years experience in residential and commercial systems. Specializes in emergency repairs and pipe installations.",
    rating: 4.7,
    reviewCount: 68,
    hourlyRate: 45,
    specialties: [
      "Pipe Installations",
      "Leak Detection",
      "Water Heater Repair",
    ],
    location: "Accra, Greater Accra Region",
    experience: "15 years",
    whatsapp: "+233201234568",
    phone: "+233201234568",
    accountStatus: "Active",
    verificationStatus: "verified",
    portfolio: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    ],
    stats: {
      totalJobs: 142,
      acceptedJobs: 138,
      completedJobs: 132,
      pendingJobs: 6,
      cancelledJobs: 4,
    },
    reviews: [
      {
        id: "rev_pl001",
        jobId: "job-pl45",
        rating: 5,
        comment: "Fixed our burst pipe at 2AM during a holiday! Lifesaver.",
        date: "2024-06-15T03:30:00Z",
        user: {
          id: "user_301",
          name: "Ama Serwaa",
          profilePic: "/profiles/user30.jpg",
        },
      },
    ],
    services: [
      {
        id: "svc_pl01",
        service: "Emergency Leak Repair",
        description: "24/7 emergency plumbing services",
        price: "GHS 350/hr",
        estimatedTime: "1-3 hours",
      },
    ],
    pricingNotes: `Emergency service premium applies after hours.
Minimum 1-hour charge.
Pipe materials billed separately.
Free leak detection with repair service.`,
  },
  {
    id: "art_el002",
    name: "Ama Ampofo",
    email: "ama.ampofo@example.com",
    profilePic: "/profiles/electrician1.jpg",
    role: "artisan",
    businessName: "Ampofo Electricals",
    craft: "Electrician",
    description:
      "Certified electrician specializing in solar installations and smart home systems with 8 years experience.",
    rating: 4.9,
    reviewCount: 52,
    hourlyRate: 55,
    specialties: ["Solar Systems", "Home Wiring", "Smart Home Installation"],
    location: "Kumasi, Ashanti Region",
    experience: "8 years",
    whatsapp: "+233202345678",
    phone: "+233202345678",
    accountStatus: "Active",
    verificationStatus: "verified",
    portfolio: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    ],
    stats: {
      totalJobs: 118,
      acceptedJobs: 115,
      completedJobs: 112,
      pendingJobs: 3,
      cancelledJobs: 3,
    },
    reviews: [
      {
        id: "rev_el002",
        jobId: "job-el72",
        rating: 5,
        comment:
          "Installed our solar system perfectly - zero issues after 1 year!",
        date: "2024-03-10T14:15:00Z",
        user: {
          id: "user_302",
          name: "Kwabena Yeboah",
          profilePic: "/profiles/user31.jpg",
        },
      },
    ],
    services: [
      {
        id: "svc_el02",
        service: "Solar Panel Installation",
        description: "Complete solar power system setup",
        price: "GHS 500/hr",
        estimatedTime: "8-12 hours",
      },
    ],
    pricingNotes: `Solar components priced separately.
Free energy audit included.
10-year workmanship warranty.
Payment plan available for large projects.`,
  },
  {
    id: "art_ca003",
    name: "Yaw Boateng",
    email: "yaw.boateng@example.com",
    profilePic: "/profiles/carpenter1.jpg",
    role: "artisan",
    businessName: "Boateng Woodworks",
    craft: "Carpenter",
    description:
      "Traditional carpenter specializing in custom furniture and home renovations using sustainable materials.",
    rating: 4.8,
    reviewCount: 47,
    hourlyRate: 40,
    specialties: ["Custom Furniture", "Cabinet Making", "Home Renovations"],
    location: "Takoradi, Western Region",
    experience: "12 years",
    whatsapp: "+233203456789",
    phone: "+233203456789",
    accountStatus: "Active",
    verificationStatus: "verified",
    portfolio: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    ],
    stats: {
      totalJobs: 156,
      acceptedJobs: 150,
      completedJobs: 145,
      pendingJobs: 5,
      cancelledJobs: 5,
    },
    reviews: [
      {
        id: "rev_ca003",
        jobId: "job-ca89",
        rating: 5,
        comment:
          "Built custom cabinets that transformed our kitchen - exquisite craftsmanship!",
        date: "2024-05-22T11:20:00Z",
        user: {
          id: "user_303",
          name: "Esi Nyarko",
          profilePic: "/profiles/user32.jpg",
        },
      },
    ],
    services: [
      {
        id: "svc_ca03",
        service: "Custom Cabinet Making",
        description: "Handcrafted cabinets to your specifications",
        price: "GHS 380/hr",
        estimatedTime: "20-30 hours",
      },
    ],
    pricingNotes: `50% deposit required for custom projects.
Premium woods available at additional cost.
Free 3D design consultation.
1-year guarantee on all workmanship.`,
  },
  {
    id: "art_pa004",
    name: "Akosua Mensah",
    email: "akosua.mensah@example.com",
    profilePic: "/profiles/painter1.jpg",
    role: "artisan",
    businessName: "Mensah Painting Co.",
    craft: "Painter",
    description:
      "Professional painter with expertise in decorative finishes, murals, and commercial painting projects.",
    rating: 4.6,
    reviewCount: 39,
    hourlyRate: 35,
    specialties: ["Wall Murals", "Faux Finishes", "Commercial Painting"],
    location: "Tema, Greater Accra",
    experience: "9 years",
    whatsapp: "+233204567890",
    phone: "+233204567890",
    accountStatus: "Active",
    verificationStatus: "verified",
    portfolio: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    ],
    stats: {
      totalJobs: 128,
      acceptedJobs: 125,
      completedJobs: 120,
      pendingJobs: 5,
      cancelledJobs: 3,
    },
    reviews: [
      {
        id: "rev_pa004",
        jobId: "job-pa34",
        rating: 5,
        comment:
          "Painted our entire office complex ahead of schedule - beautiful work!",
        date: "2024-04-18T16:45:00Z",
        user: {
          id: "user_304",
          name: "Kwame Osei",
          profilePic: "/profiles/user33.jpg",
        },
      },
    ],
    services: [
      {
        id: "svc_pa04",
        service: "Commercial Painting",
        description: "Professional painting for offices and businesses",
        price: "GHS 300/hr",
        estimatedTime: "Varies by space",
      },
    ],
    pricingNotes: `Price includes surface preparation.
Premium paints available at additional cost.
Free color consultation.
Weekend rates 25% higher.`,
  },
  {
    id: "art_ta005",
    name: "Esi Owusu",
    email: "esi.owusu@example.com",
    profilePic: "/profiles/tailor1.jpg",
    role: "artisan",
    businessName: "Owusu Couture",
    craft: "Tailor",
    description:
      "Master tailor specializing in bespoke African print garments and formal wear with 14 years experience.",
    rating: 4.9,
    reviewCount: 72,
    hourlyRate: 30,
    specialties: ["African Prints", "Bespoke Suits", "Bridal Wear"],
    location: "East Legon, Accra",
    experience: "14 years",
    whatsapp: "+233205678901",
    phone: "+233205678901",
    accountStatus: "Active",
    verificationStatus: "verified",
    portfolio: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    ],
    stats: {
      totalJobs: 230,
      acceptedJobs: 225,
      completedJobs: 220,
      pendingJobs: 5,
      cancelledJobs: 5,
    },
    reviews: [
      {
        id: "rev_ta005",
        jobId: "job-ta12",
        rating: 5,
        comment:
          "Made my wedding dress from scratch - perfect fit and stunning design!",
        date: "2024-02-14T10:10:00Z",
        user: {
          id: "user_305",
          name: "Adwoa Fosu",
          profilePic: "/profiles/user34.jpg",
        },
      },
    ],
    services: [
      {
        id: "svc_ta05",
        service: "Bespoke African Print Dress",
        description: "Custom-made dress from your chosen fabric",
        price: "GHS 250/hr",
        estimatedTime: "15-20 hours",
      },
    ],
    pricingNotes: `Fabric cost not included.
Free initial consultation.
3 fittings included in price.
Rush orders available at 30% premium.`,
  },
  {
    id: "art_ma006",
    name: "Kofi Anane",
    email: "kofi.anane@example.com",
    profilePic: "/profiles/mason1.jpg",
    role: "artisan",
    businessName: "Anane Masonry",
    craft: "Mason",
    description:
      "Expert bricklayer specializing in structural masonry, stonework, and heritage restoration projects.",
    rating: 4.7,
    reviewCount: 41,
    hourlyRate: 42,
    specialties: ["Brickwork", "Stone Masonry", "Heritage Restoration"],
    location: "Cape Coast, Central Region",
    experience: "16 years",
    whatsapp: "+233206789012",
    phone: "+233206789012",
    accountStatus: "Active",
    verificationStatus: "verified",
    portfolio: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    ],
    stats: {
      totalJobs: 178,
      acceptedJobs: 175,
      completedJobs: 170,
      pendingJobs: 5,
      cancelledJobs: 3,
    },
    reviews: [
      {
        id: "rev_ma006",
        jobId: "job-ma56",
        rating: 5,
        comment:
          "Restored our 100-year-old family house perfectly - true craftsman!",
        date: "2024-01-05T09:30:00Z",
        user: {
          id: "user_306",
          name: "Nana Kwame",
          profilePic: "/profiles/user35.jpg",
        },
      },
    ],
    services: [
      {
        id: "svc_ma06",
        service: "Heritage Restoration",
        description: "Traditional masonry restoration for historical buildings",
        price: "GHS 400/hr",
        estimatedTime: "Varies by project",
      },
    ],
    pricingNotes: `Specialized materials may require sourcing time.
Free structural assessment.
Historical accuracy guaranteed.
10% discount for non-profit heritage projects.`,
  },
  {
    id: "art_wc007",
    name: "Yaa Asantewaa",
    email: "yaa.asantewaa@example.com",
    profilePic: "/profiles/woodcarver1.jpg",
    role: "artisan",
    businessName: "Asantewaa Carvings",
    craft: "Wood Carver",
    description:
      "Master wood carver creating traditional Ashanti stools and contemporary sculptures with 20 years experience.",
    rating: 4.9,
    reviewCount: 58,
    hourlyRate: 60,
    specialties: [
      "Royal Stools",
      "Contemporary Sculptures",
      "Wood Restoration",
    ],
    location: "Manhyia, Kumasi",
    experience: "20 years",
    whatsapp: "+233207890123",
    phone: "+233207890123",
    accountStatus: "Active",
    verificationStatus: "verified",
    portfolio: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    ],
    stats: {
      totalJobs: 198,
      acceptedJobs: 195,
      completedJobs: 190,
      pendingJobs: 5,
      cancelledJobs: 3,
    },
    reviews: [
      {
        id: "rev_wc007",
        jobId: "job-wc78",
        rating: 5,
        comment:
          "Carved a magnificent chief's stool that became the centerpiece of our festival!",
        date: "2023-12-20T13:15:00Z",
        user: {
          id: "user_307",
          name: "Osei Tutu",
          profilePic: "/profiles/user36.jpg",
        },
      },
    ],
    services: [
      {
        id: "svc_wc07",
        service: "Royal Stool Carving",
        description: "Traditional hand-carved Ashanti stool",
        price: "GHS 550/hr",
        estimatedTime: "30-40 hours",
      },
    ],
    pricingNotes: `Only uses sacred Odum wood for royal pieces.
50% deposit required.
Certificate of authenticity provided.
Can source rare woods upon request.`,
  },
  {
    id: "art_el008",
    name: "Kwabena Ampofo",
    email: "kwabena.ampofo@example.com",
    profilePic: "/profiles/electrician2.jpg",
    role: "artisan",
    businessName: "Ampofo Electrical Works",
    craft: "Electrician",
    description:
      "Industrial electrician with expertise in high-voltage systems, factory wiring, and energy efficiency solutions.",
    rating: 4.8,
    reviewCount: 45,
    hourlyRate: 60,
    specialties: [
      "Industrial Wiring",
      "Generator Installation",
      "Energy Audits",
    ],
    location: "Tema Industrial Area",
    experience: "13 years",
    whatsapp: "+233208901234",
    phone: "+233208901234",
    accountStatus: "Active",
    verificationStatus: "verified",
    portfolio: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    ],
    stats: {
      totalJobs: 165,
      acceptedJobs: 160,
      completedJobs: 155,
      pendingJobs: 5,
      cancelledJobs: 5,
    },
    reviews: [
      {
        id: "rev_el008",
        jobId: "job-el90",
        rating: 5,
        comment:
          "Rewired our entire factory with zero downtime - incredible planning!",
        date: "2024-07-05T17:20:00Z",
        user: {
          id: "user_308",
          name: "Nana Yaw",
          profilePic: "/profiles/user37.jpg",
        },
      },
    ],
    services: [
      {
        id: "svc_el08",
        service: "Industrial Wiring",
        description: "Heavy-duty electrical systems for factories",
        price: "GHS 450/hr",
        estimatedTime: "Varies by project",
      },
    ],
    pricingNotes: `After-hours work available at 50% premium.
Free energy efficiency assessment.
Complimentary safety inspection.
10% discount for repeat customers.`,
  },
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const userProfile = {
  id: "user_123",
  name: "Kwame Asare",
  email: "kwame@example.com",
  profilePic: "/profiles/user1.jpg",
  role: "user",
  joinedDate: "2023-05-15T08:30:00Z",
  lastLogin: "2023-07-20T14:25:00Z",
  location: "Accra, Osu",
  phone: "0244123456",
  stats: {
    totalJobs: 5,
    acceptedJobs: 5,
    completedJobs: 3,
    pendingJobs: 1,
    cancelledJobs: 1,
  },
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Artisan Profile in on Personal Dashboard
export const artisanProfile = {
  id: "art_789",
  name: "Kofi Mensah",
  email: "kofi@example.com",
  profilePic: "/profiles/artisan1.jpg",
  role: "artisan",
  businessName: "Adinkra Crafts",
  craft: "Wood Carving",
  description:
    "Professional wood carver with 10 years of experience. Specializing in traditional Adinkra symbols and custom designs.",
  rating: 4.7,
  reviewCount: 42,
  hourlyRate: 25,
  specialties: ["Traditional Carvings", "Furniture", "Sculptures"],
  location: "Kumasi, Ashanti Region",
  experience: "10 years",
  whatsapp: "+233201234567",
  phone: "+233201234567",
  portfolio: [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
  ],
  accountStatus: "active", // "Suspended"
  verificationStatus: "verified", //"Not Verified"
  stats: {
    completedJobs: 42,
    pendingJobs: 3,
    declinedJobs: 2,
    cancellationRate: 4.7,
  },
  reviews: [
    {
      id: "rev_001",
      jobId: "job-01",
      rating: 5,
      comment:
        "Kwame built us a beautiful dining table that exceeded our expectations. The craftsmanship is exceptional!",
      date: "2025-03-15T14:30:00Z",
      user: {
        id: "user_001",
        name: "Ama Mensah",
        profilePic: "/profiles/user1.jpg",
      },
    },
    {
      id: "rev_002",
      jobId: "job-05",
      rating: 4,
      comment: "Good quality bookshelves, delivered on time. Would recommend.",
      date: "2025-02-28T09:15:00Z",
      user: {
        id: "user_002",
        name: "Kofi Ansah",
        profilePic: "/profiles/user2.jpg",
      },
    },
    {
      id: "rev_003",
      jobId: "job-08",
      rating: 3,
      comment:
        "The bed frame is sturdy but took longer than expected to complete.",
      date: "2025-01-10T16:45:00Z",
      user: {
        id: "user_003",
        name: "Esi Boateng",
        profilePic: null,
      },
    },
  ],
  services: [
    {
      id: "svc_001",
      service: "Wiring",
      description: "Professional wiring service",
      price: "GHS 250/hr",
      estimatedTime: "Varies by project",
    },
    {
      id: "svc_002",
      service: "Installations",
      description: "Professional installations service",
      price: "GHS 300/hr",
      estimatedTime: "Varies by project",
    },
  ],
  pricingNotes: `Prices are estimates and may vary based on project complexity.
Minimum service charge: 1 hour.
Materials not included in pricing.
Free quotes available upon request.`,
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const artisanVerificationRequest = [
  {
    id: "ver_123456",
    artisanId: "art_789",
    artisanName: "Kofi Mensah",
    artisanEmail: "kofi@example.com",
    artisanProfilePic: "/profiles/artisan1.jpg",
    businessName: "Adinkra Crafts",
    craft: "Wood Carving",
    verificationStatus: "pending",
    submittedAt: "2023-07-12T14:30:00Z",
    idType: "national_id",
    idNumber: "GHA-123456789",
    frontId: { url: "/uploads/id_front.jpg" },
    backId: { url: "/uploads/id_back.jpg" },
    addressProof: { url: "/uploads/address_proof.pdf" },
    businessReg: { url: "/uploads/business_reg.pdf" },
    additionalDocs: [
      { url: "/uploads/additional1.jpg", name: "Workshop Photo" },
      { url: "/uploads/additional2.pdf", name: "Tax Certificate" },
    ],
  },
  {
    id: "ver_654321",
    artisanId: "art_012",
    artisanName: "Esi Johnson",
    artisanEmail: "esi@example.com",
    artisanProfilePic: "/profiles/artisan2.jpg",
    businessName: "Kente Weavers",
    craft: "Textile Arts",
    verificationStatus: "rejected",
    submittedAt: "2023-07-10T09:15:00Z",
    idType: "voter_id",
    idNumber: "VOT-987654321",
    frontId: { url: "/uploads/id_front_2.jpg" },
    backId: { url: "/uploads/id_back_2.jpg" },
    addressProof: { url: "/uploads/address_proof_2.jpg" },
    businessReg: { url: "/uploads/business_reg_2.pdf" },
    additionalDocs: [],
  },
  {
    id: "ver_789012",
    artisanId: "art_901234",
    artisanName: "Kwame Osei",
    artisanEmail: "kwame@example.com",
    artisanProfilePic: "/profiles/artisan3.jpg",
    businessName: "Pottery Masters",
    craft: "Ceramics",
    verificationStatus: "verified",
    submittedAt: "2023-07-05T11:20:00Z",
    reviewedAt: "2023-07-08T14:15:00Z",
    idType: "driver_license",
    idNumber: "DL-987654",
    frontId: { url: "/uploads/id_front_3.jpg" },
    backId: { url: "/uploads/id_back_3.jpg" },
    addressProof: { url: "/uploads/address_proof_3.pdf" },
    businessReg: { url: "/uploads/business_reg_3.pdf" },
    additionalDocs: [{ url: "/uploads/additional3.jpg", name: "Showroom" }],
  },
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//for a particular user
export const artisanVerificationStatus = {
  id: "ver_123456789",
  verificationStatus: "verified", // "Pending", "verified", "Rejected"
  submittedAt: "2025-07-01T09:30:00Z",
  reviewedAt: "2025-07-04T15:20:00Z", // null if not yet reviewed
  rejectionReason: "", // if rejected, will contain reason
  documents: [
    { type: "id_front", url: "/uploads/id_front.jpg", verified: true },
    { type: "id_back", url: "/uploads/id_back.jpg", verified: true },
    {
      type: "address_proof",
      url: "/uploads/address_proof.pdf",
      verified: true,
    },
    { type: "business_reg", url: "/uploads/business_reg.pdf", verified: true },
  ],
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// User Jobs and Artisan Jobs
export const userJobs = [
  {
    id: "job-1",
    title: "Fix leaking kitchen sink",
    description:
      "The kitchen sink has been leaking near the pipe joint for 2 days. Need urgent assistance. The leak is causing water damage to the cabinet below. Looking for a professional plumber with experience in pipe repairs.",
    budget: "GHS 250",
    scheduledAt: "2023-10-25T10:00:00Z",
    createdAt: "2023-10-20T08:30:00Z",
    location: "Accra, Spintex Road",
    userId: "user_123",
    artisanId: "art_789",
    jobStatus: "declined",
    declineReason: "",
    cancellationReason: "I have an urgent meeting to attend",
    confirmCompleted: false,
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
      "https://images.unsplash.com/photo-1621544402532-78c290378588",
    ],
    artisan: {
      businessName: "Kofi Plumbing Services",
      rating: 4.7,
      phone: "+233 24 123 4567",
      email: "kofi.plumbing@example.com",
    },
  },
  {
    id: "job-2",
    title: "Install new ceiling fan",
    description:
      "Need a qualified electrician to install a new ceiling fan in my living room. I already purchased the fan unit. Requires proper wiring and secure mounting. The ceiling is concrete.",
    budget: "GHS 180",
    scheduledAt: "2023-11-02T14:00:00Z",
    createdAt: "2023-10-28T09:15:00Z",
    location: "Accra, East Legon",
    userId: "user_123",
    artisanId: "art_456",
    jobStatus: "completed",
    declineReason: "",
    confirmCompleted: false,
    cancellationReason: "",
    images: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91",
    ],
    artisan: {
      businessName: "Ama Electrical Works",
      rating: 4.9,
      phone: "+233 55 987 6543",
      email: "ama.electrical@example.com",
    },
  },

  {
    id: "job-3",
    title: "Repair broken bedroom window",
    description:
      "The wooden window frame in my master bedroom is broken and needs replacement. Looking for a carpenter who can match the existing design and install weatherproofing.",
    budget: "GHS 320",
    scheduledAt: "2023-11-10T09:30:00Z",
    createdAt: "2023-11-05T11:45:00Z",
    location: "Accra, Cantonments",
    userId: "user_123",
    artisanId: "art_321",
    confirmCompleted: false,
    jobStatus: "pending",
    declineReason: "",
    cancellationReason: "",
    images: [
      "https://images.unsplash.com/photo-1622372738946-62e02505feb3",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    ],
    artisan: {
      businessName: "Yaw Carpentry Solutions",
      rating: 4.5,
      phone: "+233 27 456 7890",
      email: "yaw.carpentry@example.com",
    },
  },
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//User Jobs and Artisan Jobs
export const artisanJobs = [
  {
    id: "job-101",
    businessName: "Babs Plumbing Services",
    artisanName: "Kwame Asante",
    artisanLocation: "Accra, East Legon",
    title: "Kitchen Plumbing Repair",
    description:
      "Client needs help with a leaking kitchen sink pipe. The leak is causing water damage to cabinets below. Requires pipe joint repair or replacement.",
    budget: "GHS 300",
    scheduledAt: "2023-11-10T09:00:00Z",
    createdAt: "2023-11-05T14:20:00Z",
    location: "Accra, Osu",
    userId: "user_501",
    artisanId: "art_001",
    confirmCompleted: false, // true or false
    jobStatus: "accepted", // "declined", "accepted" , cancelled , completed
    declineReason: "",
    cancellationReason: "",
    images: [
      "https://images.unsplash.com/photo-1600566752227-82f1f1a71d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583337130417-3346a1c353b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    user: {
      name: "Ama Serwaa",
      phone: "+233 24 765 4321",
      email: "ama.serwaa@example.com",
      location: "Accra, Osu",
    },
  },
  {
    id: "job-102",
    businessName: "Babs Plumbing Services",
    artisanName: "Kwame Asante",
    artisanLocation: "Accra, East Legon",
    title: "Washroom Plumbing Repair",
    description:
      "Client needs help with a leaking kitchen sink pipe. The leak is causing water damage to cabinets below. Requires pipe joint repair or replacement.",
    budget: "GHS 300",
    scheduledAt: "2023-11-10T09:00:00Z",
    createdAt: "2023-11-05T14:20:00Z",
    location: "Accra, Osu",
    userId: "user_501",
    artisanId: "art_001",
    confirmCompleted: false,
    jobStatus: "pending",
    declineReason: "",
    cancellationReason: "",
    images: [
      "https://images.unsplash.com/photo-1600566752227-82f1f1a71d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583337130417-3346a1c353b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    user: {
      name: "Ama Serwaa",
      phone: "+233 24 765 4321",
      email: "ama.serwaa@example.com",
      location: "Accra, Osu",
    },
  },

  {
    id: "job-103",
    businessName: "Esi Paintworks",
    artisanName: "Esi Appiah",
    artisanLocation: "Takoradi, Anaji",
    title: "Room Painting and Wall Repairs",
    description:
      "Client requires painting of two bedrooms with minor wall crack repairs before painting. Preference for white and cream colours.",
    budget: "GHS 600",
    confirmCompleted: true,
    scheduledAt: "2023-11-20T09:30:00Z",
    createdAt: "2023-11-15T12:00:00Z",
    location: "Takoradi, Anaji",
    userId: "user_503",
    artisanId: "art_001",
    jobStatus: "completed",
    declineReason: "",
    cancellationReason: "",
    images: [
      "https://images.unsplash.com/photo-1600585154516-1f23f0c2f03d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    user: {
      name: "Akua Badu",
      phone: "+233 27 654 3210",
      email: "akua.badu@example.com",
      location: "Takoradi, Anaji",
    },
  },
  {
    id: "job-104",
    businessName: "Esi Paintworks",
    artisanName: "Esi Appiah",
    artisanLocation: "Takoradi, Anaji",
    title: "Room Painting and Wall Repairs",
    description:
      "Client requires painting of two bedrooms with minor wall crack repairs before painting. Preference for white and cream colours.",
    budget: "GHS 600",
    scheduledAt: "2023-11-20T09:30:00Z",
    createdAt: "2023-11-15T12:00:00Z",
    location: "Takoradi, Anaji",
    userId: "user_503",
    artisanId: "art_001",
    confirmCompleted: false,
    jobStatus: "declined",
    declineReason:
      "I have a pending job, I can't take on this work at the moment",
    cancellationReason: "",
    images: [
      "https://images.unsplash.com/photo-1600585154516-1f23f0c2f03d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    user: {
      name: "Akua Badu",
      phone: "+233 27 654 3210",
      email: "akua.badu@example.com",
      location: "Takoradi, Anaji",
    },
  },
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//reviews on admin page
export const AdminReview = [
  {
    id: "rev_003",
    jobId: "job-1",
    rating: 3,
    comment: "Good work but delivered 2 days later than promised.",
    date: "2023-09-18T16:45:00Z",
    user: {
      id: "user_789",
      name: "Ama Serwaa",
      profilePic: "/profiles/user3.jpg",
    },
    artisan: {
      id: "art_456",
      businessName: "Akosua Agyemang",
      profilePic: "/profiles/artisan3.jpg",
    },
  },
  {
    id: "rev_008",
    jobId: "job-6",
    rating: 5,
    comment: "Very professional and quick delivery!",
    date: "2024-02-14T09:00:00Z",
    user: {
      id: "user_321",
      name: "Kwame Appiah",
      profilePic: "/profiles/user1.jpg",
    },
    artisan: {
      id: "art_456",
      businessName: "Akosua Agyemang",
      profilePic: "/profiles/artisan3.jpg",
    },
  },
  {
    id: "rev_009",
    jobId: "job-7",
    rating: 1,
    comment: "Work was never completed and communication was poor.",
    date: "2024-04-05T11:20:00Z",
    user: {
      id: "user_654",
      name: "Efua Mensah",
      profilePic: "/profiles/user2.jpg",
    },
    artisan: {
      id: "art_789",
      businessName: "Yaw Boateng",
      profilePic: "/profiles/artisan1.jpg",
    },
  },
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//User Review for artisans
export const UserReviews = [
  {
    id: "rev_006",
    jobId: "job-4",
    rating: 4,
    comment: "Very good, minor finishing issues but overall nice.",
    date: "2024-07-02T08:20:00Z",
    artisan: {
      id: "art_789",
      name: "Yaw Boateng",
      profilePic: "/profiles/artisan1.jpg",
    },
  },
  {
    id: "rev_007",
    jobId: "job-5",
    rating: 1,
    comment: "Terrible service, would not recommend.",
    date: "2024-08-15T12:40:00Z",
    artisan: {
      id: "art_987",
      name: "Abena Darko",
      profilePic: "/profiles/artisan2.jpg",
    },
  },
  {
    id: "rev_010",
    jobId: "job-8",
    rating: 5,
    comment: "Outstanding work! The piece exceeded my expectations.",
    date: "2024-09-10T14:55:00Z",
    artisan: {
      id: "art_123",
      name: "Kofi Mensah",
      profilePic: "/profiles/artisan4.jpg",
    },
  },
  {
    id: "rev_011",
    jobId: "job-9",
    rating: 2,
    comment: "Delivery was late, and the finishing was below standard.",
    date: "2024-10-01T11:30:00Z",
    artisan: {
      id: "art_234",
      name: "Adwoa Nyarko",
      profilePic: "/profiles/artisan5.jpg",
    },
  },
  {
    id: "rev_012",
    jobId: "job-10",
    rating: 3,
    comment: "Average service, communication could be better.",
    date: "2024-11-20T17:45:00Z",
    artisan: {
      id: "art_345",
      name: "Kojo Asante",
      profilePic: "/profiles/artisan6.jpg",
    },
  },
  {
    id: "rev_013",
    jobId: "job-11",
    rating: 5,
    comment: "Fantastic experience, will definitely order again!",
    date: "2024-12-05T09:10:00Z",
    artisan: {
      id: "art_456",
      name: "Akosua Agyemang",
      profilePic: "/profiles/artisan3.jpg",
    },
  },
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Artisan Review Left by Users
export const ArtisanReviews = [
  {
    id: "rev_014",
    jobId: "job-12",
    rating: 5,
    comment: "Absolutely loved the quality and attention to detail!",
    date: "2025-01-18T10:25:00Z",
    user: {
      id: "user_111",
      name: "Sarah Owusu",
      profilePic: "/profiles/user4.jpg",
    },
  },
  {
    id: "rev_015",
    jobId: "job-13",
    rating: 3,
    comment: "Work was okay, but it took longer than expected.",
    date: "2025-02-07T14:00:00Z",
    user: {
      id: "user_222",
      name: "Michael Boateng",
      profilePic: "/profiles/user5.jpg",
    },
  },
  {
    id: "rev_016",
    jobId: "job-14",
    rating: 2,
    comment: "Communication was poor and delivery was late.",
    date: "2025-03-12T09:15:00Z",
    user: {
      id: "user_333",
      name: "Linda Mensah",
      profilePic: "/profiles/user6.jpg",
    },
  },
  {
    id: "rev_017",
    jobId: "job-15",
    rating: 4,
    comment: "Great work overall, minor issues fixed promptly.",
    date: "2025-04-22T16:40:00Z",
    user: {
      id: "user_444",
      name: "Kweku Amponsah",
      profilePic: "/profiles/user7.jpg",
    },
  },
  {
    id: "rev_018",
    jobId: "job-16",
    rating: 1,
    comment: "Terrible experience, product was damaged on arrival.",
    date: "2025-05-30T12:55:00Z",
    user: {
      id: "user_555",
      name: "Nana Adwoa",
      profilePic: "/profiles/user8.jpg",
    },
  },
  {
    id: "rev_019",
    jobId: "job-17",
    rating: 5,
    comment: "Exceptional service, highly recommend this artisan!",
    date: "2025-06-14T11:35:00Z",
    user: {
      id: "user_666",
      name: "Yaw Sarkodie",
      profilePic: "/profiles/user9.jpg",
    },
  },
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// src/data/dummyArtisanServices.js

export const artisanServices = {
  services: [
    {
      id: "svc_001",
      service: "Furniture Assembly",
      description:
        "Expert assembly of flat-pack and custom furniture with precision and care.",
      price: "GHS 150/hr",
      estimatedTime: "1-3 hours per project",
    },
    {
      id: "svc_002",
      service: "Wood Carving",
      description:
        "Traditional Adinkra and custom carvings for decor and furniture enhancements.",
      price: "GHS 250/hr",
      estimatedTime: "Varies by design complexity",
    },
    {
      id: "svc_003",
      service: "Door & Window Installation",
      description:
        "Professional installation of wooden doors and windows, including frame adjustments.",
      price: "GHS 200/hr",
      estimatedTime: "2-5 hours per installation",
    },
  ],
  pricingNotes: `Prices are estimates and may vary based on project complexity.
Minimum service charge is for 1 hour.
Materials are not included in pricing.
Free quotes are available upon request.`,
};

export default artisanServices;

/////////////////////////////////////////////////////////////////////////////////////////////

export const adminUserProfiles = [
  {
    id: "user_123",
    name: "Kwame Asare",
    email: "kwame@example.com",
    profilePic: "/profiles/user1.jpg",
    role: "user",
    joinedDate: "2023-05-15T08:30:00Z",
    lastLogin: "2023-07-20T14:25:00Z",
    accountStatus: "Active",
    location: "Accra, Osu",
    phone: "+233 24 123 4567",
    stats: {
      totalJobs: 5,
      completedJobs: 3,
      acceptedJobs: 4,
      pendingJobs: 1,
      cancelledJobs: 1,
    },
    reviews: [
      {
        id: "rev_001",
        jobId: "job-4",
        rating: 4,
        comment: "Great job, but arrived 30 minutes late.",
        date: "2024-06-02T10:15:00Z",
        artisan: {
          id: "art_456",
          name: "Akosua Agyemang",
          businessName: "Akosua's Plumbing & Repairs",
          profilePic: "/profiles/artisan3.jpg",
        },
      },
      {
        id: "rev_002",
        jobId: "job-7",
        rating: 5,
        comment: "Excellent work, highly recommended!",
        date: "2024-07-10T14:45:00Z",
        artisan: {
          id: "art_789",
          name: "Yaw Boateng",
          businessName: "Yaw's Carpentry Works",
          profilePic: "/profiles/artisan1.jpg",
        },
      },
    ],
  },
  {
    id: "user_123",
    name: "Kwame Asare",
    email: "kwame@example.com",
    profilePic: "/profiles/user1.jpg",
    role: "user",
    joinedDate: "2023-05-15T08:30:00Z",
    lastLogin: "2023-07-20T14:25:00Z",
    accountStatus: "Active",
    location: "Accra, Osu",
    phone: "+233 24 123 4567",
    stats: {
      totalJobs: 5,
      completedJobs: 3,
      acceptedJobs: 4,
      pendingJobs: 1,
      cancelledJobs: 1,
    },
    reviews: [
      {
        id: "rev_001",
        jobId: "job-4",
        rating: 4,
        comment: "Great job, but arrived 30 minutes late.",
        date: "2024-06-02T10:15:00Z",
        artisan: {
          id: "art_456",
          name: "Akosua Agyemang",
          businessName: "Akosua's Plumbing & Repairs",
          profilePic: "/profiles/artisan3.jpg",
        },
      },
      {
        id: "rev_002",
        jobId: "job-7",
        rating: 5,
        comment: "Excellent work, highly recommended!",
        date: "2024-07-10T14:45:00Z",
        artisan: {
          id: "art_789",
          name: "Yaw Boateng",
          businessName: "Yaw's Carpentry Works",
          profilePic: "/profiles/artisan1.jpg",
        },
      },
    ],
  },
];

////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////

export const adminArtisanProfiles = [
  {
    id: "art_501",
    name: "Kwame Osei",
    email: "kwame.osei@example.com",
    phone: "+233 24 123 4567",
    location: "Accra, Greater Accra",
    businessName: "Osei Plumbing Masters",
    craft: "Plumber",
    accountStatus: "Active",
    verificationStatus: "verified",
    joinedDate: "2023-01-15T09:45:00Z",
    lastLogin: "2023-07-18T11:30:00Z",
    stats: {
      totalJobs: 28,
      acceptedJobs: 27,
      completedJobs: 25,
      pendingJobs: 2,
      cancelledJobs: 1,
    },
    reviews: [
      {
        id: "rev_501",
        jobId: "job-pl12",
        rating: 5,
        comment: "Fixed our burst pipes in record time! Excellent service.",
        date: "2023-06-20T16:20:00Z",
        user: {
          id: "user_401",
          name: "Esi Mensah",
          profilePic: "/profiles/user40.jpg",
        },
      },
      {
        id: "rev_502",
        jobId: "job-pl34",
        rating: 4,
        comment: "Good work but arrived 45 minutes late",
        date: "2023-05-12T13:15:00Z",
        user: {
          id: "user_402",
          name: "Yaw Boateng",
          profilePic: "/profiles/user41.jpg",
        },
      },
    ],
  },
  {
    id: "art_502",
    name: "Adwoa Asante",
    email: "adwoa.asante@example.com",
    phone: "+233 20 234 5678",
    location: "Kumasi, Ashanti",
    businessName: "Asante Electricals",
    craft: "Electrician",
    accountStatus: "Active",
    verificationStatus: "pending",
    joinedDate: "2023-02-28T14:20:00Z",
    lastLogin: "2023-07-17T09:10:00Z",
    stats: {
      totalJobs: 15,
      acceptedJobs: 15,
      completedJobs: 14,
      pendingJobs: 1,
      cancelledJobs: 0,
    },
    reviews: [
      {
        id: "rev_503",
        jobId: "job-el56",
        rating: 5,
        comment: "Perfect installation of our solar system! Highly recommend.",
        date: "2023-07-05T10:30:00Z",
        user: {
          id: "user_403",
          name: "Kofi Ansah",
          profilePic: "/profiles/user42.jpg",
        },
      },
    ],
  },
  {
    id: "art_503",
    name: "Yaa Nyarko",
    email: "yaa.nyarko@example.com",
    phone: "+233 55 345 6789",
    location: "Cape Coast, Central",
    businessName: "Nyarko Tailoring",
    craft: "Tailor",
    accountStatus: "Suspended",
    verificationStatus: "verified",
    joinedDate: "2022-11-10T10:15:00Z",
    lastLogin: "2023-06-30T08:45:00Z",
    stats: {
      totalJobs: 42,
      acceptedJobs: 40,
      completedJobs: 38,
      pendingJobs: 2,
      cancelledJobs: 2,
    },
    reviews: [
      {
        id: "rev_504",
        jobId: "job-ta78",
        rating: 5,
        comment: "Made my wedding dress exactly how I envisioned! Perfect fit.",
        date: "2023-04-18T12:00:00Z",
        user: {
          id: "user_404",
          name: "Akua Fosu",
          profilePic: "/profiles/user43.jpg",
        },
      },
      {
        id: "rev_505",
        jobId: "job-ta90",
        rating: 3,
        comment: "Good quality but missed the deadline by a week",
        date: "2023-03-22T15:45:00Z",
        user: {
          id: "user_405",
          name: "Kwabena Osei",
          profilePic: "/profiles/user44.jpg",
        },
      },
    ],
  },
  {
    id: "art_504",
    name: "Kofi Donkor",
    email: "kofi.donkor@example.com",
    phone: "+233 27 456 7890",
    location: "Tamale, Northern",
    businessName: "Donkor Masonry",
    craft: "Mason",
    accountStatus: "Active",
    verificationStatus: "verified",
    joinedDate: "2023-04-05T11:30:00Z",
    lastLogin: "2023-07-18T14:20:00Z",
    stats: {
      totalJobs: 19,
      acceptedJobs: 18,
      completedJobs: 17,
      pendingJobs: 1,
      cancelledJobs: 1,
    },
    reviews: [
      {
        id: "rev_506",
        jobId: "job-ma12",
        rating: 5,
        comment:
          "Built a beautiful brick wall that's the talk of the neighborhood!",
        date: "2023-06-30T09:15:00Z",
        user: {
          id: "user_406",
          name: "Ama Serwaa",
          profilePic: "/profiles/user45.jpg",
        },
      },
      {
        id: "rev_507",
        jobId: "job-ma34",
        rating: 4,
        comment: "Solid work but materials cost more than estimated",
        date: "2023-05-22T14:30:00Z",
        user: {
          id: "user_407",
          name: "Yaw Asante",
          profilePic: "/profiles/user46.jpg",
        },
      },
    ],
  },
];

/////////////////////////////////////////////////////////////////////////////////////////
