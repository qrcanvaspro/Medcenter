
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag,
  Activity,
  User,
  Home as HomeIcon,
  Search,
  MessageSquare,
  Languages
} from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Home from './components/Home';
import MedicineBooking from './components/MedicineBooking';
import MedicineExplorer from './components/MedicineExplorer';
import AIAssistant from './components/AIAssistant';

// @fix: Moved NavLink above AppContent and removed React.FC to avoid strict children requirement errors
const NavLink = ({ to, label, icon }: { to: string, label: string, icon: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-2 text-sm font-bold transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-500 hover:text-emerald-600'}`}
    >
      {icon}
      {label}
    </Link>
  );
};

// @fix: Removed React.FC to prevent strict children requirement errors
const AppContent = () => {
  const { toggleLanguage, lang, t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-['Inter']">
      <header className="sticky top-0 z-50 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-12 shrink-0">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-emerald-600 p-2.5 rounded-2xl text-white shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform">
            <Activity size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">MedCenter</h1>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1">Manish Yadav's Care</p>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" label={t('home')} icon={<HomeIcon size={18} />} />
          <NavLink to="/explore" label={t('explorer')} icon={<Search size={18} />} />
          <NavLink to="/chat" label={t('assistant')} icon={<MessageSquare size={18} />} />
          <NavLink to="/order" label={t('order')} icon={<ShoppingBag size={18} />} />
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold transition-all border border-slate-200"
          >
            <Languages size={18} />
            <span className="hidden sm:inline">{lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>
          
          <Link 
            to="/order" 
            className="hidden sm:flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95"
          >
            <ShoppingBag size={18} />
            {t('buyNow')}
          </Link>
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
            <User size={20} />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<MedicineBooking />} />
          <Route path="/explore" element={<MedicineExplorer />} />
          <Route path="/chat" element={<AIAssistant />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
};

// @fix: Removed React.FC and used a standard function component to resolve "children missing" error on line 79
const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
};

export default App;
