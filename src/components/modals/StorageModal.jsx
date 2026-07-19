import "./StorageModal.css";
import AtoileModal from "./AtoileModal.jsx";
import CookieIcon from '@mui/icons-material/Cookie';
import SaveIcon from '@mui/icons-material/Save';
import IconSwitch from "./IconSwitch.jsx";
import CheckIcon from '@mui/icons-material/Check';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOffIcon from '@mui/icons-material/FolderOff';
import DataObjectIcon from '@mui/icons-material/DataObject';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useEffect, useRef, useState} from "react";
import {useAtoileStorageManager} from "../../AtoileStorageManager.jsx";
import {useTranslation} from "react-i18next";

export default function StorageModal({isStorageModalOpen, setStorageModalOpen}) {
  const {exportLocalStorage, deleteLocalStorage, isLocalStorageEnabled, setLocalStorageEnabled, isCacheEnabled, setCacheEnabled} = useAtoileStorageManager();
  const [isInSettingsPage, setInSettingsPage] = useState(true);
  const [localStorageLength, setLocalStorageLength] = useState(localStorage.length);
  const innerModalFocusableRef = useRef(null);
  const {t} = useTranslation();

  useEffect(() => {
    if (isInSettingsPage) return;
    const interval = setInterval(() => setLocalStorageLength(localStorage.length), 1000);
    return () => clearInterval(interval);
  }, [isInSettingsPage]);

  return (
    <AtoileModal isModalOpen={isStorageModalOpen} setModalOpen={setStorageModalOpen} innerModalFocusableRef={innerModalFocusableRef}>
      <div onClick={(e) => e.stopPropagation()} className="storage-modal atoile-modal atoile-blur-modal">
        <h2 className="modal-title"><CookieIcon /> Cookies et Stockage local <SaveIcon /></h2>
        {isInSettingsPage ? (<>
          <p className="modal-info">Nous n'utilisons aucun cookies. Tous les systèmes de stockage local sont désactivés par défaut. Vos données ne quittent jamais votre appareil.</p>
          <div className="modal-vars">
            <div className="modal-var">
              <IconSwitch IconOn={DataObjectIcon} IconOff={DataObjectIcon} isSwitchOn={isLocalStorageEnabled} setSwitchOn={setLocalStorageEnabled} />
              Local Storage
            </div>
            <div className="modal-var">
              <IconSwitch disabled={!isLocalStorageEnabled} IconOn={FolderIcon} IconOff={FolderOffIcon} isSwitchOn={isCacheEnabled} setSwitchOn={setCacheEnabled} />
              Cache
            </div>
          </div>
          </>) : (<>
          <p className="modal-info" style={{marginBottom: "1rem"}}>{localStorageLength < 0 ? t("modal.storage.ls-empty") : localStorageLength < 2 ? t("modal.storage.ls-single") : t("modal.storage.ls-multiple", localStorageLength)}</p>
          <div className="modal-actions">
            <button disabled={localStorageLength < 1} onClick={() => exportLocalStorage("open")} className="modal-action" style={{backgroundColor: "#88888866"}}><OpenInNewIcon /> Visionner</button>
            <button disabled={localStorageLength < 1} onClick={() => exportLocalStorage("download")} className="modal-action" style={{backgroundColor: "#99999966"}}><FileDownloadIcon /> Exporter</button>
            <button disabled={localStorageLength < 1} onClick={deleteLocalStorage} className="modal-action"><DeleteForeverIcon /> Supprimer</button>
          </div>
          <p className="modal-info">Vous pouvez gérer le cache depuis votre navigateur.</p>
          </>)}
        <div className="modal-footer">
          <button className="modal-change-page" onClick={() => setInSettingsPage(!isInSettingsPage)}>{isInSettingsPage ? (<StorageIcon />) : (<SettingsIcon />)}</button>
          <img className="atoile-svg" src="/favicon.svg" alt="Atoile Logo" width="48px" height="48px" />
          <button ref={innerModalFocusableRef} className="modal-quit" onClick={() => setStorageModalOpen(false)}><CheckIcon /></button>
        </div>
      </div>
    </AtoileModal>
  )
}