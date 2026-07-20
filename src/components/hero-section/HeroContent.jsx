import "./HeroContent.css"

import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import useIsMobile from "useismobile";

export default function HeroContent() {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={"hero-wrap"}>
      <div className="hero hero-bg">
      </div>
      <div className="hero">
        <h1 className="hero-title">{t("global.title")}</h1>
        <p className={"hero-text"}>
          {t("hero.text.line")} <br/>
          {t("hero.text.1")} <span className={"hero-highlight"}>{t("hero.text.2")}</span>{t("hero.text.3")} <span className={"hero-highlight"}>{t("hero.text.4")}</span>.
        </p>
        <div className={"hero-action-row"}>
          <button className={"hero-button"} onClick={() => navigate("about")} >
            {isMobile ? t("alt.hero.about-us") : t("hero.about-us")} <ArrowForwardIcon />
          </button>
          <a className={"hero-button"} href={"https://github.com/Atoile-org"}>
            <GitHubIcon /> GitHub
          </a>
        </div>
      </div>
    </div>
  )
}