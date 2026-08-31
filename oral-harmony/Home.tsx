/**
 * Galeria de Luz Clínica — versão clara: branco mineral, rosa pétala e dourado acetinado.
 * O layout se comporta como uma exposição guiada; movimento revela cuidado e nunca o substitui.
 */
import { useGSAP } from "@gsap/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Instagram,
  MapPin,
  Menu,
  MoveRight,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import CSSPlugin from "gsap/CSSPlugin";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import CustomBounce from "gsap/CustomBounce";
import CustomEase from "gsap/CustomEase";
import CustomWiggle from "gsap/CustomWiggle";
import Draggable from "gsap/Draggable";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import EasePack, { ExpoScaleEase, RoughEase, SlowMo } from "gsap/EasePack";
import EaselPlugin from "gsap/EaselPlugin";
import Flip from "gsap/Flip";
import { GSDevTools } from "gsap/GSDevTools";
import InertiaPlugin from "gsap/InertiaPlugin";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import MotionPathHelper from "gsap/MotionPathHelper";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import Observer from "gsap/Observer";
import Physics2DPlugin from "gsap/Physics2DPlugin";
import PhysicsPropsPlugin from "gsap/PhysicsPropsPlugin";
import PixiPlugin from "gsap/PixiPlugin";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import TextPlugin from "gsap/TextPlugin";

const clinicImages = {
  equipe: "./assets/irmas-black&white-style.jpg",
  sorriso: "./assets/irmas-hero.png",
  avaliacao: "./assets/irmas-hero.png",
  sorriso1: "./assets/sorriso-1.jpg",
  sorriso2: "./assets/sorriso-2.jpg",
};

const services = [
  {
    number: "01",
    eyebrow: "Prevenção",
    title: "Cuidado que começa na escuta.",
    text: "Avaliação, limpeza e acompanhamento com conversa clara em cada etapa.",
    tags: ["Avaliação", "Limpeza dental", "Odontopediatria"],
  },
  {
    number: "02",
    eyebrow: "Precisão",
    title: "Técnica para preservar o que é seu.",
    text: "Endodontia, periodontia, próteses e planejamento restaurador com atenção aos detalhes.",
    tags: ["Endodontia", "Periodontia", "Prótese dentária"],
  },
  {
    number: "03",
    eyebrow: "Estética",
    title: "Uma harmonia que continua sendo você.",
    text: "Clareamento, lentes, botox, preenchimento e harmonização com leveza e intenção.",
    tags: ["Lentes", "Clareamento", "Harmonização facial"],
  },
];

gsap.registerPlugin(
  CSSPlugin,
  CSSRulePlugin,
  CustomBounce,
  CustomEase,
  CustomWiggle,
  Draggable,
  DrawSVGPlugin,
  EasePack,
  EaselPlugin,
  Flip,
  GSDevTools,
  InertiaPlugin,
  MorphSVGPlugin,
  MotionPathHelper,
  MotionPathPlugin,
  Observer,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  PixiPlugin,
  ScrambleTextPlugin,
  ScrollSmoother,
  ScrollToPlugin,
  ScrollTrigger,
  SplitText,
  TextPlugin,
);
// Em bundlers ESM, os eases do pacote são inicializados individualmente antes do uso de suas fábricas de configuração.
(SlowMo as any).register(gsap);
(ExpoScaleEase as any).register(gsap);
(RoughEase as any).register(gsap);

function Wordmark() {
  return (
    <a className="brand" href="#inicio" aria-label="Oral Harmony, início">
      <img className="brand-mark" src="./assets/logo-greybackground.png" alt="" aria-hidden="true" width="44" height="44" />
      <span className="brand-type">
        <strong>ORAL</strong>
        <em>HARMONY</em>
      </span>
    </a>
  );
}

