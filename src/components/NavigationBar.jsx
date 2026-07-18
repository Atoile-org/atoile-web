import "./NavigationBar.css"
import {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {AnimatePresence, motion} from "framer-motion";
import {FiChevronDown} from "react-icons/fi";
import MenuIcon from '@mui/icons-material/Menu';

function NavTitle({t, i18n}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const LANGUAGES = [
    { code: "fr", label: "Français", country: "fr" },
    { code: "en", label: "English",  country: "gb" }
  ];

  const flag = (country) => `https://flagcdn.com/w160/${country}.png`;
  const currentLng = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  const selectLng = (code) => {
    i18n.changeLanguage(code).then((T) => console.log(T("choose.language")));
    setOpen(false);
  };

  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="nav-title-wrap" ref={wrapRef}>
      <button
        type="button" className="nav-title-btn"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open} aria-haspopup="listbox"
      >
        <AnimatePresence mode="wait">
          <motion.span key={currentLng.code} className="nav-title-flag" style={{ backgroundImage: `url(${flag(currentLng.country)})` }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
          >
            {t("global.title")}
          </motion.span>
        </AnimatePresence>
        <FiChevronDown className={`nav-arrow${open ? " is-open" : ""}`} size={14} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            className="nav-lang-dropdown" role="listbox" initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
          >
            {LANGUAGES.map((l) => (
              <li key={l.code} className={l.code === currentLng.code ? "is-active" : ""}>
                <button type="button" onClick={() => selectLng(l.code)} >
                  <img src={flag(l.country)} alt="" width={20} />
                  {l.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function NavigationBar() {
  const {t, i18n} = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navigate = useNavigate();

  return (
    <>
      <div className="nav-wrap">
        {/* Desktop Navigation */}
        <nav className="navbar-desktop">
          <NavTitle t={t} i18n={i18n} />
          <div className="container">
            <Link to="/">{t("nav.home")}</Link>
            <Link to="/about">{t("nav.about")}</Link>
            <Link to="/members">{"Members"}</Link>
            <a>{"Social ↓"}</a> {/* TODO: Make this unfold with a link to all social medias */}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav className="navbar-mobile">
          <NavTitle onClick={() => navigate("/")} t={t} i18n={i18n} />
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <MenuIcon />
          </button>
        </nav>
      </div>

      {/* Mobile Side Menu Drawer */}
      <div className={`mobile-side-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="side-menu-content">
          <Link to="/" onClick={closeMenu}>{t("nav.home")}</Link>
          <Link to="/about" onClick={closeMenu}>{t("nav.about")}</Link>
          <Link to="/members" onClick={closeMenu}>{"Members"}</Link>
          <a onClick={closeMenu}>{"Social ↓"}</a>
        </div>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </>
  )
}