import Background from "../components/Background.jsx";
import HeroContent from "../components/hero-section/HeroContent.jsx";
import NavigationBar from "../components/NavigationBar.jsx";

export default function HomePage({ routes }) {
    return (
        <div>
            <title>ATOILE</title>
            <Background>
                <HeroContent/>
            </Background>
        </div>
    )
}