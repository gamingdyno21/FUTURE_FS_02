import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { ArrowLeft, Mail, Phone, Calendar, User, Save, Clock, Activity, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      const res = await api.get(`/leads/${id}`);
      setLead(res.data);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setUpdatingStatus(true);
    try {
      const res = await api.put(`/leads/${id}`, { status: newStatus });
      setLead(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    
    setAddingNote(true);
    try {
      const res = await api.post(`/leads/${id}/notes`, { text: newNote });
      setLead(res.data);
      setNewNote('');
    } catch (error) {
      console.error(error);
    } finally {
      setAddingNote(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-brand-400 animate-pulse font-mono tracking-widest uppercase">Initializing...</div>;
  if (!lead) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-red-500 font-mono tracking-widest uppercase border border-red-500/20 py-2 px-6 rounded-lg bg-red-500/10">Entity Not Found</div>;

  return (
    <div className="min-h-screen bg-[#050505] pb-12 text-slate-300 relative overflow-hidden">
      
      {/* Background visual elements */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Top Navigation Bar */}
      <nav className="bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            <Link to="/dashboard" className="flex items-center text-slate-400 hover:text-brand-400 transition-colors uppercase tracking-widest font-semibold text-sm group">
              <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-brand-500/20 border border-white/5 group-hover:border-brand-500/30 flex items-center justify-center mr-3 transition-all">
                <ArrowLeft size={16} />
              </div>
              Dashboard Return
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Lead Info */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-[#0a0a0a] rounded-3xl shadow-2xl border border-white/5 overflow-hidden">
              <div className="p-8 border-b border-white/5 bg-gradient-to-b from-[#111] to-transparent text-center relative">
                
                {lead.status === 'New' && (
                  <div className="absolute top-4 right-4 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                )}
                
                <div className="w-24 h-24 bg-[#050505] border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl font-black text-white shadow-[0_0_30px_rgba(59,130,246,0.15)] glow-blue-text font-sans">
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{lead.name}</h2>
                <div className="mt-4 flex justify-center">
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border
                    ${lead.status === 'New' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 glow-blue' : 
                      lead.status === 'Contacted' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : 
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}
                  `}>
                    {lead.status}
                  </span>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="flex items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:border-brand-500/30 hover:bg-brand-500/5 transition-colors group">
                  <Mail className="w-5 h-5 text-brand-400 mr-4 group-hover:text-brand-300 transition-colors" />
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Comm Link / Email</p>
                    <a href={`mailto:${lead.email}`} className="text-white hover:text-brand-400 transition-colors truncate block">{lead.email}</a>
                  </div>
                </div>
                {lead.phone && (
                  <div className="flex items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:border-brand-500/30 hover:bg-brand-500/5 transition-colors group">
                    <Phone className="w-5 h-5 text-brand-400 mr-4" />
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Direct Line</p>
                      <a href={`tel:${lead.phone}`} className="text-white font-mono">{lead.phone}</a>
                    </div>
                  </div>
                )}
                <div className="flex items-center p-4 rounded-xl bg-white/5 border border-white/5">
                  <Fingerprint className="w-5 h-5 text-slate-400 mr-4" />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Origin Point</p>
                    <p className="text-white bg-white/10 px-3 py-1 rounded text-sm inline-block">{lead.source}</p>
                  </div>
                </div>
                <div className="flex items-center p-4 rounded-xl bg-white/5 border border-white/5">
                  <Calendar className="w-5 h-5 text-slate-400 mr-4" />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Timestamp</p>
                    <p className="text-white font-mono text-sm">{new Date(lead.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Workflow Actions */}
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] rounded-3xl shadow-2xl border border-white/5 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-brand-600/10 rounded-bl-full"></div>
              <h3 className="text-lg font-bold text-white mb-6 tracking-wide flex items-center">
                <Activity className="w-5 h-5 text-brand-400 mr-2" />
                Pipeline Sequence
              </h3>
              <div className="space-y-4 relative z-10">
                <div>
                   <select 
                    value={lead.status}
                    onChange={handleStatusChange}
                    disabled={updatingStatus}
                    className="w-full px-5 py-4 bg-[#111111] border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-500/50 outline-none text-white appearance-none cursor-pointer tracking-wider disabled:opacity-50 font-bold transition-all hover:border-white/20"
                  >
                    <option value="New">Sequence 1: NEW SIGNAL</option>
                    <option value="Contacted">Sequence 2: MAINTAINING COMMS</option>
                    <option value="Converted">Sequence 3: TARGET SECURED</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Notes */}
          <div className="lg:col-span-2">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-[#0a0a0a] rounded-3xl shadow-2xl border border-white/5 h-full flex flex-col overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-[#111] to-transparent">
                <h3 className="text-2xl font-bold text-white tracking-tight">System Logs</h3>
                <div className="px-3 py-1 bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-mono rounded tracking-widest">
                  {lead.notes ? lead.notes.length : 0} ENTRIES
                </div>
              </div>
              
              <div className="p-8 flex-1 overflow-y-auto bg-[#050505]">
                {lead.notes && lead.notes.length > 0 ? (
                  <div className="space-y-8 relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-[1.15rem] top-4 bottom-4 w-px bg-white/5"></div>
                    
                    {lead.notes.map((note, idx) => (
                      <div key={idx} className="flex space-x-6 relative z-10">
                        <div className="flex-shrink-0 mt-2">
                          <div className="w-10 h-10 bg-[#111] border border-white/10 text-brand-400 rounded-full flex items-center justify-center glow-blue shadow-[0_0_15px_rgba(59,130,246,0.15)] relative">
                             <div className="w-2 h-2 rounded-full bg-brand-400"></div>
                          </div>
                        </div>
                        <div className="flex-1 bg-[#111111] bg-opacity-80 backdrop-blur p-6 rounded-2xl border border-white/5 group hover:border-brand-500/20 transition-colors">
                          <p className="text-slate-300 leading-relaxed font-sans">{note.text}</p>
                          <div className="mt-4 pt-4 border-t border-white/5 flex items-center text-xs text-slate-500 font-mono">
                            <Clock className="w-3.5 h-3.5 mr-2 text-brand-400/70" />
                            {new Date(note.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-600 border border-dashed border-white/10 rounded-2xl">
                    <Activity className="w-10 h-10 mb-4 opacity-50" />
                    <p className="font-mono text-sm tracking-widest uppercase">No logs recorded for this entity.</p>
                  </div>
                )}
              </div>

              {/* Add Note Form */}
              <div className="p-8 border-t border-white/5 bg-[#0a0a0a]">
                <form onSubmit={handleAddNote}>
                  <label htmlFor="note" className="sr-only">New Log Entry</label>
                  <textarea
                    id="note"
                    rows={3}
                    className="w-full px-5 py-4 bg-[#111] border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-500/50 outline-none resize-none text-white placeholder-slate-600 transition-all focus:bg-[#151515]"
                    placeholder="Enter new log data, comms summary, or intelligence..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">System will timestamp automatically upon append.</span>
                    <button
                      type="submit"
                      disabled={addingNote || !newNote.trim()}
                      className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.2)] font-bold tracking-wide text-white bg-brand-600 hover:bg-brand-500 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {addingNote ? 'Appending...' : (
                        <>
                          <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          APPEND LOG
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeadDetails;
