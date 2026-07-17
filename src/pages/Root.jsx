import {Link, Outlet} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Footer from "../components/Footer.jsx";

export default function Root() {
  const {t} = useTranslation();

  return (
    <div>
      <nav>
        <Link to="/">{t("nav.home")}</Link>
        <Link to="/about">{t("nav.about")}</Link>
      </nav>
      <Outlet />
      <Footer />
    </div>
  )
}