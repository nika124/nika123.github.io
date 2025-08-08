import { useEffect, useMemo, useState, useCallback } from "react";
import { HelmetProvider, Helmet } from "@dr.pogodin/react-helmet";
import "./App.css";

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const year = new Date().getFullYear();

  // Close on ESC and lock body scroll when open
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setNavOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const status = document.getElementById("form-status");
    if (status) status.textContent = "გაგზავნილია! მალე დაგიკავშირდებით.";
    form.reset();
  };

  // single, safe image fallback (no re-render loops)
  const onImgError = useCallback((e) => {
    const img = e.currentTarget;
    if (img.dataset.fallback === "1") return;
    img.dataset.fallback = "1";
    const w = img.getAttribute("width") || 800;
    const h = img.getAttribute("height") || 600;
    img.src = `https://via.placeholder.com/${w}x${h}?text=Image+unavailable`;
  }, []);

  // JSON-LD
  const websiteLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "DrWash",
      url: "https://www.drwash.ge/",
      inLanguage: "ka-GE",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.drwash.ge/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    }),
    []
  );

  const localBusinessLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      additionalType: "https://schema.org/RepairService",
      name: "DrWash — სარეცხი მანქანის ხელოსანი",
      url: "https://www.drwash.ge/",
      image: "https://via.placeholder.com/1200x630.png?text=DrWash+Tbilisi",
      telephone: "+9955XXXXXXX",
      priceRange: "₾₾",
      address: {
        "@type": "PostalAddress",
        streetAddress: "",
        addressLocality: "თბილისი",
        addressRegion: "",
        postalCode: "",
        addressCountry: "GE",
      },
      geo: { "@type": "GeoCoordinates", latitude: 41.7151, longitude: 44.8271 },
      areaServed: [
        "თბილისი",
        "საბურთალო",
        "ვაკე",
        "ვერა",
        "დიდუბე",
        "გლდანი",
        "ისანი",
        "ნაძალადევი",
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday"],
          opens: "11:00",
          closes: "17:00",
        },
      ],
      sameAs: [
        "https://www.facebook.com/yourpage",
        "https://www.instagram.com/yourpage",
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "სარეცხი მანქანის დიაგნოსტიკა და რემონტი",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "GEL",
            price: "from 40",
          },
          availability: "https://schema.org/InStock",
        },
      ],
    }),
    []
  );

  const faqLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "რა ღირს სარეცხი მანქანის დიაგნოსტიკა?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "საწყისი დიაგნოსტიკა იწყება 40 ₾-დან თბილისის მასშტაბით. საბოლოო ფასი დამოკიდებულია დაზიანების ტიპსა და სათადარიგო ნაწილებზე.",
          },
        },
        {
          "@type": "Question",
          name: "რამდენ ხანში მოდის ხელოსანი?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ჩვეულებრივ იმავე ან მომდევნო დღეს, თქვენს უბანზე დამოკიდებით. სასწრაფო ვიზიტიც შესაძლებელია წინასწარ შეთანხმებით.",
          },
        },
        {
          "@type": "Question",
          name: "გვაქვს თუ არა გარანტია?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "დიახ, დეტალებისა და სამუშაოზე ვაძლევთ მინიმუმ 30-დღიან გარანტიას, პრობლემის ტიპზე დამოკიდებით.",
          },
        },
      ],
    }),
    []
  );

  const closeNav = () => setNavOpen(false);

  return (
    <>
      <Helmet prioritizeSeoTags>
        <html lang="ka" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>
          სარეცხი მანქანის შეკეთება თბილისში | DrWash — სწრაფი დიაგნოსტიკა და
          გარანტია
        </title>
        <meta
          name="description"
          content="DrWash — სარეცხი მანქანის შეკეთება თბილისში. ადგილზე მოსვლა, სწრაფი დიაგნოსტიკა, სამართლიანი ფასი და 30-დღიანი გარანტია. გამოიძახეთ ხელოსანი ახლა: +995 5XX XX XX XX."
        />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0B7A75" />
        <meta name="format-detection" content="telephone=yes" />
        <link rel="canonical" href="https://www.drwash.ge/" />
        <link rel="alternate" hrefLang="ka-GE" href="https://www.drwash.ge/" />
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="/sitemap.xml"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ka_GE" />
        <meta property="og:url" content="https://www.drwash.ge/" />
        <meta property="og:site_name" content="DrWash" />
        <meta
          property="og:title"
          content="სარეცხი მანქანის შეკეთება თბილისში | DrWash"
        />
        <meta
          property="og:description"
          content="ადგილზე მომსახურება, სწრაფი დიაგნოსტიკა, სამართლიანი ფასი და 30-დღიანი გარანტია."
        />
        <meta
          property="og:image"
          content="https://via.placeholder.com/1200x630.png?text=DrWash+Tbilisi"
        />

        {/* Preload LCP hero */}
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1628321253151-bdf5f9f8f414?auto=format&fit=crop&w=1200&q=80"
          imagesrcset="
            https://images.unsplash.com/photo-1628321253151-bdf5f9f8f414?auto=format&fit=crop&w=600&q=70 600w,
            https://images.unsplash.com/photo-1628321253151-bdf5f9f8f414?auto=format&fit=crop&w=900&q=75 900w,
            https://images.unsplash.com/photo-1628321253151-bdf5f9f8f414?auto=format&fit=crop&w=1200&q=80 1200w"
          imagesizes="(max-width: 780px) 92vw, 48vw"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="სარეცხი მანქანის შეკეთება თბილისში | DrWash"
        />
        <meta
          name="twitter:description"
          content="ადგილზე მომსახურება, სწრაფი დიაგნოსტიკა, სამართლიანი ფასი და 30-დღიანი გარანტია."
        />
        <meta
          name="twitter:image"
          content="https://via.placeholder.com/1200x630.png?text=DrWash+Tbilisi"
        />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessLd)}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <noscript>
        ამ საიტის სრული ფუნქციონირებისთვის საჭიროა JavaScript-ის ჩართვა.
      </noscript>

      {/* Topbar */}
      <div className="topbar">
        <div className="container">
          <div>სწრაფი მომსახურება თბილისში</div>
          <div>
            <a className="pill" href="tel:+9955XXXXXXX">
              დაგვირეკეთ: +995 5XX XX XX XX
            </a>
          </div>
        </div>
      </div>

      {/* Header / Nav */}
      <header>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="#home"
            aria-label="DrWash მთავარი"
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              fontWeight: 800,
              color: "#0B7A75",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="20" cy="20" r="20" fill="#0B7A75" />
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="20"
                fontFamily="system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, sans-serif"
                fill="#fff"
              >
                D
              </text>
            </svg>
            <span>DrWash</span>
          </a>

          <button
            id="nav-toggle"
            className="nav-toggle"
            aria-label="მენიუს გახსნა"
            aria-controls="primary-nav"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="#0B7A75"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <nav aria-label="მთავარი ნავიგაცია">
            <div
              id="primary-nav"
              className={`nav-panel ${navOpen ? "open" : ""}`}
            >
              <ul className="nav">
                <li>
                  <a className="nav-link" href="#services" onClick={closeNav}>
                    სერვისები
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#areas" onClick={closeNav}>
                    უბნები
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#problems" onClick={closeNav}>
                    პრობლემები
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#faq" onClick={closeNav}>
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link nav-cta"
                    href="#contact"
                    onClick={closeNav}
                  >
                    კონტაქტი
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div
            id="nav-backdrop"
            className={`nav-backdrop ${navOpen ? "show" : ""}`}
            hidden={!navOpen}
            onClick={closeNav}
          />
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="container grid grid-2" style={{ alignItems: "center" }}>
          <div>
            <h1>
              სარეცხი მანქანის შეკეთება თბილისში —{" "}
              <span className="muted">DrWash</span>
            </h1>
            <p>
              ადგილზე დიაგნოსტიკა, სწრაფი და ხარისხიანი რემონტი, სამართლიანი
              ფასები და <strong>30-დღიანი გარანტია</strong>. მოვემსახურებით
              თბილისში და ახლომდებარე ტერიტორიებზე.
            </p>
            <div className="cta">
              <a className="btn btn-primary" href="tel:+9955XXXXXXX">
                დარეკვა ახლა
              </a>
              <a className="btn btn-outline" href="#contact">
                ონლაინ შეკვეთა
              </a>
            </div>
            <div className="badges">
              <span className="pill">ადგილზე მომსახურება</span>
              <span className="pill">სწრაფი გამოძახება</span>
              <span className="pill">გუნდის გამოცდილება</span>
            </div>
          </div>

          <div
            className="card media ratio ratio-4x3"
            data-filename="sarecxi-manqanis-sheketeba-tbilisi-technician-hero.jpg"
          >
            <picture>
              <source
                type="image/avif"
                srcSet="
                https://images.unsplash.com/photo-1628321253151-bdf5f9f8f414?auto=format&fit=crop&fm=avif&w=600&q=70 600w,
                https://images.unsplash.com/photo-1628321253151-bdf5f9f8f414?auto=format&fit=crop&fm=avif&w=900&q=75 900w,
                https://images.unsplash.com/photo-1628321253151-bdf5f9f8f414?auto=format&fit=crop&fm=avif&w=1200&q=80 1200w
              "
                sizes="(max-width: 900px) 92vw, 48vw"
              />
              <source
                type="image/webp"
                srcSet="
                https://images.unsplash.com/photo-1628321253151-bdf5f9f8f414?auto=format&fit=crop&fm=webp&w=600&q=70 600w,
                https://images.unsplash.com/photo-1628321253151-bdf5f9f8f414?auto=format&fit=crop&fm=webp&w=900&q=75 900w,
                https://images.unsplash.com/photo-1628321253151-bdf5f9f8f414?auto=format&fit=crop&fm=webp&w=1200&q=80 1200w
              "
                sizes="(max-width: 900px) 92vw, 48vw"
              />
              <img
                src="https://images.unsplash.com/photo-1628321253151-bdf5f9f8f414?auto=format&fit=crop&w=1200&q=80"
                width="1200"
                height="900"
                alt="სარეცხი მანქანის ხელოსანი თბილისში — ადგილზე ხარისხიანი რემონტი"
                title="DrWash — სარეცხი მანქანის ხელოსანი თბილისში"
                loading="eager"
                decoding="async"
                fetchpriority="high"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                onError={onImgError}
              />
            </picture>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="section"
        aria-labelledby="services-title"
      >
        <div className="container">
          <h2 id="services-title">სერვისები</h2>
          <div className="grid grid-3">
            {[
              {
                title: "დიაგნოსტიკა და რემონტი",
                img: "photo-1606208427956-cf2cfb3ac5b0",
                desc: (
                  <>
                    საწყისი დიაგნოსტიკა <strong>40 ₾</strong>-დან. დეტალური
                    შემოწმება და პრობლემის სწრაფი გამოსავალი ადგილზე.
                  </>
                ),
              },
              {
                title: "გაჟონვის აღმოფხვრა",
                img: "photo-1545259741-2ea3ebf61fa7",
                desc: (
                  <>
                    შლანგის, ფილტრის ან მანჟეტის პრობლემების სწრაფი დიაგნოსტიკა
                    და შეცვლა.
                  </>
                ),
              },
              {
                title: "ძრავი / ტუმბო / გაწურვა",
                img: "photo-1626824132374-7623cf1bc98f",
                desc: (
                  <>
                    არ ტრიალებს? არ იწურავს? — გავწმენდთ ფილტრებს, შევამოწმებთ
                    ბრაშებს/ტუმბოს და გავაკეთებთ საჭირო ჩანაცვლებას.
                  </>
                ),
              },
              {
                title: "წყალს არ იღებს / არ უშვებს",
                img: "photo-1620403729310-bdc7ddc54228",
                desc: (
                  <>
                    შემოვცვლით სოლენოიდს, შევამოწმებთ სადრენაჟე მილს და
                    ელექტრონულ ბლოკს.
                  </>
                ),
              },
              {
                title: "მონტაჟი / გადაადგილება",
                img: "photo-1578869289848-0f42d12e431f",
                desc: (
                  <>
                    სწორი დაყენება ვიბრაციისა და ხმაურის გარეშე. შევამოწმებთ
                    ბალანსსა და ჰორიზონტს.
                  </>
                ),
              },
              {
                title: "პროფილაქტიკა და გაწმენდა",
                img: "photo-1588348456921-b92b9ff3c6b5",
                desc: (
                  <>
                    ქვარმწმენდის, ფილტრის და გამათბობლის გაწმენდა სიცოცხლის
                    წლებისთვის.
                  </>
                ),
              },
            ].map((s, i) => (
              <article className="card service-card" key={i}>
                <figure className="media ratio ratio-4x3">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet={`
                        https://images.unsplash.com/${s.img}?auto=format&fit=crop&fm=avif&w=480&q=65 480w,
                        https://images.unsplash.com/${s.img}?auto=format&fit=crop&fm=avif&w=800&q=70 800w,
                        https://images.unsplash.com/${s.img}?auto=format&fit=crop&fm=avif&w=1200&q=75 1200w
                      `}
                      sizes="(max-width: 900px) 92vw, 356px"
                    />
                    <source
                      type="image/webp"
                      srcSet={`
                        https://images.unsplash.com/${s.img}?auto=format&fit=crop&fm=webp&w=480&q=65 480w,
                        https://images.unsplash.com/${s.img}?auto=format&fit=crop&fm=webp&w=800&q=70 800w,
                        https://images.unsplash.com/${s.img}?auto=format&fit=crop&fm=webp&w=1200&q=75 1200w
                      `}
                      sizes="(max-width: 900px) 92vw, 356px"
                    />
                    <img
                      src={`https://images.unsplash.com/${s.img}?auto=format&fit=crop&w=800&q=75`}
                      width="800"
                      height="600"
                      alt={s.title}
                      title={s.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={onImgError}
                    />
                  </picture>
                </figure>
                <h3>{s.title}</h3>
                <p className="muted">{s.desc}</p>
                <a
                  href="#contact"
                  className="btn btn-outline"
                  aria-label="დიაგნოსტიკის შეკვეთა"
                >
                  შეკვეთა
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section id="areas" className="section" aria-labelledby="areas-title">
        <div className="container">
          <h2 id="areas-title">მოვემსახურებით თბილისის ყველა უბანს</h2>
          <p className="muted">
            საბურთალო • ვაკე • ვერა • ვერა/მთაწმინდა • დიდუბე • ჩუღურეთი • ისანი
            • სამგორი • გლდანი • ნაძალადევი • დიღომი
          </p>
          <div className="card">
            <p style={{ margin: 0 }}>
              გთხოვთ მიუთითოთ თქვენი უბანი შეკვეთაში — შევარჩევთ ყველაზე ახლო
              ხელოსანს სწრაფი გამოძახებისთვის.
            </p>
          </div>
        </div>
      </section>

      {/* Problems + Steps */}
      <section
        id="problems"
        className="section"
        aria-labelledby="problems-title"
      >
        <div className="container">
          <h2 id="problems-title">ხშირი პრობლემები</h2>
          <div className="grid grid-2">
            {[
              {
                h3: "არ ირთვება",
                p: "შევამოწმებთ კვებას, კართან საკეტს და ელექტრონულ ბლოკს. დეტალების შეცვლა მხოლოდ შეთანხმებით.",
              },
              {
                h3: "არ ტრიალებს / არ იწურავს",
                p: "ტუმბოს, ქამრის ან კოლექტორის პრობლემა. დავადგენთ მიზეზს და გეტყვით ფასს წინასწარ.",
              },
              {
                h3: "გაჟონვა",
                p: "ხშირად გამოწვეულია მანჟეტის ან შლანგის დაზიანებით. ადგილზე მოვიტანთ სათადარიგო ნაწილებს.",
              },
              {
                h3: "წყალს არ იღებს",
                p: "სოლენოიდის, ფილტრის ან წნევის სენსორის პრობლემა. სწრაფი დიაგნოსტიკა და შეცვლა.",
              },
            ].map((x, i) => (
              <div className="card" key={i}>
                <h3>{x.h3}</h3>
                <p className="muted">{x.p}</p>
              </div>
            ))}
          </div>

          <div className="section">
            <h2>როგორ ვმუშაობთ</h2>
            <div className="grid steps">
              {[
                {
                  h3: "შეკვეთა",
                  p: "დაგვირეკეთ ან შეავსეთ ფორმა — მიუთითეთ ბრენდი/მოდელი და პრობლემა.",
                },
                {
                  h3: "გამოძახება",
                  p: "ხელოსანი მოვა შეთანხმებულ დროს, ჩაატარებს დიაგნოსტიკას და შეგითანხმებთ ფასს.",
                },
                {
                  h3: "რემონტი",
                  p: "მუშაობა შესრულდება ადგილზე ან სახელოსნოში (საჭიროების შემთხვევაში).",
                },
                {
                  h3: "გარანტია",
                  p: "ნებისმიერ სამუშაოზე მოგცემთ წერილობით გარანტიას.",
                },
              ].map((x, i) => (
                <div className="step" key={i}>
                  <div>
                    <h3>{x.h3}</h3>
                    <p className="muted">{x.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section" aria-labelledby="faq-title">
        <div className="container">
          <h2 id="faq-title">კითხვები და პასუხები</h2>
          <details className="card">
            <summary>
              <strong>რა ღირს დიაგნოსტიკა?</strong>
            </summary>
            <p className="muted">
              დაწყება 40 ₾-დან. ზუსტი ღირებულება დაზიანებაზეა დამოკიდებული.
            </p>
          </details>
          <details className="card">
            <summary>
              <strong>რამდენ ხანში მოხდება ვიზიტი?</strong>
            </summary>
            <p className="muted">
              ჩვეულებრივ იმ დღეს ან მომდევნო დღეს. სასწრაფო მომსახურებაც
              შესაძლებელია.
            </p>
          </details>
          <details className="card">
            <summary>
              <strong>აქვს თუ არა სამუშაოს გარანტია?</strong>
            </summary>
            <p className="muted">
              დიახ — მინიმუმ 30 დღე, პრობლემის ტიპზე დამოკიდებით.
            </p>
          </details>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section" aria-labelledby="contact-title">
        <div className="container grid grid-2">
          <div>
            <h2 id="contact-title">კონტაქტი</h2>
            <p className="muted">
              დაგვირეკეთ ან შეავსეთ ფორმა. გიპასუხებთ მალე და შევათანხმებთ
              ვიზიტს.
            </p>
            <p>
              <strong>ტელეფონი:</strong>{" "}
              <a href="tel:+9955XXXXXXX">+995 5XX XX XX XX</a>
            </p>
            <p>
              <strong>ელ-ფოსტა:</strong>{" "}
              <a href="mailto:info@drwash.ge">info@drwash.ge</a>
            </p>
            <p>
              <strong>მისამართი:</strong> თბილისი
            </p>
            <p>
              <a
                className="btn btn-primary"
                href="https://maps.google.com/?q=DrWash%20Tbilisi"
                target="_blank"
                rel="noopener"
              >
                გაზიარეთ ლოკაცია
              </a>
            </p>
          </div>

          <div>
            <form
              name="order-form"
              aria-label="ონლაინ შეკვეთა"
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="name">სახელი</label>
                <input id="name" name="name" required autoComplete="name" />
              </div>
              <div>
                <label htmlFor="phone">ტელეფონი</label>
                <input
                  id="phone"
                  name="phone"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+995 5XX XX XX XX"
                />
              </div>
              <div>
                <label htmlFor="district">უბანი</label>
                <select id="district" name="district" required defaultValue="">
                  <option value="" disabled>
                    აირჩიეთ უბანი
                  </option>
                  <option>საბურთალო</option>
                  <option>ვაკე</option>
                  <option>ვერა</option>
                  <option>დიდუბე</option>
                  <option>ისანი</option>
                  <option>გლდანი</option>
                  <option>ნაძალადევი</option>
                  <option>სხვა</option>
                </select>
              </div>
              <div>
                <label htmlFor="brand">ბრენდი / მოდელი</label>
                <input
                  id="brand"
                  name="brand"
                  placeholder="მაგ: Samsung WW90…"
                />
              </div>
              <div>
                <label htmlFor="message">პრობლემის აღწერა</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="მოკლედ აღწერეთ პრობლემა"
                />
              </div>
              <button className="btn btn-primary" type="submit">
                გაგზავნა
              </button>
              <p
                id="form-status"
                className="muted"
                role="status"
                aria-live="polite"
              ></p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footer-grid">
          <div>
            <h3 style={{ marginTop: 0 }}>DrWash</h3>
            <p>
              სარეცხი მანქანის ხელოსანი თბილისში • ადგილზე მომსახურება •
              30-დღიანი გარანტია
            </p>
            <p className="muted">
              NAP: <strong>DrWash</strong>, თბილისი,{" "}
              <a href="tel:+9955XXXXXXX">+995 5XX XX XX XX</a>,{" "}
              <a href="mailto:info@drwash.ge">info@drwash.ge</a>
            </p>
            <p className="muted">
              © <span>{year}</span> DrWash. ყველა უფლება დაცულია.
            </p>
          </div>
          <div>
            <h4>სწრაფი ბმულები</h4>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              <li>
                <a href="#services">სერვისები</a>
              </li>
              <li>
                <a href="#areas">უბნები</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#contact">კონტაქტი</a>
              </li>
              <li>
                <a href="/sitemap.xml">საიტის რუკა</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
