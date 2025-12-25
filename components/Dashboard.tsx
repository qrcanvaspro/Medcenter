
import React from 'react';
import { Medicine, Reminder } from '../types';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Pill,
  ChevronRight,
  FlaskConical,
  ShoppingBag,
  MessageSquare
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface DashboardProps {
  medicines: Medicine[];
  reminders: Reminder[];
}

const data = [
  { name: 'Mon', adherence: 85 },
  { name: 'Tue', adherence: 90 },
  { name: 'Wed', adherence: 75 },
  { name: 'Thu', adherence: 95 },
  { name: 'Fri', adherence: 88 },
  { name: 'Sat', adherence: 92 },
  { name: 'Sun', adherence: 100 },
];

const Dashboard: React.FC<DashboardProps> = ({ medicines, reminders }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800">Namaste, Mr. Manish Yadav</h2>
          <p className="text-slate-500">How can we help you with your health today?</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Link to="/booking" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-emerald-100 hover:scale-105 transition-all">
            <ShoppingBag size={20} />
            Order Medicine
          </Link>
          <Link to="/explore" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:scale-105 transition-all">
            <FlaskConical size={20} />
            Composition
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<CheckCircle2 className="text-emerald-600" />} 
          title="Doses Taken" 
          value="12" 
          change="+2" 
          color="bg-emerald-50" 
        />
        <StatCard 
          icon={<Clock className="text-amber-600" />} 
          title="Upcoming" 
          value="3" 
          change="Next at 2 PM" 
          color="bg-amber-50" 
        />
        <StatCard 
          icon={<AlertCircle className="text-rose-600" />} 
          title="Low Stock" 
          value="2" 
          change="Refill soon" 
          color="bg-rose-50" 
        />
        <StatCard 
          icon={<TrendingUp className="text-indigo-600" />} 
          title="Health Streak" 
          value="14" 
          change="Days" 
          color="bg-indigo-50" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Adherence Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Medicine Adherence</h3>
            <select className="bg-slate-50 border-none text-sm text-slate-600 rounded-lg px-2 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorAdherence" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="adherence" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorAdherence)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Order Promotion */}
        <div className="space-y-6">
          <div className="bg-[#075E54] p-8 rounded-3xl text-white relative overflow-hidden h-full flex flex-col justify-between group">
            <div className="relative z-10">
              <div className="bg-[#25D366] w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-2xl font-black mb-3 italic">Fast Delivery</h3>
              <p className="text-emerald-100 text-sm leading-relaxed mb-6">
                Need medicine urgently? Just enter the name and address, and we'll send your order directly to the pharmacy via WhatsApp.
              </p>
              <Link to="/booking" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-black px-6 py-3 rounded-xl hover:gap-4 transition-all">
                Order Now <ChevronRight size={18} />
              </Link>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <ShoppingBag size={220} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, title: string, value: string, change: string, color: string }> = ({ icon, title, value, change, color }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h4 className="text-2xl font-bold text-slate-800 mt-1">{value}</h4>
        <p className="text-xs font-medium text-slate-400 mt-1">{change}</p>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
    </div>
  );
};

export default Dashboard;
