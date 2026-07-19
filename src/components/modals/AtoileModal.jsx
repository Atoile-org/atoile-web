import "./AtoileModal.css";
import {useEffect} from "react";

export default function AtoileModal({isModalOpen, setIsModalOpen, innerModalFocusableRef, children}) {
  useEffect(() => {
    if (isModalOpen) innerModalFocusableRef.current?.focus();
  }, [innerModalFocusableRef, isModalOpen]);

  useEffect(() => {
    const handler = e => e.key === "Escape" ? setIsModalOpen(false) : null;

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [setIsModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div className="outer-modal" onClick={() => setIsModalOpen(false)}>
      {children}
    </div>
  )
}