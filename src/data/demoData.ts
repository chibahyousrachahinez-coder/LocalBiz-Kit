import {
  BusinessProfile,
  GeneratedContent,
  CalendarItem,
  Offer,
  CustomerResponseItem,
  ChecklistItem,
  ActivityLog
} from '../types';

export const DEMO_BUSINESS: BusinessProfile = {
  id: 'biz_harbor_bean',
  name: 'Harbor & Bean',
  category: 'Coffee Shop',
  location: 'Shoreditch, London',
  description: 'Neighborhood specialty coffee shop serving single-origin roasts, seasonal pastries, and quiet corners for slow mornings.',
  website: 'https://harborandbean.co.uk',
  instagram: '@harborandbean',
  facebook: 'harborandbeanlondon',
  phone: '+44 20 7946 0912',
  email: 'hello@harborandbean.co.uk',
  openingHours: 'Mon–Fri 7:30am–5:00pm | Sat–Sun 8:30am–4:30pm',
  services: [
    'Single-Origin Pour Overs',
    'House Blend Espresso Drinks',
    'Artisanal Sourdough & Pastries',
    'Whole Bean Retail Bags',
    'Oat & Alternative Milks',
    'Meeting Table Reservations'
  ],
  callToAction: 'Drop by for your morning brew or order beans online',
  uniqueSellingPoint: 'Direct-trade Ethiopian & Colombian beans roasted fresh weekly in small batches.',
  targetCustomer: 'Local residents, creative professionals, and specialty coffee enthusiasts.',
  preferredTone: 'Friendly',
  updatedAt: new Date().toISOString()
};

