import { TemplateItem } from '../types';

export const TEMPLATES_DATA: TemplateItem[] = [
  // =================== SOCIAL MEDIA (8 templates) ===================
  {
    id: 'tpl_new_product',
    title: 'New Product / Service Announcement',
    category: 'Social Media',
    description: 'Clean announcement post that builds curiosity without feeling pushy.',
    useCase: 'Launching a new menu item, seasonal specialty, treatment, or package.',
    content: `We've been keeping a little secret in the workshop, and it's finally ready for you.

Introducing our new [Product / Service Name] — created specifically for [Target Audience / Customer Goal].

Here is what makes it special:
• [Key Feature or Ingredient 1]
• [Key Feature or Craft Detail 2]
• [Immediate Benefit to Customer 3]

Available starting this [Day of Week, e.g. Friday] at [Location / In-Store / Online].

Come by this week and be one of the first to try it. Have questions about it? Drop a comment below or send us a quick message!`
  },
  {
    id: 'tpl_weekend_promo',
    title: 'Weekend Neighborhood Feature',
    category: 'Social Media',
    description: 'Casual, friendly weekend invitation focusing on local atmosphere and relaxation.',
    useCase: 'Friday afternoon or Saturday morning post inviting locals to visit.',
    content: `The weekend is officially here, and the doors are wide open at [Business Name].

Whether you're stopping by after your morning walk, catching up with an old friend, or picking up your weekly essentials, we've got a warm spot waiting for you.

📍 Find us at [Neighborhood / Street Address]
⏰ Weekend Hours: [Saturday & Sunday Opening Hours]

What's on your agenda for the weekend? Let us know in the comments!`
  },
  {
    id: 'tpl_behind_scenes',
    title: 'Behind the Scenes: The Morning Routine',
    category: 'Social Media',
    description: 'Authentic look at the care, preparation, and craft that happens before opening.',
    useCase: 'Humanizing the business and showing high standards of quality.',
    content: `Long before the sign flips to "OPEN" at [Time], here's what the quiet hours look like at [Business Name].

From [Specific Prep Step 1, e.g. dialling in the espresso beans] to [Specific Prep Step 2, e.g. inspecting fresh inventory], we take those extra 30 minutes so that every single [Product/Service] feels effortless for you.

Quality isn't an accident — it's built into our morning checklist every single day.

What's one morning ritual you never skip?`
  },
  {
    id: 'tpl_meet_the_team',
    title: 'Meet the Team / Staff Spotlight',
    category: 'Social Media',
    description: 'Warm team introduction that builds familiarity and trust with regular clients.',
    useCase: 'Highlighting a team member, their favorite service/product, or work anniversary.',
    content: `Meet [Team Member Name], one of the friendly faces keeping things running smoothly at [Business Name].

A few quick facts about [Name]:
✨ Favorite [product / service on our menu]: [Item Name]
💡 Top tip for our customers: "[Helpful Quick Advice]"
☕ Go-to afternoon pick-me-up: [Favorite drink or snack]

Next time you see [Name] at the counter or in the studio, be sure to say hello!`
  },
  {
    id: 'tpl_customer_favorite',
    title: 'The Local Regulars’ Favorite',
    category: 'Social Media',
    description: 'Social-proof post showcasing your most consistently ordered or booked item.',
    useCase: 'Highlighting your best-selling staple product or treatment.',
    content: `If you only ever try one thing at [Business Name], make it this one.

Our [Name of Staple Item/Service] has earned a permanent place as our community's top pick, and it's easy to see why:

👉 [Why people love it / Sensory or functional detail]
👉 [Another key reason / high quality ingredient or technique]

Have you experienced it yet, or do you have another personal favorite? Tell us below!`
  },
  {
    id: 'tpl_educational_tip',
    title: 'Quick How-To / Educational Insight',
    category: 'Social Media',
    description: 'Demonstrates expertise by giving the audience actionable advice for free.',
    useCase: 'Sharing maintenance tips, care advice, or common mistakes to avoid.',
    content: `Quick tip from the pros at [Business Name]:

A lot of our customers ask us: "[Common Customer Question, e.g. How do I maintain my haircut / keep my coffee fresh / protect my skin in winter]?"

Here is the 1 thing we always recommend:
[Concise, practical answer in 2-3 short sentences].

Save this post so you have it handy next time you need it! What other questions do you have for our team?`
  },
  {
    id: 'tpl_community_shoutout',
    title: 'Local Neighborhood Love & Partner Spotlight',
    category: 'Social Media',
    description: 'Celebrate another local business or local community event.',
    useCase: 'Building community goodwill and cross-promoting nearby shops.',
    content: `One of the best things about being located in [Neighborhood / City] is the incredible community of small independent businesses around us.

Today we're giving a huge shoutout to our friends at [Neighboring Business Name]. If you haven't checked out their [What they do best], you're missing out!

Support local, shop independent, and keep our neighborhood vibrant. Who is your favorite local shop around town?`
  },
  {
    id: 'tpl_weekly_schedule',
    title: 'Weekly Schedule & Availability Notice',
    category: 'Social Media',
    description: 'Clear schedule update that reduces booking inquiries and manages walk-in expectations.',
    useCase: 'Monday morning schedule post or holiday week availability.',
    content: `Planning your week? Here is what our schedule looks like at [Business Name] for [Dates/Week]:

📅 Monday – Wednesday: Open [Hours] (Walk-ins welcome)
📅 Thursday – Friday: Open [Hours] ([Special note, e.g. limited evening appointments])
📅 Saturday: Open [Hours]
📅 Sunday: [Hours or Closed for rest]

Spots fill up quickly towards the end of the week, so if you're planning a visit or booking, grab your slot early via the link in our bio or call us directly at [Phone Number]!`
  },

  // =================== WEBSITE (6 templates) ===================
  {
    id: 'tpl_web_hero',
    title: 'High-Converting Website Hero Section',
    category: 'Website',
    description: 'Punchy headline, subheadline, and dual call-to-action for your homepage.',
    useCase: 'Above-the-fold homepage section that immediately explains what you do.',
    content: `HEADLINE:
[Specific Local Specialty], Crafted for [Target Customer] in [City/Neighborhood].

SUBHEADLINE:
No guesswork, no shortcuts. Just [Primary Benefit, e.g. exceptional quality and honest service] from people who genuinely care about your experience.

PRIMARY BUTTON:
[Book Your Visit / View Today's Menu / Get a Free Quote]

SECONDARY BUTTON:
[See Our Services / Explore The Gallery / Our Story]

TRUST BADGE:
"Serving [Neighborhood] since [Year] • Over [Rating/Number] 5-Star Local Reviews"`
  },
  {
    id: 'tpl_web_about',
    title: 'Authentic Local "About Us" Story',
    category: 'Website',
    description: 'Grounded story explaining why the business was started without corporate jargon.',
    useCase: 'About page or homepage story section.',
    content: `WHY WE STARTED [BUSINESS NAME]:

We opened [Business Name] in [Year] with a straightforward belief: our neighborhood deserved [a better coffee / more personalized care / honest craftsmanship] without the attitude or high markups.

We live here, we work here, and our kids go to school here. When you walk through our doors, you aren't just another order number in a queue — you are our neighbor.

Every [service or product] we offer is sourced with integrity, tested personally, and delivered with genuine care.

Drop by next time you are in [Neighborhood] — we would love to meet you.`
  },
  {
    id: 'tpl_web_why_choose_us',
    title: 'Why Choose Us (3-Pillar Value Grid)',
    category: 'Website',
    description: 'Crisp, scannable differentiators that address customer doubts upfront.',
    useCase: 'Homepage value proposition section.',
    content: `WHY NEIGHBORS CHOOSE [BUSINESS NAME]:

1. Locally Owned & Rooted
We are independent and family-operated. Every decision we make is guided by what's best for our local community, not a distant corporate office.

2. Quality You Can Trust
From our materials and ingredients to our ongoing training, we never cut corners. If it's not good enough for our own family, it doesn't make the cut.

3. Clear, Upfront Pricing & Communication
No hidden fees, no surprise add-ons. We explain everything clearly before we begin, so you always know what to expect.`
  },
  {
    id: 'tpl_web_faq',
    title: 'Essential Local Business FAQ Section',
    category: 'Website',
    description: 'Answers the top 5 questions customers search for before visiting.',
    useCase: 'Services page, Contact page, or Footer FAQ accordion.',
    content: `FREQUENTLY ASKED QUESTIONS:

Q: Do I need an appointment or can I walk in?
A: We welcome walk-ins whenever space allows! However, to guarantee your preferred time without waiting, we recommend booking online or calling ahead at [Phone Number].

Q: Where can I park when visiting?
A: Convenient parking is available [describe parking, e.g. directly in front on Main St / in the free lot behind our building / 2-hour meter parking nearby].

Q: What payment methods do you accept?
A: We accept all major debit/credit cards, Apple Pay, Google Pay, and contactless payments. [Note if cash is accepted or cashless].

Q: What is your cancellation or rescheduling policy?
A: We appreciate at least [24 hours] advance notice so we can offer the slot to someone on our waitlist.`
  },
  {
    id: 'tpl_web_services_tier',
    title: 'Service & Pricing Overview Layout',
    category: 'Website',
    description: 'Clear pricing card format that customers can skim quickly on their mobile phones.',
    useCase: 'Services or Menu page.',
    content: `OUR CORE SERVICES:

[Service 1 Name] — From $[Price]
[1-sentence description highlighting the exact result or experience]. Includes [Specific feature or complimentary bonus].

[Service 2 Name] — From $[Price]
[1-sentence description highlighting who this is ideal for]. Includes [Specific feature].

[Service 3 Name (Premium / Full Package)] — From $[Price]
Our most comprehensive experience. Includes [Complete package features] designed for total peace of mind.

Need something customized? Call us at [Phone Number] and we'll tailor a package to your exact needs.`
  },
  {
    id: 'tpl_web_contact_hours',
    title: 'Friction-Free Contact & Location Section',
    category: 'Website',
    description: 'High-utility contact details formatted for quick thumb-tapping on smartphones.',
    useCase: 'Contact page or Homepage footer block.',
    content: `VISIT US AT [BUSINESS NAME]:

📍 Address: [Full Street Address, City, Postcode]
(Located right across from [Well-known Local Landmark])

📞 Direct Phone: [Phone Number] (Tap to call)
✉️ Email: [Email Address]
📱 Instagram: [@YourHandle]

⏰ HOURS OF OPERATION:
Monday – Friday: [Morning Time] – [Evening Time]
Saturday: [Morning Time] – [Evening Time]
Sunday: [Hours or Closed]

🚗 Transit & Parking: [Transit lines or nearby parking garage directions].`
  },

  // =================== GOOGLE BUSINESS (5 templates) ===================
  {
    id: 'tpl_gb_description',
    title: 'Search-Optimized Google Business Description',
    category: 'Google Business',
    description: 'Fits within Google’s 750-character limit, balancing keywords with authentic tone.',
    useCase: 'Main business description in Google Business Profile dashboard.',
    content: `Welcome to [Business Name], your local destination for [Primary Service/Product] in [City/Neighborhood]. 

Since [Year], our team has been dedicated to providing [key benefit, e.g. artisanal coffee / precision hair styling / reliable auto repairs] with friendly, honest service. We specialize in [Key Service 1], [Key Service 2], and [Key Service 3], using only top-tier [ingredients / products / equipment]. 

Conveniently located on [Street Name] with easy access to [parking / public transit], our relaxed, clean space is designed for comfort. Whether you need a quick [service/item] on your lunch break or want to consult with our experts, we look forward to welcoming you.

Visit us today or call [Phone Number] to learn more.`
  },
  {
    id: 'tpl_gb_offer_post',
    title: 'Google Profile Promotional Offer Post',
    category: 'Google Business',
    description: 'Direct, conversion-focused update designed for Google Maps discovery.',
    useCase: 'Creating a 7-day or 30-day "Offer" post on Google Maps.',
    content: `SPECIAL NEIGHBORHOOD OFFER: [Offer Title]

Enjoy [Discount or Special Offer, e.g. 15% off your first visit / Free beverage with any morning pastry] at [Business Name] this month!

How to redeem:
1. Save or screenshot this Google offer.
2. Mention it to our team when you arrive at [Street Address].
3. Valid through [End Date].

Click the button below to get directions or call us directly.`
  },
  {
    id: 'tpl_gb_holiday_hours',
    title: 'Holiday & Seasonal Hours Update Post',
    category: 'Google Business',
    description: 'Prevents customer frustration by clarifying holiday operating schedules early.',
    useCase: 'Bank holidays, Thanksgiving, Christmas, New Year, or summer adjustments.',
    content: `UPDATED HOLIDAY HOURS at [Business Name]:

Planning a visit over the upcoming [Holiday Name, e.g. Bank Holiday / Long Weekend]? Here is our confirmed schedule:

• [Date, e.g. Friday Dec 24]: Open [Hours]
• [Date, e.g. Saturday Dec 25]: CLOSED for staff family time
• [Date, e.g. Sunday Dec 26]: Open [Hours]
• [Date, e.g. Monday Dec 27]: Regular hours resume ([Hours])

We wish everyone in [City/Neighborhood] a safe and restful break. We can't wait to see you!`
  },
  {
    id: 'tpl_gb_new_service',
    title: 'New Service Announcement for Google Maps',
    category: 'Google Business',
    description: 'Informs local searchers about added offerings and new capabilities.',
    useCase: 'When launching an expanded service, new equipment, or new practitioner.',
    content: `NOW AVAILABLE IN [NEIGHBORHOOD]: [New Service / Menu Addition]

We are pleased to introduce [New Offering Name] at [Business Name]! 

Designed for clients looking for [specific benefit / solution], this addition delivers [key advantage] in a comfortable, relaxed setting.

Appointments and orders can now be booked online via our website or by calling [Phone Number]. Tap "Call Now" or "Learn More" below to view details and availability.`
  },
  {
    id: 'tpl_gb_photo_showcase',
    title: 'Storefront & Interior Showcase Update',
    category: 'Google Business',
    description: 'Prompts Google searchers to stop in by emphasizing a clean, welcoming environment.',
    useCase: 'Regular monthly photo post on Google to keep the listing fresh.',
    content: `Looking for a quiet spot to [work / unwind / dine / refresh] in [Neighborhood]? 

Here is a glimpse inside [Business Name] today. Our space is thoroughly sanitized, fully stocked, and our team is ready to assist you.

Stop by and say hello at [Address] — we are open until [Closing Time] today!`
  },

  // =================== CUSTOMER MESSAGES (5 templates) ===================
  {
    id: 'tpl_msg_price_inquiry',
    title: 'Polite & Clear Price Inquiry Reply',
    category: 'Customer Messages',
    description: 'Quotes pricing transparently while conveying the value and care included.',
    useCase: 'Responding to Instagram DM, Facebook message, or email asking "How much for X?".',
    content: `Hi [Customer Name]! 

Thanks for reaching out to [Business Name]. Our [Service or Product Name] starts at $[Price]. 

That includes [Key Included Detail 1, e.g. full consultation / premium wash / complimentary styling / take-home sample], so there are no unexpected surprises at checkout. 

Depending on your specific needs, we can also customize [options or packages]. Would you like us to reserve a spot for you this week, or can I answer any other questions first?`
  },
  {
    id: 'tpl_msg_hours_location',
    title: 'Fast Directions & Hours Quick Reply',
    category: 'Customer Messages',
    description: 'All practical details formatted so the customer can navigate immediately.',
    useCase: 'Quick reply when a customer asks "Where are you located and when are you open?".',
    content: `Hi [Name]! 

We are located at [Street Address], right next to [Known Local Landmark / Street Corner]. 

Our current opening hours are:
• Monday – Friday: [Hours]
• Saturday: [Hours]
• Sunday: [Hours]

🚗 Parking: [Quick 1-sentence note on parking or transit].

Feel free to walk right in, or give us a ring at [Phone Number] if you need directions on your way here!`
  },
  {
    id: 'tpl_msg_late_response',
    title: 'Apology for Delayed Response',
    category: 'Customer Messages',
    description: 'Warm apology that sets expectations politely when inquiries come in after hours.',
    useCase: 'Replying to messages received during closed hours or a very busy shift.',
    content: `Hi [Name], thank you so much for your patience! We were hands-on with clients in the shop and just seeing your message now.

Regarding your question about [Topic]: [Clear, helpful answer].

I'm right here if you need anything else or if you'd like me to hold a slot for you. Thanks again for your understanding!`
  },
  {
    id: 'tpl_msg_booking_confirmation',
    title: 'Friendly Booking / Appointment Reminder',
    category: 'Customer Messages',
    description: 'Reduces no-shows and gives clear instructions for arrival.',
    useCase: 'Sent 24-48 hours before an appointment via SMS or direct message.',
    content: `Hi [Client Name]! This is a friendly reminder of your upcoming visit to [Business Name] on [Day, Date] at [Time].

📍 We're at [Address]. Please plan to arrive about 5 minutes early so we can get you settled in without rushing.

If you need to adjust your time, please let us know at least [24 hours] in advance by replying to this message or calling [Phone Number]. 

We can't wait to see you!`
  },
  {
    id: 'tpl_msg_complaint_handling',
    title: 'De-escalation & Complaint Resolution Message',
    category: 'Customer Messages',
    description: 'Empathetic, non-defensive response that takes the conversation private immediately.',
    useCase: 'Direct message from an unhappy customer.',
    content: `Hi [Customer Name], 

Thank you for reaching out and letting us know. I am genuinely sorry to hear that your experience with [specific issue, e.g. your order / your service] fell short of our usual standards. That's definitely not what we strive for at [Business Name].

We want to make this right for you immediately. Could you please share your order/receipt details, or give our owner [Owner Name] a quick call directly at [Direct Phone Number]? 

We truly value your patronage and would appreciate the opportunity to resolve this personally.`
  },

  // =================== OFFERS (4 templates) ===================
  {
    id: 'tpl_offer_first_time',
    title: 'First-Time Client Welcome Offer',
    category: 'Offers',
    description: 'Low-risk intro incentive designed to turn hesitant locals into first-time visitors.',
    useCase: 'New customer acquisition on social bio, local flyers, or website popup.',
    content: `HEADLINE:
New to [Neighborhood]? Your First [Product/Service] is on Us.

THE OFFER:
Receive [15% off / a complimentary add-on / $10 voucher] on your first visit to [Business Name].

THE STORY:
We know finding a new [hairdresser / coffee shop / mechanic / dentist] you can rely on takes trust. That's why we'd love to invite you in to see what our team is all about.

TERMS & DETAILS:
• Valid for new local customers on first visit.
• Simply mention code "NEIGHBOR" at checkout or booking.
• Valid through [Date].`
  },
  {
    id: 'tpl_offer_bundle_save',
    title: 'Bundle & Save Package Deal',
    category: 'Offers',
    description: 'Increases average order value by pairing high-margin items together.',
    useCase: 'Mid-week sales boost or holiday gift bundle.',
    content: `HEADLINE:
The [Business Name] Everyday Bundle: Pair & Save.

THE OFFER:
Get [Item 1] + [Item 2] together for just $[Bundle Price] (Normally $[Original Price]).

THE DETAILS:
Why choose one when they're made to go together? Treat yourself or surprise a colleague with our favorite pairing.

AVAILABLE:
Every [e.g. Tuesday through Thursday] between [Hours]. Available in-store only while daily supplies last!`
  },
  {
    id: 'tpl_offer_refer_friend',
    title: 'Refer-a-Neighbor Friendly Perk',
    category: 'Offers',
    description: 'Word-of-mouth engine that rewards both your existing client and their friend.',
    useCase: 'Printed cards placed at checkout or emailed to regular clients.',
    content: `GIVE $[Amount], GET $[Amount] WITH OUR NEIGHBOR PASS:

The highest compliment you can pay our small business is introducing a friend or neighbor. 

Here is how it works:
1. Pass this message or referral card to a friend who hasn't visited us yet.
2. They get $[Amount / %] off their first service or purchase.
3. You get $[Amount / %] credit on your next visit as our thank you!

Pick up a referral card at the counter or have your friend mention your name during their visit.`
  },
  {
    id: 'tpl_offer_flash_sale',
    title: '24-Hour Flash Community Special',
    category: 'Offers',
    description: 'Creates instant urgency to fill empty chairs, tables, or quiet afternoon shifts.',
    useCase: 'Posted on Instagram Stories or Google Updates on a slow Tuesday.',
    content: `⚡ 24-HOUR FLASH SPECIAL ⚡

Today only at [Business Name]:
Take [Discount, e.g. 20% off all retail shelves / 2-for-1 on specialty drinks / Free upgrade] when you visit between [Start Time] and [End Time]!

Show this screen to our team at checkout to claim.

📍 [Street Address]
⏰ Valid today only until [Time] or while stock lasts!`
  },

  // =================== REVIEWS (4 templates) ===================
  {
    id: 'tpl_rev_request_friendly',
    title: 'Gentle & Natural Review Request (SMS / Email)',
    category: 'Reviews',
    description: 'Unassuming request asking satisfied clients to help others discover you on Google.',
    useCase: 'Sent after a successful service, meal, or purchase.',
    content: `Hi [Customer Name]! 

Thank you so much for stopping by [Business Name] today! It was wonderful to see you.

As a small independent business, word-of-mouth means everything to our team. If you enjoyed your experience today, would you mind taking 30 seconds to leave us a quick review on Google? 

Here is the direct link: [Your Google Review Link]

It truly makes a huge difference in helping neighbors find our shop. Thanks again and see you soon!`
  },
  {
    id: 'tpl_rev_reply_positive',
    title: 'Thoughtful Reply to a Glowing 5-Star Review',
    category: 'Reviews',
    description: 'Personalized acknowledgment that reinforces community and loyalty.',
    useCase: 'Replying to positive Google or Yelp reviews.',
    content: `Thank you so much for taking the time to share this review, [Reviewer Name]! 

Our entire team takes real pride in [specific detail mentioned in review, e.g. sourcing fresh ingredients / keeping our studio spotless], so reading your kind words made our morning. 

We can't wait to welcome you back next time you're in [Neighborhood]!`
  },
  {
    id: 'tpl_rev_reply_critical',
    title: 'Graceful & Professional Reply to Critical Feedback',
    category: 'Reviews',
    description: 'Neutral, respectful response that reassures potential future customers reading your page.',
    useCase: 'Public reply to a 2-star or 3-star review with valid critiques.',
    content: `Hello [Reviewer Name], thank you for sharing your feedback with us. 

We always strive to give every guest a seamless experience, and we are disappointed to hear that [mention specific issue gracefully, e.g. your wait time / the noise level] did not meet your expectations. 

We take critiques seriously and are already discussing this with our staff to make sure it doesn't happen again. We would love the opportunity to make this right — could you please reach out to us directly at [Email or Phone Number] so we can speak with you personally?`
  },
  {
    id: 'tpl_rev_qr_counter_card',
    title: 'Checkout Counter "Help Us Grow" Card Copy',
    category: 'Reviews',
    description: 'Copy for a small acrylic tabletop stand or sticker placed next to the card reader.',
    useCase: 'In-store signage with a QR code leading to Google Maps reviews.',
    content: `HAD A GREAT EXPERIENCE TODAY?

Support our small local crew! Scan the QR code below with your phone camera to leave a quick 5-star review on Google.

[INSERT QR CODE HERE]

Every review helps our independent shop thrive in [Neighborhood]. Thank you for your support!`
  }
];

export const PRESET_TEMPLATES: {
  id: string;
  title: string;
  category: string;
  description: string;
  templateText: string;
  useCase?: string;
}[] = TEMPLATES_DATA.map(t => ({
  id: t.id,
  title: t.title,
  category: t.category,
  description: t.description,
  templateText: t.content || '',
  useCase: t.useCase
}));
