import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { Upload, CheckCircle2, User, BookOpen, Clock, FileText, ChevronRight } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const steps = [
  { id: 1, title: 'Personal Details', icon: User },
  { id: 2, title: 'Subject Expertise', icon: BookOpen },
  { id: 3, title: 'Availability', icon: Clock },
  { id: 4, title: 'Documents', icon: FileText },
];

export const TrainerOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { width, height } = useWindowSize();

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 flex flex-col pt-10 pb-20 px-4">
        
        <div className="max-w-[800px] w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-poppins font-bold text-[32px] text-primary">Trainer Application</h1>
            <p className="font-inter text-[15px] text-gray-500 mt-2">Complete your profile to start teaching and earning.</p>
          </div>

          {/* Stepper indicator */}
          {currentStep < 5 && (
            <div className="flex justify-between items-center mb-10 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-accent -z-10 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              ></div>
              
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isActive ? 'bg-accent text-white shadow-orange scale-110' : 
                      isCompleted ? 'bg-accent text-white' : 'bg-white border-2 border-gray-200 text-gray-400'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span className={`hidden sm:block font-inter text-[12px] mt-2 font-medium ${
                      isActive || isCompleted ? 'text-primary' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Form Content */}
          <div className="bg-white rounded-[24px] shadow-card border border-gray-100 p-6 md:p-10 relative overflow-hidden">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Personal */}
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-poppins font-bold text-[24px] text-primary mb-6">Personal Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-poppins font-medium text-[14px] text-primary">First Name</label>
                      <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-accent rounded-lg font-inter text-[14px] focus:outline-none focus:ring-4 focus:ring-accent/10" placeholder="John" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-poppins font-medium text-[14px] text-primary">Last Name</label>
                      <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-accent rounded-lg font-inter text-[14px] focus:outline-none focus:ring-4 focus:ring-accent/10" placeholder="Doe" />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="font-poppins font-medium text-[14px] text-primary">Phone Number</label>
                      <input type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-accent rounded-lg font-inter text-[14px] focus:outline-none focus:ring-4 focus:ring-accent/10" placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="font-poppins font-medium text-[14px] text-primary">City (Launch Edition)</label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-accent rounded-lg font-inter text-[14px] focus:outline-none focus:ring-4 focus:ring-accent/10">
                        <option>Select your city</option>
                        <option>Coimbatore</option>
                        <option>Chennai</option>
                        <option>Madurai</option>
                        <option>Trichy</option>
                        <option>Bangalore</option>
                      </select>
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="font-poppins font-medium text-[14px] text-primary">Full Address (For Doorstep verification)</label>
                      <textarea rows={3} className="w-full p-4 bg-gray-50 border border-gray-200 focus:border-accent rounded-lg font-inter text-[14px] focus:outline-none focus:ring-4 focus:ring-accent/10 resize-none" placeholder="Enter your residential address"></textarea>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Expertise */}
              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-poppins font-bold text-[24px] text-primary mb-6">Subject Expertise</h2>
                  <div className="space-y-6">
                    <div className="space-y-1.5">
                      <label className="font-poppins font-medium text-[14px] text-primary">Primary Category</label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-accent rounded-lg font-inter text-[14px] focus:outline-none focus:ring-4 focus:ring-accent/10">
                        <option>Select a category</option>
                        <option>Mathematics</option>
                        <option>Science</option>
                        <option>AI & Machine Learning</option>
                        <option>Python Programming</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-poppins font-medium text-[14px] text-primary">Years of Teaching Experience</label>
                      <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-accent rounded-lg font-inter text-[14px] focus:outline-none focus:ring-4 focus:ring-accent/10" placeholder="e.g. 3" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-poppins font-medium text-[14px] text-primary">Short Bio (Visible to students)</label>
                      <textarea rows={4} className="w-full p-4 bg-gray-50 border border-gray-200 focus:border-accent rounded-lg font-inter text-[14px] focus:outline-none focus:ring-4 focus:ring-accent/10 resize-none" placeholder="I am an experienced Python developer..."></textarea>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Availability */}
              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-poppins font-bold text-[24px] text-primary mb-6">Your Availability</h2>
                  <p className="font-inter text-[14px] text-gray-500 mb-6">Select the areas you can travel to and your available days.</p>
                  
                  <div className="space-y-1.5 mb-6">
                    <label className="font-poppins font-medium text-[14px] text-primary">Service Areas (Zones/Localities)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                      {['North Zone', 'South Zone', 'East Zone', 'West Zone', 'Central Zone', 'All Zones'].map(zone => (
                        <div key={zone} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent" />
                          <span className="font-inter text-[13px] text-primary">{zone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <div key={day} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-accent focus:ring-accent" />
                        <span className="font-poppins font-medium text-[15px] text-primary w-24">{day}</span>
                        <select className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg font-inter text-[13px] text-gray-600 focus:outline-none">
                          <option>09:00 AM - 12:00 PM</option>
                          <option>02:00 PM - 05:00 PM</option>
                          <option>05:00 PM - 08:00 PM</option>
                          <option>Flexible</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Documents */}
              {currentStep === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="font-poppins font-bold text-[24px] text-primary mb-6">Document Verification</h2>
                  <p className="font-inter text-[14px] text-gray-500 mb-6">As a trusted doorstep platform, we require identity verification.</p>
                  
                  <div className="space-y-6">
                    {/* Aadhar Upload */}
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 hover:border-accent/50 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6" />
                      </div>
                      <h3 className="font-poppins font-semibold text-[16px] text-primary">Upload Aadhar Card</h3>
                      <p className="font-inter text-[13px] text-gray-500 mt-1">PDF, JPG or PNG (Max 5MB)</p>
                    </div>

                    {/* Degree/Certificate Upload */}
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 hover:border-accent/50 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6" />
                      </div>
                      <h3 className="font-poppins font-semibold text-[16px] text-primary">Upload Highest Degree / Certificate</h3>
                      <p className="font-inter text-[13px] text-gray-500 mt-1">PDF, JPG or PNG (Max 5MB)</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Success */}
              {currentStep === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 relative z-10">
                  <Confetti width={width} height={height} recycle={false} numberOfPieces={400} />
                  
                  <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-success" />
                  </div>
                  
                  <h2 className="font-poppins font-bold text-[32px] text-primary mb-3">Application Submitted!</h2>
                  <p className="font-inter text-[15px] text-gray-500 mb-8 max-w-md mx-auto">
                    Thank you for applying. Our admin team will verify your documents and get back to you within 24-48 hours.
                  </p>

                  <Button 
                    onClick={() => navigate('/trainer/dashboard')}
                    className="w-full sm:w-auto bg-primary hover:bg-navy-dark text-white font-poppins font-semibold text-[15px] px-8 h-12 rounded-lg shadow-md"
                  >
                    Go to Dashboard
                  </Button>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex gap-4 mt-10 pt-6 border-t border-gray-100">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handleBack} className="flex-1 border-gray-200 text-gray-600 h-12 rounded-lg font-poppins font-medium">
                    Back
                  </Button>
                )}
                <Button 
                  onClick={handleNext} 
                  className={`flex-[2] bg-accent hover:bg-accent-600 text-white font-poppins font-semibold text-[15px] h-12 rounded-lg ${currentStep === 4 ? 'shadow-orange' : ''}`}
                >
                  {currentStep === 4 ? 'Submit Application' : 'Continue'} <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default TrainerOnboarding;
