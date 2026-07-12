import FONTS from '../ctx/fonts.jsx'
import { useTranslation } from "react-i18next"
import useFont from "../ctx/useFont.jsx";

export default function FontSwitcher() {
  const { fontId, setFontId } = useFont();
  const { t } = useTranslation();

  return (
    <select
      value={fontId} onChange={(e) => setFontId(e.target.value)}
      aria-label={t('choose.font')}
    >
      {FONTS.map((font) => (
        <option key={font.id} value={font.id}>
          {font.label}
        </option>
      ))}
    </select>
  );
}