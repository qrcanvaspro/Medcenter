
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Award, 
  ChevronRight, 
  Plus, 
  Heart,
  Pill,
  Clock,
  User,
  Activity,
  CheckCircle,
  PhoneCall
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 bg-white">
      {/* Hero Section - Matching the "Trusted Care" Image Theme */}
      <section className="relative pt-12 lg:pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Now Serving Sector 15 & Noida
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
              MedCenter: <br />
              <span className="text-emerald-600 italic">Trusted Care</span> <br />
              In Your Hands.
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Bringing the expertise of <span className="text-slate-900 font-bold">Mr. Manish Yadav</span> directly to you. We don't just deliver medicines; we deliver health and trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/order" 
                className="bg-emerald-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 transition-all active:scale-95"
              >
                <ShoppingBag size={24} /> BUY MEDICINE
              </Link>
              <a 
                href="tel:+919616921617"
                className="bg-white text-slate-700 border-2 border-slate-200 px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-100/50"
              >
                <PhoneCall size={20} /> CALL MANISH
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 relative group">
            {/* Delivery Image Representation - Based on Image 1 */}
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transform rotate-1 group-hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&q=80&w=1200" 
                alt="Pharmacist delivering medicine with care"
                className="w-full h-[550px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-600 p-3 rounded-2xl text-white">
                    <Heart size={24} fill="currentColor" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-lg leading-tight">Delivering Health & Trust</h4>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Direct to Your Doorstep</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-40"></div>
          </div>
        </div>
      </section>

      {/* Counter Section - Based on Image 2 (Manish at the pharmacy) */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-20">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Expert Management by <br />
              <span className="text-emerald-600">Mr. Manish Yadav</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              Every medicine in our store is personally verified for authenticity. With over a decade of experience in pharmaceutical care, Manish ensures that your prescriptions are handled with the highest level of professional standards.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <TrustPoint icon={<CheckCircle className="text-emerald-600" />} text="100% Genuine Brands" />
              <TrustPoint icon={<CheckCircle className="text-emerald-600" />} text="Proper Storage (Cold Chain)" />
              <TrustPoint icon={<CheckCircle className="text-emerald-600" />} text="Expert Consultation" />
              <TrustPoint icon={<CheckCircle className="text-emerald-600" />} text="Verified Supply Chain" />
            </div>
            <Link 
              to="/order" 
              className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all group"
            >
              Order from Our Counter <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="lg:w-1/2 relative">
             {/* Pharmacy Counter Representation - Based on Image 2 */}
            <div className="relative z-10 bg-white p-4 rounded-[3.5rem] shadow-2xl shadow-indigo-100">
               <div className="rounded-[2.5rem] overflow-hidden border-4 border-slate-50 relative aspect-[4/3]">
                 <img 
                   src="https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=1200" 
                   alt="Manish Yadav at the professional pharmacy counter" 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-indigo-900/10 hover:bg-transparent transition-colors duration-500"></div>
               </div>
               {/* Decorative elements representing the shelves */}
               <div className="absolute -right-6 top-1/2 -translate-y-1/2 space-y-3 opacity-20 hidden md:block">
                 {[...Array(4)].map((_, i) => (
                   <div key={i} className="w-12 h-2 bg-slate-400 rounded-full"></div>
                 ))}
               </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-8 rounded-[2.5rem] shadow-2xl z-20">
              <div className="text-4xl font-black">10+</div>
              <div className="text-[10px] font-black uppercase tracking-widest mt-1">Years of Trust</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-3xl font-black text-slate-900">Why Manish Yadav's MedCenter?</h3>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">We combine traditional care with modern speed.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Truck className="text-emerald-600" size={32} />} 
              title="Home Delivery" 
              desc="Fastest delivery in Sector 15 and surrounding Noida areas."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-blue-600" size={32} />} 
              title="Verified Quality" 
              desc="Certified batch numbers and genuine expiry dates on every strip."
            />
            <FeatureCard 
              icon={<Award className="text-amber-500" size={32} />} 
              title="Trusted Advice" 
              desc="Talk directly to a pharmacist who knows your health history."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] p-12 lg:p-20 text-center relative overflow-hidden group shadow-2xl shadow-slate-200">
          <div className="relative z-10 space-y-10">
            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight">Need your medicine today?</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/order" 
                className="bg-emerald-600 text-white px-12 py-6 rounded-3xl font-black text-xl hover:bg-emerald-700 hover:scale-105 transition-all shadow-xl shadow-emerald-500/20"
              >
                START YOUR ORDER
              </Link>
              <a 
                href="tel:+919616921617"
                className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-12 py-6 rounded-3xl font-black text-xl hover:bg-white/20 transition-all"
              >
                WHATSAPP US
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-slate-400 text-sm font-bold uppercase tracking-widest pt-10">
              <span className="flex items-center gap-2"><Pill size={18} /> Genuine Care</span>
              <span className="flex items-center gap-2"><Clock size={18} /> Quick Service</span>
              <span className="flex items-center gap-2"><Activity size={18} /> Verified Store</span>
            </div>
          </div>
          {/* Background visuals */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500 rounded-full blur-[150px]"></div>
          </div>
          <Activity className="absolute -bottom-20 -right-20 text-emerald-500 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000" size={400} />
        </div>
      </section>
    </div>
  );
};

const TrustPoint: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
    <div className="shrink-0">{icon}</div>
    <span className="font-bold text-slate-800 text-sm tracking-tight">{text}</span>
  </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group">
    <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-md group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{title}</h4>
    <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default Home;
