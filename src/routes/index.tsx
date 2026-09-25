import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChartNoAxesCombined,
  Database,
  Maximize2,
  PackageCheck,
  Search,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import logo from "@/assets/ai-tomates-logo.png";
import tomato from "@/assets/tomato-icon.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Twenty6 Digital Boutique — AI-tomates" },
      { name: "description", content: "Interactieve pitch voor de Twenty6 Digital Boutique: klantdata, V1, planning en aanbod." },
      { property: "og:title", content: "Twenty6 Digital Boutique — AI-tomates" },
      { property: "og:description", content: "Alle kennis over een klant op één plek — een interactieve merkpresentatie." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrandStory,
});

const chapters = ["Opening", "Datafase", "Digital Boutique V1", "Datamodel", "Planning", "Vervolg", "Aanbod", "Samen bouwen"];

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: .65, delay, ease: [.2, .7, .3, 1] }}>{children}</motion.div>;
}

function Kicker({ children }: { children: ReactNode }) {
  return <div className="deck-kicker"><span />{children}</div>;
}

function Frame({ children, index }: { children: ReactNode; index: number }) {
  return (
    <div className="slide-frame">
      <div className="deck-brand"><img src={tomato} alt="" /><div><strong><em>AI-</em>tomates</strong><small>AI &amp; Automation Agency</small></div></div>
      <div className="chapter-rail">
        {chapters.map((chapter, i) => <span className={i === index ? "active" : i < index ? "done" : ""} key={chapter}>{String(i + 1).padStart(2, "0")}{i === index && <b>{chapter}</b>}</span>)}
      </div>
      <div className="slide-body">{children}</div>
    </div>
  );
}

function Heading({ kicker, title, accent, lead }: { kicker: string; title: string; accent?: string; lead?: string }) {
  return <><Reveal><Kicker>{kicker}</Kicker></Reveal><Reveal delay={.08}><h2>{title}{accent && <><br /><em>{accent}</em></>}</h2></Reveal>{lead && <Reveal delay={.16}><p className="deck-lead">{lead}</p></Reveal>}</>;
}

function Feature({ Icon, title, copy, delay }: { Icon: LucideIcon; title: string; copy: string; delay: number }) {
  return <Reveal delay={delay}><article className="glass-card feature-card"><Icon /><div><h3>{title}</h3><p>{copy}</p></div></article></Reveal>;
}

