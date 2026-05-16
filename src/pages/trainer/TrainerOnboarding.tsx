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
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
          onboarding_complete: true,
        })
        .eq('user_id', user.id);

      if (profileError) throw profileError;

      const { error: userError } = await supabase
        .from('users')
        .update({ onboarding_complete: true })
        .eq('id', user.id);

      if (userError) throw userError;

      await refreshProfile();
      setCurrentStep(6);
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
      <div className="min-h-screen bg-offWhite flex flex-col pt-20 pb-20 px-4 font-inter text-textPrimary">
        
        <div className="max-w-[900px] w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-jakarta font-extrabold text-[40px] md:text-[56px] text-textPrimary leading-[1.1] tracking-tighter italic mb-4">
                Trainer <span className="text-brandOrange underline decoration-brandOrange/10">Certification</span>
              </h1>
              <p className="font-inter text-[18px] text-textSecondary font-medium max-w-xl mx-auto italic opacity-60">
                Join our elite network of engineering mentors. Professional verification for ThiranOli.
              </p>
            </motion.div>
          </div>

          {/* Stepper indicator */}
          {currentStep < 6 && (
            <div className="flex justify-between items-center mb-16 relative px-8">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/50 -z-10 rounded-full"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-brandOrange -z-10 rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(234,88,12,0.3)]"
                style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
              ></div>
              
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center transition-all duration-500 shadow-premium-card ${
                      isActive ? 'bg-brandOrange text-white scale-125 shadow-premium-elevated' : 
                      isCompleted ? 'bg-brandOrange text-white' : 'bg-white border-2 border-borderSubtle text-textPrimary/20'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <span className={`hidden sm:block font-jakarta font-extrabold text-[11px] mt-6 uppercase tracking-widest ${
                      isActive || isCompleted ? 'text-textPrimary' : 'text-textPrimary/20'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Form Content */}
          <div className="bg-white rounded-[48px] shadow-premium-elevated border border-borderSubtle p-8 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brandOrange/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            
            <AnimatePresence mode="wait">
              
              {/* Step 1: Personal Details */}
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 relative z-10">
                  <h2 className="font-jakarta font-extrabold text-[28px] text-textPrimary flex items-center gap-4 italic tracking-tighter leading-none">
                    <User className="w-8 h-8 text-brandOrange" /> Personal Credentials
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="font-jakarta font-extrabold text-[12px] text-textPrimary/40 uppercase tracking-widest">Identify as</label>
                      <select 
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="w-full h-14 px-6 bg-offWhite border border-borderSubtle rounded-2xl font-inter text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-brandOrange/5 focus:border-brandOrange transition-all appearance-none italic"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="font-jakarta font-extrabold text-[12px] text-textPrimary/40 uppercase tracking-widest">Birth Date</label>
                      <input 
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({...formData, dob: e.target.value})}
                        className="w-full h-14 px-6 bg-offWhite border border-borderSubtle rounded-2xl font-inter text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-brandOrange/5 focus:border-brandOrange transition-all italic" 
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label className="font-jakarta font-extrabold text-[12px] text-textPrimary/40 uppercase tracking-widest">Instruction Languages</label>
                      <div className="flex flex-wrap gap-3 pt-2">
                        {['English', 'Tamil', 'Hindi', 'Malayalam', 'Kannada', 'Telugu'].map(lang => (
                          <button
                            key={lang}
                            onClick={() => toggleSelection(lang, 'languages')}
                            className={`px-6 py-3 rounded-xl font-jakarta font-extrabold text-[13px] uppercase tracking-widest border-2 transition-all duration-300 ${
                              formData.languages.includes(lang) 
                                ? 'bg-brandOrange text-white border-brandOrange shadow-premium-card scale-105' 
                                : 'bg-offWhite text-textPrimary/40 border-borderSubtle hover:border-brandOrange/30'
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label className="font-jakarta font-extrabold text-[12px] text-textPrimary/40 uppercase tracking-widest">Professional Bio</label>
                      <textarea 
                        rows={4}
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        placeholder="Detail your engineering background and teaching philosophy..."
                        className="w-full p-6 bg-offWhite border border-borderSubtle rounded-3xl font-inter text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-brandOrange/5 focus:border-brandOrange transition-all resize-none italic"
                      ></textarea>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Subject Expertise */}
              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 relative z-10">
                  <h2 className="font-jakarta font-extrabold text-[28px] text-textPrimary flex items-center gap-4 italic tracking-tighter leading-none">
                    <BookOpen className="w-8 h-8 text-brandOrange" /> Engineering Expertise
                  </h2>
                  
                  <div className="space-y-8">
                    <label className="font-jakarta font-extrabold text-[12px] text-textPrimary/40 uppercase tracking-widest">Select Core Competencies</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                      {['Robotics', 'IoT', 'AI & ML', 'Python', 'Electronics', '3D Printing', 'Drones', 'Java', 'C++', 'Web Dev', 'Physics', 'Mathematics'].map(subject => (
                        <button
                          key={subject}
                          onClick={() => toggleSelection(subject, 'expertise')}
                          className={`p-5 rounded-2xl font-jakarta font-extrabold text-[14px] uppercase tracking-widest border-2 transition-all duration-300 flex items-center justify-between ${
                            formData.expertise.includes(subject) 
                              ? 'bg-brandOrange/5 text-brandOrange border-brandOrange/30 shadow-sm' 
                              : 'bg-offWhite text-textPrimary/40 border-borderSubtle hover:border-brandOrange/30 hover:bg-white'
                          }`}
                        >
                          {subject}
                          {formData.expertise.includes(subject) && <CheckCircle2 className="w-5 h-5" />}
                        </button>
                      ))}
                    </div>
                    
                    <div className="space-y-3 mt-10">
                      <label className="font-jakarta font-extrabold text-[12px] text-textPrimary/40 uppercase tracking-widest">Years of Industry/Teaching Experience</label>
                      <input 
                        type="number"
                        value={formData.experience_years}
                        onChange={(e) => setFormData({...formData, experience_years: parseInt(e.target.value)})}
                        className="w-full h-14 px-6 bg-offWhite border border-borderSubtle rounded-2xl font-inter text-[15px] font-bold focus:outline-none focus:ring-4 focus:ring-brandOrange/5 focus:border-brandOrange transition-all italic" 
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Availability */}
              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 relative z-10">
                  <h2 className="font-jakarta font-extrabold text-[28px] text-textPrimary flex items-center gap-4 italic tracking-tighter leading-none">
                    <Clock className="w-8 h-8 text-brandOrange" /> Teaching Availability
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-4 pt-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <div key={day} className="flex flex-col sm:flex-row items-center gap-6 bg-offWhite p-6 rounded-3xl border border-borderSubtle group hover:border-brandOrange/20 transition-all">
                        <span className="font-jakarta font-extrabold text-[16px] text-textPrimary italic w-full sm:w-32">{day}</span>
                        <div className="flex flex-wrap gap-3 w-full">
                          {['Morning', 'Afternoon', 'Evening'].map(slot => (
                            <button
                              key={slot}
                              className="px-5 py-2 rounded-xl bg-white border border-borderSubtle font-jakarta font-extrabold text-[11px] uppercase tracking-widest hover:border-brandOrange hover:text-brandOrange transition-all shadow-sm"
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
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 relative z-10">
                  <h2 className="font-jakarta font-extrabold text-[28px] text-textPrimary flex items-center gap-4 italic tracking-tighter leading-none">
                    <MapPin className="w-8 h-8 text-brandOrange" /> Service Localities
                  </h2>
                  <p className="font-inter text-[16px] text-textSecondary font-medium italic opacity-60">Select areas within {user?.city || 'Chennai'} you can serve at doorstep.</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                    {['Adyar', 'Anna Nagar', 'T Nagar', 'Velachery', 'Nungambakkam', 'OMR'].map(area => (
                      <button
                        key={area}
                        onClick={() => toggleSelection(area, 'localities')}
                        className={`p-5 rounded-2xl font-jakarta font-extrabold text-[13px] uppercase tracking-widest border-2 transition-all duration-300 ${
                          formData.localities.includes(area) 
                            ? 'bg-brandOrange text-white border-brandOrange shadow-premium-card scale-105' 
                            : 'bg-offWhite text-textPrimary/40 border-borderSubtle hover:border-brandOrange/30'
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
                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 relative z-10">
                  <h2 className="font-jakarta font-extrabold text-[28px] text-textPrimary flex items-center gap-4 italic tracking-tighter leading-none">
                    <FileText className="w-8 h-8 text-brandOrange" /> Document Verification
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
                    <div className="space-y-4">
                      <label className="font-jakarta font-extrabold text-[12px] text-textPrimary/40 uppercase tracking-widest">Aadhaar Verification</label>
                      <div className="relative border-2 border-dashed border-borderSubtle rounded-[32px] p-10 text-center hover:bg-offWhite transition-all group overflow-hidden bg-offWhite/50">
                        {formData.aadhaar_url ? (
                          <div className="space-y-4 relative z-10">
                            <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto">
                              <CheckCircle2 className="w-8 h-8 text-success" />
                            </div>
                            <p className="font-jakarta font-extrabold text-[11px] text-textSecondary uppercase tracking-widest truncate max-w-[200px] mx-auto">Verified ID</p>
                            <Button variant="ghost" size="sm" onClick={() => setFormData({...formData, aadhaar_url: ''})} className="text-destructive font-jakarta font-extrabold text-[11px] uppercase tracking-widest hover:bg-destructive/10">
                              <Trash2 className="w-4 h-4 mr-2" /> Reset
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-12 h-12 text-textPrimary/10 mx-auto mb-4 group-hover:text-brandOrange transition-all duration-500 group-hover:scale-110" />
                            <p className="font-jakarta font-extrabold text-[11px] text-textPrimary/40 uppercase tracking-widest">Upload Aadhaar</p>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-20" onChange={(e) => handleFileUpload(e, 'aadhaar')} />
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="font-jakarta font-extrabold text-[12px] text-textPrimary/40 uppercase tracking-widest">Academic Excellence</label>
                      <div className="relative border-2 border-dashed border-borderSubtle rounded-[32px] p-10 text-center hover:bg-offWhite transition-all group overflow-hidden bg-offWhite/50">
                        {formData.certificate_url ? (
                          <div className="space-y-4 relative z-10">
                            <div className="w-16 h-16 bg-brandOrange/10 rounded-2xl flex items-center justify-center mx-auto">
                              <Award className="w-8 h-8 text-brandOrange" />
                            </div>
                            <p className="font-jakarta font-extrabold text-[11px] text-textSecondary uppercase tracking-widest truncate max-w-[200px] mx-auto">Verified Degree</p>
                            <Button variant="ghost" size="sm" onClick={() => setFormData({...formData, certificate_url: ''})} className="text-destructive font-jakarta font-extrabold text-[11px] uppercase tracking-widest hover:bg-destructive/10">
                              <Trash2 className="w-4 h-4 mr-2" /> Reset
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-12 h-12 text-textPrimary/10 mx-auto mb-4 group-hover:text-brandOrange transition-all duration-500 group-hover:scale-110" />
                            <p className="font-jakarta font-extrabold text-[11px] text-textPrimary/40 uppercase tracking-widest">Upload Degree</p>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-20" onChange={(e) => handleFileUpload(e, 'certificate')} />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 6: Success */}
              {currentStep === 6 && (
                <motion.div key="step6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 relative z-10">
                  <Confetti width={width} height={height} recycle={false} numberOfPieces={800} colors={['#EA580C', '#F59E0B', '#0A1628', '#FFFFFF']} />
                  <div className="w-32 h-32 bg-brandOrange/10 rounded-[40px] flex items-center justify-center mx-auto mb-10 rotate-6 shadow-premium-card">
                    <CheckCircle2 className="w-16 h-16 text-brandOrange" />
                  </div>
                  <h2 className="font-jakarta font-extrabold text-[40px] text-textPrimary mb-6 tracking-tighter italic leading-tight">Verification Pending! 🎉</h2>
                  <p className="font-inter text-[18px] text-textSecondary mb-12 max-w-lg mx-auto font-medium italic opacity-60">
                    Our engineering board will validate your credentials within 24 hours. You can now access your portal tools.
                  </p>
                  <Button onClick={() => navigate('/trainer/dashboard')} className="btn-primary px-16 h-16 rounded-2xl font-jakarta font-extrabold text-[16px] uppercase tracking-widest shadow-premium-card">
                    Enter Portal <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 6 && (
              <div className="flex gap-6 mt-16 pt-12 border-t border-offWhite relative z-10">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handleBack} className="flex-1 h-16 border-borderSubtle text-textPrimary/40 rounded-2xl font-jakarta font-extrabold text-[14px] uppercase tracking-widest hover:bg-offWhite transition-all">
                    Previous
                  </Button>
                )}
                <Button 
                  onClick={handleNext} 
                  disabled={loading}
                  className={`flex-[2] btn-primary h-16 rounded-2xl font-jakarta font-extrabold text-[16px] uppercase tracking-widest shadow-premium-card ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : currentStep === 5 ? 'Confirm Identity' : 'Continue Progress'} <ChevronRight className="w-5 h-5 ml-2" />
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
