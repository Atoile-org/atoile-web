import "./About.css"

import aboutFr from '../assets/about/fr.md?raw'
import aboutEn from '../assets/about/en.md?raw'

import ReactMarkdown from 'react-markdown'
import {useTranslation} from "react-i18next";

export default function AboutPage({ routes }) {
    const { t } = useTranslation()

    return (
        <div className="about-root">
            <title>{"ATOILE - " + t("nav.about")}</title>
            <div className="about">
                <ReactMarkdown>
                    {t("global.langId") === "en" ? (aboutEn) : (aboutFr)}
                </ReactMarkdown>
            </div>
        </div>
    )
}