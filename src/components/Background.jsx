import './Background.css';
import {useReducedMotion} from "framer-motion";

export default function Background({ children }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="hero-video">
      <video className="hero-video-bg" autoPlay={!reduceMotion} autoPlay muted loop playsInline>
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div className="hero-video-content">
        {children}
      </div>
    </div>
  );
}