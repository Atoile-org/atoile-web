import "./md-page.css"

import mdFr from '../../assets/legal/politique-confidentialite-fr.md?raw'
import mdEn from '../../assets/legal/privacy-policy-en.md?raw'

import ReactMarkdown from 'react-markdown'
import {useTranslation} from "react-i18next";

export default function Privacy() {
    const { t } = useTranslation()

    return (
        <div className="about-root">
            <title>{t("global.pre-title") + t("nav.about")}</title>
            <div className="about">
                <ReactMarkdown>
                    {t("global.langId") === "en" ? (mdEn) : (mdFr)}
                </ReactMarkdown>
            </div>
        </div>
    )
}