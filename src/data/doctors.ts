export type DoctorId = "dr-chen" | "dr-webb";

export interface Doctor {
  id: DoctorId;
  name: string;
  credentials: string;
  npi: string;
  focus: string;
  bio: string;
  quote: string;
  /** Public path prefix; append `-400.webp` / `-720.webp`. */
  photo: string;
}

export const doctors: Doctor[] = [
  {
    id: "dr-chen",
    name: "Dr. Sarah Chen",
    credentials: "OD, FAAO",
    npi: "1234567890",
    focus: "Pediatric Vision & Myopia Management",
    bio: "Dr. Chen completed her residency at UCSF with a focus on pediatric eye care and has been with Clear Vision since 2015. She brings a meticulous, evidence-based approach to every exam, from first prescriptions to complex contact lens fittings.",
    quote: "A first prescription shapes a child's relationship with the world.",
    photo: "/images/doctors/dr-chen",
  },
  {
    id: "dr-webb",
    name: "Dr. Marcus Webb",
    credentials: "OD, FCOVD",
    npi: "0987654321",
    focus: "Glaucoma & Ocular Disease Management",
    bio: "Dr. Webb trained at the Southern California College of Optometry and spent four years in a hospital-based practice before joining Clear Vision in 2018. He specializes in detecting and managing early-stage glaucoma, dry eye, and diabetic retinopathy.",
    quote: "Most glaucoma damage is preventable. Detection timing is everything.",
    photo: "/images/doctors/dr-webb",
  },
];

export function getDoctor(id: DoctorId) {
  return doctors.find((d) => d.id === id)!;
}
