import {
  BusinessProfile,
  BusinessCategory,
  ContentType,
  Tone,
  ContentGoal,
  GeneratedContent,
  WebsiteSectionType,
  Offer
} from '../types';

// Category-specific vocabularies & archetypes
const CATEGORY_NUANCES: Record<BusinessCategory, {
  keywords: string[];
  visualDefault: string;
  defaultTopic: string;
  sampleAudience: string;
  signatureOffer: string;
  serviceTerms: string[];
}> = {
  'Coffee Shop': {
    keywords: ['single-origin', 'fresh roast', 'morning ritual', 'artisan brew', 'neighborhood cafe'],
    visualDefault: 'A ceramic mug with latte art on a warm oak table next to an open notebook and soft morning sunlight.',
    defaultTopic: 'New seasonal drink and morning pastry pairing',
    sampleAudience: 'Locals, morning commuters, and remote workers',
    signatureOffer: 'Free specialty filter brew with any whole bean bag',
    serviceTerms: ['Batch Brew', 'Espresso', 'Pour Over', 'House Pastries', 'Whole Beans']
  },
  'Restaurant': {
    keywords: ['farm-to-table', 'fresh ingredients', 'chef special', 'seasonal menu', 'dining experience'],
    visualDefault: 'A rustic plated dish presented on a dark slate board with freshly garnished herbs in soft bistro lighting.',
    defaultTopic: 'Weekend chef special and local wine pairing',
    sampleAudience: 'Food lovers, families, and couples looking for a relaxed dinner',
    signatureOffer: 'Complimentary dessert with any two dinner entrees',
    serviceTerms: ['Chef Tasting Menu', 'Seasonal Small Plates', 'Wine Pairings', 'Private Dining']
  },
  'Salon': {
    keywords: ['healthy hair', 'custom color', 'balayage', 'botanical treatment', 'restorative styling'],
    visualDefault: 'A bright, clean salon mirror reflection showing glossy dimensional color under natural daylight.',
    defaultTopic: 'Restorative gloss & hydration treatment for seasonal hair health',
    sampleAudience: 'Clients seeking personalized, damage-free styling and healthy color',
    signatureOffer: 'Complimentary botanical scalp massage with your cut and color',
    serviceTerms: ['Precision Haircut', 'Balayage & Highlights', 'Gloss Treatment', 'Blowout & Styling']
  },
  'Barber': {
    keywords: ['clean taper fade', 'hot towel shave', 'beard sculpting', 'sharp lines', 'traditional grooming'],
    visualDefault: 'Polished chrome scissors and vintage grooming shears resting on a dark leather barber chair station.',
    defaultTopic: 'Maintaining your beard shape and line between regular haircuts',
    sampleAudience: 'Men and professionals who value precision grooming and classic craft',
    signatureOffer: 'Free beard oil sample and neck cleanup with full haircut',
    serviceTerms: ['Classic Scissor Cut', 'Skin Fade', 'Beard Trim & Shape', 'Traditional Hot Towel Shave']
  },
  'Gym': {
    keywords: ['strength & mobility', 'functional coaching', 'consistent habits', 'supportive community', 'sustainable fitness'],
    visualDefault: 'Candid photo of members high-fiving by clean kettlebell racks after a focused morning training session.',
    defaultTopic: '3 habits for building real workout consistency this month',
    sampleAudience: 'Busy adults looking for sustainable fitness, guided coaching, and community',
    signatureOffer: 'Free 7-day movement assessment and class trial',
    serviceTerms: ['Small Group Coaching', 'Personal Training', 'Mobility & Recovery', 'Open Gym Access']
  },
  'Dentist': {
    keywords: ['gentle dentistry', 'preventive care', 'bright smile', 'comfortable care', 'clear consultations'],
    visualDefault: 'Sunlit, tranquil modern clinic consultation room with clean minimalist decor and friendly staff.',
    defaultTopic: 'Why modern checkups are gentler and faster than you remember',
    sampleAudience: 'Families and working professionals who want stress-free dental health',
    signatureOffer: 'Complete new patient exam, digital x-rays, and gentle polish package',
    serviceTerms: ['Comprehensive Exam & Cleaning', 'Teeth Whitening', 'Clear Aligners', 'Restorative Care']
  },
  'Real Estate': {
    keywords: ['neighborhood market', 'buyer representation', 'transparent pricing', 'home staging', 'local expertise'],
    visualDefault: 'Wide architectural photograph of a sunlit living room with hardwood floors and patio doors.',
    defaultTopic: 'What buyers in our neighborhood are prioritizing this season',
    sampleAudience: 'Local homeowners, downsizers, and first-time buyers',
    signatureOffer: 'Complimentary home valuation and localized market report',
    serviceTerms: ['Buyer Advisory', 'Seller Marketing Plan', 'Market Valuation', 'Property Staging']
  },
  'Local Service': {
    keywords: ['licensed & insured', 'transparent quotes', 'punctual arrival', 'quality guarantee', 'honest craft'],
    visualDefault: 'Clean, labeled service van parked outside a residential home with professional tools organized.',
    defaultTopic: 'Preventative seasonal maintenance tips to avoid costly repairs',
    sampleAudience: 'Local homeowners seeking reliable, straightforward craftsmanship',
    signatureOffer: 'Complimentary multi-point diagnostic check with any scheduled repair',
    serviceTerms: ['Routine Maintenance', 'Emergency Repairs', 'System Inspections', 'Full Replacements']
  }
};

