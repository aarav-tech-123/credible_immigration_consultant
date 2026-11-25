# Your Brand: Immigration Consultancy Website

A premium, responsive static website built with plain HTML5, CSS3 and vanilla JavaScript. No frameworks and no build step.

**To run it:** open `index.html` in a browser.
**To host it:** upload the whole folder to Netlify, GitHub Pages, cPanel or any static host.

The only external resources are Google Fonts (Playfair Display and Inter) and the Lucide icon library (pinned at 0.469.0, via unpkg). Photos are Unsplash placeholders.

## File structure

```
index.html              Home
about.html              About Us
services.html           Services (anchors #pr, #study, #visitor, #business)
country.html            One reusable country overview template (?c=canada)
program.html            One reusable program detail template (?c=canada&p=express-entry)
diy-file-review.html    DIY File Review
testimonials.html       Testimonials (filterable masonry)
news.html               Latest News (linked from Home and the footer, not the main menu)
contact.html            Contact Us
privacy.html            Privacy Policy (placeholder text)
css/style.css           All styling, driven by CSS variables
js/data.js              Site settings, services, countries, news, testimonials, FAQs
js/main.js              Header/footer injection, menus, rendering, animation, forms
assets/images/          Favicon (add your own images here if you prefer local photos)
```

Everything that changes often lives in **`js/data.js`**. The header, mega menus, footer links, home cards and form dropdowns are generated from it.

## First things to replace

Open `js/data.js` and edit the `site` object:

| Field | What it does |
| --- | --- |
| `brand`, `monogram`, `descriptor` | Logo wordmark and monogram. The preloader monogram is also written in each page's `<div class="preloader">`. |
| `phone`, `phoneHref`, `email`, `whatsapp` | Top bar, footer, contact page, WhatsApp button. |
| `licences.rcic`, `licences.mara` | Licence numbers shown in the footer, trust strip and About page. |
| `social` | LinkedIn, Facebook and Instagram links. |
| `stats` | The hero statistics card. **Use only figures you can substantiate.** Regulated advertising rules apply. |
| `showFeeFrom`, `feeFrom` | The optional "Starting from $___" line on the DIY page. Set `showFeeFrom: false` to hide it. |
| `address`, `hours`, `mapEmbed` | Contact page details and map. |

Also replace "Your Name" and the "RCIC Licence #R______" and "MARA Registration #_______" text in `about.html`, and the contact email in `privacy.html`.

## How navigation is generated

The header's **Countries** menu is a two-level dropdown: country → flyout of that country's programs. The mobile menu shows the same tree as nested accordions, with a "View … overview" link at the top of each country. The footer, home-page chips, services page and country pages all read the same data. **News** is not in the main menu; it appears as a section on the Home page and as a footer link.

Nothing is hard-coded: add a country or a program to `js/data.js` and every menu updates.

## How to add a country

Add one object to the `countries` object in `js/data.js`:

```js
newzealand: {
  name: "New Zealand",
  flag: "🇳🇿",
  tagline: "A short, inviting line.",
  heroImage: U("photo-id-from-unsplash", 1920),   // wide image for the country page banner
  cardImage: U("photo-id-from-unsplash", 900),    // tall image for the home/picker card
  overview: "One paragraph introducing the country.",
  authority: "Immigration New Zealand",           // named in the program-page disclaimer
  programs: [ /* see below */ ],
  study:   { desc: "Short description.", points: ["Point one", "Point two"] },
  visitor: { desc: "Short description.", points: ["Point one", "Point two"] },
  faqs: [{ q: "Question?", a: "Answer." }]
}
```

Use a unique, URL-safe key; it becomes `country.html?c=newzealand`. If you add a new study destination, also add it to `studyDestinations`.

## How to add a program under a country

Add an object to that country's `programs` array. It appears in the Countries flyout, mobile menu, footer, home chips, services page, country page, the contact and DIY form dropdowns, and gets its own page at `program.html?c=<country>&p=<id>`.

```js
{
  id: "skilled-migrant",              // unique across ALL countries; used in URLs and ?program=
  category: "pr",
  title: "Skilled Migrant Category",
  subtitle: "Optional second line",   // shown as "Title (Subtitle)" in menus
  short: "One-line description for menus and cards",
  heroImage: U("photo-id", 1920),
  overview: "A paragraph or two.",
  eligibility: ["Point one", "Point two"],
  steps: [{ t: "Step title", d: "One or two sentences." }],
  documents: ["Passport", "Language test results"],
  processingNote: "Times change; check the official site.",
  faqs: [{ q: "Question?", a: "Answer." }]
}
```

