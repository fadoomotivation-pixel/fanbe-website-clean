import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth, EMPLOYEES } from './AuthContext';

const LeadContext = createContext();

export const PROJECTS = ['Brijvatika', 'Maa Semri Vatika', 'Shree Gokul Vatika', 'Shree Jagannath Dham', 'Khatu Shyam Enclave', 'Kunj Bihari Enclave'];
export const PLOT_SIZES = ['50 sq.yd', '100 sq.yd', '150 sq.yd', '200 sq.yd', '250 sq.yd'];
export const SOURCES = ['WhatsApp', 'Website', 'Facebook', 'Instagram', 'Google', 'Referral', 'Walk-in', 'Phone'];
export const STATUSES = ['New', 'Contacted', 'Follow Up', 'Site Visit Scheduled', 'Site Visit Done', 'Negotiation', 'Booking', 'Lost'];
export const SCORES = ['Hot', 'Warm', 'Cold'];
export const CALL_OUTCOMES = [
  { value: 'connected', label: 'Connected', icon: '✅', color: '#22c55e' },
  { value: 'not_reachable', label: 'Not Reachable', icon: '📵', color: '#f59e0b' },
  { value: 'busy', label: 'Busy', icon: '🔴', color: '#ef4444' },
  { value: 'switched_off', label: 'Switched Off', icon: '📴', color: '#64748b' },
  { value: 'callback', label: 'Call Back Request', icon: '🔄', color: '#8b5cf6' },
  { value: 'wrong_number', label: 'Wrong Number', icon: '❌', color: '#dc2626' }
];

const INIT_LEADS = [
  { id: 1, name: 'Ramesh Gupta', phone: '9876543210', project: 'Brijvatika', plotSize: '100 sq.yd', source: 'WhatsApp', status: 'New', score: 'Hot', assignedTo: 3, budget: '₹15-20 Lakh', city: 'Delhi', createdAt: '2026-02-10', followUpDate: '2026-02-12', callAttempts: 0, feedback: '' },
  { id: 2, name: 'Sunita Devi', phone: '9123456789', project: 'Shree Gokul Vatika', plotSize: '150 sq.yd', source: 'Website', status: 'Contacted', score: 'Warm', assignedTo: 3, budget: '₹10-15 Lakh', city: 'Faridabad', createdAt: '2026-02-09', followUpDate: '2026-02-13', callAttempts: 2, lastOutcome: 'connected', feedback: '' },
  { id: 3, name: 'Vikram Chauhan', phone: '9988776655', project: 'Khatu Shyam Enclave', plotSize: '200 sq.yd', source: 'Referral', status: 'Site Visit Scheduled', score: 'Hot', assignedTo: 2, budget: '₹25-35 Lakh', city: 'Jaipur', createdAt: '2026-02-08', followUpDate: '2026-02-12', callAttempts: 3, lastOutcome: 'connected', feedback: '' },
  { id: 4, name: 'Pooja Agarwal', phone: '9556677889', project: 'Maa Semri Vatika', plotSize: '100 sq.yd', source: 'Facebook', status: 'Negotiation', score: 'Hot', assignedTo: 3, budget: '₹12-18 Lakh', city: 'Mathura', createdAt: '2026-02-05', followUpDate: '2026-02-12', callAttempts: 5, lastOutcome: 'connected', feedback: 'price concern' },
  { id: 5, name: 'Manoj Tiwari', phone: '9334455667', project: 'Shree Jagannath Dham', plotSize: '50 sq.yd', source: 'Walk-in', status: 'Booking', score: 'Hot', assignedTo: 2, budget: '₹5-8 Lakh', city: 'Vrindavan', createdAt: '2026-02-01', callAttempts: 4, lastOutcome: 'connected', feedback: '' },
  { id: 6, name: 'Kavita Rani', phone: '9112233445', project: 'Kunj Bihari Enclave', plotSize: '100 sq.yd', source: 'Google', status: 'Lost', score: 'Cold', assignedTo: 3, budget: '₹8-12 Lakh', city: 'Agra', createdAt: '2026-01-25', callAttempts: 3, lastOutcome: 'connected', feedback: 'bought competitor' },
  { id: 7, name: 'Deepak Verma', phone: '9445566778', project: 'Brijvatika', plotSize: '250 sq.yd', source: 'WhatsApp', status: 'New', score: 'Warm', assignedTo: null, budget: '₹35-50 Lakh', city: 'Gurgaon', createdAt: '2026-02-12', followUpDate: '2026-02-12', callAttempts: 0, feedback: '' },
  { id: 8, name: 'Anita Sharma', phone: '9667788990', project: 'Shree Gokul Vatika', plotSize: '100 sq.yd', source: 'Referral', status: 'Follow Up', score: 'Warm', assignedTo: 3, budget: '₹10-15 Lakh', city: 'Noida', createdAt: '2026-02-07', followUpDate: '2026-03-15', callAttempts: 2, lastOutcome: 'connected', feedback: 'after holi' }
];

