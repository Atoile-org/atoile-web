import "./NavigationBar.css"
import { useState } from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import Footer from "./Footer.jsx";
import {useTranslation} from "react-i18next";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function NavigationBar() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <div className="nav-wrap">
                {/* Desktop Navigation */}
                <nav className="navbar-desktop">
                    <p onClick={() => navigate("/")} >ATOILE</p>
                    <div className="container">
                        <Link to="/">{t("nav.home")}</Link>
                        <Link to="/about">{t("nav.about")}</Link>
                        <Link to="/members">{"Members"}</Link>
                        <a>{"Social ↓"}</a> {/* TODO: Make this unfold with a link to all social medias */}
                    </div>
                </nav>

                {/* Mobile Navigation */}
                <nav className="navbar-mobile">
                    <p onClick={() => navigate("/")} >ATOILE</p>
                    <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
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