## How to add a news item

Add an object to the `news` array in `js/data.js`. Newest dates are shown first, and the filter tabs build themselves from the `category` values.

```js
{
  id: "unique-url-friendly-id",
  title: "Headline",
  date: "2026-12-01",            // YYYY-MM-DD
  category: "PR",                // PR, Study, Visitor, Guides, or your own
  country: "Canada",
  image: U("photo-id", 900),
  excerpt: "One or two sentences for the card.",
  body: ["Paragraph one.", "Paragraph two."]
}
```

## How to add a testimonial

Add an object to the `testimonials` array. `type` must be `PR`, `Study` or `Visitor` to work with the filter tabs on the Testimonials page.

```js
{ name: "Client Name", type: "PR", country: "Canada", rating: 5, photo: null,
  quote: "What they said." }
```

Set `photo` to an image URL to show a photo. With `null` the card shows gold-ringed initials. The included testimonials are **samples**; replace them with genuine, consented reviews before launch.

## How to add an FAQ

- **Country FAQs:** add `{ q, a }` to that country's `faqs` array.
- **Program FAQs:** add `{ q, a }` to that program's own `faqs` array.
- **DIY File Review FAQs:** add `{ q, a }` to the `diyFaqs` array.

## Change brand colours and fonts

The theme is a minimal white and charcoal palette with a teal and orange accent, set in `:root` at the top of `css/style.css`:

```css
--ink: #111827;   --ink-soft: #1F2937;   /* dark text, footer, hero overlay */
--gold: #14B8A6;  --gold-deep: #0F766E;  --gold-light: #99F6E4;   /* accent (variable names kept from the earlier theme) */
--ivory: #FFFFFF; --stone: #F4F5F7;      /* page and alternate section backgrounds */
--font-serif: "Inter", ...;              /* headings; --font-sans is body text */
```

The theme uses two colours: teal (`--gold`, `--gold-deep`: buttons, links, icons, focus rings) and warm orange (`--accent2`, `--accent2-deep`: labels, numerals, ticks, highlights). Change those four variables to re-colour every accent. `--gold-deep` is used for text on white, so keep it dark enough for contrast. A short "Minimal theme" block at the end of the stylesheet removes textures and effects; delete it to see the underlying structure. Fonts are loaded by the Google Fonts `<link>` in each page head.

## Connect the form endpoint

1. Create a free form at [Formspree](https://formspree.io) and copy its endpoint URL.
2. In `js/data.js`, set `formEndpoint` to that URL, for example `https://formspree.io/f/abcd1234`.

All forms (Contact, DIY File Review, Business "Notify Me") use it. While the placeholder `YOUR_FORM_ID` is present, the forms run in **demo mode**: they validate and show the success state but send nothing.

The file-upload area on the DIY page is interface-only; files are not transmitted. The page tells visitors to email large files. To receive uploads, use a service that supports file uploads and wire it into `initForms()` in `js/main.js`.

To use EmailJS instead, replace the `fetch` call inside `initForms()` in `js/main.js` with an `emailjs.sendForm(...)` call.

## Connect the booking link

In `js/data.js`, set `booking` to your Calendly (or similar) URL. Every "Book an Appointment" button, including the header, mobile menu, CTA bands and contact page, uses it.

## SEO and launch checklist

- Each page has its own `<title>`, meta description and Open Graph tags. Update them with your real brand name and domain.
- Replace Unsplash photos with images you have rights to use, ideally saved in `assets/images/` and compressed.
- Add your real licence numbers, regulator badges and genuine testimonials.
- Have `privacy.html` reviewed and adapted by a qualified professional.
- Immigration content here is general information. Verify all program details against official sources before publishing.

## Accessibility and performance notes

- Skip link, keyboard-operable menus (`aria-expanded` and `aria-controls`), visible focus rings and semantic landmarks are built in.
- `prefers-reduced-motion` disables non-essential animation.
- Images are lazy-loaded except the hero and banner images. If a photo fails to load, a navy gradient frame shows instead.
