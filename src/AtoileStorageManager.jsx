import {createContext, useContext, useEffect, useState} from "react";

const AtoileStorageManagerContext = createContext({});
const originalLocalStorageSetItem = localStorage.setItem;

function AtoileStorageManagerProvider({children}) {
  const [isLocalStorageEnabled, setLocalStorageEnabled] = useState(localStorage.getItem("enabled") === "true");
  const [isCacheEnabled, setCacheEnabled] = useState(isLocalStorageEnabled && (localStorage.getItem("cacheEnabled") === "true"));

  useEffect(() => {
    if (!isLocalStorageEnabled) {
      localStorage.clear();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCacheEnabled(false);
      localStorage.setItem = (k, v) => k ? console.warn(`Blocked saving attempt of "${k}" in localStorage. Value: ${v}`) : null;
    } else {
      localStorage.setItem = originalLocalStorageSetItem;
      localStorage.setItem("enabled", "true");
      localStorage.setItem("cacheEnabled", `${isCacheEnabled}`);
    }
  }, [isLocalStorageEnabled, isCacheEnabled]);

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