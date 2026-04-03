import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Users, UserCheck, Inbox, LogOut, ChevronRight, Search, Zap } from 'lucide-react';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await api.get('/leads');
      setLeads(res.data);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/login');
  };

  const sortedAndFilteredLeads = leads
    .filter(lead => filter === 'All' || lead.status === filter)
    .filter(lead => 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'New').length,
    converted: leads.filter(l => l.status === 'Converted').length,
  };

  const conversionRate = stats.total > 0 ? Math.round((stats.converted / stats.total) * 100) : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col text-slate-300 relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center border border-brand-500/30 glow-blue">
                <Zap className="text-brand-400 w-5 h-5" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-indigo-400 tracking-tight">
                Nexus CRM
              </span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5"
            >
              <LogOut size={16} className="mr-2"/> Disconnect
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-bold text-white tracking-tight">Command Center</h1>
          <p className="mt-2 text-slate-500 font-medium">Monitor your active connections and system pipeline.</p>
        </motion.div>

        {/* Analytics Cards */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <motion.div variants={itemVariants} className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 shadow-lg group hover:border-brand-500/30 transition-colors relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Total Leads</p>
                <h3 className="text-4xl font-bold text-white mt-2">{stats.total}</h3>
              </div>
              <div className="p-4 bg-[#111111] text-brand-400 rounded-xl border border-white/5 shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)]"><Users size={28} /></div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 shadow-lg group hover:border-cyan-500/30 transition-colors relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Pending</p>
                <h3 className="text-4xl font-bold text-cyan-400 mt-2">{stats.new}</h3>
              </div>
              <div className="p-4 bg-[#111111] text-cyan-400 rounded-xl border border-white/5 shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)]"><Inbox size={28} /></div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 shadow-lg group hover:border-emerald-500/30 transition-colors relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Converted</p>
                <h3 className="text-4xl font-bold text-emerald-400 mt-2">{stats.converted}</h3>
              </div>
              <div className="p-4 bg-[#111111] text-emerald-400 rounded-xl border border-white/5 shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)]"><UserCheck size={28} /></div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-600/10 rounded-full blur-[30px]"></div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest relative z-10">Success Rate</p>
            <div className="relative z-10 mt-2">
              <div className="flex items-end space-x-2">
                <h3 className="text-4xl font-bold text-white">{conversionRate}%</h3>
              </div>
              <div className="w-full bg-[#1a1a1a] rounded-full h-2 mt-4 overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${conversionRate}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-gradient-to-r from-brand-600 to-brand-400 h-full rounded-full glow-blue"
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Lead Table Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0a0a0a] rounded-2xl shadow-2xl border border-white/5 overflow-hidden backdrop-blur-sm"
        >
          <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-b from-[#111111] to-transparent">
            <h2 className="text-xl font-bold text-white tracking-wide">Data Stream</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Query leads..." 
                  className="pl-12 pr-4 py-2.5 bg-[#111111] border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-500/50 outline-none w-full sm:w-64 text-white placeholder-slate-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="px-4 py-2.5 bg-[#111111] border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-500/50 outline-none text-white appearance-none cursor-pointer"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All Signals</option>
                <option value="New">Pending</option>
                <option value="Contacted">Active</option>
                <option value="Converted">Secured</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center text-brand-400 animate-pulse">Scanning database...</div>
            ) : sortedAndFilteredLeads.length === 0 ? (
              <div className="p-16 text-center text-slate-500">
                <Inbox className="w-16 h-16 mx-auto text-slate-700 mb-4" />
                <p className="text-lg">No signals detected match your query parameters.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-[#050505] text-slate-400 text-xs uppercase tracking-widest font-semibold border-b border-white/5">
                    <th className="px-6 py-5">Identifier</th>
                    <th className="px-6 py-5">Comm Link</th>
                    <th className="px-6 py-5">Origin</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-6 py-5">Timestamp</th>
                    <th className="px-6 py-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {sortedAndFilteredLeads.map((lead) => (
                    <motion.tr 
                      key={lead._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-[#111] transition-colors group cursor-pointer"
                      onClick={() => navigate(`/leads/${lead._id}`)}
                    >
                      <td className="px-6 py-5">
                        <div className="font-semibold text-white group-hover:text-brand-400 transition-colors">{lead.name}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-slate-300 font-medium">{lead.email}</div>
                        {lead.phone && <div className="text-slate-500 text-xs mt-1 font-mono">{lead.phone}</div>}
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-slate-400 text-sm bg-white/5 px-3 py-1 rounded-full border border-white/5">{lead.source}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border
                          ${lead.status === 'New' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 glow-blue' : 
                            lead.status === 'Contacted' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : 
                            'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}
                        `}>
                          {lead.status === 'New' && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 animate-pulse"></div>}
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-mono text-slate-500 text-xs">
                        {new Date(lead.createdAt).toISOString().split('T')[0]}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Link to={`/leads/${lead._id}`} className="p-2 bg-brand-500/10 text-brand-400 rounded-lg inline-flex items-center group-hover:bg-brand-500 group-hover:text-white transition-all shadow-lg border border-brand-500/20">
                          <ChevronRight size={18} />
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
