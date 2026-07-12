import './App.css'
import Background from "./utils/Background.jsx";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "./utils/LanguageSwitcher.jsx";
import FontSwitcher from "./utils/FontSwitcher.jsx";

function App() {
  const { t } = useTranslation();

  return (
    <Background>
      <h1>{t('tmp.test')}</h1>
      <div className="tmp">
        <h2>Test texte avec bg</h2>
      </div>
      <LanguageSwitcher />
      <FontSwitcher />
    </Background>
  )
}

export default App
