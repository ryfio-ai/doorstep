import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, MessageCircle } from 'lucide-react';
import { PageTransition } from '../../components/shared/PageTransition';
import { SEO } from '../../components/shared/SEO';

const ContactPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="bg-white min-h-screen pt-40 pb-24 font-inter text-textPrimary">
        <SEO 
          title="Contact Us"
          description="Get in touch with ThiranOli. We are here to answer any questions about our doorstep learning programs."
          keywords="Contact ThiranOli, customer support, WhatsApp contact"
        />

        <div className="page-container max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="font-jakarta text-[48px] md:text-[72px] font-extrabold text-textPrimary mb-6 tracking-tighter leading-tight">
              Let's Start a <span className="text-gradient-orange italic">Conversation</span>
            </h1>
            <p className="text-[20px] text-textSecondary max-w-2xl mx-auto leading-relaxed">
              Have questions about our courses, mentorship, or enrollment? Reach out to us, and our team will be happy to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Details */}
            <div className="space-y-10">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="premium-card p-10">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-brandOrange/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-7 h-7 text-brandOrange" />
                  </div>
                  <div>
                    <h3 className="font-jakarta text-[24px] font-extrabold mb-4">Chat with Us</h3>
                    <p className="text-textSecondary mb-6">We're available on WhatsApp for quick responses.</p>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { num: '918148045030', label: 'Support 1' },
                        { num: '918438686030', label: 'Support 2' },
                        { num: '919629463964', label: 'Support 3' }
                      ].map((contact, i) => (
                        <a 
                          key={i}
                          href={`https://wa.me/${contact.num}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors font-jakarta font-bold"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                          {contact.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="premium-card p-10">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-brandOrange/10 flex items-center justify-center shrink-0">
                    <Mail className="w-7 h-7 text-brandOrange" />
                  </div>
                  <div>
                    <h3 className="font-jakarta text-[24px] font-extrabold mb-4">Email Us</h3>
                    <p className="text-textSecondary mb-4">For any general inquiries, partnerships, or support.</p>
                    <a href="mailto:contact@thiranoli.com" className="text-[20px] font-jakarta font-extrabold text-textPrimary hover:text-brandOrange transition-colors">
                      contact@thiranoli.com
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="premium-card p-10">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-brandOrange/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-7 h-7 text-brandOrange" />
                  </div>
                  <div>
                    <h3 className="font-jakarta text-[24px] font-extrabold mb-4">Our Location</h3>
                    <p className="text-[18px] text-textSecondary leading-relaxed">
                      Saravanampatti, <br />
                      Coimbatore, <br />
                      Tamil Nadu, India
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Google Map */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="h-full min-h-[500px]">
              <div className="w-full h-full rounded-[40px] overflow-hidden border border-borderSubtle shadow-premium-elevated relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31323.64337991807!2d76.9781068440991!3d11.07939580163901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7f3acac202b%3A0xb9a1348889c47108!2sSaravanampatti%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1779126817762!5m2!1sen!2sin" 
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
