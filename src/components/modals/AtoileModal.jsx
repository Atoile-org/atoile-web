import "./AtoileModal.css";
import {useEffect} from "react";

export default function AtoileModal({isModalOpen, setModalOpen, innerModalFocusableRef, children}) {
  useEffect(() => {
    if (isModalOpen) innerModalFocusableRef.current?.focus();
  }, [innerModalFocusableRef, isModalOpen]);

  useEffect(() => {
    const handler = e => e.key === "Escape" ? setModalOpen(false) : null;

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [setModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div className="outer-modal" onClick={() => setModalOpen(false)}>
      {children}
    </div>
  )
}