export function LeadProvider({ children }) {
  const { user, isAdmin, isSubAdmin } = useAuth();
  const [leads, setLeads] = useState([]);
  const [callLogs, setCallLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLeads(JSON.parse(localStorage.getItem('fanbe-leads-v4') || 'null') || INIT_LEADS);
    setCallLogs(JSON.parse(localStorage.getItem('fanbe-calls-v2') || '[]'));
    setLoading(false);
  }, []);

  useEffect(() => { if (leads.length) localStorage.setItem('fanbe-leads-v4', JSON.stringify(leads)); }, [leads]);
  useEffect(() => { localStorage.setItem('fanbe-calls-v2', JSON.stringify(callLogs)); }, [callLogs]);

  const myLeads = () => {
    if (!user) return [];
    if (isAdmin || isSubAdmin) return leads;
    return leads.filter(l => l.assignedTo === user.id);
  };

  const addLead = (data) => {
    const lead = { ...data, id: Date.now(), createdAt: new Date().toISOString().split('T')[0], callAttempts: 0, feedback: '' };
    setLeads(p => [lead, ...p]);
    return lead;
  };

  const updateLead = (id, updates) => setLeads(p => p.map(l => l.id === id ? { ...l, ...updates } : l));
  const deleteLead = (id) => setLeads(p => p.filter(l => l.id !== id));

  const logCall = ({ leadId, outcome, notes, feedback, newStatus, followUpDate, siteVisitFixed }) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    const log = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      userId: user.id,
      userName: user.name,
      leadId,
      leadName: lead.name,
      leadPhone: lead.phone,
      project: lead.project,
      outcome,
      outcomeLabel: CALL_OUTCOMES.find(o => o.value === outcome)?.label || outcome,
      notes: notes || '',
      feedback: feedback || '',
      siteVisitFixed: siteVisitFixed || false
    };
    setCallLogs(p => [log, ...p]);

    const updates = {
      callAttempts: (lead.callAttempts || 0) + 1,
      lastOutcome: outcome,
      lastCallDate: log.date
    };
    if (newStatus) updates.status = newStatus;
    if (followUpDate) updates.followUpDate = followUpDate;
    if (feedback) updates.feedback = feedback;
    updateLead(leadId, updates);

    return log;
  };

  const getStats = (date = new Date().toISOString().split('T')[0], userId = user?.id) => {
    const logs = callLogs.filter(l => l.date === date && l.userId === userId);
    const emp = EMPLOYEES.find(e => e.id === userId) || user;
    return {
      date,
      userName: emp?.name || 'Unknown',
      target: emp?.target || 30,
      total: logs.length,
      connected: logs.filter(l => l.outcome === 'connected').length,
      notReachable: logs.filter(l => l.outcome === 'not_reachable').length,
      busy: logs.filter(l => l.outcome === 'busy').length,
      switchedOff: logs.filter(l => l.outcome === 'switched_off').length,
      callback: logs.filter(l => l.outcome === 'callback').length,
      wrongNumber: logs.filter(l => l.outcome === 'wrong_number').length,
      siteVisits: logs.filter(l => l.siteVisitFixed).length,
      objections: logs.filter(l => l.feedback).map(l => ({ name: l.leadName, feedback: l.feedback }))
    };
  };

  const getAllStats = (date) => EMPLOYEES.map(e => getStats(date, e.id));

  const getLeadStats = () => {
    const list = myLeads();
    const today = new Date().toISOString().split('T')[0];
    return {
      total: list.length,
      new: list.filter(l => l.status === 'New').length,
      hot: list.filter(l => l.score === 'Hot' && l.status !== 'Lost').length,
      followUps: list.filter(l => l.followUpDate === today && !['Lost', 'Booking'].includes(l.status)).length,
      siteVisits: list.filter(l => l.status === 'Site Visit Scheduled').length,
      bookings: list.filter(l => l.status === 'Booking').length,
      neverCalled: list.filter(l => !l.callAttempts).length
    };
  };

  const getDuplicates = () => {
    const phoneMap = {};
    leads.forEach(l => {
      const p = l.phone?.replace(/\D/g, '').slice(-10);
      if (p) (phoneMap[p] = phoneMap[p] || []).push(l);
    });
    return Object.entries(phoneMap).filter(([_, arr]) => arr.length > 1).map(([phone, arr]) => ({ phone, leads: arr }));
  };

  return (
    <LeadContext.Provider value={{
      leads: myLeads(), allLeads: leads, employees: EMPLOYEES, callLogs, loading,
      addLead, updateLead, deleteLead, logCall,
      getStats, getAllStats, getLeadStats, getDuplicates,
      PROJECTS, PLOT_SIZES, SOURCES, STATUSES, SCORES, CALL_OUTCOMES
    }}>
      {children}
    </LeadContext.Provider>
  );
}

export const useLeads = () => useContext(LeadContext);
