import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChartNoAxesCombined,
  CircleCheck,
  Database,
  Maximize2,
  PackageCheck,
  Search,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import logo from "@/assets/ai-tomates-logo.png";
import tomato from "@/assets/tomato-icon.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Twenty6 Digital Boutique — AI-tomates" },
      {
        name: "description",
        content: "Interactieve pitch voor de Twenty6 Digital Boutique: klantdata, V1, planning en aanbod.",
      },
      { property: "og:title", content: "Twenty6 Digital Boutique — AI-tomates" },
      {
        property: "og:description",
        content: "Alle kennis over een klant op één plek — een interactieve merkpresentatie.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrandStory,
});

type SlideProps = { children: ReactNode; tone?: "ink" | "wine"; className?: string };
type IconType = typeof UsersRound;

const chapters = [
  "Opening",
  "Datafase",
  "Digital Boutique V1",
  "Datamodel",
  "Planning",
  "Vervolg",
  "Aanbod",
  "Samen bouwen",
];

function Slide({ children, tone = "ink", className = "" }: SlideProps) {
  return <section className={`story-slide story-slide--${tone} ${className}`}>{children}</section>;
}

function Kicker({ children }: { children: ReactNode }) {
  return <p className="story-kicker">{children}</p>;
}

function TomatoBrand() {
  return <img className="story-tomato" src={tomato} alt="" />;
}

function Feature({ icon: Icon, title, copy }: { icon: IconType; title: string; copy: string }) {
  return (
    <article className="feature-item">
      <Icon aria-hidden="true" />
      <div>
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
    </article>
  );
}

