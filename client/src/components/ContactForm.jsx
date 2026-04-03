import { useState } from 'react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Send, Sparkles } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', source: 'Website' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/leads', formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', source: 'Website' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background animated gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-800/20 rounded-full blur-[100px] pointer-events-none"></div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative z-10 bg-[#0a0a0a] p-10 rounded-3xl shadow-2xl max-w-md w-full text-center border border-white/10 glow-blue"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              <CheckCircle className="w-20 h-20 text-brand-400 mx-auto mb-6 glow-blue-text" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Transmission Sent!</h2>
            <p className="text-slate-400 mb-8 max-w-xs mx-auto">We've securely received your data and will connect with you shortly.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="w-full bg-transparent hover:bg-brand-500/10 text-brand-400 border border-brand-500/50 hover:border-brand-400 font-medium py-3 px-6 rounded-xl transition-all duration-300"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md w-full relative z-10"
          >
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/5 relative overflow-hidden group hover:border-brand-500/30 transition-colors duration-500">
              
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50"></div>

              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-500/10 mb-4 text-brand-400">
                  <Sparkles size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Let's Connect</h2>
                <p className="mt-2 text-sm text-slate-400">Enter your details to initiate a connection.</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder=" "
                    className="peer w-full px-4 py-3 bg-[#111111] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all duration-300"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <label htmlFor="name" className="absolute text-sm text-slate-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#111111] px-2 peer-focus:px-2 peer-focus:text-brand-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3">Full Name</label>
                </div>
                
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder=" "
                    className="peer w-full px-4 py-3 bg-[#111111] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all duration-300"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <label htmlFor="email" className="absolute text-sm text-slate-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#111111] px-2 peer-focus:px-2 peer-focus:text-brand-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3">Email Address</label>
                </div>

                <div className="relative">
                  <input
                    id="phone"
                    type="tel"
                    placeholder=" "
                    className="peer w-full px-4 py-3 bg-[#111111] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all duration-300"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <label htmlFor="phone" className="absolute text-sm text-slate-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#111111] px-2 peer-focus:px-2 peer-focus:text-brand-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3">Phone Number (Optional)</label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full relative overflow-hidden group flex justify-center items-center py-4 px-4 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] font-medium text-white bg-brand-600 hover:bg-brand-500 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  {status === 'loading' ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Transmitting...
                    </span>
                  ) : (
                    <>
                      <span className="tracking-wide">Submit Request</span>
                      <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </motion.button>
                {status === 'error' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center">Transmission failed. Please try again.</motion.p>
                )}
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
