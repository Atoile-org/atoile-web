import {useEffect, useRef, useState} from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CookieIcon from '@mui/icons-material/Cookie';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import SecurityIcon from '@mui/icons-material/Security';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import Groups2Icon from '@mui/icons-material/Groups2';
import DescriptionIcon from '@mui/icons-material/Description';
import GitHubIcon from '@mui/icons-material/GitHub';
import "./FooterGlobal.css";
import {Link} from "react-router-dom";
import QuantumField from "./FooterQuantumField.jsx";

const messages = ["TOILE", "À TOI", "ÉTOILE", "ATOILE"];
const MESSAGE_INTERVAL = 3000;
const OBSERVE_THRESHOLD = 0.6;

export default function Footer({ onOpenCookieSettings }) {
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
  }, [observed]);

  const year = new Date().getFullYear();
  return (
    <footer className="footer-container" ref={footerRef}>
      <QuantumField text={messages[msgIndex]} observed={observed} invisible={invisible} />
      <div className="footer-tabs">
        <div className="footer-tab">
          <h3 className="tab-title"><Groups2Icon style={{translate: "0 0.13rem"}} /> Association</h3>
          <p className="tab-paragraph">
            Atoile est une association loi 1901 dédiée au soutient du droit à la réparation et
            la propriété numérique des terminaux, tout en développant et diffusant gratuitement
            des logiciels libres et open-source au service du grand public.
          </p>
          <div className="footer-inner-tab">
            <div className="inner-tab-line">
              <LocationPinIcon /> 38 Rue du Haut Midi 45370 DRY
            </div>
            <Link to="mailto:contact@atoile.org" className="inner-tab-line" >
              <EmailIcon /> contact@atoile.org
            </Link>
            <Link to="tel:+33" className="inner-tab-line">
              <PhoneIcon /> +33
            </Link>
          </div>
        </div>
        <div className="footer-tab">
          <h3 className="tab-title"><DirectionsWalkIcon /> Exploration</h3>
          <div className="footer-inner-tab">
            <Link to="/" className="inner-tab-line">Accueil</Link>
            <Link to="/apps" className="inner-tab-line">Nos applications</Link>
            <Link to="/news" className="inner-tab-line">Actualités</Link>
            <Link to="/join" className="inner-tab-line">Nous rejoindre</Link>
            <Link to="/contact" className="inner-tab-line">Nous contacter</Link>
          </div>
        </div>
        <div className="footer-tab">
          <h3 className="tab-title"><SecurityIcon /> Transparence</h3>
          <div className="footer-inner-tab">
            <Link to="/privacy" className="inner-tab-line"><HandshakeIcon /> Politique de confidentialité</Link>
            <button className="inner-tab-line" onClick={onOpenCookieSettings} >
              <CookieIcon /> Cookies &amp; stockage local
            </button>
            <Link to="/legal-notices" className="inner-tab-line"><DescriptionIcon />Mentions légales</Link>
            <Link to="https://github.com/atoile-org/" className="inner-tab-line">
              <GitHubIcon /> Code source <OpenInNewIcon className="ext-icon" />
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom-bar">
        <span>© {year} Association Atoile</span>
        <span className="footer-rna">RNA n° W452020481</span>
        <div className="footer-socials">
          <Link to="https://github.com/atoile-org/" className="footer-social"><GitHubIcon /></Link>
        </div>
      </div>
    </footer>
  );
}