export function generateContentPiece(
  biz: BusinessProfile,
  contentType: ContentType,
  topic: string,
  tone: Tone,
  goal: ContentGoal
): GeneratedContent {
  const nuances = CATEGORY_NUANCES[biz.category] || CATEGORY_NUANCES['Coffee Shop'];
  const bizName = biz.name.trim() || 'Our Shop';
  const location = biz.location.trim() || 'our neighborhood';
  const cleanTopic = topic.trim() || nuances.defaultTopic;

  let hook = '';
  let caption = '';
  let cta = '';
  let suggestedVisual = nuances.visualDefault;
  let hashtags: string[] = [];

  // Generate hook based on content type & tone
  if (contentType === 'Behind the Scenes') {
    hook = tone === 'Playful'
      ? `Ever wonder what happens here before the front doors unlock?`
      : `The quiet work that makes everything look effortless at ${bizName}.`;
    caption = `Before we welcome our first customer of the day in ${location}, there is a careful routine our team follows. We check every detail, calibrate our equipment, and make sure every station is prepped to our highest standard. Quality isn't something we leave to chance—it's what we build into every single morning.`;
    cta = `Come by today and experience the difference in person. We're open until ${biz.openingHours.split('|')[0] || 'close'}.`;
    suggestedVisual = `A candid, natural-light shot of the team prepping behind the counter or workbench with authentic tools of the trade.`;
  } else if (contentType === 'Customer Story') {
    hook = `Stories like this are the reason we opened our doors in ${location}.`;
    caption = `A regular stopped by ${bizName} recently with a question about ${cleanTopic.toLowerCase()}. Watching them leave with a genuine smile and total peace of mind reminds our team why we do this work every single day. Independent businesses thrive because of relationships, and we're grateful to be part of your weekly routine.`;
    cta = `Have a question about ${cleanTopic.toLowerCase()}? Drop in or send us a message—we're always happy to help.`;
    suggestedVisual = `A warm, welcoming portrait of a customer smiling or an authentic shot of a team member in conversation.`;
  } else if (contentType === 'Educational Post') {
    hook = tone === 'Professional'
      ? `A quick tip from our team on ${cleanTopic.toLowerCase()}:`
      : `If you only remember one tip about ${cleanTopic.toLowerCase()}, make it this one.`;
    caption = `A lot of our clients in ${location} ask us how to handle ${cleanTopic.toLowerCase()}. The most common mistake we see is rushing the process without checking the fundamentals. Instead, focus on consistency, use the right tools, and don't hesitate to ask a professional when something feels off. Small daily care saves hours of frustration down the road.`;
    cta = `Save this post for your reference next time you're thinking about ${cleanTopic.toLowerCase()}!`;
    suggestedVisual = `A clean, step-by-step or detail photo demonstrating the technique or showing the proper care setup.`;
  } else if (contentType === 'Promotion') {
    hook = `Something special for our neighbors this week at ${bizName}.`;
    caption = `We're highlighting ${cleanTopic.toLowerCase()} all this week! Whether you're a familiar face or visiting us for the first time, this is our way of saying thank you for supporting an independent local business in ${location}. Made with care and available while current supplies last.`;
    cta = `Visit us at ${bizName} this week or tap the link in our bio to learn more.`;
    suggestedVisual = `A crisp, appetizing product or service showcase in clean lighting, highlighting texture and craft.`;
  } else if (contentType === 'Google Business Post') {
    hook = `Update from ${bizName} in ${location}:`;
    caption = `Looking for ${cleanTopic.toLowerCase()} near ${location}? ${bizName} is ready to serve you. We specialize in high quality, friendly service with honest pricing and easy access. Visit our location or call us directly to speak with our team.`;
    cta = `Call ${biz.phone || 'us'} today or get directions on Google Maps.`;
    suggestedVisual = `A clear, well-lit photo of the physical storefront and entrance so searchers recognize it immediately.`;
  } else {
    // Default Instagram / Facebook / Announcement
    hook = tone === 'Friendly'
      ? `Your week in ${location} just got a little better.`
      : `${cleanTopic}: Crafted with care at ${bizName}.`;
    caption = `At ${bizName}, we believe that great experiences are in the small details. Today we're putting the spotlight on ${cleanTopic.toLowerCase()}. Everything we create is sourced with integrity and prepared by people who live right here in our community.`;
    cta = goal === 'Get bookings' 
      ? `Appointments fill quickly—reserve your time via the link in our bio or call ${biz.phone || 'our team'}.`
      : `Stop by ${bizName} today and say hello!`;
    suggestedVisual = nuances.visualDefault;
  }

  // Generate hashtags
  const cleanName = biz.name.replace(/[^a-zA-Z0-9]/g, '');
  const cleanLoc = biz.location.split(',')[0].replace(/[^a-zA-Z0-9]/g, '');
  hashtags = [
    `#${cleanName || 'LocalBiz'}`,
    `#${cleanLoc || 'Local'}`,
    `#${biz.category.replace(/[^a-zA-Z0-9]/g, '')}`,
    `#SupportLocal`,
    `#ShopSmall`,
    `#${cleanLoc}${biz.category.replace(/[^a-zA-Z0-9]/g, '')}`
  ];

  return {
    id: 'gen_' + Date.now(),
    title: `${contentType}: ${cleanTopic}`,
    contentType,
    topic: cleanTopic,
    tone,
    goal,
    hook,
    caption,
    cta,
    suggestedVisual,
    hashtags,
    createdAt: new Date().toISOString(),
    isSaved: false
  };
}

