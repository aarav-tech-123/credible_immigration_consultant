/* ==========================================================================
   main.js — shared behaviour for every page.
   Depends on data.js (site, services, countries, studyDestinations, news,
   testimonials, diyFaqs) and the Lucide icon library.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- helpers ---------- */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const page = document.body.dataset.page || "";
  const params = new URLSearchParams(window.location.search);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ic = (name, cls = "") => `<i data-lucide="${name}" class="${cls}" aria-hidden="true"></i>`;
  const icons = () => { if (window.lucide) window.lucide.createIcons(); };
  const fmtDate = (d) =>
    new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const initials = (n) => n.replace(/[^A-Za-z& ]/g, "").split(/\s+/).filter((w) => w !== "&" && w).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const bookingLink = (label = "Book an Appointment", cls = "btn btn--gold") =>
    `<a class="${cls}" href="${site.booking}" target="_blank" rel="noopener">${label}${ic("arrow-right")}</a>`;
  const telLink = (label = "Call Us", cls = "btn btn--ghost") =>
    `<a class="${cls}" href="tel:${site.phoneHref}">${ic("phone")}${label}</a>`;
  const countryEntries = () => Object.entries(countries);
  const programCount = (c) => c.programs.length;
  const prPrograms = (c) => c.programs.filter((p) => p.category === "pr");
  const programUrl = (k, p) => `program.html?c=${k}&p=${p.id}`;
  const chipLabel = (p) => (/^Subclass\s/.test(p.title) ? p.title.replace("Subclass ", "") : p.title.split(" (")[0]);

  /* ======================================================================
     1. GLOBAL COMPONENTS
     ====================================================================== */
  const navDef = [
    { label: "Home", href: "index.html", key: "home" },
    { label: "About Us", href: "about.html", key: "about" },
    { label: "Services", href: "services.html", key: "services", menu: "services" },
    { label: "Countries", href: "country.html", key: "country", menu: "countries" },
    { label: "DIY File Review", href: "diy-file-review.html", key: "diy" },
    { label: "Testimonials", href: "testimonials.html", key: "testimonials" },
    { label: "Contact Us", href: "contact.html", key: "contact" }
  ];

  const socialLinks = (cls = "") =>
    `<span class="social ${cls}">
      <a href="${site.social.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ic("linkedin")}</a>
      <a href="${site.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ic("facebook")}</a>
      <a href="${site.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ic("instagram")}</a>
    </span>`;

  const logo = () =>
    `<a class="logo" href="index.html" aria-label="${site.brand} — home">
      <span class="logo__mark" aria-hidden="true">${site.monogram}</span>
      <span class="logo__text"><span class="logo__name">${site.brand}</span><span class="logo__sub">${site.descriptor}</span></span>
    </a>`;

  function megaMarkup(kind) {
    if (kind === "services") {
      const items = services.map((s) =>
        `<a class="mega__item" href="${s.href}">
          <span class="mega__icon">${ic(s.icon)}</span>
          <span class="mega__text"><strong>${s.title}${s.soon ? ' <em class="badge">Coming Soon</em>' : ""}</strong><small>${s.menu}</small></span>
        </a>`).join("");
      return `<div class="mega__intro"><p class="eyebrow eyebrow--sm">Services</p><p class="mega__lead">Four pathways, one personal advisor.</p></div><div class="mega__grid">${items}</div>`;
    }
    /* Two-level tree: country row + flyout of programs */
    const rows = countryEntries().map(([k, c]) =>
      `<li class="tree__item">
        <div class="tree__row">
          <a class="tree__link" href="country.html?c=${k}">
            <span class="mega__icon mega__icon--flag" aria-hidden="true">${c.flag}</span>
            <span class="mega__text"><strong>${c.name}</strong><small>${programCount(c)} programs · overview</small></span>
          </a>
          <button class="tree__toggle" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="fly-${k}" aria-label="Show ${c.name} programs">${ic("chevron-right")}</button>
        </div>
        <div class="fly" id="fly-${k}">
          ${c.programs.map((p) => `<a class="fly__item" href="${programUrl(k, p)}">
            <span class="mega__icon" aria-hidden="true">${ic(p.category === "pr" ? "landmark" : "file-text")}</span>
            <span class="mega__text"><strong>${programTitle(p)}</strong><small>${p.short}</small></span>
          </a>`).join("")}
        </div>
      </li>`).join("");
    return `<ul class="tree">${rows}</ul>`;
  }

  function buildHeader() {
    const host = $("#site-header");
    if (!host) return;
    const items = navDef.map((n) => {
      const current = page === n.key ? ' aria-current="page"' : "";
      if (!n.menu) return `<li class="nav__item"><a class="nav__link" href="${n.href}"${current}>${n.label}</a></li>`;
      return `<li class="nav__item has-mega">
        <a class="nav__link" href="${n.href}"${current}>${n.label}</a>
        <button class="nav__toggle" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="mega-${n.menu}" aria-label="Show ${n.label} menu">${ic("chevron-down")}</button>
        <div class="mega mega--${n.menu}" id="mega-${n.menu}">${megaMarkup(n.menu)}</div>
      </li>`;
    }).join("");

    const mobileItems = navDef.map((n) => {
      const current = page === n.key ? ' aria-current="page"' : "";
      if (!n.menu) return `<li><a class="mobile__link" href="${n.href}"${current}>${n.label}</a></li>`;
      const pm = `<span class="pm" aria-hidden="true">${ic("plus", "pm__plus")}${ic("minus", "pm__minus")}</span>`;
      const subs = n.menu === "services"
        ? services.map((s) => `<a href="${s.href}">${s.title}${s.soon ? ' <em class="badge">Coming Soon</em>' : ""}</a>`).join("")
        : countryEntries().map(([k, c]) => `
          <div class="mobile__country">
            <button class="mobile__acc mobile__acc--sub" type="button" aria-expanded="false" aria-controls="m-${k}"><span>${c.flag} ${c.name}</span>${pm}</button>
            <div class="mobile__sub" id="m-${k}"><div>
              <a class="mobile__overview" href="country.html?c=${k}">View ${c.name} overview</a>
              ${c.programs.map((p) => `<a href="${programUrl(k, p)}">${programTitle(p)}</a>`).join("")}
            </div></div>
          </div>`).join("");
      return `<li>
        <button class="mobile__link mobile__acc" type="button" aria-expanded="false" aria-controls="m-${n.menu}">${n.label}${pm}</button>
        <div class="mobile__sub" id="m-${n.menu}"><div>${subs}</div></div>
      </li>`;
    }).join("");

    host.innerHTML = `
      <div class="site-top on-dark" id="siteTop">
        <div class="topbar">
          <div class="container topbar__in">
            <p class="topbar__note">${ic("info")}<span>We do not provide job or recruitment services</span></p>
            <div class="topbar__links">
              <a href="tel:${site.phoneHref}">${ic("phone")}<span>${site.phone}</span></a>
              <a href="mailto:${site.email}">${ic("mail")}<span>${site.email}</span></a>
              ${socialLinks("social--sm")}
            </div>
          </div>
        </div>
        <header class="nav" id="nav">
          <div class="container nav__in">
            ${logo()}
            <nav class="nav__menu" aria-label="Primary"><ul class="nav__list">${items}</ul></nav>
            ${bookingLink("Book an Appointment", "btn btn--gold btn--sm nav__cta")}
            <button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">${ic("menu")}</button>
          </div>
        </header>
      </div>
      <div class="mobile on-dark" id="mobileMenu" aria-hidden="true">
        <div class="mobile__top">
          ${logo()}
          <button class="burger burger--close" type="button" aria-label="Close menu">${ic("x")}</button>
        </div>
        <nav class="mobile__nav" aria-label="Mobile"><ul class="mobile__list">${mobileItems}</ul></nav>
        <div class="mobile__foot">
          ${bookingLink("Book an Appointment", "btn btn--gold btn--block")}
          <a class="mobile__contact" href="tel:${site.phoneHref}">${site.phone}</a>
          ${socialLinks()}
        </div>
      </div>`;
  }

  function buildFooter() {
    const host = $("#site-footer");
    if (!host) return;
    const countryLinks = countryEntries().map(([k, c]) =>
      `<li class="footer__country"><a href="country.html?c=${k}">${c.flag} ${c.name}</a>
        <ul class="footer__sub">${c.programs.map((p) => `<li><a href="${programUrl(k, p)}">${programTitle(p)}</a></li>`).join("")}</ul></li>`).join("");
    const quick = [...navDef, { label: "Latest News", href: "news.html" }, { label: "Privacy Policy", href: "privacy.html" }];
    const serviceLinks = services.map((s) => `<li><a href="${s.href}">${s.title}${s.soon ? " (Coming Soon)" : ""}</a></li>`).join("");
    host.innerHTML = `
      <footer class="footer grain on-dark">
        <span class="footer__word" aria-hidden="true">${site.brand}</span>
        <div class="container">
          <div class="footer__grid">
            <div class="footer__col footer__brand">
              ${logo()}
              <p>A personal, one-to-one immigration consultancy. I review every file myself, so your application receives the attention it deserves.</p>
              <a class="text-link" href="about.html">Read More ${ic("arrow-right")}</a>
            </div>
            <div class="footer__col">
              <h2 class="footer__title">Quick Links</h2>
              <ul class="footer__links">
                ${quick.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}
              </ul>
            </div>
            <div class="footer__col">
              <h2 class="footer__title">Services</h2>
              <ul class="footer__links">${serviceLinks}</ul>
              <h2 class="footer__title footer__title--gap">Countries</h2>
              <ul class="footer__links">${countryLinks}</ul>
            </div>
            <div class="footer__col">
              <h2 class="footer__title">Contact</h2>
              <ul class="footer__contact">
                <li>${ic("phone")}<a href="tel:${site.phoneHref}">${site.phone}</a></li>
                <li>${ic("mail")}<a href="mailto:${site.email}">${site.email}</a></li>
                <li>${ic("map-pin")}<span>${site.address}</span></li>
              </ul>
              ${socialLinks()}
            </div>
          </div>
          <div class="footer__bottom">
            <p class="footer__legal">&copy; <span id="year">${new Date().getFullYear()}</span> ${site.brand}. All rights reserved. &nbsp;·&nbsp; ${site.licences.rcic} &nbsp;·&nbsp; ${site.licences.mara} &nbsp;·&nbsp; <a href="privacy.html">Privacy Policy</a></p>
            <p class="footer__disclaimer">Information on this website is general in nature and is not legal advice. Immigration rules change frequently; always verify with official government sources.</p>
          </div>
        </div>
      </footer>
      <a class="wa-float" href="https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${ic("message-circle")}</a>
      <button class="to-top" type="button" aria-label="Back to top">
        <svg class="to-top__ring" viewBox="0 0 52 52" aria-hidden="true"><circle class="to-top__track" cx="26" cy="26" r="24"/><circle class="to-top__bar" cx="26" cy="26" r="24"/></svg>
        ${ic("arrow-up")}
      </button>`;
  }

  /* Reusable fragments placed with <div data-component="..."> */
  const components = {
    trust: () => `
      <section class="trust" aria-label="Regulation and licensing">
        <div class="container trust__in">
          <div class="trust__lead">
            <p class="eyebrow">Regulated &amp; Licensed</p>
            <h2 class="trust__title">Trusted standards, verified credentials</h2>
          </div>
          <div class="trust__badges">
            <a class="trust__badge" href="${site.regulators.cicc}" target="_blank" rel="noopener">
              <span class="trust__seal">${ic("shield-check")}</span>
              <span><strong>College of Immigration and Citizenship Consultants</strong><small>RCIC badge placeholder · ${site.licences.rcic}</small></span>
            </a>
            <a class="trust__badge" href="${site.regulators.mara}" target="_blank" rel="noopener">
              <span class="trust__seal">${ic("badge-check")}</span>
              <span><strong>Migration Agents Registration Authority</strong><small>MARA badge placeholder · ${site.licences.mara}</small></span>
            </a>
          </div>
        </div>
      </section>`,
    cta: (el) => {
      const title = el.dataset.title || "Ready to begin your journey?";
      const text = el.dataset.text || "Speak with me directly. A short, honest conversation is the best first step.";
      return `
      <section class="cta-band grain topo on-dark">
        <div class="container cta-band__in reveal">
          <div>
            <p class="eyebrow">Let's talk</p>
            <h2>${title}</h2>
            <p>${text}</p>
          </div>
          <div class="cta-band__actions">${telLink("Call Us")}${bookingLink("Book an Appointment")}</div>
        </div>
      </section>`;
    }
  };

  /* ======================================================================
     2. DATA-DRIVEN RENDERERS
     ====================================================================== */
  const serviceCard = (s) => `
    <article class="card card--service ${s.soon ? "is-soon" : ""}">
      <span class="card__icon">${ic(s.icon)}</span>
      ${s.soon ? '<span class="badge badge--float">Coming Soon</span>' : ""}
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <a class="card__link" href="${s.href}" aria-label="Learn more about ${s.title}">Learn More ${ic("arrow-right")}</a>
    </article>`;

  const countryCard = ([k, c]) => `
    <article class="country-card">
      <div class="country-card__media"><img src="${c.cardImage}" alt="${c.name} skyline" loading="lazy" decoding="async"></div>
      <a class="country-card__cover" href="country.html?c=${k}" aria-label="${c.name}: ${programCount(c)} programs. View overview"></a>
      <div class="country-card__body">
        <span class="country-card__flag" aria-hidden="true">${c.flag}</span>
        <h3 class="country-card__name">${c.name}</h3>
        <ul class="chips" aria-label="${c.name} programs">${c.programs.map((p) => `<li><a class="chip" href="${programUrl(k, p)}">${chipLabel(p)}</a></li>`).join("")}</ul>
        <div class="country-card__meta">${programCount(c)} programs
          <span class="country-card__arrow" aria-hidden="true">${ic("arrow-right")}</span>
        </div>
      </div>
    </article>`;

  const stars = (n) => `<span class="stars" role="img" aria-label="${n} out of 5 stars">${[1, 2, 3, 4, 5].map((i) => ic("star", "star" + (i > n ? " star--off" : ""))).join("")}</span>`;
  const avatar = (t) => t.photo
    ? `<span class="avatar"><img src="${t.photo}" alt="${t.name}" loading="lazy"></span>`
    : `<span class="avatar" aria-hidden="true">${initials(t.name)}</span>`;

  const newsSorted = () => [...news].sort((a, b) => b.date.localeCompare(a.date));
  const newsCard = (n, featured = false) => `
    <article class="card news-card ${featured ? "news-card--featured" : ""}" data-category="${n.category}">
      <div class="news-card__media"><img src="${n.image}" alt="" loading="lazy" decoding="async"></div>
      <div class="news-card__body">
        <p class="news-card__meta"><span class="tag">${n.category}</span><span>${n.country}</span><time datetime="${n.date}">${fmtDate(n.date)}</time></p>
        <h3>${n.title}</h3>
        <p>${n.excerpt}</p>
        <button class="card__link" type="button" data-news="${n.id}" aria-label="Read more: ${n.title}">Read More ${ic("arrow-right")}</button>
      </div>
    </article>`;

  const programCard = (k, p) => `
    <article class="card program">
      <p class="program__flag"><span aria-hidden="true">${countries[k].flag}</span> ${countries[k].name}</p>
      <h4>${p.title}${p.subtitle ? `<small class="program__sub">${p.subtitle}</small>` : ""}</h4>
      <p>${p.short}.</p>
      <ul class="check-list">${p.eligibility.slice(0, 3).map((e) => `<li>${ic("check")}<span>${e}</span></li>`).join("")}</ul>
      <div class="program__actions">
        <a class="btn btn--dark btn--sm" href="${programUrl(k, p)}">View Program ${ic("arrow-right")}</a>
        <a class="card__link" href="contact.html?program=${p.id}">Enquire Now</a>
      </div>
    </article>`;

  const faqMarkup = (list, id) => `
    <div class="acc" data-acc>${list.map((f, i) => `
      <div class="acc__item">
        <h3><button class="acc__btn" type="button" aria-expanded="false" aria-controls="${id}-p${i}" id="${id}-b${i}">${f.q}<span class="acc__icon">${ic("plus")}</span></button></h3>
        <div class="acc__panel" id="${id}-p${i}" role="region" aria-labelledby="${id}-b${i}"><div><p>${f.a}</p></div></div>
      </div>`).join("")}
    </div>`;

  const splitList = (title, desc, points, cta) => `
    <div class="split reveal">
      <div>
        <h3 class="h3-serif">${title}</h3>
        <p>${desc}</p>
        ${cta || ""}
      </div>
      <ul class="check-list check-list--card">${points.map((e) => `<li>${ic("check")}<span>${e}</span></li>`).join("")}</ul>
    </div>`;

  /* Programs for form selects */
  function programGroups() {
    const pr = [];
    countryEntries().forEach(([, c]) => prPrograms(c).forEach((p) => pr.push({ id: p.id, label: `${c.name} – ${programTitle(p)}` })));
    return [
      ["Permanent Residency", pr],
      ["Study Visa", studyDestinations.map((d) => ({ id: "study-" + d.id, label: `Study – ${d.name}` }))],
      ["Visitor Visa", countryEntries().map(([k, c]) => ({ id: "visitor-" + k, label: `Visitor Visa – ${c.name}` }))],
      ["Other", [
        { id: "business", label: "Business Visa (coming soon)" },
        { id: "diy-review", label: "DIY File Review" },
        { id: "general", label: "General consultation" }
      ]]
    ];
  }

  /* ---- Form field builders ---- */
  const req = (r) => (r ? ' <span class="req" aria-hidden="true">*</span>' : "");
  const fText = (id, name, label, { type = "text", r = true, ac = "" } = {}) =>
    `<div class="field"><input class="field__input" id="${id}" name="${name}" type="${type}" placeholder=" " ${r ? "required" : ""} ${ac ? `autocomplete="${ac}"` : ""}><label class="field__label" for="${id}">${label}${req(r)}</label></div>`;
  const fArea = (id, name, label, r = false) =>
    `<div class="field field--area"><textarea class="field__input" id="${id}" name="${name}" rows="5" placeholder=" " ${r ? "required" : ""}></textarea><label class="field__label" for="${id}">${label}${req(r)}</label></div>`;
  const fSelect = (id, name, label, opts, r = true) =>
    `<div class="field field--select"><select class="field__input" id="${id}" name="${name}" ${r ? "required" : ""}>${opts}</select><label class="field__label" for="${id}">${label}${req(r)}</label><span class="field__caret">${ic("chevron-down")}</span></div>`;
  const fPhone = (id) => {
    const codes = ["+1", "+61", "+44", "+64", "+91", "+92", "+234", "+971", "+63", "+27"];
    return `<div class="field field--phone"><select class="field__dial" name="dial_code" aria-label="Country calling code">${codes.map((c) => `<option>${c}</option>`).join("")}</select><input class="field__input" id="${id}" name="phone" type="tel" placeholder=" " required autocomplete="tel-national"><label class="field__label" for="${id}">Phone number${req(true)}</label></div>`;
  };
  const fCheck = (id, name, html) =>
    `<div class="field field--check"><label class="check"><input type="checkbox" id="${id}" name="${name}" required><span class="check__box">${ic("check")}</span><span class="check__text">${html}</span></label></div>`;
  const fRadios = (name, legend, options) =>
    `<fieldset class="radios"><legend>${legend}</legend><div class="radios__row">${options.map((o, i) => `<label class="radio"><input type="radio" name="${name}" value="${o}" ${i === 0 ? "checked" : ""}><span>${o}</span></label>`).join("")}</div></fieldset>`;
  const selectOptions = (placeholder, items) => `<option value="" selected>${placeholder}</option>${items}`;

  const consentText = 'I consent to my details being used to respond to this enquiry, as described in the <a href="privacy.html">Privacy Policy</a>.';

  const renderers = {
    "hero-stats": (el) => {
      el.innerHTML = site.stats.map((s) =>
        `<div class="stat"><span class="stat__num"><span data-count="${s.value}" data-suffix="${s.suffix}">0</span></span><span class="stat__label">${s.label}</span></div>`).join("");
    },
    "services-cards": (el) => { el.innerHTML = services.map(serviceCard).join(""); },
    "country-cards": (el) => { el.innerHTML = countryEntries().map(countryCard).join(""); },
    "home-news": (el) => { el.innerHTML = newsSorted().slice(0, 3).map((n) => newsCard(n)).join(""); },
    "home-testimonials": (el) => {
      const list = testimonials.filter((t) => t.rating >= 5).slice(0, 5);
      el.innerHTML = `
        <div class="carousel" data-carousel aria-roledescription="carousel" aria-label="Client testimonials">
          <div class="carousel__track">${list.map((t, i) => `
            <figure class="slide ${i === 0 ? "is-active" : ""}" aria-roledescription="slide" aria-label="${i + 1} of ${list.length}">
              <span class="quote-glyph" aria-hidden="true">&ldquo;</span>
              <blockquote>${t.quote}</blockquote>
              <figcaption>${avatar(t)}<span><strong>${t.name}</strong><small>${t.type} · ${t.country}</small></span>${stars(t.rating)}</figcaption>
            </figure>`).join("")}
          </div>
          <div class="carousel__ctrl">
            <button class="round-btn" type="button" data-prev aria-label="Previous testimonial">${ic("arrow-left")}</button>
            <div class="carousel__dots">${list.map((_, i) => `<button type="button" class="dot ${i === 0 ? "is-active" : ""}" aria-label="Show testimonial ${i + 1}"></button>`).join("")}</div>
            <button class="round-btn" type="button" data-next aria-label="Next testimonial">${ic("arrow-right")}</button>
          </div>
        </div>`;
    },
    "testimonial-grid": (el) => {
      el.innerHTML = testimonials.map((t) => `
        <article class="card testi-card" data-type="${t.type}">
          ${stars(t.rating)}
          <blockquote>${t.quote}</blockquote>
          <footer>${avatar(t)}<span><strong>${t.name}</strong><small>${t.type} Visa · ${t.country}</small></span></footer>
        </article>`).join("");
    },
    "news-list": (el) => {
      const list = newsSorted();
      const cats = ["All", ...Array.from(new Set(list.map((n) => n.category)))];
      el.innerHTML = `
        <div class="tabs" role="group" aria-label="Filter articles">${cats.map((c, i) => `<button type="button" class="tab ${i === 0 ? "is-active" : ""}" data-filter="${c}" aria-pressed="${i === 0}">${c}</button>`).join("")}</div>
        <div class="news-featured" data-news-featured></div>
        <div class="grid grid--3 news-grid" data-news-grid></div>
        <p class="empty" data-news-empty hidden>No articles in this category yet.</p>`;
    },
    "services-pr": (el) => {
      el.innerHTML = countryEntries().map(([k, c]) => `
        <div class="program-group reveal">
          <h3 class="group-title"><span aria-hidden="true">${c.flag}</span>${c.name}</h3>
          <div class="grid grid--${prPrograms(c).length === 2 ? "2" : "3"}" data-stagger>${prPrograms(c).map((p) => programCard(k, p)).join("")}</div>
          <p class="group-link"><a class="text-link text-link--dark" href="country.html?c=${k}">Explore ${c.name} in detail ${ic("arrow-right")}</a></p>
        </div>`).join("");
    },
    "services-study": (el) => {
      el.innerHTML = `<div class="flag-tiles" data-stagger>${studyDestinations.map((d) => `
        <article class="flag-tile">
          <span class="flag-tile__flag" aria-hidden="true">${d.flag}</span>
          <h3>${d.name}</h3>
          <p>${d.note}</p>
          <a class="card__link" href="contact.html?program=study-${d.id}" aria-label="Enquire about studying in ${d.name}">Enquire ${ic("arrow-right")}</a>
        </article>`).join("")}</div>`;
    },
    "services-visitor": (el) => {
      el.innerHTML = `<div class="grid grid--2" data-stagger>${countryEntries().map(([k, c]) => `
        <article class="card program">
          <h4><span aria-hidden="true">${c.flag}</span> Visitor Visa – ${c.name}</h4>
          <p>${c.visitor.desc}</p>
          <ul class="check-list">${c.visitor.points.slice(0, 4).map((e) => `<li>${ic("check")}<span>${e}</span></li>`).join("")}</ul>
          <a class="btn btn--dark btn--sm" href="contact.html?program=visitor-${k}">Enquire Now ${ic("arrow-right")}</a>
        </article>`).join("")}</div>`;
    },
    "service-page": (el) => {
      const s = services.find((x) => x.id === el.dataset.service);
      if (!s) return;
      const sub = (name) => { const t = document.createElement("div"); renderers[name](t); return t.innerHTML; };
      const headings = {
        pr: ["Programs", "Permanent residency programs by country"],
        study: ["Destinations", "Where would you like to study?"],
        visitor: ["Visitor visas", "Visiting Canada or Australia"],
        business: ["Coming soon", "Register your interest"]
      }[s.id];
      const main = s.id === "pr" ? sub("services-pr")
        : s.id === "study" ? sub("services-study")
        : s.id === "visitor" ? sub("services-visitor")
        : '<div class="soon"><span class="badge badge--solid">Coming Soon</span><h3>Business Visa</h3><p>Leave your email and I will let you know the moment this service opens.</p><div class="soon__form">' + sub("notify-form") + "</div></div>";
      const others = services.filter((x) => x.id !== s.id);
      el.innerHTML = `
        <section class="section">
          <div class="container split split--wide">
            <div class="reveal">
              <p class="eyebrow">Overview</p>
              <h2>${s.title}</h2>
              <p class="lead">${s.lead}</p>
              <h3 class="h3-serif">What's included</h3>
              <ul class="check-list">${s.includes.map((i) => `<li>${ic("check")}<span>${i}</span></li>`).join("")}</ul>
              <a class="btn btn--gold" href="contact.html?program=${s.id === "business" ? "business" : "general"}">${s.soon ? "Ask a Question" : "Book a Consultation"} ${ic("arrow-right")}</a>
            </div>
            <div class="reveal"><div class="frame frame--wide frame--gold"><img src="${U(s.image, 1100)}" alt="${s.title}" loading="lazy" decoding="async" data-parallax="0.05"></div></div>
          </div>
        </section>
        <section class="section section--stone topo">
          <div class="container">
            <div class="section__head reveal"><p class="eyebrow">${headings[0]}</p><h2>${headings[1]}</h2></div>
            ${main}
          </div>
        </section>
        <section class="section">
          <div class="container container--narrow">
            <div class="section__head section__head--center reveal"><p class="eyebrow eyebrow--center">How it works</p><h2>A calm, clear process</h2></div>
            <ol class="steps" data-stagger>${s.steps.map((st, i) => `<li class="steps__item"><span class="steps__num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><div><h3>${st.t}</h3><p>${st.d}</p></div></li>`).join("")}</ol>
          </div>
        </section>
        <section class="section section--stone">
          <div class="container container--narrow">
            <div class="section__head section__head--center reveal"><p class="eyebrow eyebrow--center">FAQ</p><h2>Common questions</h2></div>
            <div class="reveal">${faqMarkup(s.faqs, "sf")}</div>
          </div>
        </section>
        <section class="section">
          <div class="container">
            <div class="section__head reveal"><p class="eyebrow">More services</p><h2>Explore other services</h2></div>
            <div class="grid grid--3" data-stagger>${others.map(serviceCard).join("")}</div>
          </div>
        </section>`;
    },
    "diy-faq": (el) => { el.innerHTML = faqMarkup(diyFaqs, "diy"); },
    "contact-form": (el) => {
      const groups = programGroups().map(([label, list]) => `<optgroup label="${label}">${list.map((o) => `<option value="${o.id}">${o.label}</option>`).join("")}</optgroup>`).join("");
      const ctry = countryEntries().map(([k, c]) => `<option value="${k}">${c.name}</option>`).join("") + '<option value="other">Other / not sure yet</option>';
      el.innerHTML = `
        <form class="form" data-form data-success-title="Thank you. Your message is on its way." data-success-text="I read every enquiry personally and will reply within one working day." novalidate>
          <div class="form__body">
            <input type="hidden" name="_subject" value="New website enquiry">
            <div class="form__row">${fText("c-name", "full_name", "Full name", { ac: "name" })}${fText("c-email", "email", "Email address", { type: "email", ac: "email" })}</div>
            <div class="form__row">${fPhone("c-phone")}${fSelect("c-program", "service", "Service of interest", selectOptions("Select a service", groups))}</div>
            ${fSelect("c-country", "country", "Destination country", selectOptions("Select a country", ctry))}
            ${fArea("c-msg", "message", "How can I help?")}
            ${fCheck("c-consent", "consent", consentText)}
            <p class="form__status" role="alert" aria-live="assertive"></p>
            <button class="btn btn--gold btn--block" type="submit"><span class="btn__label">Send Enquiry</span>${ic("arrow-right")}</button>
          </div>
        </form>`;
      const pre = params.get("program");
      const sel = $("#c-program", el);
      if (pre && sel && $(`option[value="${pre}"]`, sel)) sel.value = pre;
      const key = pre && pre.startsWith("visitor-") ? pre.slice(8) : pre && pre.startsWith("study-") ? pre.slice(6) : null;
      const owner = countryEntries().find(([, c]) => c.programs.some((p) => p.id === pre));
      const csel = $("#c-country", el);
      const guess = key && countries[key] ? key : owner ? owner[0] : "";
      if (guess && csel) csel.value = guess;
    },
    "home-contact-form": (el) => {
      const groups = programGroups().map(([label, list]) => `<optgroup label="${label}">${list.map((o) => `<option value="${o.id}">${o.label}</option>`).join("")}</optgroup>`).join("");
      const ctry = countryEntries().map(([k, c]) => `<option value="${k}">${c.name}</option>`).join("") + '<option value="other">Other / not sure yet</option>';
      el.innerHTML = `
        <form class="form" data-form data-success-title="Thank you. Your message is on its way." data-success-text="I read every enquiry personally and will reply within one working day." novalidate>
          <div class="form__body">
            <input type="hidden" name="_subject" value="New website enquiry (home page)">
            <div class="form__row">${fText("h-name", "full_name", "Full name", { ac: "name" })}${fText("h-email", "email", "Email address", { type: "email", ac: "email" })}</div>
            <div class="form__row">${fPhone("h-phone")}${fSelect("h-program", "service", "Service of interest", selectOptions("Select a service", groups))}</div>
            ${fSelect("h-country", "country", "Destination country", selectOptions("Select a country", ctry))}
            ${fArea("h-msg", "message", "Tell me briefly about your plans (optional)")}
            ${fCheck("h-consent", "consent", consentText)}
            <p class="form__status" role="alert" aria-live="assertive"></p>
            <button class="btn btn--gold btn--block" type="submit"><span class="btn__label">Send Enquiry</span>${ic("arrow-right")}</button>
            <p class="form__hint">${ic("clock")} Takes about a minute. Fields marked * are required.</p>
          </div>
        </form>`;
      const ta = $("textarea", el);
      if (ta) ta.rows = 3;
    },
    "diy-form": (el) => {
      const ctry = countryEntries().map(([k, c]) => `<option value="${k}">${c.name}</option>`).join("");
      el.innerHTML = `
        <form class="form" data-form data-success-title="Request received. Thank you." data-success-text="I will reply within one working day with next steps and a written fee confirmation." novalidate>
          <div class="form__body">
            <input type="hidden" name="_subject" value="New DIY File Review request">
            <div class="form__row">${fText("d-name", "full_name", "Full name", { ac: "name" })}${fText("d-email", "email", "Email address", { type: "email", ac: "email" })}</div>
            <div class="form__row">${fPhone("d-phone")}${fSelect("d-country", "destination_country", "Destination country", selectOptions("Select a country", ctry))}</div>
            <div class="form__row">${fSelect("d-program", "program_type", "Program type", '<option value="" selected>Select a country first</option>')}
              ${fSelect("d-stage", "application_stage", "Application stage", selectOptions("Select your stage", ["Not started", "Drafting", "Ready to submit", "Previously refused"].map((s) => `<option>${s}</option>`).join("")))}</div>
            ${fRadios("contact_method", "Preferred contact method", ["Email", "Phone", "WhatsApp"])}
            ${fArea("d-msg", "message", "Tell me about your application")}
            <div class="dropzone" data-dropzone>
              <input class="dropzone__input" id="d-files" type="file" multiple aria-describedby="d-files-note">
              <label class="dropzone__label" for="d-files">
                <span class="dropzone__icon">${ic("upload-cloud")}</span>
                <strong>Drag &amp; drop your documents here</strong>
                <span>or <u>browse files</u></span>
              </label>
              <ul class="dropzone__list" aria-live="polite"></ul>
              <p class="dropzone__note" id="d-files-note">This area lists your files for reference only. Large files can be emailed to <a href="mailto:${site.email}">${site.email}</a> after you submit this form.</p>
            </div>
            ${fCheck("d-consent", "consent", consentText)}
            <p class="form__status" role="alert" aria-live="assertive"></p>
            <button class="btn btn--gold btn--block" type="submit"><span class="btn__label">Request My File Review</span>${ic("arrow-right")}</button>
          </div>
        </form>`;
      const cs = $("#d-country", el);
      const ps = $("#d-program", el);
      const fill = () => {
        const c = countries[cs.value];
        if (!c) { ps.innerHTML = '<option value="" selected>Select a country first</option>'; return; }
        const opts = [...prPrograms(c).map((p) => programTitle(p)), "Study Visa", "Visitor Visa", "Not sure yet: please advise"];
        ps.innerHTML = '<option value="" selected>Select a program</option>' + opts.map((o) => `<option>${o}</option>`).join("");
      };
      cs.addEventListener("change", fill);
      const pc = params.get("country");
      if (pc && countries[pc]) { cs.value = pc; fill(); }
    },
    "contact-info": (el) => {
      el.innerHTML = `
        <h2>Contact details</h2>
        <ul class="info-list">
          <li>${ic("phone")}<span><small>Phone</small><a href="tel:${site.phoneHref}">${site.phone}</a></span></li>
          <li>${ic("mail")}<span><small>Email</small><a href="mailto:${site.email}">${site.email}</a></span></li>
          <li>${ic("message-circle")}<span><small>WhatsApp</small><a href="https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}" target="_blank" rel="noopener">Click to chat</a></span></li>
          <li>${ic("map-pin")}<span><small>Office</small>${site.address}</span></li>
        </ul>
        <h3>Office hours</h3>
        <dl class="hours">${site.hours.map(([d, t]) => `<div><dt>${d}</dt><dd>${t}</dd></div>`).join("")}</dl>
        <h3>Follow</h3>
        ${socialLinks()}`;
    },
    "map": (el) => { el.src = site.mapEmbed; },
    "notify-form": (el) => {
      el.innerHTML = `
        <form class="form form--inline" data-form data-success-title="You are on the list." data-success-text="I will email you as soon as Business Visa services open." novalidate>
          <div class="form__body">
            <input type="hidden" name="_subject" value="Business Visa notification request">
            ${fText("n-email", "email", "Your email address", { type: "email", ac: "email" })}
            <button class="btn btn--gold" type="submit"><span class="btn__label">Notify Me</span>${ic("bell")}</button>
            <p class="form__status" role="alert" aria-live="assertive"></p>
          </div>
        </form>`;
    }
  };

  /* Country template */
  function renderCountryPage(root) {
    const key = (params.get("c") || "").toLowerCase();
    const c = countries[key];
    if (!c) {
      document.title = `Choose a Country | ${site.brand}`;
      root.innerHTML = `
        <section class="banner on-dark grain">
          <div class="banner__media"><img src="${U("photo-1488646953014-85cb44e25828", 1920)}" alt="" fetchpriority="high"></div>
          <div class="container banner__in">
            <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="index.html">Home</a></li><li aria-current="page">Countries</li></ol></nav>
            <h1>Choose Your Destination</h1>
            <p>Select a country to see the programs I advise on, the eligibility essentials and answers to common questions.</p>
          </div>
        </section>
        <section class="section"><div class="container"><div class="grid grid--2 grid--cards" data-stagger>${countryEntries().map(countryCard).join("")}</div></div></section>`;
      return;
    }
    const desc = `${c.name} immigration services: ${prPrograms(c).map(chipLabel).join(", ")}, study and visitor visas, with personal one-to-one guidance.`;
    document.title = `${c.name} Immigration Services | ${site.brand}`;
    const md = $('meta[name="description"]'); if (md) md.setAttribute("content", desc);
    const ogt = $('meta[property="og:title"]'); if (ogt) ogt.setAttribute("content", document.title);
    const ogd = $('meta[property="og:description"]'); if (ogd) ogd.setAttribute("content", desc);
    const ogi = $('meta[property="og:image"]'); if (ogi) ogi.setAttribute("content", c.heroImage);

    root.innerHTML = `
      <section class="banner banner--tall on-dark grain">
        <div class="banner__media"><img src="${c.heroImage}" alt="${c.name} landscape" fetchpriority="high"></div>
        <div class="container banner__in">
          <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="index.html">Home</a></li><li><a href="country.html">Countries</a></li><li aria-current="page">${c.name}</li></ol></nav>
          <p class="flag-big" aria-hidden="true">${c.flag}</p>
          <h1>${c.name}</h1>
          <p>${c.tagline}</p>
          <div class="banner__actions">${bookingLink("Book an Appointment")}<a class="btn btn--ghost" href="#pr">Explore Programs</a></div>
        </div>
      </section>
      <div class="subnav" aria-label="On this page"><div class="container subnav__in">
        <a href="#pr">Permanent Residency</a><a href="#study">Study</a><a href="#visitor">Visitor</a><a href="#faq">FAQ</a>
      </div></div>
      <section class="section" id="pr">
        <div class="container">
          <div class="section__head reveal"><p class="eyebrow">Permanent Residency</p><h2>PR programs for ${c.name}</h2><p>${c.overview}</p></div>
          <div class="grid grid--${prPrograms(c).length === 2 ? "2" : "3"}" data-stagger>${prPrograms(c).map((p) => programCard(key, p)).join("")}</div>
        </div>
      </section>
      <section class="section section--stone" id="study">
        <div class="container">
          <div class="section__head reveal"><p class="eyebrow">Study</p><h2>Study in ${c.name}</h2></div>
          ${splitList("Your student pathway", c.study.desc, c.study.points, `<a class="btn btn--dark btn--sm" href="contact.html?program=study-${key}">Enquire About Study ${ic("arrow-right")}</a>`)}
        </div>
      </section>
      <section class="section" id="visitor">
        <div class="container">
          <div class="section__head reveal"><p class="eyebrow">Visitor</p><h2>Visit ${c.name}</h2></div>
          ${splitList("A clear, credible visitor application", c.visitor.desc, c.visitor.points, `<a class="btn btn--dark btn--sm" href="contact.html?program=visitor-${key}">Enquire About a Visit ${ic("arrow-right")}</a>`)}
        </div>
      </section>
      <section class="section section--stone" id="faq">
        <div class="container container--narrow">
          <div class="section__head section__head--center reveal"><p class="eyebrow eyebrow--center">FAQ</p><h2>${c.name}: common questions</h2></div>
          <div class="reveal">${faqMarkup(c.faqs, "cf")}</div>
        </div>
      </section>`;
  }

  /* Program detail template: program.html?c=canada&p=express-entry */
  function renderProgramPage(root) {
    const ck = (params.get("c") || "").toLowerCase();
    const c = countries[ck];
    if (!c) { window.location.replace("country.html"); return; }
    const p = c.programs.find((x) => x.id === params.get("p"));
    if (!p) { window.location.replace("country.html?c=" + ck); return; }

    const label = { pr: "PR", study: "Study", visitor: "Visitor" }[p.category] || "";
    const title = `${programTitle(p)} – ${c.name}${label ? " " + label : ""} | ${site.brand}`;
    const desc = `${p.short}. ${p.overview.split(". ")[0]}.`;
    document.title = title;
    [['meta[name="description"]', desc], ['meta[property="og:title"]', title], ['meta[property="og:description"]', desc], ['meta[property="og:image"]', p.heroImage]]
      .forEach(([sel, v]) => { const m = $(sel); if (m) m.setAttribute("content", v); });

    const others = c.programs.filter((x) => x.id !== p.id);
    root.innerHTML = `
      <section class="banner banner--tall on-dark grain">
        <div class="banner__media" data-parallax="0.2" data-parallax-mode="scroll"><img src="${p.heroImage}" alt="${c.name}: ${p.title}" fetchpriority="high"></div>
        <div class="container banner__in">
          <nav class="crumbs" aria-label="Breadcrumb"><ol>
            <li><a href="index.html">Home</a></li><li><a href="country.html">Countries</a></li>
            <li><a href="country.html?c=${ck}">${c.name}</a></li><li aria-current="page">${p.title}</li></ol></nav>
          <p class="flag-big" aria-hidden="true">${c.flag}</p>
          <h1>${p.title}</h1>
          ${p.subtitle ? `<p class="banner__subtitle">${p.subtitle}</p>` : ""}
          <p>${p.short}</p>
        </div>
      </section>
      <nav class="subnav" aria-label="On this page"><div class="container subnav__in">
        <a href="#overview">Overview</a><a href="#eligibility">Eligibility</a><a href="#process">Process</a><a href="#documents">Documents</a><a href="#faq">FAQ</a>
      </div></nav>
      <section class="section">
        <div class="container program-layout">
          <div class="program-main">
            <div class="block reveal" id="overview">
              <p class="eyebrow">Overview</p><h2>About ${p.title}</h2><p>${p.overview}</p>
            </div>
            <div class="block reveal" id="eligibility">
              <p class="eyebrow">Eligibility</p><h2>Who it's for</h2>
              <ul class="icon-list">${p.eligibility.map((e) => `<li><span class="icon-list__icon">${ic("check")}</span><span>${e}</span></li>`).join("")}</ul>
            </div>
            <div class="block" id="process">
              <div class="reveal"><p class="eyebrow">Process</p><h2>Step by step</h2></div>
              <ol class="steps" data-stagger>${p.steps.map((s, i) => `
                <li class="steps__item"><span class="steps__num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><div><h3>${s.t}</h3><p>${s.d}</p></div></li>`).join("")}</ol>
            </div>
            <div class="block reveal" id="documents">
              <p class="eyebrow">Documents</p><h2>Key documents</h2>
              <ul class="check-list check-list--cols">${p.documents.map((d) => `<li>${ic("file-check")}<span>${d}</span></li>`).join("")}</ul>
            </div>
            <div class="notice reveal">
              ${ic("info")}
              <p><strong>Processing &amp; rules.</strong> ${p.processingNote} Immigration rules change frequently; please verify everything on the official ${c.authority} website before you act.</p>
            </div>
            <div class="block reveal" id="faq">
              <p class="eyebrow">FAQ</p><h2>Common questions</h2>
              ${faqMarkup(p.faqs, "pf")}
            </div>
          </div>
          <aside class="program-aside" aria-label="Next steps">
            <div class="aside-card aside-card--ink on-dark grain">
              <h2>Enquire about this program</h2>
              <p>Tell me about your situation and I will give you an honest view of where you stand.</p>
              <a class="btn btn--gold btn--block" href="contact.html?program=${p.id}">Enquire Now ${ic("arrow-right")}</a>
              <a class="aside-card__phone" href="tel:${site.phoneHref}">${ic("phone")}${site.phone}</a>
            </div>
            <div class="aside-card">
              <h2>Want to apply yourself?</h2>
              <p>Prepare your own application and have it reviewed by a licensed professional before you submit.</p>
              <a class="btn btn--ghost-dark btn--block" href="diy-file-review.html?country=${ck}">Get a DIY File Review</a>
            </div>
          </aside>
        </div>
      </section>
      <section class="section section--stone topo">
        <div class="container">
          <div class="section__head reveal"><p class="eyebrow">${c.name}</p><h2>${others.length ? `Other programs in ${c.name}` : `More about ${c.name}`}</h2></div>
          <div class="grid grid--${others.length === 1 ? "2" : "3"}" data-stagger>${others.map((o) => programCard(ck, o)).join("")}</div>
          <p class="group-link"><a class="text-link text-link--dark" href="country.html?c=${ck}">View the ${c.name} overview ${ic("arrow-right")}</a></p>
        </div>
      </section>`;
  }

  function renderAll() {
    $$("[data-component]").forEach((el) => {
      const fn = components[el.dataset.component];
      if (fn) el.outerHTML = fn(el);
    });
    $$("[data-render]").forEach((el) => { const fn = renderers[el.dataset.render]; if (fn) fn(el); });
    const cr = $("#country-root");
    if (cr) renderCountryPage(cr);
    const pr = $("#program-root");
    if (pr) renderProgramPage(pr);
    $$("[data-booking]").forEach((a) => { a.href = site.booking; });
    $$("[data-fee]").forEach((el) => {
      if (site.showFeeFrom) el.innerHTML = `Starting from <strong>${site.feeFrom}</strong>`;
      else el.remove();
    });
  }

  /* ======================================================================
     3. INTERACTION
     ====================================================================== */
  function initNav() {
    const flyOf = (item) => $(".tree__toggle", item);
    const closeFly = (item) => { item.classList.remove("is-open"); flyOf(item).setAttribute("aria-expanded", "false"); };
    const openFly = (item) => {
      $$(".tree__item.is-open", item.parentElement).forEach((o) => { if (o !== item) closeFly(o); });
      $(".fly", item).classList.toggle("fly--left", item.getBoundingClientRect().right + 376 > window.innerWidth - 16);
      item.classList.add("is-open");
      flyOf(item).setAttribute("aria-expanded", "true");
    };
    const closeAll = (except) => $$(".has-mega.is-open").forEach((li) => {
      if (li === except) return;
      li.classList.remove("is-open");
      $(".nav__toggle", li).setAttribute("aria-expanded", "false");
      $$(".tree__item.is-open", li).forEach(closeFly);
    });
    $$(".has-mega").forEach((li) => {
      const btn = $(".nav__toggle", li);
      const panel = $(".mega", li);
      let timer;
      let quiet = false; // true while returning focus to a country row, so its flyout stays closed
      const focusQuiet = (el) => { quiet = true; el.focus(); quiet = false; };
      const open = () => { closeAll(li); li.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); };
      const close = () => { li.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); $$(".tree__item.is-open", li).forEach(closeFly); };
      const hoverOk = () => window.matchMedia("(hover: hover)").matches;
      li.addEventListener("mouseenter", () => { if (hoverOk()) { clearTimeout(timer); open(); } });
      li.addEventListener("mouseleave", () => { timer = setTimeout(close, 150); });
      btn.addEventListener("click", () => (li.classList.contains("is-open") ? close() : open()));
      li.addEventListener("focusout", (e) => { if (!li.contains(e.relatedTarget)) close(); });

      /* Country rows: flyouts with hover intent, focus and click */
      $$(".tree__item", li).forEach((item) => {
        let t;
        item.addEventListener("mouseenter", () => { if (hoverOk()) { clearTimeout(t); t = setTimeout(() => openFly(item), 100); } });
        item.addEventListener("mouseleave", () => { clearTimeout(t); t = setTimeout(() => closeFly(item), 150); });
        item.addEventListener("focusin", (e) => { if (!quiet && !e.target.closest(".fly")) openFly(item); });
        flyOf(item).addEventListener("click", () => (item.classList.contains("is-open") && !hoverOk() ? closeFly(item) : openFly(item)));
      });

      /* Keyboard: arrows move, Right opens flyout, Left/Escape close */
      li.addEventListener("keydown", (e) => {
        const t = e.target;
        const fly = t.closest(".fly");
        const item = t.closest(".tree__item");
        if (e.key === "Escape") {
          e.preventDefault(); e.stopPropagation();
          if (fly) { closeFly(item); focusQuiet($(".tree__link", item)); } else { close(); btn.focus(); }
          return;
        }
        if (e.key === "ArrowDown" && t === btn) {
          e.preventDefault(); open();
          const first = $(".mega__item, .tree__link", panel); if (first) first.focus();
          return;
        }
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          const list = fly ? $$(".fly__item", fly) : $$(".mega__item, .tree__link", panel);
          const cur = t.classList.contains("tree__toggle") ? $(".tree__link", item) : t;
          const i = list.indexOf(cur);
          if (i > -1) { e.preventDefault(); list[(i + (e.key === "ArrowDown" ? 1 : -1) + list.length) % list.length].focus(); }
          return;
        }
        if (e.key === "ArrowRight" && item && !fly) {
          e.preventDefault(); openFly(item); $(".fly__item", item).focus();
          return;
        }
        if (e.key === "ArrowLeft" && fly) {
          e.preventDefault(); closeFly(item); focusQuiet($(".tree__link", item));
        }
      });
    });
    document.addEventListener("click", (e) => { if (!e.target.closest(".has-mega")) closeAll(); });

    /* Mobile overlay */
    const menu = $("#mobileMenu");
    const burger = $(".nav__in .burger");
    if (!menu || !burger) return;
    const setMenu = (open) => {
      menu.classList.toggle("is-open", open);
      menu.setAttribute("aria-hidden", String(!open));
      burger.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("no-scroll", open);
      if (open) $(".burger--close", menu).focus(); else burger.focus({ preventScroll: true });
    };
    burger.addEventListener("click", () => setMenu(true));
    $(".burger--close", menu).addEventListener("click", () => setMenu(false));
    $$("a", menu).forEach((a) => a.addEventListener("click", () => menu.classList.contains("is-open") && setMenu(false)));
    $$(".mobile__acc", menu).forEach((b) => b.addEventListener("click", () => {
      const open = b.getAttribute("aria-expanded") !== "true";
      b.setAttribute("aria-expanded", String(open));
      $("#" + b.getAttribute("aria-controls")).classList.toggle("is-open", open);
    }));
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      closeAll();
      if (menu.classList.contains("is-open")) setMenu(false);
    });
    window.addEventListener("resize", () => { if (window.innerWidth >= 1200 && menu.classList.contains("is-open")) setMenu(false); });
  }

  function initScroll() {
    const top = $("#siteTop");
    const toTop = $(".to-top");
    const bar = $(".to-top__bar");
    const circ = 2 * Math.PI * 24;
    if (bar) { bar.style.strokeDasharray = circ; bar.style.strokeDashoffset = circ; }
    const para = $$("[data-parallax]");
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      if (top) top.classList.toggle("is-scrolled", y > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(y / max, 1) : 0;
      if (toTop) { toTop.classList.toggle("is-visible", y > 600); bar.style.strokeDashoffset = circ * (1 - p); }
      if (!reduceMotion) {
        para.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -100 || r.top > window.innerHeight + 100) return;
          const f = parseFloat(el.dataset.parallax) || 0.1;
          const off = el.dataset.parallaxMode === "scroll" ? y * f : (r.top + r.height / 2 - window.innerHeight / 2) * -f;
          el.style.setProperty("--py", off.toFixed(1) + "px");
        });
      }
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
    if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
  }

  function initReveal() {
    $$("[data-stagger]").forEach((p) => Array.from(p.children).forEach((c, i) => {
      c.classList.add("reveal");
      c.style.setProperty("--d", i * 90 + "ms");
    }));
    const targets = $$(".reveal, .timeline, [data-count]");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-in"));
      $$("[data-count]").forEach((c) => { c.textContent = (c.dataset.prefix || "") + c.dataset.count + (c.dataset.suffix || ""); });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        if (e.target.hasAttribute("data-count")) countUp(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    targets.forEach((t) => io.observe(t));
  }

  function countUp(el) {
    const end = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    const dur = 1800;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(end * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function initCarousel() {
    $$("[data-carousel]").forEach((root) => {
      const slides = $$(".slide", root);
      const dots = $$(".dot", root);
      let i = 0, timer;
      const go = (n) => {
        slides[i].classList.remove("is-active"); dots[i].classList.remove("is-active");
        i = (n + slides.length) % slides.length;
        slides[i].classList.add("is-active"); dots[i].classList.add("is-active");
      };
      const play = () => { if (!reduceMotion) { clearInterval(timer); timer = setInterval(() => go(i + 1), 7000); } };
      $("[data-prev]", root).addEventListener("click", () => { go(i - 1); play(); });
      $("[data-next]", root).addEventListener("click", () => { go(i + 1); play(); });
      dots.forEach((d, n) => d.addEventListener("click", () => { go(n); play(); }));
      root.addEventListener("mouseenter", () => clearInterval(timer));
      root.addEventListener("mouseleave", play);
      root.addEventListener("focusin", () => clearInterval(timer));
      root.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") go(i + 1); if (e.key === "ArrowLeft") go(i - 1); });
      play();
    });
  }

  function initAccordions() {
    $$("[data-acc]").forEach((acc) => {
      $$(".acc__btn", acc).forEach((btn) => btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        $("#" + btn.getAttribute("aria-controls")).classList.toggle("is-open", !open);
        btn.closest(".acc__item").classList.toggle("is-open", !open);
      }));
    });
  }

  /* Sticky in-page navigation with scroll highlighting */
  function initSubnav() {
    const nav = $(".subnav");
    if (!nav) return;
    const links = $$("a", nav);
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const sections = Array.from(map.keys()).map((id) => document.getElementById(id)).filter(Boolean);
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => { l.classList.remove("is-active"); l.removeAttribute("aria-current"); });
        const a = map.get(e.target.id);
        if (a) { a.classList.add("is-active"); a.setAttribute("aria-current", "true"); }
      });
    }, { rootMargin: "-35% 0px -60% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  /* Testimonials filter */
  function initTestimonialFilter() {
    const grid = $(".testi-grid");
    const tabs = $$("[data-tfilter] .tab");
    if (!grid || !tabs.length) return;
    tabs.forEach((tab) => tab.addEventListener("click", () => {
      tabs.forEach((t) => { t.classList.remove("is-active"); t.setAttribute("aria-pressed", "false"); });
      tab.classList.add("is-active"); tab.setAttribute("aria-pressed", "true");
      const f = tab.dataset.filter;
      const cards = $$(".testi-card", grid);
      grid.classList.add("is-switching");
      setTimeout(() => {
        cards.forEach((c) => { c.hidden = !(f === "All" || c.dataset.type === f); });
        grid.classList.remove("is-switching");
      }, reduceMotion ? 0 : 260);
    }));
  }

  /* News: featured + grid, filters, modal */
  function initNews() {
    const wrap = $('[data-render="news-list"]');
    if (!wrap) return;
    const featuredBox = $("[data-news-featured]", wrap);
    const grid = $("[data-news-grid]", wrap);
    const empty = $("[data-news-empty]", wrap);
    const all = newsSorted();
    const draw = (cat) => {
      const list = cat === "All" ? all : all.filter((n) => n.category === cat);
      featuredBox.innerHTML = list[0] ? newsCard(list[0], true) : "";
      grid.innerHTML = list.slice(1).map((n) => newsCard(n)).join("");
      empty.hidden = list.length > 0;
      [...featuredBox.children, ...grid.children].forEach((c, i) => { c.classList.add("reveal", "is-in"); c.style.setProperty("--d", i * 70 + "ms"); });
      icons();
    };
    draw("All");
    $$(".tab", wrap).forEach((tab) => tab.addEventListener("click", () => {
      $$(".tab", wrap).forEach((t) => { t.classList.remove("is-active"); t.setAttribute("aria-pressed", "false"); });
      tab.classList.add("is-active"); tab.setAttribute("aria-pressed", "true");
      draw(tab.dataset.filter);
    }));
  }

  function initNewsModal() {
    if (!$$("[data-news]").length && page !== "news") return;
    const dlg = document.createElement("dialog");
    dlg.className = "modal";
    dlg.setAttribute("aria-labelledby", "modalTitle");
    document.body.appendChild(dlg);
    const open = (id) => {
      const n = news.find((x) => x.id === id);
      if (!n) return;
      dlg.innerHTML = `
        <button class="modal__close" type="button" aria-label="Close article">${ic("x")}</button>
        <div class="modal__media"><img src="${n.image}" alt=""></div>
        <div class="modal__body">
          <p class="news-card__meta"><span class="tag">${n.category}</span><span>${n.country}</span><time datetime="${n.date}">${fmtDate(n.date)}</time></p>
          <h2 id="modalTitle">${n.title}</h2>
          ${n.body.map((p) => `<p>${p}</p>`).join("")}
          <p class="modal__note">General information only; not legal advice. Please verify details with official sources.</p>
          <a class="btn btn--gold btn--sm" href="contact.html">Ask a question ${ic("arrow-right")}</a>
        </div>`;
      icons();
      if (!dlg.open) dlg.showModal();
      document.body.classList.add("no-scroll");
    };
    dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest(".modal__close")) dlg.close(); });
    dlg.addEventListener("close", () => document.body.classList.remove("no-scroll"));
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-news]");
      if (b) open(b.dataset.news);
    });
    if (location.hash.startsWith("#read-")) open(location.hash.slice(6));
  }

  /* Drag-and-drop zone (UI only) */
  function initDropzone() {
    $$("[data-dropzone]").forEach((zone) => {
      const input = $(".dropzone__input", zone);
      const list = $(".dropzone__list", zone);
      const show = (files) => {
        list.innerHTML = Array.from(files).map((f) => `<li>${ic("file-check")}<span>${f.name}</span><small>${(f.size / 1024 / 1024).toFixed(2)} MB</small></li>`).join("");
        icons();
      };
      input.addEventListener("change", () => show(input.files));
      ["dragenter", "dragover"].forEach((ev) => zone.addEventListener(ev, (e) => { e.preventDefault(); zone.classList.add("is-drag"); }));
      ["dragleave", "drop"].forEach((ev) => zone.addEventListener(ev, (e) => { e.preventDefault(); zone.classList.remove("is-drag"); }));
      zone.addEventListener("drop", (e) => { if (e.dataTransfer && e.dataTransfer.files.length) { input.files = e.dataTransfer.files; show(input.files); } });
    });
  }

  /* Forms: validation, submission, success state */
  const successHTML = (t, m) =>
    `<div class="form__success" role="status" tabindex="-1">
      <svg class="check-anim" viewBox="0 0 52 52" aria-hidden="true"><circle class="check-anim__c" cx="26" cy="26" r="24"/><path class="check-anim__p" d="M14 27l8 8 16-17"/></svg>
      <h3>${t}</h3><p>${m}</p></div>`;

  function fieldError(input, msg) {
    const wrap = input.closest(".field") || input.parentElement;
    let err = $(".field__error", wrap);
    if (msg) {
      if (!err) { err = document.createElement("span"); err.className = "field__error"; err.id = "err-" + input.id; wrap.appendChild(err); }
      err.textContent = msg;
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", err.id);
      wrap.classList.add("has-error");
    } else {
      if (err) err.remove();
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
      wrap.classList.remove("has-error");
    }
  }

  function validateField(input) {
    if (input.type === "hidden" || input.name === "_gotcha" || !input.name) return true;
    const v = input.value.trim();
    let msg = "";
    if (input.type === "checkbox") { if (input.required && !input.checked) msg = "Please tick this box to continue."; }
    else if (input.required && !v) msg = "This field is required.";
    else if (input.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = "Please enter a valid email address.";
    else if (input.type === "tel" && v && !/^[\d\s().-]{6,}$/.test(v)) msg = "Please enter a valid phone number.";
    fieldError(input, msg);
    return !msg;
  }

  function initForms() {
    $$("form[data-form]").forEach((form) => {
      const trap = document.createElement("input");
      trap.type = "text"; trap.name = "_gotcha"; trap.className = "hp"; trap.tabIndex = -1; trap.setAttribute("autocomplete", "off"); trap.setAttribute("aria-hidden", "true");
      form.appendChild(trap);
      const fields = () => $$("input, select, textarea", form);
      fields().forEach((f) => {
        f.addEventListener("blur", () => { if (f.value || f.type === "checkbox") validateField(f); });
        f.addEventListener("input", () => { if (f.closest(".has-error")) validateField(f); });
        f.addEventListener("change", () => { if (f.closest(".has-error")) validateField(f); });
      });
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const status = $(".form__status", form);
        const bad = fields().filter((f) => !validateField(f));
        if (bad.length) {
          status.textContent = "Please review the highlighted fields.";
          bad[0].focus();
          return;
        }
        if (trap.value) return; // bot
        status.textContent = "";
        const btn = $('button[type="submit"]', form);
        btn.disabled = true; btn.classList.add("is-loading");
        let ok = false;
        try {
          if (site.formEndpoint.includes("YOUR_FORM_ID")) {
            await new Promise((r) => setTimeout(r, 900)); // demo mode until an endpoint is configured
            ok = true;
          } else {
            const res = await fetch(site.formEndpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
            ok = res.ok;
          }
        } catch (err) { ok = false; }
        btn.disabled = false; btn.classList.remove("is-loading");
        if (!ok) { status.textContent = "Sorry, something went wrong. Please try again or email " + site.email + "."; return; }
        const body = $(".form__body", form);
        body.hidden = true;
        form.insertAdjacentHTML("beforeend", successHTML(form.dataset.successTitle, form.dataset.successText));
        const s = $(".form__success", form);
        s.classList.add("is-in");
        s.focus();
        form.classList.add("is-done");
        s.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
      });
    });
  }

  /* Broken-image fallback: reveals the navy gradient frame */
  function initImageFallback() {
    document.addEventListener("error", (e) => {
      if (e.target.tagName === "IMG") e.target.classList.add("is-broken");
    }, true);
  }

  /* ======================================================================
     4. BOOT
     ====================================================================== */
  initImageFallback();
  buildHeader();
  buildFooter();
  renderAll();
  icons();
  initNav();
  initReveal();
  initScroll();
  initCarousel();
  initAccordions();
  initSubnav();
  initTestimonialFilter();
  initNews();
  initNewsModal();
  initDropzone();
  initForms();
  icons();

  /* Preloader: removed once the entrance animation is complete */
  const pre = $("#preloader");
  if (pre) setTimeout(() => pre.remove(), 1400);
  document.body.classList.add("is-ready");

  /* Footer year (kept current without rebuilding) */
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
})();
