import {createContext, useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const AtoileStorageManagerContext = createContext({});
const originalLocalStorageSetItem = localStorage.setItem;

function AtoileStorageManagerProvider({children}) {
  const [isLocalStorageEnabled, setLocalStorageEnabled] = useState(localStorage.getItem("enabled") === "true");
  const [isCacheEnabled, setCacheEnabled] = useState(isLocalStorageEnabled && (localStorage.getItem("cacheEnabled") === "true"));
  const {t} = useTranslation();

  useEffect(() => {
    if (!isLocalStorageEnabled) {
      localStorage.clear();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCacheEnabled(false);
      localStorage.setItem = (k, v) => k ? console.warn(t("console.warn.ls-blocked-attempt", {k, v})) : null;
    } else {
      localStorage.setItem = originalLocalStorageSetItem;
      localStorage.setItem("enabled", "true");
      localStorage.setItem("cacheEnabled", `${isCacheEnabled}`);
    }
  }, [t, isLocalStorageEnabled, isCacheEnabled]);

  const exportLocalStorage = (method = "open") => {
    const blob = new Blob([JSON.stringify(localStorage)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    if (method === "download") {
      const a = document.createElement("a");
      a.href = url; a.download = "export-atoile-localStorage";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else window.open(url);
    URL.revokeObjectURL(url);
  }

  const deleteLocalStorage = () => {
    localStorage.clear();
    setCacheEnabled(false);
    setLocalStorageEnabled(false);
  }

  return (
    <AtoileStorageManagerContext.Provider value={{exportLocalStorage, deleteLocalStorage,  isLocalStorageEnabled, setLocalStorageEnabled, isCacheEnabled, setCacheEnabled}}>
      {children}
    </AtoileStorageManagerContext.Provider>
  )
}

const useAtoileStorageManager = () => {
  const context = useContext(AtoileStorageManagerContext);
  if (!context) throw new Error("useASM must be used within Atoile Storage Manager Provider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export {useAtoileStorageManager, AtoileStorageManagerProvider};