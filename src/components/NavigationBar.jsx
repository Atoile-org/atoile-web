import "./NavigationBar.css"

import {Link, Outlet, useNavigate} from "react-router-dom";
import Footer from "./Footer.jsx";
import {useTranslation} from "react-i18next";

export default function NavigationBar() {
    const { t } = useTranslation();

    const navigate = useNavigate();

    return (
        <div className="nav-wrap">
            <nav className="navbar">
                <p onClick={() => navigate("/")} >ATOILE</p>
                <div className="container">
                    <Link to="/">{t("nav.home")}</Link>
                    <Link to="/about">{t("nav.about")}</Link>
                    <Link to="/members">{"Members"}</Link>
                    <a>{"Social ↓"}</a> {/* TODO: Make this unfold with a link to all social medias */}
                </div>
            </nav>
        </div>
    )
}