import './Background.css';
import {useReducedMotion} from "framer-motion";

export default function Background({ children, fixed = false }) {
    const reduceMotion = useReducedMotion();

    return (
        <div className={`hero-video${fixed ? ' hero-video--fixed-bg' : ''}`}>
            {reduceMotion ? ( <img className="hero-video-bg" src="/bg.webp" aria-hidden="true" alt="Atoile reduced motion background" /> ) : (
                <video className="hero-video-bg" autoPlay muted loop playsInline aria-hidden="true" >
                    <source src="/bg.mp4" type="video/mp4" />
                </video>
            )
            }

            <div className="hero-video-content">
                {children}
            </div>
        </div>
    );
}