function SlideContent({ index }: { index: number }) {
  if (index === 0) return <Frame index={index}><div className="cover-grid"><div><Reveal><span className="deck-badge">Voorstel · september 2026</span></Reveal><Reveal delay={.1}><h1>Twenty6<br /><em>Digital Boutique.</em></h1></Reveal><Reveal delay={.22}><p className="deck-lead">Alle kennis over een klant op één plek. Van maten en aankopen tot afspraken en opvolging.</p></Reveal><Reveal delay={.32}><div className="fact-row"><div><small>Van</small><strong>Losse data</strong></div><div><small>Naar</small><strong>Eén klantbeeld</strong></div><div><small>V1 live in</small><strong className="accent">14 dagen</strong></div></div></Reveal></div><motion.div className="cover-mark" initial={{ opacity: 0, scale: .84, rotate: -7 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .9 }}><div className="brand-glow" /><img src={tomato} alt="AI-tomates tomaat" /></motion.div></div></Frame>;

  if (index === 1) return <Frame index={index}><Heading kicker="Stap één · V0" title="Van drie bronnen naar" accent="één betrouwbare basis." lead="In twee werkdagen verzamelen, uploaden en opschonen we alle klantdata." /><div className="three-grid process-cards">{[["01","Verzamelen","Oud en nieuw boekhoudprogramma, met HubSpot als optie."],["02","Uploaden","Alles komt samen in één centrale klantendatabase."],["03","Opschonen","Dubbele en foutieve data eruit; één compleet klantbeeld over."]].map(([n,t,c],i)=><Reveal delay={.24+i*.08} key={n}><article className="glass-card step-card"><span>{n}</span><h3>{t}</h3><p>{c}</p></article></Reveal>)}</div><Reveal delay={.55}><div className="delivery-strip"><div><b>Dag 01</b><span>Uitlezen &amp; structureren</span></div><div><b>Dag 02</b><span>Dubbelchecken &amp; testen</span></div></div></Reveal></Frame>;

  if (index === 2) return <Frame index={index}><Heading kicker="Het resultaat" title="Digital Boutique" accent="V1." lead="De interne omgeving die klantkennis direct bruikbaar maakt." /><div className="feature-grid"><Feature Icon={UsersRound} title="Klantenoverzicht" copy="Junior en Munzur vinden iedere klant direct." delay={.22}/><Feature Icon={UserRound} title="Compleet klantprofiel" copy="Contact, maten, verjaardag, tegoed, notities en acties." delay={.29}/><Feature Icon={CalendarDays} title="Weekkalender" copy="Afspraken bij Jun en Munzur in één overzicht." delay={.36}/><Feature Icon={PackageCheck} title="Orders gekoppeld" copy="Aankopen, bedragen en orderstatus per klant." delay={.43}/><Feature Icon={Search} title="Gecombineerd zoeken" copy="Op naam, maat, locatie, aankoop, besteding of order." delay={.5}/><Feature Icon={ChartNoAxesCombined} title="Admin-inzichten" copy="Omzet, aanvragen, populaire items en klanten met aandacht." delay={.57}/></div></Frame>;

  if (index === 3) return <Frame index={index}><Heading kicker="Wat zit erachter?" title="Eén klant." accent="Zeven verbonden datasets." lead="Informatie blijft gescheiden, maar hoort via klant_id altijd bij hetzelfde profiel." /><div className="data-map"><Reveal delay={.24} className="data-core"><Database /><strong>klant_id</strong><small>de verbinding</small></Reveal><div className="data-rows">{[["01","Klanten","contact · adres · tegoed"],["02","Maten","taille · borst · been"],["03","Orders / aankopen","artikelen · bedrag · status"],["04","Betalingen","factuur · status · datum"],["05","Afspraken","datum · type · eigenaar"],["06","Notities / gesprekken","context · transcript"],["07","Verzoeken / to-do’s","status · deadline · eigenaar"]].map(([n,t,c],i)=><Reveal delay={.28+i*.055} key={n}><article><span>{n}</span><div><h3>{t}</h3><p>{c}</p></div></article></Reveal>)}</div></div></Frame>;

  if (index === 4) return <Frame index={index}><Heading kicker="Zo bouwen we V1" title="14 werkdagen." accent="Van fundament tot live." lead="Na de datafase en akkoord op het datamodel." /><div className="timeline">{[["Dag 1–3","Fundament & klantdata","Datamodel, database en eerste klantprofiel.",22],["Dag 4–7","Boutique kern","Profielen, orders, kalender en zoeken.",50],["Dag 8–11","Inzicht & koppeling","Dashboard, 30-dagen inzicht en boekhouding.",79],["Dag 12–13","Automatisering & UX","Financiële logica, mobiel en laatste aanscherping.",93],["Dag 14","Testen & opleveren","De Digital Boutique V1 staat klaar.",100]].map(([d,t,c,p],i)=><Reveal delay={.22+i*.08} key={String(d)}><article><b>{d}</b><div><h3>{t}</h3><p>{c}</p></div><i><motion.span initial={{width:0}} animate={{width:`${p}%`}} transition={{duration:1,delay:.4+i*.1}} /></i><small>{p}%</small></article></Reveal>)}</div></Frame>;

  if (index === 5) return <Frame index={index}><Heading kicker="Vervolgstappen" title="Het fundament staat." accent="De boutique groeit mee." lead="Van interne klantkennis naar loyaliteit en een volledig klantplatform." /><div className="roadmap-grid">{[["Nu","V1","Digital Boutique","Interne klantomgeving"],["Daarna","V1.5","Gentlemen Club","Omgeving voor clubleden"],["Toekomst","V2","Digital Boutique","Volledig klantplatform"]].map(([s,v,t,c],i)=><Reveal delay={.23+i*.1} key={v}><article className={`glass-card roadmap-card ${i===2?"future":""}`}><span>{s}</span><h3>{v}</h3><strong>{t}</strong><p>{c}</p>{i===2&&<ul><li>Facturen & orders</li><li>Supply chain</li><li>Klantenapp</li><li>Online bestellen & orderstatus</li></ul>}</article></Reveal>)}</div></Frame>;

  if (index === 6) return <Frame index={index}><Heading kicker="Het aanbod" title="Het aanbod —" accent="vier keuzes." /><div className="offer-grid">{[["01","Contract opstart","10% rev share","24 maanden"],["02","€ 2.000 opstart","5% rev share","24 maanden"],["03","€ 4.600 opstart","10% rev share","eerste 12 maanden"],["04","€ 4.600 opstart","€ 660 per maand","vast maandmodel"]].map(([n,t,p,m],i)=><Reveal delay={.2+i*.08} key={n}><article className={`glass-card offer-card ${i===3?"featured":""}`}><div><span>Keuze {n}</span>{i===3&&<small>Vast model</small>}</div><h3>{t}</h3><strong>{p}</strong><p>{m}</p></article></Reveal>)}</div></Frame>;

  return <Frame index={index}><div className="closing"><motion.div className="closing-glow" animate={{ scale:[1,1.1,1], opacity:[.55,.9,.55] }} transition={{duration:6,repeat:Infinity}}/><Reveal><span className="deck-badge">Volgende stap</span></Reveal><Reveal delay={.12}><h2>Aan een Digital Boutique<br />die net zo goed zit<br /><em>als een Twenty6-pak.</em></h2></Reveal><Reveal delay={.24}><p>Op maat gemaakt, tot in detail.</p></Reveal><Reveal delay={.34}><div className="closing-lockup"><img src={logo} alt="AI-tomates — AI & Automation Agency"/></div></Reveal></div></Frame>;
}

