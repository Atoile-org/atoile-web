import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from "react-helmet-async"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import './index.css'
import './i18n'
import '@fontsource/opendyslexic/400.css'
import '@fontsource/opendyslexic/400-italic.css'
import App from './App.jsx'
import About from './routes/About.jsx'
import FontProvider from "./ctx/FontProvider.jsx"
import SyncLangHelmet from './utils/SyncLangHelmet.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/about" element={<About />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FontProvider>
      <HelmetProvider>
        <SyncLangHelmet />
        <RouterProvider router={router} />
      </HelmetProvider>
    </FontProvider>
  </StrictMode>,
)
