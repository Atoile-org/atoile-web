import {Link, Outlet} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Footer from "../components/Footer.jsx";
import NavigationBar from "../components/NavigationBar.jsx";

export default function Root() {
  return (
    <div>
        <NavigationBar/>
        <Outlet />
        <Footer />
    </div>
  )
}