export const DEMO_CONTENT_PIECES: GeneratedContent[] = [
  {
    id: 'content_1',
    title: 'New Autumn Cardamom Oat Latte',
    contentType: 'Instagram Post',
    topic: 'Seasonal drink launch',
    tone: 'Friendly',
    goal: 'Get visits',
    hook: 'Your next coffee break just got a little warmer.',
    caption: 'Meet our new Cardamom Spiced Oat Latte. Crafted with freshly ground green cardamom, homemade Madagascar vanilla syrup, and our house-roasted Guatemala espresso. It is warm, comforting, and not too sweet. Available all week at the counter.',
    cta: 'Visit us this week and try it. What is your go-to autumn drink?',
    suggestedVisual: 'A close-up top-down view of the latte in a ceramic mug with latte art on a warm reclaimed oak table, with a steaming cinnamon stick nearby.',
    hashtags: ['#HarborAndBean', '#LondonCoffee', '#ShoreditchEats', '#SpecialtyCoffee', '#OatMilkLatte', '#CoffeeLovers'],
    createdAt: '2026-09-18T08:30:00Z',
    isSaved: true
  },
  {
    id: 'content_2',
    title: 'Meet Our Head Roaster, Marcus',
    contentType: 'Behind the Scenes',
    topic: 'Weekly roasting ritual',
    tone: 'Local/community',
    goal: 'Build trust',
    hook: 'Every Tuesday at 6am, the scent of fresh roast fills Redchurch Street.',
    caption: 'Meet Marcus. He has been cupping and roasting coffees for over a decade. Every single batch is taste-tested twice before it ever meets your espresso basket. We believe great coffee does not need pretension—just care, clean water, and dialed-in extraction.',
    cta: 'Next time you are by the counter, ask Marcus what coffee origins he is most excited about this month.',
    suggestedVisual: 'Warm candid photo of roaster checking bean color under natural morning light at the sample tray.',
    hashtags: ['#BehindTheBeans', '#LondonRoasters', '#CoffeeMakers', '#ShoreditchCommunity', '#SpecialtyRoast'],
    createdAt: '2026-09-17T10:15:00Z',
    isSaved: true
  },
  {
    id: 'content_3',
    title: 'Weekend Morning Ritual: Fresh Cinnamon Buns',
    contentType: 'Promotion',
    topic: 'Saturday bakery drop',
    tone: 'Playful',
    goal: 'Get visits',
    hook: 'Warning: these don’t usually make it past 11:00 AM.',
    caption: 'Our weekend cinnamon cardamom buns come straight from our friends at Dusty Knuckle bakery at 8:00 AM sharp. Flaky, sticky, cardamom-laced perfection that pairs impossibly well with our batch brew.',
    cta: 'Available Saturdays and Sundays until sold out. Come early!',
    suggestedVisual: 'A tray of golden-brown swirled buns dusted with coarse sugar, with steam rising gently.',
    hashtags: ['#LondonBakery', '#CoffeeAndBuns', '#WeekendTreat', '#ShoreditchCoffee', '#LondonWeekend'],
    createdAt: '2026-09-16T14:20:00Z',
    isSaved: true
  },
  {
    id: 'content_4',
    title: 'How to Dial In Your French Press at Home',
    contentType: 'Educational Post',
    topic: 'Home brewing tips',
    tone: 'Professional',
    goal: 'Build trust',
    hook: 'Is your home coffee turning out bitter or muddy? Try this 1 simple adjustment.',
    caption: 'The #1 mistake with French Press is grinding too fine and agitating the grounds right before plunging. Instead: use a coarse sea-salt grind, pour water just off the boil (94°C), let it sit undisturbed for 4 minutes, scoop the top crust, then gently press. You will taste sweet, clean chocolate notes every time.',
    cta: 'Grab a bag of whole beans in-store and we will grind it custom for your brew method for free.',
    suggestedVisual: 'Step-by-step 3-frame layout showing the water pour, the crust breaking, and the golden brew decanting.',
    hashtags: ['#CoffeeTips', '#FrenchPressHack', '#HomeBarista', '#LondonSpecialtyCoffee', '#CoffeeEducation'],
    createdAt: '2026-09-15T09:00:00Z',
    isSaved: true
  },
  {
    id: 'content_5',
    title: 'Google Business Update: Extended Sunday Hours',
    contentType: 'Google Business Post',
    topic: 'Spring/Autumn operating hours',
    tone: 'Friendly',
    goal: 'Get visits',
    hook: 'More time for slow Sunday afternoon conversations.',
    caption: 'By popular demand, Harbor & Bean is now open until 5:00 PM every Sunday. Whether you need a quiet table for reading, an afternoon cortado, or a bag of freshly roasted beans for your work week, our doors are open.',
    cta: 'Get Directions or tap through to view our weekend brew menu.',
    suggestedVisual: 'Welcoming wide shot of the cafe storefront with outdoor wooden bench in natural sunlight.',
    hashtags: ['#HarborAndBean', '#CoffeeShopHours', '#ShoreditchCafe'],
    createdAt: '2026-09-14T11:45:00Z',
    isSaved: true
  },
  {
    id: 'content_6',
    title: 'Customer Highlight: Sarah & Her Guide Dog, Barnaby',
    contentType: 'Customer Story',
    topic: 'Local regular appreciation',
    tone: 'Local/community',
    goal: 'Build trust',
    hook: 'Barnaby knows the way to our doorway better than Google Maps does.',
    caption: 'Sarah has visited us every Tuesday and Friday morning for the past 2 years. Her regular order? A dry cappuccino with cocoa dusting, while Barnaby enjoys a fresh bowl of water and an artisanal dog biscuit behind the counter. Neighborhood regulars like you make this space feel like home.',
    cta: 'Say hello next time you spot them at the window corner bench.',
    suggestedVisual: 'Warm black and white portrait of a happy regular seated by the brick window with coffee cup in hand.',
    hashtags: ['#LocalLegends', '#DogFriendlyCafe', '#CommunityFirst', '#HarborAndBeanFamily'],
    createdAt: '2026-09-13T16:00:00Z',
    isSaved: true
  },
  {
    id: 'content_7',
    title: 'Free Coffee with Any Whole Bean 1kg Bag',
    contentType: 'Promotion',
    topic: 'Monthly beans special',
    tone: 'Friendly',
    goal: 'Promote offer',
    hook: 'Take great coffee home, drink your morning cup on us today.',
    caption: 'Whenever you restock your home pantry with a 1kg bag of any single-origin bean, your coffee on the spot is completely free. We will even grind the bag to your exact setup.',
    cta: 'Ask our baristas at the register for a free taste of today’s filter roast.',
    suggestedVisual: 'A clean matte craft bag of coffee with the Harbor & Bean wax seal beside a fresh porcelain cup of black coffee.',
    hashtags: ['#CoffeeDeals', '#CoffeeBeansLondon', '#WholeBeanSpecialty', '#ShoreditchCoffee'],
    createdAt: '2026-09-12T13:10:00Z',
    isSaved: true
  },
  {
    id: 'content_8',
    title: 'Working from Harbor & Bean: Quiet Hours Policy',
    contentType: 'Announcement',
    topic: 'Remote working and WiFi guidelines',
    tone: 'Professional',
    goal: 'Get engagement',
    hook: 'Fast Wi-Fi, plenty of power sockets, and great espresso for your focused work session.',
    caption: 'We love hosting freelancers and remote teams between 9:00 AM and 12:00 PM, and 2:00 PM to 5:00 PM on weekdays. During peak lunchtime (12-2pm), we kindly reserve center tables for dining guests to keep seats open for everyone.',
    cta: 'Save this post for your next remote working day in Shoreditch.',
    suggestedVisual: 'Clean wooden table with a laptop, ceramic mug of flat white, and a notebook in soft ambient daylight.',
    hashtags: ['#WorkFriendlyCafe', '#LondonFreelance', '#RemoteWorkLondon', '#ShoreditchWorkspace'],
    createdAt: '2026-09-11T09:30:00Z',
    isSaved: true
  }
];

