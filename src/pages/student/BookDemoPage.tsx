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
  
  // Form State
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [address, setAddress] = useState("");

  const { width, height } = useWindowSize();

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
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
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
        <h2 className="font-poppins font-bold text-[24px] text-primary mb-6 flex items-center gap-2">
          <CalendarIcon className="w-6 h-6 text-accent" /> Select a Date
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {dates.map((d) => (
            <button
              key={d.full}
              onClick={() => setSelectedDate(d.full)}
              className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                selectedDate === d.full 
                  ? 'border-accent bg-accent/5 shadow-sm' 
                  : 'border-gray-100 hover:border-accent/30 bg-white'
              }`}
            >
              <span className={`font-poppins font-semibold text-[14px] ${selectedDate === d.full ? 'text-accent' : 'text-gray-500'}`}>{d.day}</span>
              <span className={`font-inter text-[18px] mt-1 ${selectedDate === d.full ? 'text-primary font-bold' : 'text-primary'}`}>{d.date.split(' ')[0]}</span>
              <span className={`font-inter text-[11px] ${selectedDate === d.full ? 'text-accent' : 'text-gray-400'}`}>{d.date.split(' ')[1]}</span>
            </button>
          ))}
        </div>
        <Button 
          onClick={handleNext} 
          disabled={!selectedDate}
          className="w-full mt-8 bg-accent hover:bg-accent-600 text-white font-poppins font-semibold text-[15px] h-12 rounded-lg disabled:opacity-50"
        >
          Continue to Time Select
        </Button>
      </motion.div>
    );
  };

  const renderStep2 = () => {
    const times = ["10:00 AM", "11:30 AM", "02:00 PM", "04:00 PM", "05:30 PM", "07:00 PM"];

    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
        <h2 className="font-poppins font-bold text-[24px] text-primary mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6 text-accent" /> Select a Time
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {times.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              className={`p-4 rounded-xl border-2 transition-all font-inter font-medium text-[15px] ${
                selectedTime === t 
                  ? 'border-accent bg-accent text-white shadow-orange' 
                  : 'border-gray-100 hover:border-accent/30 bg-white text-primary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-4 mt-8">
          <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1 border-gray-200 text-gray-600 h-12 rounded-lg font-poppins font-medium">Back</Button>
          <Button 
            onClick={handleNext} 
            disabled={!selectedTime}
            className="flex-[2] bg-accent hover:bg-accent-600 text-white font-poppins font-semibold text-[15px] h-12 rounded-lg disabled:opacity-50"
          >
            Continue to Address
          </Button>
        </div>
      </motion.div>
    );
  };

  const renderStep3 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="font-poppins font-bold text-[24px] text-primary mb-6 flex items-center gap-2">
        <MapPin className="w-6 h-6 text-accent" /> Confirm Address
      </h2>
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-[13px] font-inter text-blue-800">
          The trainer will visit this exact address for the demo class.
        </div>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your full home address (Flat, Building, Street, Landmark, Pincode)"
          rows={4}
          className="w-full p-4 bg-white border border-gray-200 focus:border-accent rounded-xl font-inter text-[14px] text-primary focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all resize-none"
        ></textarea>
      </div>
      <div className="flex gap-4 mt-8">
        <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1 border-gray-200 text-gray-600 h-12 rounded-lg font-poppins font-medium">Back</Button>
        <Button 
          onClick={handleNext} 
          disabled={address.length < 10}
          className="flex-[2] bg-accent hover:bg-accent-600 text-white font-poppins font-semibold text-[15px] h-12 rounded-lg shadow-orange disabled:opacity-50"
        >
          Confirm Booking
        </Button>
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 relative z-10">
      <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />
      
      <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-success" />
      </div>
      <h2 className="font-poppins font-bold text-[28px] text-primary mb-2">Booking Confirmed!</h2>
      <p className="font-inter text-[15px] text-gray-500 mb-8">Your free demo class is scheduled.</p>
      
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 text-left max-w-sm mx-auto mb-8 space-y-3">
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <span className="font-inter text-[13px] text-gray-500">Date & Time</span>
          <span className="font-poppins font-semibold text-[14px] text-primary text-right">{selectedDate} <br/> {selectedTime}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-inter text-[13px] text-gray-500">Course</span>
          <span className="font-poppins font-semibold text-[14px] text-primary">Python Masterclass</span>
        </div>
      </div>

      <Button onClick={() => navigate('/student/dashboard')} className="bg-primary hover:bg-navy-dark text-white font-poppins font-semibold text-[15px] px-8 h-12 rounded-lg">
        Go to Dashboard
      </Button>
    </motion.div>
  );

  return (
    <PageTransition>
      <div className="max-w-[800px] mx-auto min-h-[80vh] flex flex-col justify-center py-10">
        
        {currentStep < 4 && (
          <div className="mb-8">
            <Link to={`/student/courses/${id}`} className="inline-flex items-center gap-1 text-gray-500 hover:text-primary font-inter text-[14px] mb-8 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Cancel Booking
            </Link>
            
            {/* Stepper Progress */}
            <div className="flex items-center justify-between relative mb-12 max-w-[400px] mx-auto">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 -z-10 rounded-full"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-accent -z-10 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              ></div>
              
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-poppins font-bold text-[14px] transition-colors ${
                    currentStep === step ? 'bg-accent text-white shadow-orange' : 
                    currentStep > step ? 'bg-accent text-white' : 'bg-white border-2 border-gray-200 text-gray-400'
                  }`}>
                    {currentStep > step ? <CheckCircle2 className="w-5 h-5" /> : step}
                  </div>
                  <span className={`font-inter text-[11px] absolute -bottom-6 whitespace-nowrap ${currentStep >= step ? 'text-primary font-medium' : 'text-gray-400'}`}>
                    {steps[step - 1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-modal border border-gray-100 relative overflow-hidden">
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
