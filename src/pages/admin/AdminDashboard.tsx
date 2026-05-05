import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, GraduationCap, IndianRupee, Activity, Search, Filter } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { useAuth } from '../../context/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const classesData = [
  { name: 'Mon', count: 12 },
  { name: 'Tue', count: 19 },
  { name: 'Wed', count: 15 },
  { name: 'Thu', count: 22 },
  { name: 'Fri', count: 28 },
  { name: 'Sat', count: 35 },
  { name: 'Sun', count: 42 },
];

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <PageTransition>
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Header & City Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h2 className="font-poppins font-bold text-[24px] text-primary">Overview</h2>
            <p className="font-inter text-[14px] text-gray-500">Welcome back, {user?.name || 'Admin'}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-inter text-[13px] text-gray-500 font-medium">Filter by City:</span>
            <select className="bg-gray-50 border border-gray-200 text-gray-700 text-[14px] font-poppins font-medium rounded-lg px-4 py-2 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 cursor-pointer">
              <option value="All">Global (All Cities)</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Chennai">Chennai</option>
              <option value="Madurai">Madurai</option>
              <option value="Trichy">Trichy</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Revenue', value: '₹2.4M', icon: IndianRupee, color: 'text-success', bg: 'bg-success/10' },
            { label: 'Active Students', value: '1,240', icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Verified Trainers', value: '156', icon: Users, color: 'text-accent', bg: 'bg-accent/10' },
            { label: 'Live Classes', value: '42', icon: Activity, color: 'text-warning', bg: 'bg-warning/10', pulse: true },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center relative ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6 relative z-10" />
                {stat.pulse && <span className="absolute inset-0 rounded-full border-2 border-warning animate-ping opacity-75"></span>}
              </div>
              <div>
                <div className="font-poppins font-bold text-[28px] text-primary leading-tight">{stat.value}</div>
                <div className="font-inter text-[13px] text-gray-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Revenue Chart (2/3 width) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-poppins font-bold text-[18px] text-primary mb-6">Revenue Overview</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontFamily: 'Inter' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontFamily: 'Inter' }} tickFormatter={(val) => `₹${val/1000}k`} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                    itemStyle={{ color: '#1B2A5E', fontWeight: 600, fontFamily: 'Poppins' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#F47820" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0, fill: '#1B2A5E' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Classes Bar Chart (1/3 width) */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col">
            <h3 className="font-poppins font-bold text-[18px] text-primary mb-6">Classes per Day</h3>
            <div className="flex-1 h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classesData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontFamily: 'Inter' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontFamily: 'Inter' }} />
                  <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                  <Bar dataKey="count" fill="#1B2A5E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Bottom Section: Tables/Feeds */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Live Activity Feed */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-poppins font-bold text-[18px] text-primary">Live Activity Feed</h3>
              <button className="text-accent text-[13px] font-inter font-medium hover:underline">View All</button>
            </div>

            <div className="space-y-5">
              {[
                { time: '2 min ago', text: 'New student Arjun S. registered.', type: 'student' },
                { time: '15 min ago', text: 'Trainer Ravi K. started Python class.', type: 'class' },
                { time: '1 hr ago', text: 'Payment ₹1,999 received from Karthik.', type: 'payment' },
                { time: '2 hrs ago', text: 'Demo request: Robotics in Anna Nagar.', type: 'demo' },
              ].map((act, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    act.type === 'student' ? 'bg-blue-500' : 
                    act.type === 'class' ? 'bg-success' : 
                    act.type === 'payment' ? 'bg-warning' : 'bg-accent'
                  }`}></div>
                  <div>
                    <p className="font-inter text-[14px] text-gray-700">{act.text}</p>
                    <span className="font-inter text-[11px] text-gray-400">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Trainer Approvals */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-poppins font-bold text-[18px] text-primary">Pending Approvals</h3>
              <span className="bg-accent text-white text-[11px] font-poppins font-bold px-2 py-0.5 rounded-full">3 New</span>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Srinivasan M.', subject: 'Mathematics', exp: '5 Yrs' },
                { name: 'Divya R.', subject: 'Science', exp: '2 Yrs' },
                { name: 'Prakash K.', subject: 'Python', exp: '4 Yrs' },
              ].map((t, i) => (
                <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-grad flex items-center justify-center font-bold text-white text-[14px]">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-poppins font-semibold text-[14px] text-primary">{t.name}</div>
                      <div className="font-inter text-[12px] text-gray-500">{t.subject} • {t.exp}</div>
                    </div>
                  </div>
                  <button className="text-accent hover:bg-accent/10 font-poppins font-medium text-[12px] px-3 py-1.5 rounded transition-colors">
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </PageTransition>
  );
};

export default AdminDashboard;