export const DEMO_SAVED_TEMPLATES: string[] = [
  'tpl_new_product',
  'tpl_weekend_promo',
  'tpl_behind_scenes',
  'tpl_hours_update',
  'tpl_thank_you_reviews'
];

export const DEMO_CUSTOMER_RESPONSES: CustomerResponseItem[] = [
  {
    id: 'resp_wait_time',
    category: 'Review Reply',
    scenario: 'Customer loved the coffee but waited 15 minutes during the morning rush.',
    title: 'Morning Rush Wait Time Apology',
    content: "Thank you for visiting us and for the honest feedback. We're glad you enjoyed the coffee, and we genuinely appreciate your patience. Morning rushes can occasionally stretch our queue, and we're actively refining our counter workflow to ensure orders move swifter without compromising the craft of each drink. We'd love to welcome you back soon—let us know on your next visit!",
    tone: 'Apologetic & Professional'
  },
  {
    id: 'resp_dog_friendly',
    category: 'Direct Message',
    scenario: 'Customer asks on Instagram DM or Google Question if dogs are allowed inside.',
    title: 'Dog Friendly Policy Inquiry',
    content: "Hello! Yes, well-behaved dogs are very welcome inside our cafe and on our patio seating. We always have fresh water bowls and complimentary dog treats ready by the counter!",
    tone: 'Warm & Friendly'
  },
  {
    id: 'resp_five_star_review',
    category: 'Review Reply',
    scenario: '5-star Google review praising the flat white and the barista team.',
    title: '5-Star Google Review Appreciation',
    content: "Thank you so much for the kind words! Our baristas take immense pride in dialing in our espresso every morning, so knowing you enjoyed your flat white means the world to our small crew. See you for your next brew!",
    tone: 'Warm & Grateful'
  },
  {
    id: 'resp_catering_question',
    category: 'Email',
    scenario: 'Local studio asks if we can provide coffee carafes and pastries for a 20-person meeting.',
    title: 'Office Catering & Large Order Request',
    content: "Hello! We would love to cater your morning meeting. We supply 2.5-litre insulated carafes of fresh batch brew (serves ~12-14 cups each) along with bakery boxes of fresh morning pastries. If you could let us know your preferred date, delivery/pickup time, and rough headcount, we can confirm availability right away.",
    tone: 'Professional & Efficient'
  }
];

