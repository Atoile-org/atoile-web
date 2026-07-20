import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import './palette.css'
import './i18n/languages.js'
import App from './App.jsx'
import '@fontsource/vt323'
import '@fontsource-variable/josefin-sans'
import '@fontsource-variable/merriweather/wght.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
