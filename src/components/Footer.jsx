import {useEffect, useRef, useState} from "react";
import {useReducedMotion} from "framer-motion";
import {FiMapPin, FiMail, FiPhone, FiExternalLink, FiShield, FiFileText} from "react-icons/fi";
import {FaBuilding, FaGithub, FaHandshake, FaHandSparkles, FaWalking} from "react-icons/fa";
import "./Footer.css";
import {Link} from "react-router-dom";
import useIsMobile from "useismobile";

const MESSAGES = ["TOILE", "À TOI", "ÉTOILE", "ATOILE"];
const MESSAGE_INTERVAL = 3000;
const OBSERVE_THRESHOLD = 0.6;

let textCanvasCache = null;
function getTextCanvas() {
  if (!textCanvasCache) textCanvasCache = document.createElement("canvas");
  return textCanvasCache;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function computeTextPoints(isMobile, w, h, text) {
  if (!w || !h || !text) return [];
  const canvas = getTextCanvas();
  canvas.width = Math.max(1, Math.floor(w));
  canvas.height = Math.max(1, Math.floor(h));
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let fontSize = Math.max(20, Math.min(h * 0.44, 90));
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";

  ctx.font = `700 ${fontSize}px 'VT323', monospace`;
  while (fontSize > 10 && ctx.measureText(text).width > w * 0.86) {
    fontSize -= 2;
    ctx.font = `700 ${fontSize}px 'VT323', monospace`;
  }

  if (isMobile) ctx.fillText(text, w / 1.5, h / 1.8);
  else ctx.fillText(text, w / 2, h / 6);

  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const step = 3;
  const candidates = [];
  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const alpha = data[(y * canvas.width + x) * 4 + 3];
      if (alpha > 120) candidates.push({ x, y });
    }
  }
  return shuffle(candidates);
}

function makeParticle(w, h) {
  const x = Math.random() * w;
  const y = Math.random() * h;
  return {
    x,
    y,
    rx: x,
    ry: y,
    tx: x,
    ty: y,
    hasTextTarget: false,
    alpha: 0,
    baseAlpha: 0.3 + Math.random() * 0.55,
    r: 0.9 + Math.random() * 1.3,
    speed: 0.4 + Math.random() * 1.1,
    phase: Math.random() * Math.PI * 2,
    nextWanderAt: 0,
  };
}

