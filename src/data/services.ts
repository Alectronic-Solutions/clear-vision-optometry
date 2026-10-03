export interface Service {
  slug: string;
  title: string;
  /** Short label for menus and cards. */
  label: string;
  /** One-line summary for nav dropdowns and cards. */
  summary: string;
  cpt?: string;
  duration: string;
  image: string;
  imageAlt: string;
  intro: string[];
  whoFor: string[];
  steps: { title: string; body: string }[];
  coverage: string;
  doctor: "dr-chen" | "dr-webb" | "both";
  /** Whether this card appears on the home page "What We Treat" grid. */
  featured: boolean;
}

export const services: Service[] = [
  {
    slug: "comprehensive-eye-exams",
    title: "Comprehensive Eye Exams",
    label: "Eye Exams",
    summary: "Refraction, eye pressure, and a full retinal health check.",
    cpt: "92004",
    duration: "45–60 min",
    image: "/images/services/comprehensive-eye-exams",
    imageAlt: "Patient looking through a phoropter during a vision test",
    intro: [
      "A comprehensive exam is more than a new prescription. We measure how well each eye focuses, how the two work together, and check the health of the structures behind the lens, where glaucoma, macular degeneration, and diabetic changes first appear.",
      "Every exam includes digital retinal imaging and OCT scanning, so we can compare your results year over year and catch small changes early.",
    ],
    whoFor: [
      "Adults due for their annual or biennial exam",
      "Anyone noticing blur, eye strain, or headaches",
      "Patients with diabetes, high blood pressure, or a family history of glaucoma",
      "New patients who want a baseline of their eye health",
    ],
    steps: [
      { title: "History & pre-testing", body: "We review your health history and medications, then take automated measurements of your prescription, eye pressure, and corneal shape." },
      { title: "Refraction", body: "Your doctor fine-tunes your prescription lens by lens so distance, reading, and screen vision are all comfortable." },
      { title: "Eye health evaluation", body: "Slit-lamp microscopy, retinal photos, and OCT give a detailed look at the front and back of the eye." },
      { title: "Results & plan", body: "We walk through the images with you, answer questions, and send your prescription straight to our optical team if you need new glasses." },
    ],
    coverage: "Covered once per benefit period by most vision plans, including VSP, EyeMed, Davis Vision, and Spectra.",
    doctor: "both",
    featured: true,
  },
  {
    slug: "contact-lens-fittings",
    title: "Contact Lens Fittings",
    label: "Contact Lenses",
    summary: "Soft, toric, multifocal, and specialty scleral lenses.",
    cpt: "92310",
    duration: "30–45 min",
    image: "/images/services/contact-lens-fittings",
    imageAlt: "Colorful contact lens cases on a pink surface",
    intro: [
      "A glasses prescription doesn't translate directly into contacts. A contact lens sits on the eye, so we measure the curvature of your cornea, check your tear film, and trial lenses on the eye before writing a final prescription.",
      "We fit everything from daily disposables to toric lenses for astigmatism, multifocals for reading, and scleral lenses for irregular corneas and severe dry eye.",
    ],
    whoFor: [
      "First-time contact lens wearers",
      "Current wearers with discomfort or blurry vision",
      "Patients with astigmatism or presbyopia",
      "Keratoconus and post-surgical corneas",
    ],
    steps: [
      { title: "Corneal mapping", body: "Topography measures the shape of your cornea to choose the right lens diameter and curve." },
      { title: "Trial lenses", body: "You try a lens in the office while we check its fit, movement, and your vision." },
      { title: "Insertion & care training", body: "New wearers practice insertion and removal with our staff before going home." },
      { title: "Follow-up", body: "A short follow-up confirms comfort and vision before we finalize your prescription." },
    ],
    coverage: "Most plans include a contact lens allowance in place of glasses. The fitting fee is billed separately from the eye exam.",
    doctor: "both",
    featured: true,
  },
  {
    slug: "pediatric-eye-care",
    title: "Pediatric Eye Care",
    label: "Kids' Eye Exams",
    summary: "Exams for children from 6 months through high school.",
    cpt: "92012",
    duration: "30–40 min",
    image: "/images/services/pediatric-eye-care",
    imageAlt: "Smiling young girl wearing pink eyeglasses",
    intro: [
      "School vision screenings check whether a child can read a chart across the room. They miss focusing problems, eye-teaming issues, and lazy eye, all of which affect reading and learning.",
      "Dr. Chen sees children from six months old. Exams are paced for kids, use pictures instead of letters for younger patients, and leave time for parents' questions.",
    ],
    whoFor: [
      "Infants at 6 months, again at age 3, and before kindergarten",
      "School-age children every year",
      "Kids who squint, rub their eyes, or avoid reading",
      "Children with a family history of lazy eye or strabismus",
    ],
    steps: [
      { title: "Age-appropriate testing", body: "Picture charts and matching games for younger kids, standard charts once they can read letters." },
      { title: "Binocular vision", body: "We check how the eyes aim, focus, and track together, the skills reading depends on." },
      { title: "Eye health", body: "A gentle check of the front and back of the eye, with dilation when needed." },
      { title: "Frame fitting", body: "If glasses are needed, our opticians fit durable, flexible frames sized for kids." },
    ],
    coverage: "Pediatric exams are covered annually under most vision plans and as an essential health benefit for children under the ACA.",
    doctor: "dr-chen",
    featured: true,
  },
  {
    slug: "myopia-management",
    title: "Myopia Management",
    label: "Myopia Control",
    summary: "Slow the progression of nearsightedness in children.",
    duration: "30 min",
    image: "/images/services/myopia-management",
    imageAlt: "Boy wearing glasses smiling while doing homework",
    intro: [
      "Nearsightedness that starts in childhood usually gets worse every year until the late teens. High myopia raises the lifetime risk of retinal detachment, glaucoma, and myopic macular degeneration.",
      "Myopia management uses specially designed lenses or eye drops to slow that progression. Dr. Chen tracks each child's eye length with optical biometry so we can see whether treatment is working.",
    ],
    whoFor: [
      "Children whose prescription has increased in the past year",
      "Kids with one or both nearsighted parents",
      "Children who became nearsighted before age 10",
    ],
    steps: [
      { title: "Baseline measurements", body: "We measure your child's prescription and axial length to establish a starting point." },
      { title: "Choose a treatment", body: "Options include myopia-control soft contacts, orthokeratology, defocus spectacle lenses, and low-dose atropine drops." },
      { title: "Six-month check-ins", body: "Regular visits track eye growth so we can adjust treatment if needed." },
    ],
    coverage: "Myopia management is usually self-pay. Exam components may be billed to vision insurance; we offer annual program pricing.",
    doctor: "dr-chen",
    featured: true,
  },
  {
    slug: "glaucoma-eye-disease",
    title: "Glaucoma & Eye Disease",
    label: "Glaucoma & Eye Disease",
    summary: "Detection and management of glaucoma and retinal disease.",
    cpt: "92083",
    duration: "20–40 min",
    image: "/images/services/glaucoma-eye-disease",
    imageAlt: "Optometrist examining a patient at a slit lamp",
    intro: [
      "Glaucoma damages the optic nerve slowly and without pain. By the time most people notice vision loss, the damage is permanent. Early detection is the only reliable protection.",
      "Dr. Webb manages glaucoma, diabetic retinopathy, and macular degeneration in-office using visual field testing, OCT nerve fiber analysis, and retinal photography, and coordinates with ophthalmologists when surgery is needed.",
    ],
    whoFor: [
      "Adults over 40, especially with a family history of glaucoma",
      "Patients with diabetes (annual dilated exam recommended)",
      "Anyone told they have high eye pressure",
      "Patients taking long-term steroid medications",
    ],
    steps: [
      { title: "Pressure & corneal thickness", body: "Tonometry and pachymetry measure eye pressure and adjust for corneal thickness." },
      { title: "Visual field testing", body: "An automated test maps your peripheral vision to find early blind spots." },
      { title: "OCT imaging", body: "A non-contact scan measures the optic nerve and retinal layers to the micron." },
      { title: "Ongoing monitoring", body: "We compare results over time and adjust treatment to keep your vision stable." },
    ],
    coverage: "Medical eye care is billed to your medical insurance, including Medicare and most PPO plans.",
    doctor: "dr-webb",
    featured: true,
  },
  {
    slug: "dry-eye-treatment",
    title: "Dry Eye Treatment",
    label: "Dry Eye",
    summary: "Relief for burning, gritty, or watery eyes.",
    duration: "30 min",
    image: "/images/services/dry-eye-treatment",
    imageAlt: "Close-up of a green eye",
    intro: [
      "Dry eye is one of the most common reasons people see an optometrist. Long screen days, contact lenses, hormonal changes, and some medications all reduce the quality of the tear film.",
      "We find the cause before recommending treatment. For most patients that means evaluating the oil glands along the eyelids, which are behind the majority of dry eye cases.",
    ],
    whoFor: [
      "Eyes that burn, sting, or feel gritty",
      "Vision that blurs during screen work and clears with blinking",
      "Contact lens wearers with end-of-day discomfort",
      "Watery eyes (often a sign of dry eye)",
    ],
    steps: [
      { title: "Tear film analysis", body: "We measure tear break-up time and tear volume, and image the meibomian glands." },
      { title: "Personal treatment plan", body: "Treatment may include prescription drops, lid hygiene, warm compress therapy, or punctal plugs." },
      { title: "Follow-up", body: "We re-measure at follow-up visits to confirm what's working." },
    ],
    coverage: "Dry eye evaluation and treatment are billed to medical insurance.",
    doctor: "dr-webb",
    featured: true,
  },
  {
    slug: "urgent-eye-care",
    title: "Urgent Eye Care",
    label: "Urgent Eye Care",
    summary: "Same-day visits for red eyes, injuries, and sudden changes.",
    duration: "Same day",
    image: "/images/services/urgent-eye-care",
    imageAlt: "Doctor examining a patient's eye with an ophthalmoscope",
    intro: [
      "Eye problems don't wait for your annual exam. We keep same-day appointments open for urgent issues, so you can see an optometrist instead of waiting in an emergency room.",
      "Call us first. We'll tell you whether to come in or go directly to the ER.",
    ],
    whoFor: [
      "Red, painful, or discharging eyes",
      "Something in the eye, or a scratch on the cornea",
      "Sudden flashes of light or new floaters",
      "Sudden blur or loss of vision",
    ],
    steps: [
      { title: "Call the office", body: "Our staff will triage your symptoms by phone and book the first open slot." },
      { title: "Same-day exam", body: "Your doctor examines the eye, removes foreign bodies, and prescribes treatment." },
      { title: "Follow-up", body: "We schedule a recheck to make sure the eye is healing as expected." },
    ],
    coverage: "Urgent eye visits are billed to medical insurance.",
    doctor: "both",
    featured: false,
  },
  {
    slug: "lenses-coatings",
    title: "Lenses & Coatings",
    label: "Lenses & Coatings",
    summary: "Progressives, blue-light filters, and anti-glare coatings.",
    duration: "15 min fitting",
    image: "/images/services/lenses-coatings",
    imageAlt: "Man holding up a pair of black rectangular eyeglasses",
    intro: [
      "The frame is what people see; the lenses are what you see through. Our opticians take precise fitting measurements for every pair, including pupil distance, segment height, and frame wrap.",
      "We work with Essilor, Zeiss, and Hoya labs and carry single vision, progressive, computer, and sport lenses, plus photochromic and polarized options.",
    ],
    whoFor: [
      "First-time progressive lens wearers",
      "People who spend long days on screens",
      "Drivers bothered by night-time glare",
      "Anyone who wants prescription sunglasses",
    ],
    steps: [
      { title: "Lifestyle review", body: "We ask how you use your eyes during the day to recommend the right lens design." },
      { title: "Digital measurements", body: "Precise centration measurements make sure the optical center lines up with your pupils." },
      { title: "Dispensing", body: "We adjust your new glasses to your face and check your vision before you leave." },
    ],
    coverage: "Vision plans typically cover standard lenses; coatings and progressives are discounted under most plans.",
    doctor: "both",
    featured: false,
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
