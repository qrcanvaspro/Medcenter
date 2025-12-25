
import React, { useState } from 'react';
// @fix: Added 'Activity' to the lucide-react imports to resolve "Cannot find name 'Activity'" errors.
import { ShoppingBag, MapPin, Phone, MessageSquare, Package, CheckCircle2, ShieldCheck, Clock, ArrowLeft, User, Loader2, ExternalLink, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const MedicineBooking: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    medicineName: '',
    units: '',
    address: 'Sector 15, H-Block, Noida, UP - 201301', 
    phone: '',
    notes: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Manager: Mr. Manish Yadav's WhatsApp Number 
  const PHARMACY_WHATSAPP_NUMBER = "919616921617"; 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Generate a unique order reference
    const orderRef = `MED-${Math.floor(1000 + Math.random() * 9000)}`;
    const currentDate = new Date().toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Professional WhatsApp Template for Mr. Manish Yadav
    const message = 
      `🏥 *MEDCENTER OFFICIAL ORDER* 🏥\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `🆔 *Order Ref:* #${orderRef}\n` +
      `🕒 *Date/Time:* ${currentDate}\n\n` +
      `👤 *PATIENT:* ${formData.fullName.toUpperCase()}\n` +
      `💊 *MEDICINE:* ${formData.medicineName}\n` +
      `📦 *QUANTITY:* ${formData.units} Units\n` +
      `📍 *ADDRESS:* ${formData.address}\n` +
      `📞 *CONTACT:* ${formData.phone}\n\n` +
      `📝 *INSTRUCTIONS:* ${formData.notes || 'No special instructions'}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `✅ *Source:* MedCenter Web Portal\n` +
      `👨‍⚕️ *Manager:* Mr. Manish Yadav\n\n` +
      `_Please confirm availability and dispatch time._`;

    // Direct WhatsApp Link (Works best on mobile and desktop)
    const whatsappUrl = `https://wa.me/${PHARMACY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Short delay to show loading state to user
    setTimeout(() => {
      window.location.href = whatsappUrl;
      setIsSending(false);
      setIsSubmitted(true);
    }, 800);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-6 text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-50 border-4 border-white">
          <CheckCircle2 size={48} strokeWidth={2.5} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Order Request Sent!</h2>
        <p className="text-slate-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
          The professional order detail has been prepared and opened in WhatsApp for <span className="font-bold text-emerald-600">Mr. Manish Yadav</span>.
        </p>
        <div className="bg-slate-50 p-6 rounded-3xl mb-10 text-left border border-slate-100">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 text-center">Order Summary</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Medicine:</span> <span className="font-bold text-slate-800">{formData.medicineName}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Quantity:</span> <span className="font-bold text-slate-800">{formData.units} Units</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Patient:</span> <span className="font-bold text-slate-800">{formData.fullName}</span></div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setIsSubmitted(false)}
            className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
          >
            New Order
          </button>
          <Link 
            to="/" 
            className="bg-white text-slate-700 border-2 border-slate-100 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 font-bold mb-10 hover:text-emerald-600 transition-colors uppercase text-xs tracking-widest">
        <ArrowLeft size={16} /> Return to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="bg-slate-900 p-12 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="bg-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20">
                  <ShoppingBag size={32} />
                </div>
                <h2 className="text-4xl font-black tracking-tight leading-none mb-3">
                  Direct Order Portal
                </h2>
                <p className="text-slate-400 font-medium text-lg">Official Pharmacy Request to Manish Yadav</p>
              </div>
              <Activity className="absolute -right-20 -bottom-20 text-emerald-500/10 rotate-12" size={300} />
            </div>
            
            <form onSubmit={handleSubmit} className="p-12 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Patient Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors" size={20} />
                    <input 
                      type="text" 
                      name="fullName" 
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl pl-14 pr-5 py-5 focus:bg-white focus:border-emerald-500 outline-none transition-all text-slate-800 font-bold shadow-sm"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Contact Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors" size={20} />
                    <input 
                      type="tel" 
                      name="phone" 
                      required
                      placeholder="e.g. 98XXXXXXXX"
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl pl-14 pr-5 py-5 focus:bg-white focus:border-emerald-500 outline-none transition-all text-slate-800 font-bold shadow-sm"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Medicine Required</label>
                <div className="relative group">
                  <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors" size={20} />
                  <input 
                    type="text" 
                    name="medicineName" 
                    required
                    placeholder="e.g. Amoxicillin 500mg"
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl pl-14 pr-5 py-5 focus:bg-white focus:border-emerald-500 outline-none transition-all text-slate-800 font-bold shadow-sm"
                    value={formData.medicineName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Quantity (Strips/Bottles)</label>
                <input 
                  type="number" 
                  name="units" 
                  required
                  placeholder="Enter number (e.g. 5)"
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-5 focus:bg-white focus:border-emerald-500 outline-none transition-all text-slate-800 font-bold shadow-sm"
                  value={formData.units}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Delivery Address</label>
                <div className="relative group">
                  <MapPin className="absolute left-5 top-6 text-slate-300 group-focus-within:text-emerald-600 transition-colors" size={20} />
                  <textarea 
                    name="address" 
                    required
                    rows={3}
                    placeholder="Full address for Sector 15 / Noida delivery..."
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl pl-14 pr-5 py-5 focus:bg-white focus:border-emerald-500 outline-none transition-all text-slate-800 font-bold resize-none shadow-sm"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-[#25D366] text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-4 hover:brightness-105 hover:scale-[1.02] transition-all shadow-2xl shadow-emerald-200 active:scale-95 disabled:opacity-70"
                >
                  {isSending ? (
                    <><Loader2 className="animate-spin" size={28} /> FORMATTING ORDER...</>
                  ) : (
                    <><MessageSquare size={28} /> SEND TO MANISH YADAV</>
                  )}
                </button>
                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
                   <ShieldCheck size={12} className="text-emerald-500" /> Secure Business WhatsApp Redirect
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          <div className="bg-emerald-600 p-10 rounded-[3.5rem] text-white shadow-2xl shadow-emerald-100 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4 tracking-tight italic">Pharmacist Support</h3>
              <p className="text-emerald-100 font-medium mb-8 leading-relaxed opacity-90">
                "Our mission is to provide genuine medicines at the fastest possible time. Every order is reviewed personally."
              </p>
              <div className="flex items-center gap-4 border-t border-emerald-500/50 pt-8">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center font-bold">MY</div>
                <div>
                  <p className="font-black text-lg leading-none">Manish Yadav</p>
                  <p className="text-xs text-emerald-200 font-bold uppercase tracking-widest mt-1">Managing Director</p>
                </div>
              </div>
            </div>
            <Activity className="absolute -bottom-12 -right-12 text-white/5 group-hover:scale-110 transition-transform duration-1000" size={200} />
          </div>

          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-8">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-4">Order Process</h4>
            <div className="space-y-8">
              <StepItem 
                icon={<MessageSquare className="text-emerald-500" size={20} />} 
                title="1. Order Generated" 
                desc="Form data is converted into a professional pharmaceutical request." 
              />
              <StepItem 
                icon={<ExternalLink className="text-blue-500" size={20} />} 
                title="2. WhatsApp Link" 
                desc="You'll be redirected to Manish Yadav's verified business number." 
              />
              <StepItem 
                icon={<Truck className="text-amber-500" size={20} />} 
                title="3. Fast Dispatch" 
                desc="Orders within Noida are prioritized for same-day delivery." 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepItem: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="flex gap-5">
    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100">
      {icon}
    </div>
    <div>
      <h5 className="font-black text-slate-800 text-sm mb-1">{title}</h5>
      <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

const Truck = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5l-4-4h-3v10a2 2 0 0 0 2 2Z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
);

export default MedicineBooking;
