import "./HeroContent.css"

import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function HeroContent() {
    return (
        <div className={"hero-wrap"}>
            <div className="hero hero-bg">
            </div>
            <div className="hero">
                <h1 className={"hero-title"}>ATOILE</h1>
                <p className={"hero-text"}>
                    Your device. Your rules. Your software. <br/>
                    We advocate for <span className={"hero-higlight"}>real ownership</span>: unlocked bootloaders, open OS choice, the right to repair. We also build free, open-source tools so you always have <span className={"hero-higlight"}>a way out of closed ecosystems</span>.
                </p>
                <div className={"hero-action-row"}>
                    <button className={"hero-button"}>
                        About us <ArrowForwardIcon />
                    </button>
                    <a className={"hero-button"} href={"https://github.com/Atoile-org"}>
                        <GitHubIcon /> Github
                    </a>
                </div>
            </div>
        </div>
    )
}