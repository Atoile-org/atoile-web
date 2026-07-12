import { useContext } from "react";
import FontContext from "./FontContext.jsx";

export default function useFont() {
  const ctx = useContext(FontContext);
  if (!ctx) throw new Error('useFont doit être utilisé dans un FontProvider');
  return ctx;
}