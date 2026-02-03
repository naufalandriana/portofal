import { useTranslation } from 'react-i18next';

// SVG flags
const UKFlag = () => (
  <svg width="16" height="16" viewBox="0 0 60 30">
    <clipPath id="uk">
      <path d="M0,0 v30 h60 v-30 z"/>
    </clipPath>
    <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="3"/>
    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
  </svg>
);

const IndonesiaFlag = () => (
  <svg width="16" height="16" viewBox="0 0 60 30">
    <rect width="60" height="15" y="0" fill="#e70011"/>
    <rect width="60" height="15" y="15" fill="#fff"/>
  </svg>
);

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Ambil language dari i18n saja, jangan kasih fallback
  const getCurrentLanguage = () => {
    // Hanya return 'en' atau 'id' berdasarkan i18n.language
    return i18n.language && i18n.language.startsWith('en') ? 'en' : 'id';
  };

  const currentLang = getCurrentLanguage();

  return (
    <button
      onClick={() => changeLanguage(currentLang === 'en' ? 'id' : 'en')}
      className="w-10 h-10 rounded-lg transition-all duration-300 flex items-center justify-center bg-tertiary hover:bg-secondary border border-border hover:border-accent relative"
      title={`Switch to ${currentLang === 'en' ? 'Indonesian' : 'English'}`}
    >
      {/* Current Language Flag */}
      <div className={`absolute transition-all duration-300 ${
        currentLang === 'en' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
      }`}>
        <UKFlag />
      </div>
      
      {/* Alternative Language Flag */}
      <div className={`absolute transition-all duration-300 ${
        currentLang === 'id' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
      }`}>
        <IndonesiaFlag />
      </div>
    </button>
  );
}

export default LanguageSwitcher;