function QuantumField({ text, observed, invisible }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const observedRef = useRef(observed);
  const rafRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    observedRef.current = observed;
  }, [observed]);

  useEffect(() => {
    if (observed || invisible) return;
    const { w, h } = sizeRef.current;
    if (!w || !h) return;
    particlesRef.current.forEach((p) => {
      p.rx = Math.random() * w;
      p.ry = Math.random() * h;
      p.nextWanderAt = performance.now() + Math.random() * 300;
    });
  }, [invisible, observed]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };

      const target = Math.round(
        Math.min(500, Math.max(200, (w * h) / 2600))
      );
      const current = particlesRef.current;
      if (current.length < target) {
        const extra = Array.from({ length: target - current.length }, () =>
          makeParticle(w, h)
        );
        particlesRef.current = current.concat(extra);
      } else if (current.length > target) {
        particlesRef.current = current.slice(0, target);
      }
      particlesRef.current.forEach((p) => {
        p.x = Math.min(p.x, w);
        p.y = Math.min(p.y, h);
      });

      setSize({ w, h });
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (invisible) return;
    const { w, h } = size;
    const assign = () => {
      const pts = computeTextPoints(isMobile, w, h, text);
      const particles = particlesRef.current;
      const order = shuffle([...Array(particles.length).keys()]);
      order.forEach((idx, i) => {
        const p = particles[idx];
        if (i < pts.length) {
          p.tx = pts[i].x;
          p.ty = pts[i].y;
          p.hasTextTarget = true;
        } else {
          p.hasTextTarget = false;
        }
      });
    };
    if (!w || !h) return;
    if (document.fonts?.ready) {
      document.fonts.ready.then(assign);
    } else {
      assign();
    }
  }, [text, size, invisible, isMobile]);

  useEffect(() => {
    if (invisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const drawStatic = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      particlesRef.current.forEach((p) => {
        const on = observedRef.current ? p.hasTextTarget : true;
        if (!on) return;
        const x = observedRef.current ? p.tx : p.x;
        const y = observedRef.current ? p.ty : p.y;
        ctx.beginPath();
        ctx.fillStyle = `rgba(238,242,255,${p.baseAlpha})`;
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    if (reduceMotion) {
      drawStatic();
      return;
    }

    const tick = (now) => {
      if (invisible) return;
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p) => {
        let tx, ty, targetAlpha, ease;
        if (observedRef.current) {
          tx = p.hasTextTarget ? p.tx : p.x;
          ty = p.hasTextTarget ? p.ty : p.y;
          targetAlpha = p.hasTextTarget ? 1 : 0;
          ease = 0.08;
        } else {
          if (now > p.nextWanderAt) {
            p.rx = Math.random() * w;
            p.ry = Math.random() * h;
            p.nextWanderAt = now + 700 + Math.random() * 1500;
          }
          tx = p.rx;
          ty = p.ry;
          targetAlpha = p.baseAlpha;
          ease = 0.035;
        }

        p.x += (tx - p.x) * ease;
        p.y += (ty - p.y) * ease;
        p.alpha += (targetAlpha - p.alpha) * 0.06;

        const flicker = Math.sin(now * 0.002 * p.speed + p.phase) * 0.12;
        const drawAlpha = Math.max(0, Math.min(1, p.alpha + flicker));

        if (drawAlpha > 0.02) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(238,242,255,${drawAlpha})`;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduceMotion, invisible]);

  return (
    <div className="qf-field-wrap" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default function Footer({ messages = MESSAGES, onOpenCookieSettings }) {
  const footerRef = useRef(null);
  const [invisible, setInvisible] = useState(false);
  const [observed, setObserved] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const el = footerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setObserved(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => { setInvisible(entry.intersectionRatio < 0.05); setObserved(entry.intersectionRatio >= OBSERVE_THRESHOLD); },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!observed || messages.length < 2) return;
    const id = window.setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, MESSAGE_INTERVAL);
    return () => window.clearInterval(id);
  }, [observed, messages]);

  const handleCookieSettings = () => {
    if (onOpenCookieSettings) onOpenCookieSettings();
    else window.dispatchEvent(new CustomEvent("open-cookie-settings"));
  };

  const year = new Date().getFullYear();

  return (
    <footer className="qf-footer" ref={footerRef}>
      <QuantumField text={messages[msgIndex]} observed={observed} invisible={invisible} />

      <div className="qf-content">
        <div className="qf-columns">
          <div className="qf-col">
            <h3 className="qf-col-title">
              <FaBuilding size={20} />
              Association
            </h3>
            <p>
              Atoile est une association loi 1901 dédiée au soutient du droit à la réparation et
              la propriété numérique des terminaux, tout en développant et diffusant gratuitement
              des logiciels libres et open-source au service du grand public.
            </p>
            <div className="qf-contacts">
              <div className="qf-contact-line">
                <FiMapPin size={15} />
                <span>38 Rue du Haut Midi 45370 DRY</span>
              </div>
              <div className="qf-contact-line">
                <FiMail size={15} />
                <a href="mailto:contact@atoile.org">
                  contact@atoile.org
                </a>
              </div>
              <div className="qf-contact-line">
                <FiPhone size={15} />
                <a href="tel:+33"></a>
              </div>
            </div>
          </div>

          <div className="qf-col">
            <h3 className="qf-col-title">
              <FaWalking size={20} />
              Exploration
            </h3>
            <ul className="qf-list">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/apps">Nos applications</Link></li>
              <li><Link to="/news">Actualités</Link></li>
              <li><Link to="/join">Nous rejoindre</Link></li>
              <li><Link to="/contact">Nous contacter</Link></li>
            </ul>
          </div>
          <div className="qf-col">
            <h3 className="qf-col-title">
              <FaHandSparkles size={20} /> Transparence
            </h3>
            <ul className="qf-list">
              <li><Link to="/privacy"><FaHandshake size={17} /> Politique de confidentialité</Link></li>
              <li>
                <button type="button" className="qf-cookie-btn" onClick={handleCookieSettings} >
                  <FiShield size={17} /> Cookies &amp; stockage local
                </button>
              </li>
              <li><Link to="/legal-notices"><FiFileText size={17} />Mentions légales</Link></li>
              <li>
                <a href="https://github.com/atoile-org/" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={17} /> Code source <FiExternalLink size={12} className="qf-ext" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="qf-bottom-bar">
        <span>© {year} Association Atoile</span>
        <span className="qf-rna">RNA n° W452020481</span>
        <div className="qf-socials">
          <a href="https://github.com/atoile-org/" target="_blank" rel="noopener noreferrer"><FaGithub size="0.8rem" /></a>
        </div>
      </div>
    </footer>
  );
}