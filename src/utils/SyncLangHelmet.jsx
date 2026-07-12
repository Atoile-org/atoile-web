import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function SyncLangHelmet() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Helmet prioritizeSeoTags>
      <meta charSet="UTF-8"/>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>{t('global.title')}</title>
    </Helmet>
  )
}