export function generateWebsiteSectionCopy(
  biz: BusinessProfile,
  section: WebsiteSectionType
): { headline: string; subheadline: string; cta: string; sectionCopy: string } {
  const bizName = biz.name.trim() || 'Our Business';
  const loc = biz.location.trim() || 'your neighborhood';
  const usp = biz.uniqueSellingPoint.trim() || 'genuine care and dependable quality';
  const target = biz.targetCustomer.trim() || 'local neighbors';

  switch (section) {
    case 'hero':
      return {
        headline: `${biz.category === 'Coffee Shop' ? 'Specialty coffee, made for slow mornings.' : `${biz.category} crafted for ${loc}.`}`,
        subheadline: `At ${bizName}, we combine ${usp} to deliver an honest, memorable experience for ${target}.`,
        cta: biz.callToAction || 'Explore Our Offerings',
        sectionCopy: `Located in the heart of ${loc}. Open today from ${biz.openingHours.split('|')[0] || 'morning till evening'}. Walk-ins always welcome.`
      };
    case 'about':
      return {
        headline: `A neighborhood fixture built on honest craft.`,
        subheadline: `Why we founded ${bizName} in ${loc}.`,
        cta: 'Read Our Full Story',
        sectionCopy: `We started ${bizName} with one goal: to create a space in ${loc} where neighbors never have to compromise on quality. Every item we source, every service we offer, and every team member we welcome shares that quiet commitment. We don't believe in cutting corners or corporate shortcuts—just dependable service, fair pricing, and a genuine hello every time you step through our door.`
      };
    case 'services':
      return {
        headline: `What We Do Best`,
        subheadline: `Transparent, high-standard services tailored for ${loc}.`,
        cta: 'View Full Pricing & Options',
        sectionCopy: biz.services && biz.services.length > 0
          ? `Our core offerings include: ${biz.services.join(' • ')}. Each service is delivered with attention to detail and zero rush.`
          : `We offer a full suite of services designed for your everyday lifestyle. Call us or visit in person to discuss what you need.`
      };
    case 'why_choose_us':
      return {
        headline: `Why Our Community Chooses ${bizName}`,
        subheadline: `Three commitments we make to every client.`,
        cta: 'Experience The Difference',
        sectionCopy: `1. Real Local Roots — We are independent and family-operated right here in ${loc}.\n2. Uncompromising Standards — ${usp}.\n3. Honest & Direct — Clear pricing, timely communication, and no hidden surprises.`
      };
    case 'faq':
      return {
        headline: `Questions We Get Asked All The Time`,
        subheadline: `Everything you need to know before your visit.`,
        cta: 'Have Another Question? Contact Us',
        sectionCopy: `Q: Do I need to book in advance?\nA: Walk-ins are always warmly welcomed! For peak hours, reserving ahead ensures zero wait time.\n\nQ: Where are you located?\nA: You will find us in ${loc}. Easy parking and public transport are nearby.\n\nQ: What payment options do you support?\nA: We accept all major cards, contactless mobile payments, and cash.`
      };
    case 'cta':
      return {
        headline: `Ready to see what makes ${bizName} different?`,
        subheadline: `Visit us in ${loc} or get in touch today.`,
        cta: biz.callToAction || 'Plan Your Visit',
        sectionCopy: `Our doors are open and our team is ready to welcome you. Drop by during opening hours (${biz.openingHours}) or call ${biz.phone || 'our team'} directly.`
      };
    case 'contact':
      return {
        headline: `Get In Touch With ${bizName}`,
        subheadline: `We are here to help Monday through Sunday.`,
        cta: 'Call Us Directly',
        sectionCopy: `Address: ${biz.location}\nPhone: ${biz.phone}\nEmail: ${biz.email}\nOpening Hours: ${biz.openingHours}\nInstagram: ${biz.instagram}`
      };
  }
}

