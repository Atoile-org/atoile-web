import "./StorageModal.css";
import AtoileModal from "./AtoileModal.jsx";
import CookieIcon from '@mui/icons-material/Cookie';
import SaveIcon from '@mui/icons-material/Save';
import IconSwitch from "./IconSwitch.jsx";
import CheckIcon from '@mui/icons-material/Check';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOffIcon from '@mui/icons-material/FolderOff';
import DataObjectIcon from '@mui/icons-material/DataObject';
import {useRef, useState} from "react";

export default function StorageModal({isStorageModalOpen, setIsStorageModalOpen}) {
  const [isLocalStorageEnabled, setIsLocalStorageEnabled] = useState(false);
  const [isCacheEnabled, setIsCacheEnabled] = useState(false);
  const innerModalFocusableRef = useRef(null);

  return (
    <AtoileModal isModalOpen={isStorageModalOpen} setIsModalOpen={setIsStorageModalOpen} innerModalFocusableRef={innerModalFocusableRef}>
      <div onClick={(e) => e.stopPropagation()} className="storage-modal atoile-modal atoile-blur-modal">
        <h2 className="modal-title"><CookieIcon /> Cookies et Stockage local <SaveIcon /></h2>
        <p className="modal-info">Nous n'utilisons aucun cookies. Tous les systèmes de stockage local sont désactivés par défaut. Vos données ne quittent jamais votre appareil.</p>
        <div className="modal-vars">
          <div className="modal-var">
            <IconSwitch IconOn={DataObjectIcon} IconOff={DataObjectIcon} isSwitchOn={isLocalStorageEnabled} setIsSwitchOn={setIsLocalStorageEnabled} />
            Local Storage
          </div>
          <div className="modal-var">
            <IconSwitch IconOn={FolderIcon} IconOff={FolderOffIcon} isSwitchOn={isCacheEnabled} setIsSwitchOn={setIsCacheEnabled} />
            Cache
          </div>
        </div>
        <div className="modal-footer">
          <img className="atoile-svg" src="/favicon.svg" alt="Atoile Logo" width="48px" height="48px" />
          <button ref={innerModalFocusableRef} className="modal-quit" onClick={() => setIsStorageModalOpen(false)}><CheckIcon /></button>
        </div>
      </div>
    </AtoileModal>
  )
}