import {Outlet} from "react-router-dom";
import Footer from "../components/Footer.jsx";
import NavigationBar from "../components/NavigationBar.jsx";
import {useState} from "react";
import StorageModal from "../components/modals/StorageModal.jsx";

export default function Root() {
  const [isStorageModalOpen, setStorageModalOpen] = useState(false);

  return (
    <div>
      <NavigationBar/>
      <StorageModal isStorageModalOpen={isStorageModalOpen} setStorageModalOpen={setStorageModalOpen} />
      <Outlet />
      <Footer onOpenCookieSettings={() => setStorageModalOpen(!isStorageModalOpen)} />
    </div>
  )
}