export function generateReviewResponse(
  reviewText: string,
  tone: 'Warm' | 'Professional' | 'Friendly' | 'Apologetic',
  bizName: string
): string {
  const isPositive = !reviewText.toLowerCase().includes('wait') && 
                     !reviewText.toLowerCase().includes('slow') && 
                     !reviewText.toLowerCase().includes('cold') && 
                     !reviewText.toLowerCase().includes('bad') && 
                     !reviewText.toLowerCase().includes('rude') && 
                     !reviewText.toLowerCase().includes('disappoint');

  if (isPositive) {
    if (tone === 'Warm') {
      return `Thank you so much for the lovely review! Knowing that you had such a great experience at ${bizName} truly brightens our whole team's day. We put a lot of heart into what we do, and we cannot wait to welcome you back again very soon.`;
    } else if (tone === 'Professional') {
      return `Thank you for taking the time to share your feedback. We are delighted to hear that your visit to ${bizName} met your expectations. Maintaining consistent quality is our highest priority, and we look forward to serving you again.`;
    } else if (tone === 'Friendly') {
      return `Thanks a million for the great review! We loved having you by ${bizName}. Next time you stop in, be sure to say hello to the crew. See you soon!`;
    } else {
      return `Thank you for your generous feedback and support of ${bizName}. We are grateful for your patronage and look forward to your next visit!`;
    }
  }

  // Critical or nuanced review
  if (tone === 'Apologetic') {
    return `Thank you for visiting ${bizName} and for sharing this honest feedback. We are genuinely sorry that your experience did not reflect our usual high standards. We never want a customer to feel rushed or let down. We are addressing this directly with our team so we can do better. If you are open to it, please reach out to us at our direct phone or email so we can make this right for you personally.`;
  } else if (tone === 'Warm') {
    return `Thank you for visiting us and for the honest feedback. We're glad you enjoyed parts of your visit, and we appreciate your patience regarding the wait. We're always working to make the experience smoother and faster while keeping the high quality you expect. We would love the chance to welcome you back for an effortless visit.`;
  } else if (tone === 'Friendly') {
    return `Hey there, thanks for the candid feedback! We appreciate you stopping by ${bizName}. We had a busier rush than anticipated, and we're tweaking our workflow so things move much faster next time. Hope you give us another visit soon—coffee is on us to make it right!`;
  } else {
    return `Thank you for bringing this to our attention. At ${bizName}, we take customer feedback seriously and strive to deliver prompt, consistent service. We apologize for the delay during your visit and have already reviewed this with our shift leads to prevent future bottlenecks. We welcome the opportunity to serve you better next time.`;
  }
}

