import "./NavigationBarGlobal.css";
import "./NavigationBarMobile.css";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from "@mui/icons-material/Menu";

function NavbarSelector({mobile = true, i18n, isSelectorOpen, setSelectorOpen}) {
  const LANGUAGES = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English",  flag: "🇬🇧" }
  ];

  const currentLng = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  const selectLng = (code) => {
    i18n.changeLanguage(code).then((T) => console.log(T("choose.language")));
    setSelectorOpen(false);
  };

  return (
    <div className={`navbar-selector${mobile ? "-mobile" : ""}`}>
      {(isSelectorOpen || mobile) && (
        <ul className="navbar-selector-list" role="listbox">
          {LANGUAGES.map((l) => (
            <button key={l.code} className={l.code === currentLng.code ? "li active" : "li"} onClick={() => selectLng(l.code)}>
              {l.flag} {l.label}
            </button>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function NavigationBar() {
  const {t, i18n} = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSelectorOpen, setSelectorOpen] = useState(false);

  const toggleSelector = () => setSelectorOpen(!isSelectorOpen);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const closeMenu = () => setMenuOpen(false);

  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <p onClick={() => navigate("/")} className="navbar-title">{t("global.title")}</p>
          <button className="navbar-selector-arrow" onClick={toggleSelector} >
            {i18n.language}
            <ExpandMoreIcon style={isSelectorOpen ? {transform: "rotate(180deg)"} : {}} />
          </button>
          <NavbarSelector mobile={false} i18n={i18n} isSelectorOpen={isSelectorOpen} setSelectorOpen={setSelectorOpen} />
        </div>
        <div className="navbar-right-desktop">
          <Link to="/">{t("nav.home")}</Link>
          <Link to="/about">{t("nav.about")}</Link>
          <Link to="/members">{t("nav.members")}</Link>
        </div>
        <div className="navbar-right-mobile">
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <MenuIcon />
          </button>
        </div>
      </nav>

      {/* Mobile Side Menu Drawer */}
      <div className={`mobile-side-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="side-menu-content">
          <Link to="/" onClick={closeMenu}>{t("nav.home")}</Link>
          <Link to="/about" onClick={closeMenu}>{t("nav.about")}</Link>
          <Link to="/members" onClick={closeMenu}>{"Members"}</Link>
        </div>
        <div className="side-menu-bottom-content">
          <NavbarSelector i18n={i18n} isSelectorOpen={isSelectorOpen} setSelectorOpen={setSelectorOpen} />
        </div>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </>
  )
}