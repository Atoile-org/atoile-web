import "./HeroContent.css"

import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useNavigate} from "react-router-dom";

export default function HeroContent() {
    const navigate = useNavigate();

    return (
        <div className={"hero-wrap"}>
            <div className="hero hero-bg">
            </div>
            <div className="hero">
                <h1 className={"hero-title"}>ATOILE</h1>
                <p className={"hero-text"}>
                    Your device. Your rules. Your software. <br/>
                    We advocate for <span className={"hero-highlight"}>real ownership</span>: unlocked bootloaders, open OS choice, the right to repair. We also build free, open-source tools so you always have <span className={"hero-highlight"}>a way out of closed ecosystems</span>.
                </p>
                <div className={"hero-action-row"}>
                    <button className={"hero-button"} onClick={() => navigate("about")} >
                        About us <ArrowForwardIcon />
                    </button>
                    <a className={"hero-button"} href={"https://github.com/Atoile-org"}>
                        <GitHubIcon /> GitHub
                    </a>
                </div>
            </div>
        </div>
    )
}