function ScaledSlide({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(.5);
  const [compact, setCompact] = useState(false);
  useEffect(() => { const el=ref.current; if(!el)return; const measure=()=>{const {width,height}=el.getBoundingClientRect();const small=width<1000;setCompact(small);setScale(small?width/1920:Math.min(width/1920,height/1080));};measure();const ro=new ResizeObserver(measure);ro.observe(el);return()=>ro.disconnect();},[]);
  return <div ref={ref} className="scaled-stage"><div className="scaled-slide" style={{transform:`scale(${scale})`,top:compact?0:"50%",marginTop:compact?0:-540,transformOrigin:compact?"top center":"center center"}}>{children}</div></div>;
}

function BrandStory() {
  const [current,setCurrent]=useState(0); const [direction,setDirection]=useState(1); const touchX=useRef<number|null>(null);
  const go=useCallback((next:number)=>{const value=Math.max(0,Math.min(chapters.length-1,next));setDirection(value>=current?1:-1);setCurrent(value);},[current]);
  useEffect(()=>{setCurrent(0);setDirection(1);},[]);
  useEffect(()=>{const url=new URL(window.location.href);url.searchParams.set("slide",String(current+1));window.history.replaceState({},"",url);document.title=`${current+1}/8 — ${chapters[current]}`;},[current]);
  useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(["ArrowRight"," ","PageDown"].includes(e.key)){e.preventDefault();go(current+1)}if(["ArrowLeft","PageUp"].includes(e.key)){e.preventDefault();go(current-1)}if(e.key.toLowerCase()==="f")document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.();};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey);},[current,go]);
  return <main className="deck-shell" onTouchStart={e=>touchX.current=e.touches[0]?.clientX??null} onTouchEnd={e=>{if(touchX.current===null)return;const dx=(e.changedTouches[0]?.clientX??touchX.current)-touchX.current;if(Math.abs(dx)>55)go(current+(dx<0?1:-1));touchX.current=null;}}>
    <AnimatePresence mode="wait" initial={false}><motion.div key={current} className="motion-stage" initial={{opacity:0,x:direction*65,scale:.985}} animate={{opacity:1,x:0,scale:1}} exit={{opacity:0,x:direction*-65,scale:.985}} transition={{duration:.5,ease:[.2,.7,.3,1]}}><ScaledSlide><SlideContent index={current}/></ScaledSlide></motion.div></AnimatePresence>
    <button className="deck-arrow left" onClick={()=>go(current-1)} disabled={current===0} aria-label="Vorige slide"><ArrowLeft/></button><button className="deck-arrow right" onClick={()=>go(current+1)} disabled={current===7} aria-label="Volgende slide"><ArrowRight/></button>
    <div className="deck-controls"><span>{String(current+1).padStart(2,"0")} / 08</span><i><b style={{width:`${((current+1)/8)*100}%`}}/></i><button onClick={()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.()} aria-label="Volledig scherm"><Maximize2/></button></div>
  </main>;
}