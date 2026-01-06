import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'uz';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.journey': 'Journey',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.greeting': "Hi, I'm",
    'hero.name': 'Mukhammadsolikh',
    'hero.subtitle': 'Frontend Developer | React Enthusiast | Problem Solver',
    'hero.description': 'A passionate 17-year-old developer from Uzbekistan, transforming ideas into beautiful web experiences.',
    'hero.viewProjects': 'View Projects',
    'hero.contactMe': 'Contact Me',
    'hero.scrollDown': 'Scroll Down',
    
    // About
    'about.title': 'About Me',
    'about.subtitle': 'My Journey from Athlete to Developer',
    'about.bio1': "I'm Mukhammadsolikh Shukurov, a 17-year-old junior frontend developer from the beautiful Urgut district of Samarkand, Uzbekistan. My journey into programming began in early 2025, and since then, I've been passionate about creating stunning web experiences.",
    'about.bio2': "Before diving into the world of code, I was an athlete - a regional wrestling champion and district-level chess competitor. These experiences taught me discipline, strategic thinking, and the importance of continuous improvement.",
    'about.bio3': "Currently, I'm focused on mastering frontend technologies while also learning English to expand my opportunities globally. I believe that with dedication and hard work, anything is possible.",
    'about.stat.months': 'Months Learning',
    'about.stat.projects': 'Projects Built',
    'about.stat.technologies': 'Technologies',
    'about.stat.courses': 'Courses Completed',
    'about.gallery': 'Photo Gallery',
    'about.addPhoto': 'Add Your Photo',
    
    // Skills
    'skills.title': 'Skills & Technologies',
    'skills.subtitle': 'Tools I use to bring ideas to life',
    'skills.frontend': 'Frontend',
    'skills.javascript': 'JavaScript',
    'skills.other': 'Other',
    
    // Projects
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'Some of my recent work',
    'projects.viewLive': 'Live Demo',
    'projects.viewCode': 'Source Code',
    'projects.all': 'All',
    'projects.comingSoon': 'Coming Soon',
    'projects.project1.title': 'E-Commerce Dashboard',
    'projects.project1.description': 'A modern admin dashboard with analytics, product management, and real-time data visualization.',
    'projects.project2.title': 'Weather Application',
    'projects.project2.description': 'A beautiful weather app with location-based forecasts and interactive maps.',
    'projects.project3.title': 'Task Management App',
    'projects.project3.description': 'A productivity app with drag-and-drop functionality and team collaboration features.',
    'projects.project4.title': 'Portfolio Template',
    'projects.project4.description': 'A customizable portfolio template for developers with dark mode and animations.',
    
    // Journey
    'journey.title': 'My Journey',
    'journey.subtitle': 'From the wrestling mat to the keyboard',
    'journey.athletic.title': 'Athletic Achievements',
    'journey.athletic.wrestling': 'Regional Wrestling Champion',
    'journey.athletic.chess': 'District Level Chess Competitor',
    'journey.transition.title': 'Career Transition',
    'journey.transition.description': 'Decided to pursue programming career',
    'journey.frontend.title': '8-Month Frontend Course',
    'journey.frontend.description': 'Mastered HTML, CSS, JavaScript, React',
    'journey.ai.title': 'AI/ML Fundamentals',
    'journey.ai.description': '2-month course on AI and Machine Learning basics',
    'journey.current.title': 'Current Focus',
    'journey.current.description': 'Job searching & English learning',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': "Let's work together on something amazing",
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.location': 'Urgut, Samarkand, Uzbekistan',
    'contact.telegram': 'Telegram',
    'contact.linkedin': 'LinkedIn',
    'contact.channel': 'Telegram Channel',
    'contact.comingSoon': 'Coming Soon',
    
    // Footer
    'footer.madeWith': 'Made with',
    'footer.inUzbekistan': 'in Uzbekistan',
    'footer.rights': 'All rights reserved.',
  },
  uz: {
    // Navbar
    'nav.home': 'Bosh sahifa',
    'nav.about': 'Men haqimda',
    'nav.skills': "Ko'nikmalar",
    'nav.projects': 'Loyihalar',
    'nav.journey': "Yo'lim",
    'nav.contact': 'Aloqa',
    
    // Hero
    'hero.greeting': 'Salom, men',
    'hero.name': 'Mukhammadsolikh',
    'hero.subtitle': 'Frontend Dasturchi | React Ishqibozi | Muammolarni Hal Qiluvchi',
    'hero.description': "O'zbekistonlik 17 yoshli ishtiyoqli dasturchi, g'oyalarni go'zal veb-tajribalarga aylantirayapman.",
    'hero.viewProjects': 'Loyihalarni ko\'rish',
    'hero.contactMe': "Bog'lanish",
    'hero.scrollDown': 'Pastga aylantiring',
    
    // About
    'about.title': 'Men haqimda',
    'about.subtitle': "Sportchidan dasturchiga bo'lgan yo'lim",
    'about.bio1': "Men Mukhammadsolikh Shukurov, O'zbekistonning go'zal Samarqand viloyati Urgut tumanidan 17 yoshli junior frontend dasturchiman. Dasturlash yo'lim 2025 yil boshida boshlandi va o'shandan beri ajoyib veb-tajribalar yaratishga ishtiyoqmandman.",
    'about.bio2': "Kod olamiga kirishdan oldin men sportchi edim - viloyat kurash chempioni va tuman darajasidagi shaxmat musobaqachisi. Bu tajribalar menga intizom, strategik fikrlash va doimiy takomillashish muhimligini o'rgatdi.",
    'about.bio3': "Hozirda men frontend texnologiyalarini o'zlashtirishga e'tibor qaratmoqdaman, shu bilan birga imkoniyatlarimni global miqyosda kengaytirish uchun ingliz tilini o'rganmoqdaman. Ishonaman, fidoyilik va mehnat bilan hamma narsa mumkin.",
    'about.stat.months': "O'qish oylari",
    'about.stat.projects': 'Yaratilgan loyihalar',
    'about.stat.technologies': 'Texnologiyalar',
    'about.stat.courses': 'Tugatilgan kurslar',
    'about.gallery': 'Fotogalereya',
    'about.addPhoto': "Rasmingizni qo'shing",
    
    // Skills
    'skills.title': "Ko'nikmalar va Texnologiyalar",
    'skills.subtitle': "G'oyalarni hayotga tatbiq etish uchun ishlatadigan vositalarim",
    'skills.frontend': 'Frontend',
    'skills.javascript': 'JavaScript',
    'skills.other': 'Boshqalar',
    
    // Projects
    'projects.title': 'Tanlangan Loyihalar',
    'projects.subtitle': "Oxirgi ishlarimdan ba'zilari",
    'projects.viewLive': 'Jonli demo',
    'projects.viewCode': 'Manba kodi',
    'projects.all': 'Hammasi',
    'projects.comingSoon': 'Tez kunda',
    'projects.project1.title': 'E-Tijorat Boshqaruv Paneli',
    'projects.project1.description': "Analitika, mahsulot boshqaruvi va real vaqtda ma'lumotlarni vizualizatsiya qilish bilan zamonaviy admin paneli.",
    'projects.project2.title': 'Ob-havo Ilovasi',
    'projects.project2.description': "Joylashuvga asoslangan ob-havo prognozi va interaktiv xaritalar bilan go'zal ob-havo ilovasi.",
    'projects.project3.title': 'Vazifalarni Boshqarish',
    'projects.project3.description': "Sudrab-tashlash funksiyasi va jamoa hamkorlik xususiyatlari bilan samaradorlik ilovasi.",
    'projects.project4.title': 'Portfolio Shabloni',
    'projects.project4.description': "Dasturchilar uchun qorong'i rejim va animatsiyalar bilan moslashtirilgan portfolio shabloni.",
    
    // Journey
    'journey.title': "Mening Yo'lim",
    'journey.subtitle': "Kurash gilamchasidan klaviaturagacha",
    'journey.athletic.title': 'Sport Yutuqlari',
    'journey.athletic.wrestling': 'Viloyat Kurash Chempioni',
    'journey.athletic.chess': 'Tuman Shaxmat Musobaqachisi',
    'journey.transition.title': "Karera O'zgarishi",
    'journey.transition.description': "Dasturlash karerasini davom ettirishga qaror qildim",
    'journey.frontend.title': '8 Oylik Frontend Kursi',
    'journey.frontend.description': "HTML, CSS, JavaScript, React o'zlashtirdim",
    'journey.ai.title': 'AI/ML Asoslari',
    'journey.ai.description': "Sun'iy intellekt va Machine Learning asoslari bo'yicha 2 oylik kurs",
    'journey.current.title': 'Hozirgi Fokus',
    'journey.current.description': "Ish qidirish va ingliz tilini o'rganish",
    
    // Contact
    'contact.title': "Bog'laning",
    'contact.subtitle': "Keling, birgalikda ajoyib narsa yarataylik",
    'contact.name': 'Ismingiz',
    'contact.email': 'Elektron pochtangiz',
    'contact.message': 'Xabaringiz',
    'contact.send': "Xabar jo'natish",
    'contact.sending': "Jo'natilmoqda...",
    'contact.location': "Urgut, Samarqand, O'zbekiston",
    'contact.telegram': 'Telegram',
    'contact.linkedin': 'LinkedIn',
    'contact.channel': 'Telegram Kanal',
    'contact.comingSoon': 'Tez kunda',
    
    // Footer
    'footer.madeWith': 'Yaratildi',
    'footer.inUzbekistan': "O'zbekistonda",
    'footer.rights': 'Barcha huquqlar himoyalangan.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