export function generateOfferCopy(offer: {
  name: string;
  productOrService: string;
  originalPrice: string;
  offerPrice: string;
  targetCustomer: string;
  callToAction: string;
  bizName: string;
}): {
  headline: string;
  shortDescription: string;
  instagramCaption: string;
  storyText: string;
  websiteBannerCopy: string;
} {
  const headline = `Special Neighbor Offer: ${offer.name}`;
  const shortDescription = `Enjoy ${offer.productOrService} for just ${offer.offerPrice} (originally ${offer.originalPrice}). Valid for ${offer.targetCustomer || 'our local community'}.`;
  const instagramCaption = `We love our neighborhood, and this one is for you. Get ${offer.productOrService} for only ${offer.offerPrice} (regularly ${offer.originalPrice}). Available at ${offer.bizName}. Just mention this post to claim! ${offer.callToAction || 'Stop by today'}.`;
  const storyText = `⏰ Special Deal: ${offer.productOrService} now ${offer.offerPrice} (was ${offer.originalPrice})! Tap through or mention in-store to claim.`;
  const websiteBannerCopy = `Limited Time: ${offer.name} — Only ${offer.offerPrice} (Save on ${offer.productOrService}).`;

  return {
    headline,
    shortDescription,
    instagramCaption,
    storyText,
    websiteBannerCopy
  };
}

export interface WebsiteSectionsBundle {
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    trustBadge: string;
  };
  about: {
    headline: string;
    story: string;
    values: string[];
  };
  services: {
    title: string;
    description: string;
    priceOrNote: string;
  }[];
  trust: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  contact: {
    address: string;
    hours: string;
    phone: string;
    directionsNote: string;
  };
}

export function generateWebsiteSections(biz: BusinessProfile): WebsiteSectionsBundle {
  const bizName = biz.name.trim() || 'Our Shop';
  const loc = biz.location.trim() || 'our neighborhood';
  const primaryService = biz.services?.[0] || 'handcrafted specialty';
  const secondaryService = biz.services?.[1] || 'signature offerings';
  const hours = biz.openingHours || 'Mon-Sun: 7am - 6pm';

  // Category-specific FAQs
  let categoryFaqs: { question: string; answer: string }[] = [];
  if (biz.category === 'Coffee Shop' || biz.category === 'Restaurant') {
    categoryFaqs = [
      {
        question: `Do I need a reservation or do you welcome walk-ins?`,
        answer: `We welcome walk-ins anytime during regular operating hours! For larger gatherings of 6 or more, feel free to give us a quick call in advance so we can prepare your table.`
      },
      {
        question: `Do you cater to dietary preferences (plant-based, gluten-conscious)?`,
        answer: `Yes! We always stock quality oat and almond alternatives, along with freshly sourced options clearly marked for vegetarian and gluten-sensitive guests.`
      },
      {
        question: `Is there parking or public transit nearby?`,
        answer: `Convenient street parking is available along the block, and we are located within a short 2-minute walk from neighborhood transit stops.`
      },
      {
        question: `Can I buy whole beans or takeout items directly?`,
        answer: `Absolutely. We offer whole beans ground to your brewing setup on demand, as well as eco-friendly takeaway packaging for all drinks and food items.`
      }
    ];
  } else if (biz.category === 'Salon' || biz.category === 'Barber') {
    categoryFaqs = [
      {
        question: `How far in advance should I book my appointment?`,
        answer: `We recommend booking 3 to 5 days in advance for peak weekend slots. We also maintain a daily walk-in waitlist for weekday trims and maintenance.`
      },
      {
        question: `What is your cancellation or rescheduling policy?`,
        answer: `We kindly ask for 24 hours notice for any cancellations or schedule changes so we can offer the opening to waiting clients.`
      },
      {
        question: `Do you offer complimentary consultations before color or major styling?`,
        answer: `Yes, we provide 10-minute thorough consultations to assess hair health, review inspiration photos, and confirm realistic timeline and pricing.`
      },
      {
        question: `What payment methods do you accept?`,
        answer: `We accept all major credit/debit cards, contactless mobile pay (Apple Pay, Google Pay), and cash.`
      }
    ];
  } else {
    categoryFaqs = [
      {
        question: `How quickly can new clients get started?`,
        answer: `You can reach out via phone, email, or our inquiry form. We typically respond within 2 to 4 business hours to answer questions and schedule your first visit.`
      },
      {
        question: `What makes ${bizName} different from larger chain competitors?`,
        answer: `As an independent local business, you work directly with experienced professionals who live in your community and take personal pride in every single client interaction.`
      },
      {
        question: `Where are you located and is parking easy?`,
        answer: `We are conveniently located in ${loc} with designated client parking and clear storefront signage.`
      },
      {
        question: `Do you offer transparent quotes before beginning any service?`,
        answer: `Yes, we always provide clear, itemized pricing and walkthroughs upfront so there are never unexpected surprises.`
      }
    ];
  }

  return {
    hero: {
      headline: `Exceptional ${biz.category.toLowerCase()}, right here in ${loc}.`,
      subheadline: `${bizName} is your neighborhood destination for honest quality, warm hospitality, and memorable experiences.`,
      primaryCta: biz.callToAction || 'Visit Our Location',
      secondaryCta: 'View Full Menu & Offerings',
      trustBadge: `Trusted by hundreds of local ${loc.split(',')[0]} regulars.`
    },
    about: {
      headline: `Built on honest craft and genuine community roots.`,
      story: `We opened ${bizName} with a straightforward commitment: to offer ${loc} an independent space where quality is never compromised and every guest is treated like a neighbor. Whether you're stopping by for your everyday routine or discovering us for the very first time, you'll find genuine care in every detail.`,
      values: [
        'Locally Owned & Independent',
        'Ethically Sourced Quality',
        'Warm, Welcoming Atmosphere'
      ]
    },
    services: [
      {
        title: primaryService,
        description: `Our most celebrated daily specialty, crafted fresh with meticulous attention to detail.`,
        priceOrNote: 'Signature item • Daily favorite'
      },
      {
        title: secondaryService,
        description: `Prepared to order using premium local ingredients and high standards.`,
        priceOrNote: 'Available all day'
      },
      {
        title: biz.services?.[2] || 'Custom Specialty Orders',
        description: `Tailored options and seasonal packages designed for any occasion or gathering.`,
        priceOrNote: 'Ask our team in-store'
      }
    ],
    trust: [
      {
        title: 'Authentic Local Fixture',
        description: `Rooted right here in ${loc}, dedicated to uplifting our neighborhood community.`
      },
      {
        title: 'Rigorous Quality Standard',
        description: `${biz.uniqueSellingPoint || 'Uncompromising attention to craft and friendly service.'}`
      },
      {
        title: 'Clear, Transparent Experience',
        description: 'No hidden fees, no pretentiousness—just great quality and friendly faces.'
      },
      {
        title: 'Consistent & Reliable',
        description: `Open 7 days a week (${hours}) so you always know when to find us.`
      }
    ],
    faqs: categoryFaqs,
    contact: {
      address: biz.location || 'Visit us on the main street',
      hours: hours,
      phone: biz.phone || '(555) 019-2834',
      directionsNote: `Easy street parking and neighborhood transit within a 2-minute walk.`
    }
  };
}