export const DEMO_OFFERS: Offer[] = [
  {
    id: 'offer_1',
    name: 'Morning Pastry & Brew Pair',
    type: 'Slow day boost',
    headline: 'Start your morning with freshly baked simplicity.',
    details: 'Freshly baked all-butter croissant and your choice of today’s single-origin batch brew for just £5.50 every weekday morning before 9:00 AM.',
    terms: 'Valid weekdays 7:30 AM to 9:00 AM. In-store only.',
    validity: 'Valid through this month',
    socialCopy: 'Skip the packaged supermarket sandwich. Between 7:30 and 9:00 AM, pick up an artisan butter croissant and hot batch brew for £5.50. Made fresh every single morning. Available at Harbor & Bean.',
    inStoreSign: 'WEEKDAY MORNING SPECIAL\n\nBATCH BREW + ARTISAN CROISSANT\nFOR £5.50\n\nEvery weekday before 9:00 AM. Ask your barista at checkout!',
    productOrService: 'Batch Brew Filter + Fresh Morning Croissant',
    originalPrice: '£7.20',
    offerPrice: '£5.50',
    startDate: '2026-09-01',
    endDate: '2026-09-30',
    targetCustomer: 'Early morning commuters and locals walking to work before 9:00 AM.',
    callToAction: 'Grab the Morning Pair at the counter',
    shortDescription: 'Freshly baked all-butter croissant and your choice of today’s single-origin batch brew for just £5.50 every weekday morning before 9:00 AM.',
    instagramCaption: 'Skip the packaged supermarket sandwich. Between 7:30 and 9:00 AM, pick up an artisan butter croissant and hot batch brew for £5.50. Made fresh every single morning.',
    storyText: '⏰ Morning Perk: Batch Brew + Fresh Croissant for £5.50 before 9:00 AM on weekdays. Just mention the Morning Pair at checkout!',
    websiteBannerCopy: 'Weekday Morning Special: Coffee + Pastry bundle for £5.50 before 9:00 AM.',
    status: 'active',
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'offer_2',
    name: 'Coffee Club 10-Stamp Pass',
    type: 'VIP / loyalty perk',
    headline: 'Your 10 favourite coffees for the price of 8.',
    details: 'Pre-purchase our physical or digital coffee pass and enjoy any specialty drink on our menu at a discounted neighborhood rate.',
    terms: 'Valid on any regular or large espresso and filter drinks.',
    validity: 'Valid indefinitely once purchased',
    socialCopy: 'For our daily regulars: pick up our 10-coffee pass this month and get your 9th and 10th coffees completely free. Works on all espresso and brew bar options.',
    inStoreSign: 'LOCAL COFFEE PASS\n\n10 DRINKS FOR THE PRICE OF 8\n\nSave 20% on your daily morning cup. Available at the register.',
    productOrService: 'Prepaid 10-Drink Barista Card',
    originalPrice: '£42.00',
    offerPrice: '£34.00',
    startDate: '2026-09-15',
    endDate: '2026-10-31',
    targetCustomer: 'Daily regulars and neighborhood remote workers.',
    callToAction: 'Ask your barista for the Pass',
    shortDescription: 'Pre-purchase our physical or digital coffee pass and enjoy any specialty drink on our menu at a discounted neighborhood rate.',
    instagramCaption: 'For our daily regulars: pick up our 10-coffee pass this month and get your 9th and 10th coffees completely free. Works on all espresso and brew bar options.',
    storyText: 'Love coming by daily? Grab the 10-drink pass this week and save 20% on all specialty drinks. Ask at the counter!',
    websiteBannerCopy: 'Frequent visitor? Save 20% with our neighborhood 10-Drink Coffee Pass.',
    status: 'active',
    createdAt: '2026-09-15T11:00:00Z'
  },
  {
    id: 'offer_3',
    name: 'Free Home Brewing Tote with 2 Bags of Beans',
    type: 'Bundle / package',
    headline: 'Take Harbor & Bean home with you.',
    details: 'Buy any two 250g bags of freshly roasted whole beans and receive our custom heavy organic cotton tote bag for free.',
    terms: 'While supplies last. One tote per double-bag purchase.',
    validity: 'Valid for next 14 days',
    socialCopy: 'Pantry running low on coffee? When you take home any two bags of our single-origin roasts this week, our new organic cotton tote bag is on us.',
    inStoreSign: 'TAKE THE TASTE HOME\n\nBUY 2 BAGS OF FRESH ROASTED BEANS\nGET A FREE ORGANIC CANVAS TOTE\n\nAsk to grind for your home brewer!',
    productOrService: 'Heavy Canvas Tote Bag with Purchase of 2x 250g Bean Bags',
    originalPrice: '£32.00',
    offerPrice: '£22.00',
    startDate: '2026-09-20',
    endDate: '2026-10-15',
    targetCustomer: 'Coffee enthusiasts wanting fresh beans for home.',
    callToAction: 'Order beans in store or online',
    shortDescription: 'Buy any two 250g bags of freshly roasted whole beans and receive our custom heavy organic cotton tote bag for free.',
    instagramCaption: 'Pantry running low on coffee? When you take home any two bags of our single-origin roasts this week, our new organic cotton tote bag is on us.',
    storyText: 'Free heavy cotton tote with any 2 bags of coffee beans! Limited run of 50 bags available in store now.',
    websiteBannerCopy: 'Complimentary heavy cotton tote bag when you purchase 2 bags of freshly roasted beans.',
    status: 'scheduled',
    createdAt: '2026-09-18T14:00:00Z'
  }
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  // Google Business
  { id: 'gb_1', category: 'Google Business', title: 'Correct business name', description: 'Business name matches real signage and official storefront', isCompleted: true, actionRoute: 'google-business' },
  { id: 'gb_2', category: 'Google Business', title: 'Correct primary category', description: 'Selected most specific primary category (e.g. Coffee Shop)', isCompleted: true, actionRoute: 'google-business' },
  { id: 'gb_3', category: 'Google Business', title: 'Accurate opening hours', description: 'Regular hours and holiday hours entered correctly', isCompleted: true, actionRoute: 'business' },
  { id: 'gb_4', category: 'Google Business', title: 'Optimized description', description: '750-character search-friendly description highlighting local specialties', isCompleted: true, actionRoute: 'google-business' },
  { id: 'gb_5', category: 'Google Business', title: 'High-quality storefront & interior photos', description: 'Clear natural-light photos of entrance, interior, menu, and products', isCompleted: true, actionRoute: 'google-business' },
  { id: 'gb_6', category: 'Google Business', title: 'Website link connected', description: 'Direct link to official homepage or booking link', isCompleted: false, actionRoute: 'business' },
  { id: 'gb_7', category: 'Google Business', title: 'Direct local phone number', description: 'Working local phone with voicemail or direct line', isCompleted: false, actionRoute: 'business' },

  // Website
  { id: 'ws_1', category: 'Website', title: 'Clear hero headline & value proposition', description: 'Visitors know what you do and where you are within 5 seconds', isCompleted: false, actionRoute: 'website-copy' },
  { id: 'ws_2', category: 'Website', title: 'Prominent services / menu overview', description: 'Easy-to-browse list of primary offerings and pricing', isCompleted: false, actionRoute: 'website-copy' },
  { id: 'ws_3', category: 'Website', title: 'Clear location & transit info', description: 'Full physical address, neighborhood details, and parking notes', isCompleted: false, actionRoute: 'business' },
  { id: 'ws_4', category: 'Website', title: 'One-click contact buttons', description: 'Tap-to-call, directions link, and direct email link', isCompleted: false, actionRoute: 'business' },
  { id: 'ws_5', category: 'Website', title: 'Primary Call To Action (CTA)', description: 'One clear next action button (e.g. View Menu, Book Now)', isCompleted: false, actionRoute: 'website-copy' },
  { id: 'ws_6', category: 'Website', title: 'Fast mobile-friendly layout', description: 'Readable font sizes and quick load times on 4G connections', isCompleted: false, actionRoute: 'website-copy' },

  // Social Media
  { id: 'sm_1', category: 'Social Media', title: 'Optimized Instagram Bio', description: 'Location, offerings, hours, and single clickable link', isCompleted: false, actionRoute: 'content' },
  { id: 'sm_2', category: 'Social Media', title: 'Contact info in profile buttons', description: 'Direct email or phone buttons configured in Instagram business account', isCompleted: false, actionRoute: 'business' },
  { id: 'sm_3', category: 'Social Media', title: 'Consistent visual tone', description: 'Natural lighting and cohesive aesthetic across latest 9 posts', isCompleted: false, actionRoute: 'content' },
  { id: 'sm_4', category: 'Social Media', title: 'Recent content posted in last 7 days', description: 'Active profile showing you are open and doing business', isCompleted: false, actionRoute: 'calendar' },
  { id: 'sm_5', category: 'Social Media', title: 'Clear CTA on recent posts', description: 'Every promotional post invites customers to take a specific action', isCompleted: false, actionRoute: 'content' },

  // Reviews
  { id: 'rv_1', category: 'Reviews', title: 'Review request system', description: 'Simple template or QR code card to ask happy customers for Google reviews', isCompleted: false, actionRoute: 'responses' },
  { id: 'rv_2', category: 'Reviews', title: 'Professional responses to all reviews', description: 'Thoughtful replies to both positive and negative customer reviews', isCompleted: false, actionRoute: 'responses' },
  { id: 'rv_3', category: 'Reviews', title: 'Recent reviews in last 30 days', description: 'Ongoing fresh social proof from real visitors', isCompleted: false, actionRoute: 'google-business' }
];