function PlugLabel({ children }: { children: string }) {
  // A atribuição das cenas permanece no código; a experiência pública fala apenas a linguagem de cuidado da marca.
  void children;
  return null;
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const { contextSafe } = useGSAP({ scope: root });

  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dismissMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        if (lastFocusedRef.current) {
          lastFocusedRef.current.focus();
        }
      }
    };
    window.addEventListener("keydown", dismissMenu);
    return () => window.removeEventListener("keydown", dismissMenu);
  }, [menuOpen]);

  const toggleMenu = () => {
    if (!menuOpen) {
      lastFocusedRef.current = document.activeElement as HTMLElement;
      setMenuOpen(true);
    } else {
      setMenuOpen(false);
      if (lastFocusedRef.current) {
        lastFocusedRef.current.focus();
      }
    }
  };

  const scrollTo = contextSafe((id: string) => {
    setMenuOpen(false);
    gsap.to(window, {
      duration: 0.85,
      scrollTo: { y: id, offsetY: 72, autoKill: true },
      ease: "oral-out",
    });
  });

  const chooseService = contextSafe((next: number) => {
    const cards = servicesRef.current?.querySelectorAll(".service-card");
    if (!cards || next === activeService) return;
    const state = Flip.getState(cards);
    setActiveService(next);
    requestAnimationFrame(() => {
      Flip.from(state, { duration: 0.55, ease: "oral-out", absolute: false, stagger: 0.03 });
    });
  });

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mm = gsap.matchMedia();
      const rootNode = root.current;
      if (!rootNode) return undefined;

      CustomEase.create("oral-out", "M0,0 C0.16,1 0.3,1 1,1");
      CustomBounce.create("soft-bounce", { strength: 0.32, endAtStart: false });
      CustomWiggle.create("care-wiggle", { wiggles: 3, type: "easeOut" });
      const editorialRoughness = RoughEase.config({ template: "none.out", strength: 0.2, points: 12, taper: "out", randomize: false, clamp: true });
      const porcelainScale = ExpoScaleEase.config(1, 1.06, "power3.out");
      const slowBreath = SlowMo.config(0.65, 0.72, false);

      // A suavização permanece disponível como camada opcional; o percurso padrão preserva scroll nativo e previsível.
      let smoother: ScrollSmoother | undefined;
      if (new URLSearchParams(window.location.search).has("smooth")) {
        smoother = ScrollSmoother.create({ smooth: 0.78, effects: true, normalizeScroll: true, ignoreMobileResize: true });
      }

      const intro = gsap.timeline({ defaults: { ease: "oral-out" } });
      if (!reducedMotion) {
        const split = new SplitText(".hero-title", { type: "lines,words", mask: "lines" });
        intro
          .from(".nav-inner", { y: -18, autoAlpha: 0, duration: 0.58 })
          .from(".hero-kicker, .hero-copy, .hero-actions", { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.09 }, "<0.18")
          .from(split.words, { yPercent: 110, rotate: 4, duration: 0.95, stagger: 0.034 }, "<0.04")
          .from(".hero-image-primary", { scale: 1.08, autoAlpha: 0, duration: 1.15, ease: "soft-bounce" }, "<0.14")
          .from(".hero-image-secondary", { y: 40, autoAlpha: 0, scale: 0.92, duration: 1, ease: "soft-bounce" }, "<0.3")
          .to(".availability", { duration: 0.9, scrambleText: { text: "Seg–Sex · atendimento com hora marcada", chars: "lowerCase" } }, "<0.1");
      } else {
        gsap.set(".nav-inner, .hero-kicker, .hero-copy, .hero-actions, .hero-title, .hero-image-primary, .hero-image-secondary", { autoAlpha: 1 });
      }

      const careRule = CSSRulePlugin.getRule(".care-rail::before");
      if (careRule && !reducedMotion) {
        gsap.to(careRule, {
          scrollTrigger: { trigger: ".journey", start: "top 72%", end: "bottom 35%", scrub: true },
          cssRule: { backgroundColor: "#bf7e50" },
        });
      }

      const observer = Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        onDown: () => rootNode.classList.add("scrolling-down"),
        onUp: () => rootNode.classList.remove("scrolling-down"),
      });

      if (!reducedMotion) {
        gsap.to(".precision-symbol", { rotation: 40, duration: 2.8, repeat: -1, yoyo: true, ease: editorialRoughness });
        gsap.to(".weight-orb", { scale: 1.06, duration: 2.3, repeat: -1, yoyo: true, ease: porcelainScale });
        gsap.to(".contact-spark", { rotation: 23, duration: 3.8, repeat: -1, yoyo: true, ease: slowBreath });
        gsap.to(".presence-keyword", {
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "none",
          text: { value: "leveza", delimiter: "" },
          scrollTrigger: { trigger: ".motion-lab", start: "top 75%", toggleActions: "play pause resume pause" },
        });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 42,
            opacity: 0,
            duration: 0.85,
            ease: "oral-out",
            immediateRender: false,
            scrollTrigger: { trigger: element, start: "top 86%", toggleActions: "play none none none" },
          });
        });

        gsap.fromTo(
          ".care-track",
          { drawSVG: "0% 0%" },
          {
            drawSVG: "0% 100%",
            ease: "none",
            scrollTrigger: { trigger: ".journey", start: "top 72%", end: "bottom 42%", scrub: 0.55 },
          },
        );

        if (pathRef.current && dotRef.current) {
          gsap.to(dotRef.current, {
            duration: 1,
            repeat: -1,
            ease: "none",
            motionPath: { path: pathRef.current, align: pathRef.current, alignOrigin: [0.5, 0.5], autoRotate: true },
          });
          gsap.to(pathRef.current, {
            duration: 1.45,
            repeat: -1,
            yoyo: true,
            morphSVG: "M18,90 C108,5 339,25 432,107 C346,204 119,196 18,90 Z",
            ease: "sine.inOut",
          });
        }

        const physicsTarget = { rotation: 0, x: 0 };
        gsap.to(physicsTarget, {
          duration: 2.3,
          physics2D: { velocity: 45, angle: -30, gravity: 35 },
          repeat: -1,
          repeatDelay: 0.3,
          onUpdate: () => rootNode.style.setProperty("--physics-spin", `${physicsTarget.rotation}deg`),
        });
        gsap.to(physicsTarget, {
          duration: 1.3,
          physicsProps: { x: { velocity: 180, friction: 280 } },
          repeat: -1,
          yoyo: true,
          onUpdate: () => rootNode.style.setProperty("--physics-x", `${physicsTarget.x * 0.018}px`),
        });
      }

      const rail = servicesRef.current;
      let draggers: Draggable[] = [];
      if (rail && !reducedMotion) {
        const parent = rail.parentElement;
        const maxX = Math.max(0, rail.scrollWidth - (parent?.clientWidth ?? 0) + 22);
        draggers = Draggable.create(rail, {
          type: "x",
          bounds: { minX: -maxX, maxX: 0 },
          inertia: true,
          dragResistance: 0.12,
          edgeResistance: 0.7,
          allowContextMenu: true,
          cursor: "grab",
          activeCursor: "grabbing",
        });
      }

      const canvas = canvasRef.current;
      let stage: any;
      let easelTween: gsap.core.Tween | undefined;
      let updateStage: (() => void) | undefined;
      let isCanvasSceneActive = true;
      if (canvas && !reducedMotion) {
        void import("@createjs/easeljs").then((module) => {
          if (!isCanvasSceneActive) return;
          const CreateJS = ((module as any).default ?? module) as any;
          stage = new CreateJS.Stage(canvas);
          const dot = new CreateJS.Shape();
          dot.graphics.beginFill("#c27c77").drawCircle(0, 0, 4);
          dot.x = 22;
          dot.y = 22;
          stage.addChild(dot);
          easelTween = gsap.to(dot, { duration: 1.7, repeat: -1, yoyo: true, ease: "care-wiggle", easel: { x: 174, y: 28 } });
          updateStage = () => stage.update();
          gsap.ticker.add(updateStage);
          updateStage();
        });
      }

      if (!reducedMotion) {
        void import("pixi.js").then((pixiModule) => {
          if (!isCanvasSceneActive) return;
          const pixi = pixiModule as any;
          PixiPlugin.registerPIXI(pixi);
          const pixiProbe = new pixi.Graphics();
          gsap.to(pixiProbe, { duration: 0.8, repeat: -1, yoyo: true, pixi: { alpha: 0.45, scale: 1.12 } });
        });
      }

      if (import.meta.env.DEV && new URLSearchParams(window.location.search).has("gsap-debug")) {
        GSDevTools.create({ animation: intro, visibility: "auto" });
      }
      if (import.meta.env.DEV && new URLSearchParams(window.location.search).has("edit-path") && dotRef.current) {
        MotionPathHelper.create(dotRef.current);
      }

      const handleVisibility = () => {
        if (document.hidden) {
          gsap.globalTimeline.pause();
        } else {
          gsap.globalTimeline.resume();
          ScrollTrigger.refresh();
        }
      };
      document.addEventListener("visibilitychange", handleVisibility);

      return () => {
        observer.kill();
        isCanvasSceneActive = false;
        draggers.forEach((dragger) => dragger.kill());
        easelTween?.kill();
        if (updateStage) gsap.ticker.remove(updateStage);
        smoother?.kill();
        document.removeEventListener("visibilitychange", handleVisibility);
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="oral-site" id="inicio">
      <div className="reading-progress" aria-hidden="true" />
      <header className="site-header">
        <div className="nav-inner">
          <Wordmark />
          <nav className="desktop-nav" aria-label="Navegação principal">
            <button onClick={() => scrollTo("#a-clinica")}>A clínica</button>
            <button onClick={() => scrollTo("#cuidados")}>Cuidados</button>
            <button onClick={() => scrollTo("#contato")}>Contato</button>
          </nav>
          <div className="nav-cta">
            <a className="nav-instagram" href="https://www.instagram.com/oral.harmony/" target="_blank" rel="noreferrer" aria-label="Instagram da Oral Harmony">
              <Instagram size={17} aria-hidden="true" />
            </a>
            <button className="nav-book" onClick={() => scrollTo("#contato")}>
              Agendar avaliação <ArrowUpRight size={15} aria-hidden="true" />
            </button>
            <button className="menu-toggle" onClick={toggleMenu} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="menu-principal-mobile">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} id="menu-principal-mobile" aria-hidden={!menuOpen}>
          <button onClick={() => scrollTo("#a-clinica")}>A clínica</button>
          <button onClick={() => scrollTo("#cuidados")}>Cuidados</button>
          <button onClick={() => scrollTo("#contato")}>Contato</button>
          <a className="mobile-instagram" href="https://www.instagram.com/oral.harmony/" target="_blank" rel="noreferrer"><Instagram size={16} aria-hidden="true" /> Instagram</a>
        </div>
      </header>

      <main id="smooth-wrapper">
        <div id="smooth-content">
          <section className="hero">
            <div className="hero-petals" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => (
                <span key={i} className={`petal petal-${i % 5}`} style={{ left: `${5 + (i * 7) % 90}%`, animationDelay: `${(i * 1.3) % 8}s`, animationDuration: `${6 + (i % 4) * 1.5}s` }} />
              ))}
            </div>
            <div className="hero-content">
              <div className="hero-copy-wrap">
                <p className="hero-kicker"><span className="eyebrow-dot" /> Odontologia e harmonização · Poços de Caldas</p>
                <h1 className="hero-title">Seu sorriso merece<br /><i>uma escuta atenta.</i></h1>
                <p className="hero-copy">Um espaço de cuidado técnico e acolhedor, pensado para que você se sinta seguro em cada decisão.</p>
                <div className="hero-actions">
                  <button className="button-primary" onClick={() => scrollTo("#contato")}>
                    Falar com a Oral Harmony <MoveRight size={19} aria-hidden="true" />
                  </button>
                  <button className="text-button" onClick={() => scrollTo("#a-clinica")}>Conheça nossa história <ArrowDownRight size={17} aria-hidden="true" /></button>
                </div>
                <div className="hero-footer-row">
                  <p className="availability"><Clock3 size={14} aria-hidden="true" /> Seg–Sex · atendimento com hora marcada</p>
                  <a className="hero-instagram" href="https://www.instagram.com/oral.harmony/" target="_blank" rel="noreferrer" aria-label="Siga no Instagram">
                    <Instagram size={16} aria-hidden="true" /> @oral.harmony
                  </a>
                </div>
              </div>
              <div className="hero-image-group">
                <div className="hero-image hero-image-primary" aria-label="Bruna e Isabela - Oral Harmony">
                  <img src="./assets/irmas-hero.png" alt="Bruna e Isabela - Oral Harmony" />
                  <div className="hero-image-overlay" />
                </div>
                <div className="hero-image hero-image-secondary" aria-label="Estilo Black & White - Oral Harmony">
                  <img src="./assets/irmas-black&white-style.jpg" alt="Bruna e Isabela - Oral Harmony" />
                  <div className="hero-image-overlay-secondary" />
                </div>
              </div>
            </div>
            <div className="hero-index"><span>01</span><i /> <span>06</span></div>
          </section>

          <section className="intro section-shell" id="a-clinica">
            <div className="section-meta" data-reveal><span>01 / A clínica</span><span>Bruna + Isabela</span></div>
            <div className="intro-layout">
              <h2 data-reveal>Um sonho de duas irmãs. <i>Uma experiência feita para você.</i></h2>
              <div className="intro-body" data-reveal>
                <p>Bruna e Isabela escolheram a mesma profissão e transformaram o desejo de ter uma clínica própria em um lugar com presença, técnica e leveza.</p>
                <p>Na Oral Harmony, cada pessoa é recebida com tempo para conversar, entender possibilidades e cuidar de si com confiança.</p>
                <button className="signature-link" onClick={() => scrollTo("#cuidados")}>Conhecer os cuidados <ArrowDownRight size={18} aria-hidden="true" /></button>
              </div>
            </div>
            <div className="portrait-composition" data-reveal>
          <figure className="clinic-photo photo-left"><img src={clinicImages.equipe} alt="Bruna e Isabela, da Oral Harmony" /><figcaption className="founder-plate"><b>Bruna</b><span>Endodontia</span><b>Isabela</b><span>Implantodontia</span></figcaption></figure>
              <figure className="clinic-photo photo-center"><img src={clinicImages.sorriso} alt="Imagem institucional da Oral Harmony" /></figure>
              <div className="portrait-note"><span>"</span> Cuidado tranquilo. Técnica segura. Resultados significativos. <small>— Oral Harmony</small></div>
              <canvas ref={canvasRef} className="easel-canvas" width="200" height="56" aria-hidden="true" />
              <PlugLabel>SplitText + EaselPlugin</PlugLabel>
            </div>
          </section>

          <section className="consultation-scene section-shell" aria-labelledby="consulta-title">
            <div className="consultation-meta" data-reveal><span>02 / Sua consulta</span><span>escuta · clareza · cuidado</span></div>
            <div className="consultation-grid">
              <div className="consultation-copy" data-reveal>
                <p className="eyebrow"><span className="eyebrow-dot" /> Uma conversa, antes de tudo</p>
                <h2 id="consulta-title">O cuidado começa quando <i>você é ouvido.</i></h2>
                <p>Em uma avaliação com calma, entendemos o que você procura, explicamos cada possibilidade e construímos um caminho que respeita o seu momento.</p>
                <div className="consultation-steps"><span><b>01</b> Entender suas prioridades</span><span><b>02</b> Traduzir opções com clareza</span><span><b>03</b> Planejar com segurança</span></div>
              </div>
              <div className="consultation-gallery" data-reveal>
                <figure className="consultation-photo consultation-photo-main"><img src={clinicImages.sorriso1} alt="Resultado de sorriso - Oral Harmony" /></figure>
                <figure className="consultation-photo consultation-photo-accent"><img src={clinicImages.sorriso2} alt="Detalhe de tratamento - Oral Harmony" /></figure>
              </div>
            </div>
            <div className="consultation-line" aria-hidden="true"><svg viewBox="0 0 760 162" preserveAspectRatio="none"><path d="M-16 127C81 23 164 180 274 91S459 32 555 82c72 37 135-34 223-62" /></svg><span>do diálogo ao cuidado</span></div>
          </section>

          <section className="journey section-shell" id="cuidados">
            <div className="section-meta" data-reveal><span>03 / Caminhos de cuidado</span><span>Explore, arraste, escolha</span></div>
            <div className="journey-heading" data-reveal><h2>O que faz sentido <br></br><i>para o seu momento?</i></h2><p>Do acompanhamento preventivo ao planejamento estético, o cuidado começa em uma avaliação individual.</p></div>
            <div className="care-rail" aria-hidden="true"><svg viewBox="0 0 440 210"><path className="care-track" d="M13 165 C110 35 175 203 270 92 C340 10 385 77 428 48" /></svg></div>
            <div className="care-orbit-wrap" aria-hidden="true">
              <svg viewBox="0 0 450 220"><path ref={pathRef} className="orbit-path" d="M18,90 C108,5 339,25 432,107 C346,204 119,196 18,90 Z" /></svg>
              <div ref={dotRef} className="orbital-dot" />
            </div>
            <div className="services-window" data-reveal>
              <div className="services-rail" ref={servicesRef}>
                {services.map((service, index) => (
                  <article className={`service-card ${activeService === index ? "is-active" : ""}`} key={service.number}>
                    <button className="service-card-button" onClick={() => chooseService(index)} aria-label={`Ver ${service.eyebrow}`}>
                      <div className="service-card-top"><span>{service.number}</span><span>{service.eyebrow}</span><ArrowUpRight size={18} /></div>
                      <h3>{service.title}</h3><p>{service.text}</p>
                      <div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </button>
                  </article>
                ))}
              </div>
            </div>
            <div className="motion-legend" data-reveal><span><i className="legend-drag" /> Arraste para explorar</span><PlugLabel>Draggable + InertiaPlugin + Flip</PlugLabel></div>
          </section>

          <section className="precision section-shell">
            <div className="precision-symbol" aria-hidden="true"><span /><span /><span /></div>
            <figure className="precision-portrait" data-reveal><img src={clinicImages.sorriso2} alt="Detalhe da experiência de avaliação da Oral Harmony" /><figcaption>Consulta com conversa clara, sem pressa.</figcaption></figure>
            <div className="precision-copy" data-reveal>
              <p className="eyebrow"><span className="eyebrow-dot" /> Cuidado com propósito</p>
              <h2>Precisão que acolhe. <br></br><i>Leveza que permanece.</i></h2>
              <p>Bruna é especializada em endodontia. Isabela está concluindo sua especialização em implantodontia. Juntas, unem estudo contínuo e uma escuta que respeita o seu ritmo.</p>
              <div className="founder-points"><span><Check size={16} /> Conversa clara em cada etapa</span><span><Check size={16} /> Plano de cuidado individual</span><span><Check size={16} /> Ambiente sereno e seguro</span></div>
            </div>
          </section>

          <section className="motion-lab section-shell">
            <div className="section-meta" data-reveal><span>04 / Ritmo da harmonia</span><span>Movimento responsivo</span></div>
            <div className="motion-lab-header" data-reveal>
              <h2>Pequenos gestos.<br /><i>Grande diferença.</i></h2>
              <p>Uma camada experimental de movimento traduz a atenção aos detalhes que existe em cada atendimento.</p>
            </div>
            <div className="motion-lab-grid">
              <div className="morph-card" data-reveal>
                <div className="morph-card-inner">
                  <svg className="morph-svg" viewBox="0 0 300 300" aria-hidden="true">
                    <path className="morph-flower" d="M150 33c28 57 88 47 99 105-57 12-48 71-99 99-51-28-42-87-99-99 11-58 71-48 99-105Z" />
                    <circle cx="150" cy="150" r="13" />
                  </svg>
                </div>
                <div className="morph-card-content">
                  <span className="morph-label">Venha ser feliz na Oral Harmony</span>
                  <PlugLabel>MorphSVG + DrawSVG</PlugLabel>
                </div>
              </div>
              <div className="motion-stack">
                <div className="presence-card" data-reveal>
                  <p className="presence-keyword">presença</p>
                  <span className="presence-desc">O conteúdo reage com suavidade, sem retirar a autonomia de quem navega.</span>
                  <PlugLabel>TextPlugin + ScrambleText</PlugLabel>
                </div>
                <div className="weight-card" data-reveal>
                  <div className="weight-orb" />
                  <span className="weight-desc">Cuidado, atenção e profissionalismo.</span>
                  <PlugLabel>PhysicsProps + CustomBounce</PlugLabel>
                </div>
              </div>
            </div>
          </section>

          <section className="faq section-shell">
            <div className="faq-intro" data-reveal><p className="eyebrow"><span className="eyebrow-dot" /> Antes de vir</p><h2>Alguma dúvida <br></br> <i>antes da avaliação?</i></h2></div>
            <div className="faq-list" data-reveal>
              {["Como agendo minha avaliação?", "Quais são os horários de atendimento?", "Onde fica a Oral Harmony?"].map((question, index) => (
                <div className={`faq-item ${faqOpen === index ? "open" : ""}`} key={question}>
                  <button onClick={() => setFaqOpen(faqOpen === index ? null : index)} aria-expanded={faqOpen === index} aria-controls={`faq-panel-${index}`}><span>{question}</span><ChevronDown size={20} /></button>
                  <div className="faq-answer" id={`faq-panel-${index}`} role="region"><p>{index === 0 ? "Fale com a equipe pelo WhatsApp. Elas vão encontrar um horário de avaliação que funcione para você." : index === 1 ? "De segunda a quinta, das 8h às 19h; sexta, das 8h às 18h. Aos sábados e domingos, a clínica não atende." : "Avenida Marechal Castelo Branco, 190, Jardim São Paulo, em Poços de Caldas — MG."}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section className="contact section-shell" id="contato">
            <div className="contact-spark" aria-hidden="true"><span /><span /><span /></div>
            <div className="contact-main" data-reveal><p className="eyebrow"><span className="eyebrow-dot" /> Estamos por perto</p><h2>Vamos desenhar um cuidado que <i>faça sentido para você.</i></h2><a className="contact-phone" href="https://wa.me/553530147148?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20Oral%20Harmony." target="_blank" rel="noreferrer">(35) 3014–7148 <ArrowUpRight size={23} aria-hidden="true" /></a></div>
            <div className="contact-details" data-reveal>
              <a href="https://maps.google.com/?q=Avenida+Marechal+Castelo+Branco,+190,+Po%C3%A7os+de+Caldas+-+MG" target="_blank" rel="noreferrer"><MapPin size={18} /><span>Avenida Marechal Castelo Branco, 190<br />Jardim São Paulo · Poços de Caldas, MG</span><ArrowUpRight size={16} /></a>
              <a href="mailto:oralharmony.odontologia@hotmail.com"><CalendarDays size={18} /><span>oralharmony.odontologia@hotmail.com<br /><b>Agendamentos e informações</b></span><ArrowUpRight size={16} /></a>
              <a href="https://www.instagram.com/oral.harmony/" target="_blank" rel="noreferrer"><Instagram size={18} /><span>@oral.harmony<br /><b>Acompanhe nosso trabalho</b></span><ArrowUpRight size={16} /></a>
              <div className="contact-hours"><Clock3 size={18} /><span>Seg–Qui: 08h–19h<br />Sex: 08h–18h</span></div>
            </div>
            <PlugLabel>ScrollToPlugin + CSSRulePlugin</PlugLabel>
          </section>
        </div>
      </main>

      <footer className="site-footer"><Wordmark /><span>© {new Date().getFullYear()} Oral Harmony</span><a href="https://www.instagram.com/oral.harmony/" target="_blank" rel="noreferrer"><Instagram size={14} aria-hidden="true" /> Instagram <ArrowUpRight size={14} /></a></footer>
    </div>
  );
}
