import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { ChevronLeft, Calendar as CalendarIcon, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use'; // Or hardcode

const steps = ["Select Date", "Select Time", "Confirm Address"];

export const BookDemoPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const { width, height } = useWindowSize();

  const handleBooking = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setCurrentStep(4);
    toast.success('Demo booking confirmed!');
  };

  const renderStep1 = () => {
    const dates = [
      { day: "Mon", date: "12 Oct", full: "2026-10-12" },
      { day: "Tue", date: "13 Oct", full: "2026-10-13" },
      { day: "Wed", date: "14 Oct", full: "2026-10-14" },
      { day: "Thu", date: "15 Oct", full: "2026-10-15" },
      { day: "Fri", date: "16 Oct", full: "2026-10-16" },
    ];

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
        <h2 className="font-jakarta font-extrabold text-[28px] text-textPrimary mb-8 flex items-center gap-3 italic tracking-tighter">
          <CalendarIcon className="w-7 h-7 text-brandOrange" /> Select Preferred Date
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {dates.map((d) => (
            <button
              key={d.full}
              onClick={() => setSelectedDate(d.full)}
              className={`flex flex-col items-center justify-center p-6 rounded-[28px] border-2 transition-all duration-300 group ${
                selectedDate === d.full 
                  ? 'bg-brandOrange border-brandOrange text-white shadow-premium-card scale-105' 
                  : 'bg-offWhite border-borderSubtle text-textPrimary hover:bg-white hover:border-brandOrange/30'
              }`}
            >
              <span className={`font-jakarta font-extrabold text-[12px] uppercase tracking-widest mb-2 ${selectedDate === d.full ? 'text-white/60' : 'text-textPrimary/40'}`}>{d.day}</span>
              <span className="font-jakarta font-extrabold text-[28px] tracking-tighter italic">{d.date.split(' ')[0]}</span>
              <span className={`font-jakarta font-extrabold text-[11px] uppercase tracking-widest ${selectedDate === d.full ? 'text-white/40' : 'text-textPrimary/20'}`}>{d.date.split(' ')[1]}</span>
            </button>
          ))}
        </div>
        <Button 
          onClick={() => setCurrentStep(2)} 
          disabled={!selectedDate}
          className="w-full mt-12 btn-primary h-16 rounded-2xl font-jakarta font-extrabold text-[16px] uppercase tracking-widest shadow-premium-card"
        >
          Choose Time Slot <ArrowRight className="w-5 h-5 ml-3" />
        </Button>
      </motion.div>
    );
  };

  const renderStep2 = () => {
    const times = ["10:00 AM", "11:30 AM", "02:00 PM", "04:00 PM", "05:30 PM", "07:00 PM"];

    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
        <h2 className="font-jakarta font-extrabold text-[28px] text-textPrimary mb-8 flex items-center gap-3 italic tracking-tighter">
          <Clock className="w-7 h-7 text-brandOrange" /> Select Time Slot
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {times.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              className={`flex items-center justify-between p-6 rounded-[24px] border-2 transition-all duration-300 ${
                selectedTime === t 
                  ? 'bg-brandOrange border-brandOrange text-white shadow-premium-card scale-[1.02]' 
                  : 'bg-offWhite border-borderSubtle text-textPrimary hover:bg-white hover:border-brandOrange/30'
              }`}
            >
              <span className="font-jakarta font-extrabold text-[16px] tracking-tighter italic">{t}</span>
              <CheckCircle2 className={`w-6 h-6 ${selectedTime === t ? 'text-white' : 'text-transparent'}`} />
            </button>
          ))}
        </div>
        <div className="flex gap-4 mt-12">
          <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1 border-borderSubtle text-textPrimary/60 h-16 rounded-2xl font-jakarta font-extrabold uppercase tracking-widest hover:bg-offWhite">Back</Button>
          <Button 
            onClick={() => setCurrentStep(3)} 
            disabled={!selectedTime}
            className="flex-[2] btn-primary h-16 rounded-2xl font-jakarta font-extrabold text-[16px] uppercase tracking-widest shadow-premium-card"
          >
            Confirm Details <ArrowRight className="w-5 h-5 ml-3" />
          </Button>
        </div>
      </motion.div>
    );
  };

  const renderStep3 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="font-jakarta font-extrabold text-[28px] text-textPrimary mb-8 flex items-center gap-3 italic tracking-tighter">
        <MapPin className="w-7 h-7 text-brandOrange" /> Confirm Address
      </h2>
      <div className="space-y-6">
        <div className="bg-brandBlue/5 border border-brandBlue/10 rounded-[28px] p-6 text-[14px] font-inter text-brandBlue font-medium italic">
          Your doorstep trainer will visit this exact location for the personalized demo class.
        </div>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your full home address (Flat, Building, Street, Landmark, Pincode)"
          rows={4}
          className="w-full p-8 bg-offWhite border border-borderSubtle focus:border-brandOrange rounded-[32px] font-inter text-[16px] text-textPrimary focus:outline-none focus:ring-4 focus:ring-brandOrange/5 transition-all resize-none font-medium italic"
        ></textarea>
      </div>
      <div className="flex gap-4 mt-12">
        <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1 border-borderSubtle text-textPrimary/60 h-16 rounded-2xl font-jakarta font-extrabold uppercase tracking-widest hover:bg-offWhite">Back</Button>
        <Button 
          onClick={handleBooking} 
          disabled={address.length < 10 || loading}
          className="flex-[2] btn-primary h-16 rounded-2xl font-jakarta font-extrabold text-[16px] uppercase tracking-widest shadow-premium-card"
        >
          {loading ? 'Processing...' : 'Complete Booking'} <ArrowRight className="w-5 h-5 ml-3" />
        </Button>
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 relative z-10">
      <Confetti width={width} height={height} recycle={false} numberOfPieces={600} colors={['#EA580C', '#F59E0B', '#0A1628', '#FFFFFF']} />
      
      <div className="w-32 h-32 bg-brandOrange/10 rounded-[40px] flex items-center justify-center mx-auto mb-10 rotate-6">
        <CheckCircle2 className="w-16 h-16 text-brandOrange" />
      </div>
      <h2 className="font-jakarta font-extrabold text-[40px] text-textPrimary mb-4 tracking-tighter italic leading-tight">Booking Confirmed! 🎉</h2>
      <p className="font-inter text-[18px] text-textSecondary mb-12 font-medium max-w-md mx-auto">Our doorstep expert is excited to meet you. Here are your session details.</p>
      
      <div className="bg-offWhite border border-borderSubtle rounded-[40px] p-10 text-left max-w-md mx-auto mb-12 space-y-6">
        <div className="flex justify-between items-center border-b border-white pb-6">
          <span className="font-jakarta font-extrabold text-[12px] text-textPrimary/40 uppercase tracking-widest">Date \u0026 Time</span>
          <span className="font-jakarta font-extrabold text-[16px] text-textPrimary text-right italic leading-tight">{selectedDate} <br/> {selectedTime}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-jakarta font-extrabold text-[12px] text-textPrimary/40 uppercase tracking-widest">Program</span>
          <span className="font-jakarta font-extrabold text-[16px] text-textPrimary italic">Python Masterclass Demo</span>
        </div>
      </div>

      <Button onClick={() => navigate('/student/dashboard')} className="btn-primary px-12 h-16 rounded-2xl font-jakarta font-extrabold text-[16px] uppercase tracking-widest shadow-premium-card">
        Explore Dashboard <ArrowRight className="w-5 h-5 ml-3" />
      </Button>
    </motion.div>
  );

  return (
    <PageTransition>
      <div className="max-w-[1000px] mx-auto min-h-[80vh] flex flex-col justify-center py-20 px-4 font-inter text-textPrimary">
        
        {currentStep < 4 && (
          <div className="mb-16">
            <Link to={`/student/courses/${id}`} className="inline-flex items-center gap-3 text-textPrimary/40 hover:text-brandOrange font-jakarta font-extrabold text-[12px] uppercase tracking-widest mb-12 transition-all">
              <ChevronLeft className="w-4 h-4" /> Exit Booking
            </Link>
            
            {/* Stepper Progress */}
            <div className="flex items-center justify-between relative mb-16 max-w-[500px] mx-auto">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-offWhite -z-10 rounded-full"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-brandOrange -z-10 rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(234,88,12,0.4)]"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              ></div>
              
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center gap-3">
                  <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center font-jakarta font-extrabold text-[16px] transition-all duration-500 shadow-premium-card ${
                    currentStep === step ? 'bg-brandOrange text-white scale-125' : 
                    currentStep > step ? 'bg-brandOrange text-white' : 'bg-white border-2 border-borderSubtle text-textPrimary/20'
                  }`}>
                    {currentStep > step ? <CheckCircle2 className="w-6 h-6" /> : step}
                  </div>
                  <span className={`font-jakarta font-extrabold text-[11px] absolute -bottom-8 uppercase tracking-widest transition-colors ${currentStep >= step ? 'text-textPrimary' : 'text-textPrimary/20'}`}>
                    {steps[step - 1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-[48px] p-8 md:p-12 shadow-premium-elevated border border-borderSubtle relative overflow-hidden">
           <AnimatePresence mode="wait">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </AnimatePresence>
        </div>

      </div>
    </PageTransition>
  );
};

export default BookDemoPage;