export const DEMO_CALENDAR_ITEMS: CalendarItem[] = [
  {
    id: 'cal_1',
    dayOfWeek: 'Monday',
    date: '2026-09-21',
    theme: 'Educational',
    contentType: 'Educational Post',
    title: 'Water Temp & Home Brew Sweetness',
    hook: 'Why boiling water scorches delicate coffee grounds.',
    caption: 'Aim for 92°C-94°C rather than rolling boiling water to pull sweet caramels instead of bitter ash.',
    status: 'scheduled',
    time: '08:00 AM'
  },
  {
    id: 'cal_2',
    dayOfWeek: 'Tuesday',
    date: '2026-09-22',
    theme: 'Product',
    contentType: 'Promotion',
    title: 'Spotlight on Huila Colombian Single Origin',
    hook: 'Tasting notes of red apple, raw cane sugar, and milk chocolate.',
    caption: 'Grown at 1,750m elevation and roasted lightly to preserve its crisp fruit sweetness. Available on filter bar this week.',
    status: 'scheduled',
    time: '09:30 AM'
  },
  {
    id: 'cal_3',
    dayOfWeek: 'Wednesday',
    date: '2026-09-23',
    theme: 'Behind the scenes',
    contentType: 'Behind the Scenes',
    title: 'Morning Calibration on the La Marzocco',
    hook: 'Before the doors unlock, 4 test shots hit the sink.',
    caption: 'Humidity changes daily in London, which means our grind size has to shift every morning to keep extraction time at exactly 27 seconds.',
    status: 'draft',
    time: '07:45 AM'
  },
  {
    id: 'cal_4',
    dayOfWeek: 'Thursday',
    date: '2026-09-24',
    theme: 'Customer story',
    contentType: 'Customer Story',
    title: 'Studio Neighbour Spotlight',
    hook: 'Fueling the architects next door at Studio 4.',
    caption: 'A shout out to our wonderful neighbours who keep our oat milk supply in high demand every Thursday design sprint.',
    status: 'draft',
    time: '12:15 PM'
  },
  {
    id: 'cal_5',
    dayOfWeek: 'Friday',
    date: '2026-09-25',
    theme: 'Promotion',
    contentType: 'Promotion',
    title: 'Weekend Cold Brew Bottles Drop',
    hook: 'Grab a 500ml slow-drip concentrate bottle for your fridge.',
    caption: 'Brewed for 18 hours with filtered chilled water. Pour over ice with a splash of milk for instant morning luxury.',
    status: 'draft',
    time: '11:00 AM'
  },
  {
    id: 'cal_6',
    dayOfWeek: 'Saturday',
    date: '2026-09-26',
    theme: 'Community',
    contentType: 'Instagram Post',
    title: 'Saturday Market Morning Vibes',
    hook: 'The sun is out, the doors are folded back, and the music is rolling.',
    caption: 'Swing by on your Saturday stroll through the neighborhood. Outdoor benches are sunny and dog friendly.',
    status: 'published',
    time: '09:00 AM'
  },
  {
    id: 'cal_7',
    dayOfWeek: 'Sunday',
    date: '2026-09-27',
    theme: 'Rest / optional post',
    contentType: 'Announcement',
    title: 'Slow Sunday Reflections',
    hook: 'No rush today. Take a corner booth and a book.',
    caption: 'Filter coffee is on free refills with any whole pastry order between 2pm and 4pm today.',
    status: 'draft',
    time: '02:00 PM'
  }
];

export const DEMO_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act_1',
    title: 'Created Autumn Latte Post',
    description: 'Generated Instagram caption & hook for seasonal drink launch',
    timestamp: '2 hours ago',
    type: 'content'
  },
  {
    id: 'act_2',
    title: 'Updated Morning Pastry Bundle',
    description: 'Saved active promotion running until Sep 30',
    timestamp: 'Yesterday at 4:12 PM',
    type: 'offer'
  },
  {
    id: 'act_3',
    title: 'Saved Review Response',
    description: 'Prepared thoughtful response for peak-time morning wait times',
    timestamp: '2 days ago',
    type: 'response'
  },
  {
    id: 'act_4',
    title: 'Filled 5 Google Business Checklist Items',
    description: 'Verified business name, category, hours, description & photos',
    timestamp: '3 days ago',
    type: 'profile'
  }
];
