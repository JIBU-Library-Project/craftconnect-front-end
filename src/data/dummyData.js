// src/data/dummyData.js
export const users = [
  {
    id: "user_123",
    name: "Kwame Asare",
    email: "kwame@example.com",
    profilePic: "/profiles/user1.jpg",
    role: "user",
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
    rating: 4.7,
    reviewCount: 42, // Added (matches completedJobs)
    hourlyRate: 25, // Added
    specialties: ["Traditional Carvings", "Furniture", "Sculptures"], // Added
    location: "Kumasi, Ashanti Region", // Added
    experience: "10 years", // Added
    isVerified: true, // Added
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
    isVerified: true, // Added
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
    status: "approved",
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
    status: "approved",
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
//Artsans's Profile In Public
export const publicArtisanProfiles = [
  {
    id: "art_1001",
    name: "Yaw Appiah",
    email: "yaw.appiah@example.com",
    profilePic: "/profiles/plumber1.jpg",
    role: "artisan",
    businessName: "Appiah Plumbing Services",
    craft: "Plumber",
    description:
      "Licensed plumber specializing in leak repairs, bathroom fittings, and residential plumbing installations.",
    rating: 4.9,
    reviewCount: 40,
    hourlyRate: 35,
    specialties: ["Leak Repairs", "Pipe Installations", "Bathroom Fittings"],
    location: "Takoradi, Western Region",
    experience: "12 years",
    whatsapp: "+233208765432",
    phone: "+233208765432",
    accountStatus: "Active",
    verificationStatus: "pending",
    portfolio: [
      "https://images.unsplash.com/photo-1597092960613-210ae312f79e",
      "https://images.unsplash.com/photo-1581579185169-1b42c1fca735",
    ],
    stats: {
      completedJobs: 65,
      pendingJobs: 3,
      declinedJobs: 2,
      cancellationRate: 1.8,
    },
    reviews: [
      {
        id: "rev_1001",
        jobId: "job-501",
        rating: 5,
        comment:
          "Fixed my leaking kitchen pipe efficiently, highly professional service.",
        date: "2025-04-15T09:00:00Z",
        user: {
          id: "user_2001",
          name: "Akosua Danso",
          profilePic: "/profiles/user1.jpg",
        },
      },
    ],
    services: [
      {
        id: "svc_1001",
        service: "Leak Repairs",
        description:
          "Quick and professional leak detection and repair for home and office plumbing.",
        price: "GHS 200/hr",
        estimatedTime: "Varies by issue",
      },
      {
        id: "svc_1002",
        service: "Bathroom Fittings",
        description:
          "Installation and maintenance of showers, sinks, and toilet systems.",
        price: "GHS 300/hr",
        estimatedTime: "Varies by project",
      },
    ],
    pricingNotes: `Rates depend on project complexity.
Material costs are separate.
Free inspection available for larger jobs.`,
  },
  {
    id: "art_1002",
    name: "Kwame Boateng",
    email: "kwame.boateng@example.com",
    profilePic: "/profiles/carpenter1.jpg",
    role: "artisan",
    businessName: "Boateng Carpentry Works",
    craft: "Carpenter",
    description:
      "Expert carpenter providing custom furniture, door installations, and wood repairs with attention to detail.",
    rating: 4.7,
    reviewCount: 33,
    hourlyRate: 40,
    specialties: ["Custom Furniture", "Door Installations", "Wood Repairs"],
    location: "Accra, Greater Accra Region",
    experience: "8 years",
    whatsapp: "+233209876543",
    phone: "+233209876543",
    accountStatus: "Active",
    verificationStatus: "verified",
    portfolio: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
      "https://images.unsplash.com/photo-1598300052219-d7a93c9a326d",
    ],
    stats: {
      completedJobs: 48,
      pendingJobs: 2,
      declinedJobs: 1,
      cancellationRate: 2.5,
    },
    reviews: [
      {
        id: "rev_1002",
        jobId: "job-502",
        rating: 5,
        comment:
          "Built a beautiful custom bookshelf for my home, great craftsmanship.",
        date: "2025-05-10T14:30:00Z",
        user: {
          id: "user_2002",
          name: "Sarah Owusu",
          profilePic: "/profiles/user2.jpg",
        },
      },
    ],
    services: [
      {
        id: "svc_1003",
        service: "Custom Furniture",
        description:
          "Design and build custom furniture tailored to your space.",
        price: "GHS 350/hr",
        estimatedTime: "Project dependent",
      },
      {
        id: "svc_1004",
        service: "Door Installations",
        description:
          "Professional door fitting and repairs for homes and offices.",
        price: "GHS 250/hr",
        estimatedTime: "Varies by installation",
      },
    ],
    pricingNotes: `Minimum service: 1 hour.
Wood and hardware costs excluded from hourly rate.
Quotes provided upon request.`,
  },
  {
    id: "art_1003",
    name: "Ama Serwaa",
    email: "ama.serwaa@example.com",
    profilePic: "/profiles/electrician1.jpg",
    role: "artisan",
    businessName: "Serwaa Electrical Services",
    craft: "Electrician",
    description:
      "Certified electrician offering wiring, lighting installations, and electrical repairs for residential and commercial properties.",
    rating: 4.8,
    reviewCount: 29,
    hourlyRate: 45,
    specialties: ["Wiring", "Lighting Installations", "Electrical Repairs"],
    location: "Kumasi, Ashanti Region",
    experience: "9 years",
    whatsapp: "+233201234567",
    phone: "+233201234567",
    accountStatus: "Active",
    verificationStatus: "verified",
    portfolio: [
      "https://images.unsplash.com/photo-1581091870621-6c176c02cf0d",
      "https://images.unsplash.com/photo-1567016532254-cbc21f60c480",
    ],
    stats: {
      completedJobs: 54,
      pendingJobs: 3,
      declinedJobs: 0,
      cancellationRate: 1.2,
    },
    reviews: [
      {
        id: "rev_1003",
        jobId: "job-503",
        rating: 5,
        comment:
          "Installed new lights in my shop quickly and safely, will Request Service again.",
        date: "2025-06-02T11:15:00Z",
        user: {
          id: "user_2003",
          name: "Yaw Mensah",
          profilePic: "/profiles/user3.jpg",
        },
      },
    ],
    services: [
      {
        id: "svc_1005",
        service: "Wiring",
        description:
          "Full wiring services for new constructions and renovations.",
        price: "GHS 300/hr",
        estimatedTime: "Varies by property size",
      },
      {
        id: "svc_1006",
        service: "Lighting Installations",
        description:
          "Safe and neat lighting installations for homes and offices.",
        price: "GHS 280/hr",
        estimatedTime: "Varies by project",
      },
    ],
    pricingNotes: `Project inspection is free.
Pricing excludes fixtures and materials.
All work is insured and guaranteed.`,
  },
  {
    id: "art_1001",
    name: "Yaw Appiah",
    email: "yaw.appiah@example.com",
    profilePic: "/profiles/plumber1.jpg",
    role: "artisan",
    businessName: "Appiah Plumbing Services",
    craft: "Plumber",
    description:
      "Licensed plumber specializing in leak repairs, bathroom fittings, and residential plumbing installations.",
    rating: 4.9,
    reviewCount: 40,
    hourlyRate: 35,
    specialties: ["Leak Repairs", "Pipe Installations", "Bathroom Fittings"],
    location: "Takoradi, Western Region",
    experience: "12 years",
    whatsapp: "+233208765432",
    phone: "+233208765432",
    accountStatus: "Active",
    verificationStatus: "pending",
    portfolio: [
      "https://images.unsplash.com/photo-1597092960613-210ae312f79e",
      "https://images.unsplash.com/photo-1581579185169-1b42c1fca735",
    ],
    stats: {
      completedJobs: 65,
      pendingJobs: 3,
      declinedJobs: 2,
      cancellationRate: 1.8,
    },
    reviews: [
      {
        id: "rev_1001",
        jobId: "job-501",
        rating: 5,
        comment:
          "Fixed my leaking kitchen pipe efficiently, highly professional service.",
        date: "2025-04-15T09:00:00Z",
        user: {
          id: "user_2001",
          name: "Akosua Danso",
          profilePic: "/profiles/user1.jpg",
        },
      },
    ],
    services: [
      {
        id: "svc_1001",
        service: "Leak Repairs",
        description:
          "Quick and professional leak detection and repair for home and office plumbing.",
        price: "GHS 200/hr",
        estimatedTime: "Varies by issue",
      },
      {
        id: "svc_1002",
        service: "Bathroom Fittings",
        description:
          "Installation and maintenance of showers, sinks, and toilet systems.",
        price: "GHS 300/hr",
        estimatedTime: "Varies by project",
      },
    ],
    pricingNotes: `Rates depend on project complexity.
Material costs are separate.
Free inspection available for larger jobs.`,
  },
  {
    id: "art_1002",
    name: "Kwame Boateng",
    email: "kwame.boateng@example.com",
    profilePic: "/profiles/carpenter1.jpg",
    role: "artisan",
    businessName: "Boateng Carpentry Works",
    craft: "Carpenter",
    description:
      "Expert carpenter providing custom furniture, door installations, and wood repairs with attention to detail.",
    rating: 4.7,
    reviewCount: 33,
    hourlyRate: 40,
    specialties: ["Custom Furniture", "Door Installations", "Wood Repairs"],
    location: "Accra, Greater Accra Region",
    experience: "8 years",
    whatsapp: "+233209876543",
    phone: "+233209876543",
    accountStatus: "Active",
    verificationStatus: "verified",
    portfolio: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
      "https://images.unsplash.com/photo-1598300052219-d7a93c9a326d",
    ],
    stats: {
      completedJobs: 48,
      pendingJobs: 2,
      declinedJobs: 1,
      cancellationRate: 2.5,
    },
    reviews: [
      {
        id: "rev_1002",
        jobId: "job-502",
        rating: 5,
        comment:
          "Built a beautiful custom bookshelf for my home, great craftsmanship.",
        date: "2025-05-10T14:30:00Z",
        user: {
          id: "user_2002",
          name: "Sarah Owusu",
          profilePic: "/profiles/user2.jpg",
        },
      },
    ],
    services: [
      {
        id: "svc_1003",
        service: "Custom Furniture",
        description:
          "Design and build custom furniture tailored to your space.",
        price: "GHS 350/hr",
        estimatedTime: "Project dependent",
      },
      {
        id: "svc_1004",
        service: "Door Installations",
        description:
          "Professional door fitting and repairs for homes and offices.",
        price: "GHS 250/hr",
        estimatedTime: "Varies by installation",
      },
    ],
    pricingNotes: `Minimum service: 1 hour.
Wood and hardware costs excluded from hourly rate.
Quotes provided upon request.`,
  },
  {
    id: "art_1003",
    name: "Ama Serwaa",
    email: "ama.serwaa@example.com",
    profilePic: "/profiles/electrician1.jpg",
    role: "artisan",
    businessName: "Serwaa Electrical Services",
    craft: "Electrician",
    description:
      "Certified electrician offering wiring, lighting installations, and electrical repairs for residential and commercial properties.",
    rating: 4.8,
    reviewCount: 29,
    hourlyRate: 45,
    specialties: ["Wiring", "Lighting Installations", "Electrical Repairs"],
    location: "Kumasi, Ashanti Region",
    experience: "9 years",
    whatsapp: "+233201234567",
    phone: "+233201234567",
    accountStatus: "Active",
    verificationStatus: "verified",
    portfolio: [
      "https://images.unsplash.com/photo-1581091870621-6c176c02cf0d",
      "https://images.unsplash.com/photo-1567016532254-cbc21f60c480",
    ],
    stats: {
      completedJobs: 54,
      pendingJobs: 3,
      declinedJobs: 0,
      cancellationRate: 1.2,
    },
    reviews: [
      {
        id: "rev_1003",
        jobId: "job-503",
        rating: 5,
        comment:
          "Installed new lights in my shop quickly and safely, will Request Service again.",
        date: "2025-06-02T11:15:00Z",
        user: {
          id: "user_2003",
          name: "Yaw Mensah",
          profilePic: "/profiles/user3.jpg",
        },
      },
    ],
    services: [
      {
        id: "svc_1005",
        service: "Wiring",
        description:
          "Full wiring services for new constructions and renovations.",
        price: "GHS 300/hr",
        estimatedTime: "Varies by property size",
      },
      {
        id: "svc_1006",
        service: "Lighting Installations",
        description:
          "Safe and neat lighting installations for homes and offices.",
        price: "GHS 280/hr",
        estimatedTime: "Varies by project",
      },
    ],
    pricingNotes: `Project inspection is free.
Pricing excludes fixtures and materials.
All work is insured and guaranteed.`,
  },
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const userProfilee = {
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
    status: "pending",
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
    status: "pending",
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
    status: "approved",
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
  verificationStatus: "approved", // "pending", "approved", "rejected"
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
    status: "pending",
    declineReason: "",
    cancellationReason: "",
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1621544402532-78c290378588?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    ],
    artisan: {
      businessName: "Kofi Plumbing Services",
      rating: 4.7,
      phone: "+233 24 123 4567",
      email: "kofi.plumbing@example.com",
      completedJobs: 42,
    },
  },
  {
    id: "job-2",
    title: "Install air conditioning unit",
    description:
      "Need a 2.5HP split AC installed in my bedroom. The wall mounting bracket needs to be installed and proper electrical wiring done. Includes refrigerant charging and testing.",
    budget: "GHS 1,200",
    scheduledAt: "2023-11-05T09:00:00Z",
    createdAt: "2023-10-28T14:15:00Z",
    location: "Kumasi, Asokwa",
    userId: "user_123",
    artisanId: "art_101",
    status: "declined",
    declineReason: "I cant work at the moment",
    cancellationReason: "",
    images: [
      "https://images.unsplash.com/photo-1585123388860-da6b0b0e67b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    ],
    artisan: {
      businessName: "CoolBreeze AC Solutions",
      rating: 4.9,
      phone: "+233 55 987 6543",
      email: "coolbreeze.ac@example.com",
      completedJobs: 128,
    },
  },
  {
    id: "job-3",
    title: "Repair broken ceiling fan",
    description:
      "Living room ceiling fan stopped working suddenly. Makes humming noise but blades don't rotate. Needs motor inspection and possible replacement.",
    budget: "GHS 350",
    scheduledAt: "2023-10-30T13:00:00Z",
    createdAt: "2023-10-25T11:20:00Z",
    location: "Tema, Community 18",
    userId: "user_123",
    artisanId: "art_202",
    status: "completed",
    declineReason: "",
    cancellationReason: "",
    images: [
      "https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1567530078598-64f1a7a0a2a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    ],
    artisan: {
      businessName: "ElectroFix Electricals",
      rating: 4.5,
      phone: "+233 27 456 7890",
      email: "electrofix@example.com",
      completedJobs: 87,
    },
  },
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//User Jobs and Artisan Jobs
export const artisanJobs = [
  {
    id: "job-101",
    title: "Kitchen Plumbing Repair",
    description:
      "Client needs help with a leaking kitchen sink pipe. The leak is causing water damage to cabinets below. Requires pipe joint repair or replacement.",
    budget: "GHS 300",
    scheduledAt: "2023-11-10T09:00:00Z",
    createdAt: "2023-11-05T14:20:00Z",
    location: "Accra, Osu",
    userId: "user_501",
    artisanId: "art_001",
    status: "accepted",
    declineReason: "",
    cancellationReason: "",
    images: [
      "https://images.unsplash.com/photo-1600566752227-82f1f1a71d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
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
    title: "Bedroom AC Installation",
    description:
      "Install new 2HP split AC unit in master bedroom. Requires wall mounting, electrical connection, and refrigerant charging.",
    budget: "GHS 1,500",
    scheduledAt: "2023-11-15T10:30:00Z",
    createdAt: "2023-11-08T11:15:00Z",
    location: "Kumasi, Ahodwo",
    userId: "user_502",
    artisanId: "art_001",
    status: "declined",
    declineReason: "Don't have the required AC model",
    cancellationReason: "",
    images: [
      "https://images.unsplash.com/photo-1585123388860-da6b0b0e67b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    ],
    user: {
      name: "Kwame Asante",
      phone: "+233 20 987 6543",
      email: "kwame.asante@example.com",
      location: "Kumasi, Ahodwo",
    },
  },
  {
    id: "job-103",
    title: "Living Room Painting",
    description:
      "Full repainting of living room (approx 40 sqm). Walls need to be prepped and painted with premium matte finish paint. Color change from white to light blue.",
    budget: "GHS 2,000",
    scheduledAt: "2023-11-20T08:00:00Z",
    createdAt: "2023-11-10T09:45:00Z",
    location: "Tema, Community 5",
    userId: "user_503",
    artisanId: "art_001",
    status: "cancelled",
    declineReason: "",
    cancellationReason: "Found another painter with better rates",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    ],
    user: {
      name: "Esi Mensah",
      phone: "+233 27 123 4567",
      email: "esi.mensah@example.com",
      location: "Tema, Community 5",
    },
  },
  {
    id: "job-103",
    title: "Living Room Painting",
    description:
      "Full repainting of living room (approx 40 sqm). Walls need to be prepped and painted with premium matte finish paint. Color change from white to light blue.",
    budget: "GHS 2,000",
    scheduledAt: "2023-11-20T08:00:00Z",
    createdAt: "2023-11-10T09:45:00Z",
    location: "Tema, Community 5",
    userId: "user_503",
    artisanId: "art_001",
    status: "accepted",
    declineReason: "",
    cancellationReason: "",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    ],
    user: {
      name: "Esi Mensah",
      phone: "+233 27 123 4567",
      email: "esi.mensah@example.com",
      location: "Tema, Community 5",
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