function BrandStory() {
  const [current, setCurrent] = useState(0);
  const [overview, setOverview] = useState(false);
  const touchStart = useRef<number | null>(null);

  const go = useCallback((index: number) => {
    setCurrent(Math.max(0, Math.min(chapters.length - 1, index)));
    setOverview(false);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = Number(params.get("slide"));
    if (Number.isInteger(requested) && requested >= 1 && requested <= chapters.length) {
      setCurrent(requested - 1);
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("slide", String(current + 1));
    window.history.replaceState({}, "", url);
    document.title = `${current + 1}/8 — ${chapters[current]}`;
  }, [current]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") go(current + 1);
      if (event.key === "ArrowLeft" || event.key === "PageUp") go(current - 1);
      if (event.key.toLowerCase() === "g") setOverview((value) => !value);
      if (event.key === "Escape") setOverview(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go]);

  const slides = [
    <Slide key="opening" tone="wine" className="opening-slide">
      <div className="opening-rule" />
      <div className="opening-copy">
        <Kicker>Twenty6 · Digital infrastructure</Kicker>
        <h1>Twenty6<br /><em>Digital Boutique</em></h1>
        <p className="opening-lead">Alle kennis over een klant op één plek.</p>
        <p className="opening-sub">Van maten en aankopen tot afspraken en opvolging.</p>
        <span className="story-label">Voorstel · september 2026</span>
      </div>
      <div className="opening-brand">
        <img className="opening-tomato" src={tomato} alt="AI-tomates tomaat" />
        <img className="opening-logo" src={logo} alt="AI-tomates — AI & Automation Agency" />
      </div>
    </Slide>,

    <Slide key="data">
      <Kicker>Stap één · V0</Kicker>
      <h2>Alle data.<br /><em>Eén betrouwbare basis.</em></h2>
      <p className="slide-intro">In twee werkdagen van losse bronnen naar één gecontroleerd klantbeeld.</p>
      <div className="process-grid">
        {[
          ["01", "Verzamelen", "Oud + nieuw boekhoudprogramma", "HubSpot is optioneel"],
          ["02", "Uploaden", "Alles komt samen", "Eén centrale klantendatabase"],
          ["03", "Opschonen", "Dubbele en foute data eruit", "Eén compleet klantprofiel"],
        ].map(([n, title, line1, line2]) => (
          <article className="process-step" key={n}>
            <span>{n}</span><h3>{title}</h3><p>{line1}</p><small>{line2}</small>
          </article>
        ))}
      </div>
      <div className="day-strip">
        <p><b>Dag 01</b> Uitlezen en overzichtelijk zetten</p>
        <p><b>Dag 02</b> Dubbelchecken en testen</p>
        <strong>Klaar voor V1</strong>
      </div>
      <TomatoBrand />
    </Slide>,

    <Slide key="v1" tone="wine">
      <Kicker>Het resultaat</Kicker>
      <h2>Digital Boutique <em>V1</em></h2>
      <p className="slide-intro">De interne omgeving die klantkennis direct bruikbaar maakt.</p>
      <div className="feature-grid">
        <Feature icon={UsersRound} title="Klantenoverzicht" copy="Junior en Munzur vinden iedere klant direct." />
        <Feature icon={UserRound} title="Compleet klantprofiel" copy="Contact, maten, verjaardag, tegoed, notities en acties." />
        <Feature icon={CalendarDays} title="Weekkalender" copy="Afspraken bij Jun en Munzur in één overzicht." />
        <Feature icon={PackageCheck} title="Orders gekoppeld" copy="Aankopen, bedragen en orderstatus per klant." />
        <Feature icon={Search} title="Gecombineerd zoeken" copy="Op naam, maat, locatie, aankoop, besteding of order." />
        <Feature icon={ChartNoAxesCombined} title="Admin-inzichten" copy="Omzet, aanvragen, populaire items en klanten met aandacht." />
      </div>
      <p className="fine-print">Winst verschijnt zodra de inkoopkosten beschikbaar zijn.</p>
      <TomatoBrand />
    </Slide>,

    <Slide key="data-model">
      <Kicker>Wat zit erachter?</Kicker>
      <h2>Eén klant.<br /><em>Zeven verbonden datasets.</em></h2>
      <p className="slide-intro">Informatie blijft gescheiden, maar hoort altijd bij hetzelfde profiel.</p>
      <div className="data-layout">
        <div className="data-core"><Database aria-hidden="true" /><strong>klant_id</strong><small>de verbinding</small></div>
        <div className="data-list">
          {[
            ["01", "Klanten", "contact · adres · tegoed"], ["02", "Maten", "taille · borst · been"],
            ["03", "Orders / aankopen", "artikelen · bedrag · status"], ["04", "Betalingen", "factuur · status · datum"],
            ["05", "Afspraken", "datum · type · eigenaar"], ["06", "Notities / gesprekken", "context · transcript"],
            ["07", "Verzoeken / to-do’s", "status · deadline · eigenaar"],
          ].map(([n, title, fields]) => <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{fields}</p></div></article>)}
        </div>
      </div>
      <TomatoBrand />
    </Slide>,

    <Slide key="planning" tone="wine">
      <Kicker>Zo bouwen we V1</Kicker>
      <h2><em>14 werkdagen</em> naar V1</h2>
      <p className="slide-intro">Na de datafase en akkoord op het datamodel.</p>
      <div className="timeline-grid">
        {[
          "Structuur & datamodel", "Klantendatabase", "Klantprofiel I", "Klantprofiel II", "Orders & aankopen",
          "Weekkalender", "Zoeken & filters", "Dashboard basis", "30-dagen inzicht", "Boekhoudkoppeling",
          "Financiële logica", "Automatiseringen", "UX & mobiel", "Testen & opleveren",
        ].map((title, i) => <article className={i === 13 ? "is-final" : ""} key={title}><span>{String(i + 1).padStart(2, "0")}</span><b>{title}</b></article>)}
      </div>
      <p className="requirements"><b>Startvoorwaarden</b> Toegang tot boekhoudsystemen · goede brondata · tijdige feedback</p>
      <TomatoBrand />
    </Slide>,

    <Slide key="roadmap">
      <Kicker>Vervolgstappen</Kicker>
      <h2>Van interne basis naar<br /><em>volledige boutique.</em></h2>
      <p className="slide-intro">V1 is het fundament. Daarna groeit het platform mee met Twenty6.</p>
      <div className="roadmap">
        <article><span>Nu</span><h3>V1</h3><b>Digital Boutique</b><p>Interne klantomgeving</p></article>
        <article><span>Daarna</span><h3>V1.5</h3><b>Gentlemen Club</b><p>Loyaliteit en groei</p></article>
        <article className="roadmap-v2"><span>Toekomst</span><h3>V2</h3><b>Digital Boutique</b><p>Volledig klantplatform</p>
          <ul><li>Facturen & orders</li><li>Supply chain</li><li>Klantenapp</li><li>Online bestellen & orderstatus</li></ul>
        </article>
      </div>
      <p className="fine-print">Klantenapp: artikelen · shoptegoed · aanbevelingen · outfit van de maand · Twenty6 Tutorials</p>
      <TomatoBrand />
    </Slide>,

    <Slide key="offer" tone="wine">
      <Kicker>Het aanbod</Kicker>
      <h2>Vier keuzes. <em>Eén ambitie.</em></h2>
      <p className="slide-intro">Kies de constructie die past bij tempo, risico en samenwerking.</p>
      <div className="offer-grid">
        {[
          ["01", "Contract opstart", "10% rev share", "24 maanden"],
          ["02", "€ 2.000 opstart", "5% rev share", "24 maanden"],
          ["03", "€ 4.600 opstart", "10% rev share", "eerste 12 maanden"],
          ["04", "€ 4.600 opstart", "€ 660 per maand", "vast maandmodel"],
        ].map(([n, title, fee, term]) => (
          <article key={n}><span>Keuze {n}</span><h3>{title}</h3><div><strong>{fee}</strong><small>{term}</small></div><p><CircleCheck aria-hidden="true" /> V0 + Digital Boutique V1</p></article>
        ))}
      </div>
      <small className="vat">Alle bedragen exclusief btw.</small>
      <TomatoBrand />
    </Slide>,

    <Slide key="close" className="closing-slide">
      <div className="closing-copy">
        <Kicker>Samen bouwen</Kicker>
        <h2>Aan een Digital Boutique<br />die net zo goed zit<br /><em>als een Twenty6-pak.</em></h2>
        <p>Op maat gemaakt, tot in detail.</p>
        <span className="story-label">Klaar om de eerste maat te nemen?</span>
      </div>
      <div className="closing-brand">
        <img src={tomato} alt="AI-tomates tomaat" />
        <img src={logo} alt="AI-tomates — AI & Automation Agency" />
      </div>
    </Slide>,
  ];

  const enterFullscreen = () => document.documentElement.requestFullscreen?.();

  return (
    <main
      className="brand-story"
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => {
        const end = event.changedTouches[0]?.clientX;
        if (touchStart.current === null || end === undefined) return;
        const delta = touchStart.current - end;
        if (Math.abs(delta) > 55) go(current + (delta > 0 ? 1 : -1));
      }}
    >
      <div className="story-stage" aria-live="polite">
        <div className="story-track" style={{ transform: `translateX(-${current * 100}%)` }}>{slides}</div>
      </div>

      <header className="story-nav">
        <button className="brand-button" onClick={() => go(0)} aria-label="Ga naar de eerste slide">
          <img src={tomato} alt="" /><span>Twenty6 × AI-tomates</span>
        </button>
        <button className="chapter-button" onClick={() => setOverview(true)}>{chapters[current]}</button>
        <button className="icon-button" onClick={enterFullscreen} aria-label="Open volledig scherm" title="Volledig scherm"><Maximize2 /></button>
      </header>

      <footer className="story-controls">
        <button className="icon-button" onClick={() => go(current - 1)} disabled={current === 0} aria-label="Vorige slide"><ArrowLeft /></button>
        <button className="progress-button" onClick={() => setOverview(true)} aria-label="Open hoofdstukken">
          <span>{String(current + 1).padStart(2, "0")}</span>
          <i><b style={{ width: `${((current + 1) / chapters.length) * 100}%` }} /></i>
          <span>{String(chapters.length).padStart(2, "0")}</span>
        </button>
        <button className="icon-button" onClick={() => go(current + 1)} disabled={current === chapters.length - 1} aria-label="Volgende slide"><ArrowRight /></button>
      </footer>

      {overview && (
        <div className="overview" role="dialog" aria-modal="true" aria-label="Hoofdstukken">
          <div className="overview-inner">
            <div className="overview-head"><Kicker>Overzicht</Kicker><button className="close-button" onClick={() => setOverview(false)}>Sluiten</button></div>
            <div className="overview-grid">
              {chapters.map((chapter, index) => (
                <button key={chapter} onClick={() => go(index)} className={index === current ? "active" : ""}>
                  <span>{String(index + 1).padStart(2, "0")}</span><strong>{chapter}</strong>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}