export function generateOfferPackage(
  biz: BusinessProfile,
  type: import('../types').OfferType,
  offerTitle: string,
  terms: string
): import('../types').Offer {
  const bizName = biz.name || 'Our Shop';
  const loc = biz.location.split(',')[0] || 'our neighborhood';

  return {
    id: 'off_' + Date.now(),
    name: offerTitle,
    type,
    headline: `${offerTitle} at ${bizName}`,
    details: `We're celebrating our ${loc} neighbors with an exclusive promotion: ${offerTitle}. Bring a friend or treat yourself this week.`,
    terms: terms || 'Valid in-store only. Cannot be combined with other offers.',
    validity: 'Valid for the next 14 days',
    socialCopy: `📣 Neighborhood Special! ${offerTitle} at ${bizName}.\n\nWe love our ${loc} community and wanted to do something special for you this week. Mention this post at the counter to redeem.\n\n📍 ${biz.location}\n⏰ Offer ends soon!`,
    inStoreSign: `SPECIAL NEIGHBORHOOD PROMOTION\n\n${offerTitle.toUpperCase()}\n\nAsk our staff at checkout or mention this sign.\n${terms}\n\nThank you for supporting independent local business!`,
    status: 'active',
    createdAt: new Date().toISOString()
  };
}

export function generateGoogleBusinessCopy(biz: BusinessProfile): {
  seoDescription: string;
  updatePost: string;
} {
  return {
    seoDescription: `${biz.name} is a premier ${biz.category.toLowerCase()} in ${biz.location}. We provide high quality services, transparent pricing, and friendly care. Visit us today!`,
    updatePost: `New update from ${biz.name} in ${biz.location}! Stop by today or call us at ${biz.phone || 'our team'} to learn more.`
  };
}
