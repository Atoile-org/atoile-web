import {Outlet} from "react-router-dom";
import Footer from "../components/Footer.jsx";
import NavigationBar from "../components/NavigationBar.jsx";
import {useState} from "react";
import StorageModal from "../components/modals/StorageModal.jsx";

export default function Root() {
  const [isStorageModalOpen, setIsStorageModalOpen] = useState(false);

  return (
    <div>
      <NavigationBar/>
      <StorageModal isStorageModalOpen={isStorageModalOpen} setIsStorageModalOpen={setIsStorageModalOpen} />
      <Outlet />
      <Footer onOpenCookieSettings={() => setIsStorageModalOpen(!isStorageModalOpen)} />
    </div>
  )
}