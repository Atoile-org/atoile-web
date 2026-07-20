import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import AboutPage from "./pages/About.jsx";
import Root from "./pages/Root.jsx";
import Members from "./pages/Members/Members.jsx";
import {AtoileStorageManagerProvider} from "./AtoileStorageManager.jsx";

function App() {
  return (
    <AtoileStorageManagerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
              <Route path="members" element={<Members />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AtoileStorageManagerProvider>
  );
}

export default App
