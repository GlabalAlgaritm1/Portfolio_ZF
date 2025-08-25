import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// Translate eng 
import XeaderEng from '../src/language/eng/XeaderEng.json'
import HomeEng from '../src/language/eng/HomeEng.json'
import AboutEng from '../src/language/eng/AboutEng.json'
import ProjectsEng from '../src/language/eng/ProjectsEng.json'
import ContactEng from '../src/language/eng/ContactEng.json'
// Translate uz
import XeaderUz from '../src/language/uz/XeaderUz.json'
import HomeUz from '../src/language/uz/HomeUz.json'
import AboutUz from '../src/language/uz/AboutUz.json'
import ProjectsUz from '../src/language/uz/ProjectsUz.json'
import ContactUz from '../src/language/uz/ContactUz.json'
// Page Title 
import PageEng from '../src/language/eng/PageEng.json'
import PageUz from '../src/language/uz/PageUz.json'

i18next
  .use(LanguageDetector)
  .init({
    interpolation: { escapeValue: false },
    fallbackLng: 'eng',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'], // language is stored in localStorage
    },
    resources: {
      eng: {
        translation: {
          ...XeaderEng,
          ...HomeEng,
          ...AboutEng,
          ...ProjectsEng,
          ...ContactEng,
          ...PageEng,
        }
      },
      uz: {
        translation: {
          ...XeaderUz,
          ...HomeUz,
          ...AboutUz,
          ...ProjectsUz,
          ...ContactUz,
          ...PageUz,
        }
      }
    }
  });



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </StrictMode>
);
