import './Background.css';
import {useReducedMotion} from "framer-motion";

export default function Background({ children }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero-video" id="home">
      <video className="hero-video-bg" autoPlay={!reduceMotion} muted loop playsInline>
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div className="hero-video-content">
        {children}
      </div>
    </section>
  );
}