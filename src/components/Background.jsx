import './Background.css'

export default function Background({ children }) {
  return (
    <section className="hero-video">
      <video className="hero-video_bg" autoPlay muted loop playsInline>
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div className="hero-video_content">
        {children}
      </div>
    </section>
  );
}