// src/data/verificationData.js
export const verificationRequirements = [
  {
    id: 1,
    title: "National ID Card",
    description: "Government-issued identification card",
    type: "id",
    required: true,
    examples: ["Front and back of ID card"],
  },
  {
    id: 2,
    title: "Proof of Address",
    description: "Utility bill or official document showing your address",
    type: "address",
    required: true,
    examples: ["Electricity bill", "Water bill", "Bank statement"],
  },
  {
    id: 3,
    title: "Business Registration",
    description: "Document proving business registration",
    type: "business",
    required: true,
    examples: ["Business registration certificate", "Tax ID certificate"],
  },
  {
    id: 4,
    title: "Professional Certifications",
    description: "Certificates of professional qualifications",
    type: "certification",
    required: false,
    examples: ["Trade certification", "Apprenticeship completion"],
  },
];

export const idTypes = [
  { id: "national_id", name: "National ID" },
  { id: "passport", name: "Passport" },
  { id: "driver_license", name: "Driver's License" },
  { id: "voter_id", name: "Voter ID" },
];
