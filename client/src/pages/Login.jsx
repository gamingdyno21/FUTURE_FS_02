import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Lock, Fingerprint } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('admin', JSON.stringify({ id: res.data._id, username: res.data.username }));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid system credentials');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4 relative overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-brand-700/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full bg-[#0a0a0a]/90 backdrop-blur-2xl p-10 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#111111] to-[#1a1a1a] border border-white/5 flex items-center justify-center mx-auto mb-6 glow-blue shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)]"
          >
            <Fingerprint className="text-brand-400 w-10 h-10" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white tracking-tight">System Login</h2>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            Restricted Access
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <input
                type="text"
                required
                className="w-full px-5 py-4 bg-[#111111] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all duration-300"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative group">
              <input
                type="password"
                required
                className="w-full px-5 py-4 bg-[#111111] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all duration-300 tracking-widest"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm text-center font-medium">{error}</p>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 px-4 bg-brand-600 hover:bg-brand-500 text-white font-semibold tracking-wide rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex justify-center items-center group relative overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Authenticating...
              </span>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                Access System
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
