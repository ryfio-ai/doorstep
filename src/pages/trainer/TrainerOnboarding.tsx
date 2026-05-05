import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../../components/shared/PageTransition';
import { Button } from '../../components/ui/button';
import { Upload, CheckCircle2, User, BookOpen, Clock, FileText, ChevronRight, MapPin, Award, Trash2 } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useAuth } from '../../context/AuthContext';
import { supabase, uploadFile } from '../../lib/supabase';
import { toast } from 'sonner';

const steps = [
  { id: 1, title: 'Personal Details', icon: User },
  { id: 2, title: 'Subject Expertise', icon: BookOpen },
  { id: 3, title: 'Availability', icon: Clock },
  { id: 4, title: 'Service Areas', icon: MapPin },
  { id: 5, title: 'Documents', icon: FileText },
];

export const TrainerOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { width, height } = useWindowSize();

  const [formData, setFormData] = useState({
    bio: '',
    expertise: [] as string[],
    localities: [] as string[],
    gender: '',
    dob: '',
    languages: [] as string[],
    experience_years: 0,
    education: '',
    aadhaar_url: '',
    certificate_url: '',
    availability: {} as any,
  });

  useEffect(() => {
    if (user?.onboarding_complete) {
      navigate('/trainer/dashboard');
    }
  }, [user, navigate]);

  const handleNext = async () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const { error: profileError } = await supabase
        .from('trainer_profiles')
        .update({
          bio: formData.bio,
          expertise: formData.expertise,
          localities: formData.localities,
          onboarding_step: 6,
          onboarding_complete: true, // We'll add this column if needed or just use onboarding_step
        })
        .eq('user_id', user.id);

      if (profileError) throw profileError;

      const { error: userError } = await supabase
        .from('users')
        .update({ onboarding_complete: true })
        .eq('id', user.id);

      if (userError) throw userError;

      await refreshProfile();
      setCurrentStep(6); // Success step
      toast.success('Onboarding complete!');
    } catch (error: any) {
      toast.error(error.message || 'Error saving profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'aadhaar' | 'certificate') => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setLoading(true);
    try {
      const path = `${user.id}/${type}_${Date.now()}`;
      const url = await uploadFile('trainer-docs', path, file);
      setFormData({ ...formData, [type === 'aadhaar' ? 'aadhaar_url' : 'certificate_url']: url });
      toast.success(`${type === 'aadhaar' ? 'Aadhaar' : 'Certificate'} uploaded!`);
    } catch (error: any) {
      toast.error('Error uploading file. Make sure the storage bucket exists.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (item: string, field: 'expertise' | 'localities' | 'languages') => {
    const current = formData[field] as string[];
    if (current.includes(item)) {
      setFormData({ ...formData, [field]: current.filter(i => i !== item) });
    } else {
      setFormData({ ...formData, [field]: [...current, item] });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 flex flex-col pt-10 pb-20 px-4">
        
        <div className="max-w-[800px] w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-poppins font-bold text-[32px] text-primary">Trainer Onboarding</h1>
            <p className="font-inter text-[15px] text-gray-500 mt-2">Professional details for Tamizh Tech EduDoor verification.</p>
          </div>

          {/* Stepper indicator */}
          {currentStep < 6 && (
            <div className="flex justify-between items-center mb-10 relative px-4">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-accent -z-10 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
              ></div>
              
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive ? 'bg-accent text-white shadow-orange scale-110' : 
                      isCompleted ? 'bg-accent text-white' : 'bg-white border-2 border-gray-200 text-gray-400'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className={`hidden sm:block font-inter text-[11px] mt-2 font-medium ${
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
          <div className="bg-white rounded-[24px] shadow-card border border-gray-100 p-6 md:p-10 relative">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Personal Details */}
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="font-poppins font-bold text-[24px] text-primary flex items-center gap-2">
                    <User className="w-6 h-6 text-accent" /> Personal Details
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-poppins font-medium text-[14px] text-primary">Gender</label>
                      <select 
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-inter text-[14px] focus:outline-none focus:ring-2 focus:ring-accent/20"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-poppins font-medium text-[14px] text-primary">Date of Birth</label>
                      <input 
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({...formData, dob: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-inter text-[14px] focus:outline-none focus:ring-2 focus:ring-accent/20" 
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="font-poppins font-medium text-[14px] text-primary">Languages you can teach in</label>
                      <div className="flex flex-wrap gap-2">
                        {['English', 'Tamil', 'Hindi', 'Malayalam', 'Kannada', 'Telugu'].map(lang => (
                          <button
                            key={lang}
                            onClick={() => toggleSelection(lang, 'languages')}
                            className={`px-4 py-2 rounded-full font-inter text-[13px] border transition-all ${
                              formData.languages.includes(lang) ? 'bg-accent text-white border-accent' : 'bg-white text-gray-500 border-gray-200 hover:border-accent'
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="font-poppins font-medium text-[14px] text-primary">Your Bio (visible to students)</label>
                      <textarea 
                        rows={4}
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        placeholder="I have 5 years of experience in teaching Python and Data Science..."
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg font-inter text-[14px] focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                      ></textarea>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Subject Expertise */}
              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="font-poppins font-bold text-[24px] text-primary flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-accent" /> Subject Expertise
                  </h2>
                  
                  <div className="space-y-4">
                    <label className="font-poppins font-medium text-[14px] text-primary">Select subjects you can teach</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Python', 'Web Dev', 'Java', 'C++', 'AI & ML', 'Robotics', 'Spoken English', 'TNPSC'].map(subject => (
                        <button
                          key={subject}
                          onClick={() => toggleSelection(subject, 'expertise')}
                          className={`p-4 rounded-xl font-poppins font-semibold text-[14px] border transition-all flex items-center justify-between ${
                            formData.expertise.includes(subject) ? 'bg-accent/5 text-accent border-accent' : 'bg-white text-gray-500 border-gray-100 hover:border-accent'
                          }`}
                        >
                          {subject}
                          {formData.expertise.includes(subject) && <CheckCircle2 className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                    
                    <div className="space-y-1.5 mt-6">
                      <label className="font-poppins font-medium text-[14px] text-primary">Years of Teaching Experience</label>
                      <input 
                        type="number"
                        value={formData.experience_years}
                        onChange={(e) => setFormData({...formData, experience_years: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-inter text-[14px] focus:outline-none" 
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Availability */}
              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="font-poppins font-bold text-[24px] text-primary flex items-center gap-2">
                    <Clock className="w-6 h-6 text-accent" /> Availability
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <div key={day} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <span className="font-poppins font-semibold text-[15px] text-primary w-24">{day}</span>
                        <div className="flex flex-wrap gap-2">
                          {['Morning', 'Afternoon', 'Evening'].map(slot => (
                            <button
                              key={slot}
                              className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 font-inter text-[12px] hover:border-accent"
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Service Areas */}
              {currentStep === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="font-poppins font-bold text-[24px] text-primary flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-accent" /> Service Areas
                  </h2>
                  <p className="font-inter text-[14px] text-gray-500">Select localities you can travel to within {user?.city}.</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['Area 1', 'Area 2', 'Area 3', 'Area 4', 'Area 5', 'Area 6'].map(area => (
                      <button
                        key={area}
                        onClick={() => toggleSelection(area, 'localities')}
                        className={`p-3 rounded-lg font-inter text-[13px] border transition-all ${
                          formData.localities.includes(area) ? 'bg-accent/5 text-accent border-accent' : 'bg-white text-gray-500 border-gray-100 hover:border-accent'
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 5: Documents */}
              {currentStep === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="font-poppins font-bold text-[24px] text-primary flex items-center gap-2">
                    <FileText className="w-6 h-6 text-accent" /> Verification Documents
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-poppins font-medium text-[14px] text-primary">Aadhaar Card (Front & Back)</label>
                      <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:bg-gray-50 transition-colors group">
                        {formData.aadhaar_url ? (
                          <div className="space-y-3">
                            <CheckCircle2 className="w-10 h-10 text-success mx-auto" />
                            <p className="text-[12px] text-gray-500 truncate">{formData.aadhaar_url}</p>
                            <Button variant="ghost" size="sm" onClick={() => setFormData({...formData, aadhaar_url: ''})} className="text-red-500">
                              <Trash2 className="w-4 h-4 mr-1" /> Remove
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2 group-hover:text-accent transition-colors" />
                            <p className="text-[13px] text-gray-500">Click to upload Aadhaar</p>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'aadhaar')} />
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-poppins font-medium text-[14px] text-primary">Highest Degree Certificate</label>
                      <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:bg-gray-50 transition-colors group">
                        {formData.certificate_url ? (
                          <div className="space-y-3">
                            <Award className="w-10 h-10 text-success mx-auto" />
                            <p className="text-[12px] text-gray-500 truncate">{formData.certificate_url}</p>
                            <Button variant="ghost" size="sm" onClick={() => setFormData({...formData, certificate_url: ''})} className="text-red-500">
                              <Trash2 className="w-4 h-4 mr-1" /> Remove
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2 group-hover:text-accent transition-colors" />
                            <p className="text-[13px] text-gray-500">Click to upload Certificate</p>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'certificate')} />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 6: Success */}
              {currentStep === 6 && (
                <motion.div key="step6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 relative z-10">
                  <Confetti width={width} height={height} recycle={false} numberOfPieces={500} colors={['#1B2A5E', '#F47820', '#10b981', '#ffffff']} />
                  <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-success" />
                  </div>
                  <h2 className="font-poppins font-bold text-[32px] text-primary mb-3">Application Submitted! 🎉</h2>
                  <p className="font-inter text-[15px] text-gray-500 mb-8 max-w-md mx-auto">
                    Our team will verify your documents and get back to you within 24-48 hours. You can now access your dashboard.
                  </p>
                  <Button onClick={() => navigate('/trainer/dashboard')} className="px-10 h-12 bg-primary hover:bg-navy-dark text-white font-poppins font-semibold rounded-lg shadow-md">
                    Go to Dashboard
                  </Button>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 6 && (
              <div className="flex gap-4 mt-12 pt-8 border-t border-gray-100">
                {currentStep > 1 && (
                  <Button variant="ghost" onClick={handleBack} className="flex-1 h-12 font-poppins font-semibold text-gray-500">
                    Back
                  </Button>
                )}
                <Button 
                  onClick={handleNext} 
                  disabled={loading}
                  className={`flex-[2] h-12 bg-accent hover:bg-accent-600 text-white font-poppins font-semibold rounded-lg shadow-orange ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : currentStep === 5 ? 'Submit Application' : 'Continue'} <ChevronRight className="w-4 h-4 ml-1" />
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
