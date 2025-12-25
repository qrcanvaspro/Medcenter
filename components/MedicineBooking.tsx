
import React, { useState } from 'react';
import { ShoppingBag, MapPin, Phone, MessageSquare, Package, CheckCircle2, ShieldCheck, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const MedicineBooking: React.FC = () => {
  const [formData, setFormData] = useState({
    medicineName: '',
    units: '',
    address: 'Sector 15, H-Block, Noida, UP - 201301', // Pre-filled for Manish Yadav's typical customer profile
    phone: '+91 9616921617',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pharmacy WhatsApp Number (Standard Indian Pharmacy Format)
  const PHARMACY_WHATSAPP_NUMBER = "919616921617"; 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct Professional WhatsApp message
    const message = `*MEDICINE ORDER REQUEST*\n` +
      `--------------------------\n` +
      `*Patient Name:* Manish Yadav's Customer\n` +
      `*Medicine:* ${formData.medicineName}\n` +
      `*Quantity:* ${formData.units} units\n` +
      `*Delivery Address:* ${formData.address}\n` +
      `*Contact:* ${formData.phone}\n` +
      `*Special Notes:* ${formData.notes || 'N/A'}\n` +
      `--------------------------\n` +
      `_Sent via MedCenter Portal_`;

    const whatsappUrl = `https://wa.me/${PHARMACY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Trigger WhatsApp interaction
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-50 rotate-3">
          <CheckCircle2 size={48} strokeWidth={2.5} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Order Request Generated</h2>
        <p className="text-slate-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Your request for <span className="font-bold text-slate-800">{formData.units}x {formData.medicineName}</span> has been sent. Please continue the conversation in WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setFormData(prev => ({ ...prev, medicineName: '', units: '', notes: '' }));
            }}
            className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all hover:scale-105 shadow-xl shadow-emerald-100"
          >
            Order New Medicine
          </button>
          <Link 
            to="/" 
            className="bg-white text-slate-700 border-2 border-slate-200 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-emerald-600 transition-colors">
        <ArrowLeft size={18} /> Back to Home
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: Order Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
            <div className="bg-emerald-600 p-10 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-black flex items-center gap-3 tracking-tight">
                  <ShoppingBag size={32} /> Buy Medicine
                </h2>
                <p className="text-emerald-100 mt-2 font-medium opacity-90">Send your medicine requirement to Mr. Manish Yadav.</p>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
                <ShoppingBag size={180} />
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Medicine Details</label>
                <div className="relative group">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
                  <input 
                    type="text" 
                    name="medicineName" 
                    required
                    placeholder="Enter Medicine Name (e.g. Paracetamol 500mg)"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-4 focus:bg-white focus:border-emerald-600 outline-none transition-all text-slate-800 font-semibold shadow-inner"
                    value={formData.medicineName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">How Many Units?</label>
                  <input 
                    type="number" 
                    name="units" 
                    required
                    placeholder="e.g. 10"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:border-emerald-600 outline-none transition-all text-slate-800 font-semibold shadow-inner"
                    value={formData.units}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
                    <input 
                      type="tel" 
                      name="phone" 
                      required
                      placeholder="Your Phone Number"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-4 focus:bg-white focus:border-emerald-600 outline-none transition-all text-slate-800 font-semibold shadow-inner"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Delivery Address</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-6 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
                  <textarea 
                    name="address" 
                    required
                    rows={3}
                    placeholder="Where should we deliver?"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-4 focus:bg-white focus:border-emerald-600 outline-none transition-all text-slate-800 font-semibold resize-none shadow-inner"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Notes (Optional)</label>
                <textarea 
                  name="notes" 
                  rows={2}
                  placeholder="Any message for Manish Yadav?"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:border-emerald-600 outline-none transition-all text-slate-800 font-semibold resize-none shadow-inner"
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#25D366] text-white py-5 rounded-[24px] font-black text-xl flex items-center justify-center gap-4 hover:brightness-110 transition-all shadow-2xl shadow-emerald-200 mt-4 active:scale-95"
              >
                <MessageSquare size={28} />
                Order via WhatsApp
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Features & Trust */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-slate-900 mb-6 border-b pb-4 tracking-tight">Professional Standards</h3>
            <div className="space-y-6">
              <FeatureItem 
                icon={<ShieldCheck className="text-emerald-600" size={24} />} 
                title="Verified Pharmacist" 
                desc="Managed by Mr. Manish Yadav, ensuring authentic medical advice." 
              />
              <FeatureItem 
                icon={<Clock className="text-amber-500" size={24} />} 
                title="Priority Response" 
                desc="WhatsApp orders are checked immediately for quick dispatch." 
              />
              <FeatureItem 
                icon={<MapPin className="text-blue-500" size={24} />} 
                title="Localized Care" 
                desc="Serving the Noida sector community with pride and trust." 
              />
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[40px] text-white overflow-hidden relative group shadow-2xl">
            <div className="relative z-10">
              <h4 className="font-black text-2xl mb-2 italic">Direct Consultation</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Need to speak with Manish Yadav about your dosage?
              </p>
              <button className="mt-6 flex items-center gap-2 font-black text-emerald-400 hover:text-white transition-all uppercase tracking-widest text-sm">
                Call Support +91 96169-21617
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Phone size={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="flex gap-4">
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 shadow-inner">
      {icon}
    </div>
    <div>
      <h4 className="font-black text-slate-800 leading-none mb-1">{title}</h4>
      <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default MedicineBooking;
