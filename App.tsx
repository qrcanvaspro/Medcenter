
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag,
  Activity,
  User,
  Home as HomeIcon,
  PhoneCall
} from 'lucide-react';
import Home from './components/Home';
import MedicineBooking from './components/MedicineBooking';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 font-['Inter']">
        {/* Modern Sticky Header */}
        <header className="sticky top-0 z-50 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-12 shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-emerald-600 p-2.5 rounded-2xl text-white shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform">
              <Activity size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">MedCenter</h1>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1">Trusted Care</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" label="Home" icon={<HomeIcon size={18} />} />
            <NavLink to="/order" label="Order Medicine" icon={<ShoppingBag size={18} />} />
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              to="/order" 
              className="hidden sm:flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95"
            >
              <ShoppingBag size={18} />
              BUY NOW
            </Link>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
              <User size={20} />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<MedicineBooking />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Minimal Professional Footer */}
        <footer className="bg-slate-900 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
            <div>
              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                <Activity className="text-emerald-400" size={28} />
                <span className="text-2xl font-black tracking-tight">MedCenter</span>
              </div>
              <p className="text-slate-400 text-sm max-w-xs mx-auto md:mx-0">
                Managed by Mr. Manish Yadav. Dedicated to providing authentic medicines and personalized care to our community.
              </p>
            </div>
            <div className="flex flex-col gap-4 items-center">
              <h4 className="font-bold text-emerald-400 uppercase tracking-widest text-xs">Direct Support</h4>
              <a href="tel:+919616921617" className="flex items-center gap-3 text-xl font-black hover:text-emerald-400 transition-colors">
                <PhoneCall /> +91 96169-21617
              </a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-400 text-xs font-medium">
                © 2024 MedCenter Portal • Sector 15, Noida, UP
              </p>
              <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-tighter">
                Authentic Medicines • Rapid Delivery • Trusted Advice
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

const NavLink: React.FC<{ to: string, label: string, icon: React.ReactNode }> = ({ to, label, icon }) => {
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

export default App;
