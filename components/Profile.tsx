
import React from 'react';
import { User, Shield, CreditCard, Settings, LogOut, ChevronRight, Phone, Heart, Droplets } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-32 bg-indigo-900 relative">
          <div className="absolute -bottom-12 left-8 w-24 h-24 rounded-3xl bg-indigo-600 border-4 border-white flex items-center justify-center text-3xl font-bold text-white shadow-xl">
            MY
          </div>
        </div>
        <div className="pt-16 pb-8 px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Manish Yadav</h2>
            <p className="text-slate-500 font-medium">Health ID: #MED-9921-334</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-slate-100 text-slate-700 px-6 py-2 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
              Edit Profile
            </button>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
              Go Premium
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Medical Identity */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Shield size={20} className="text-indigo-600" />
              Medical Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <ProfileStat label="Blood Group" value="A+" icon={<Droplets className="text-rose-500" size={16} />} />
              <ProfileStat label="Age" value="28 Years" icon={<User className="text-indigo-500" size={16} />} />
              <ProfileStat label="Weight" value="72 kg" icon={<Heart className="text-emerald-500" size={16} />} />
              <ProfileStat label="Emergency" value="+91 9616921617" icon={<Phone className="text-amber-500" size={16} />} />
            </div>
          </div>

          {/* Settings Group */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
            <SettingsItem icon={<Settings size={20} />} label="App Settings" description="Notifications, theme, and language" />
            <SettingsItem icon={<Shield size={20} />} label="Security & Privacy" description="Password and biometric access" />
            <SettingsItem icon={<CreditCard size={20} />} label="Billing & Subscription" description="Manage your premium plan" />
          </div>
        </div>

        <div className="space-y-6">
          {/* Health Summary Card */}
          <div className="bg-emerald-600 p-6 rounded-2xl text-white">
            <h4 className="font-bold mb-2">Overall Wellness</h4>
            <div className="text-4xl font-bold mb-4">92%</div>
            <div className="w-full bg-emerald-700/50 h-2 rounded-full mb-4 overflow-hidden">
              <div className="bg-white h-full w-[92%] rounded-full"></div>
            </div>
            <p className="text-xs text-emerald-100 opacity-80 leading-relaxed">
              You've taken 98% of your doses on time this month. Keep it up, Manish!
            </p>
          </div>

          <button className="w-full flex items-center justify-center gap-2 p-4 text-rose-600 font-bold bg-white rounded-2xl border border-rose-100 hover:bg-rose-50 transition-colors">
            <LogOut size={20} />
            Logout Account
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileStat: React.FC<{ label: string, value: string, icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
    </div>
    <div className="text-lg font-bold text-slate-800">{value}</div>
  </div>
);

const SettingsItem: React.FC<{ icon: React.ReactNode, label: string, description: string }> = ({ icon, label, description }) => (
  <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">{icon}</div>
      <div className="text-left">
        <p className="font-bold text-slate-800">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
    <ChevronRight size={20} className="text-slate-300" />
  </button>
);

export default Profile;
