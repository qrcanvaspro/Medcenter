
import React, { createContext, useContext, useState, ReactNode, PropsWithChildren } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    explorer: "Medicine Explorer",
    assistant: "AI Assistant",
    order: "Order",
    buyNow: "BUY NOW",
    heroTitle1: "Genuine Care",
    heroTitle2: "Trusted Advice",
    heroSub: "Experience the future of healthcare. Get medicine info with AI Explorer and order directly from Manish Yadav via WhatsApp.",
    searchPlaceholder: "Search medicine (e.g. Crocin, Insulin)...",
    exploreBtn: "EXPLORE",
    connectingAi: "Connecting to Medical AI Database...",
    medDisclaimer: "Always consult a qualified doctor before medication.",
    orderTitle: "Direct Order Portal",
    whatsappBtn: "SEND TO MANISH YADAV",
    patientName: "Patient Full Name",
    contactNum: "Contact Number",
    medRequired: "Medicine Required",
    qty: "Quantity (Strips/Bottles)",
    addr: "Delivery Address"
  },
  hi: {
    home: "होम",
    explorer: "दवाई खोजें",
    assistant: "AI सहायक",
    order: "ऑर्डर करें",
    buyNow: "अभी खरीदें",
    heroTitle1: "सच्ची देखभाल",
    heroTitle2: "भरोसेमंद सलाह",
    heroSub: "हेल्थकेयर के भविष्य का अनुभव करें। AI एक्सप्लोरर के साथ दवा की जानकारी प्राप्त करें और सीधे मनीष यादव से व्हाट्सएप के माध्यम से ऑर्डर करें।",
    searchPlaceholder: "दवाई खोजें (जैसे कि क्रोसिन, इंसुलिन)...",
    exploreBtn: "खोजें",
    connectingAi: "मेडिकल AI डेटाबेस से जुड़ रहे हैं...",
    medDisclaimer: "दवाई लेने से पहले हमेशा डॉक्टर से सलाह लें।",
    orderTitle: "डायरेक्ट ऑर्डर पोर्टल",
    whatsappBtn: "मनीष यादव को भेजें",
    patientName: "मरीज का पूरा नाम",
    contactNum: "संपर्क नंबर",
    medRequired: "दवाई का नाम",
    qty: "मात्रा (स्ट्रिप्स/बोतलें)",
    addr: "डिलीवरी का पता"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// @fix: Added PropsWithChildren to explicitly allow children and resolve strict TypeScript errors in App.tsx
export const LanguageProvider = ({ children }: PropsWithChildren<{}>) => {
  const [lang, setLang] = useState<Language>('en');

  const toggleLanguage = () => setLang(prev => prev === 'en' ? 'hi' : 'en');
  
  const t = (key: string) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
