import { useEffect, useState } from 'react';
import FontContext from './FontContext';
import FONTS from './fonts';

export default function FontProvider({ children }) {
  const [fontId, setFontId] = useState(
    () => localStorage.getItem('font') || FONTS[0].id
  );

  useEffect(() => {
    const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
    document.documentElement.style.setProperty('--font', font.value);
    localStorage.setItem('font', fontId);
  }, [fontId]);

  return (
    <FontContext.Provider value={{ fontId, setFontId }}>
      {children}
    </FontContext.Provider>
  );
}