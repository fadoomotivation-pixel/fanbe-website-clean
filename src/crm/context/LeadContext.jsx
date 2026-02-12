import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const LeadContext = createContext();

// Sample leads data - In production, this would come from Supabase/Database
const INITIAL_LEADS = [
  {
    id: 1,
    name: 'Ramesh Gupta',
    phone: '9876543210',
    email: 'ramesh@gmail.com',
    project: 'Brijvatika',
    plotSize: '100 sq.yd',
    source: 'WhatsApp',
    status: 'New',
    score: 'Hot',
    assignedTo: 3,
    notes: 'Interested in corner plot',
    budget: '₹15-20 Lakh',
    city: 'Delhi',
    createdAt: '2026-02-10T10:30:00',
    updatedAt: '2026-02-10T10:30:00',
    followUpDate: '2026-02-14',
    activities: [
      { type: 'created', date: '2026-02-10T10:30:00', note: 'Lead created from WhatsApp inquiry' }
    ]
  },
  {
    id: 2,
    name: 'Sunita Devi',
    phone: '9123456789',
    email: 'sunita@yahoo.com',
    project: 'Shree Gokul Vatika',
    plotSize: '150 sq.yd',
    source: 'Website',
    status: 'Contacted',
    score: 'Warm',
    assignedTo: 3,
    notes: 'Looking for investment purpose',
    budget: '₹10-15 Lakh',
    city: 'Faridabad',
    createdAt: '2026-02-09T14:20:00',
    updatedAt: '2026-02-11T09:15:00',
    followUpDate: '2026-02-13',
    activities: [
      { type: 'created', date: '2026-02-09T14:20:00', note: 'Lead from website contact form' },
      { type: 'call', date: '2026-02-10T11:00:00', note: 'Called, interested in site visit' }
    ]
  },
  {
    id: 3,
    name: 'Vikram Chauhan',
    phone: '9988776655',
    email: 'vikram.c@gmail.com',
    project: 'Khatu Shyam Enclave',
    plotSize: '200 sq.yd',
    source: 'Referral',
    status: 'Site Visit Scheduled',
    score: 'Hot',
    assignedTo: 2,
    notes: 'Referred by Mr. Sharma, wants premium plot',
    budget: '₹25-35 Lakh',
    city: 'Jaipur',
    createdAt: '2026-02-08T16:45:00',
    updatedAt: '2026-02-12T08:00:00',
    followUpDate: '2026-02-12',
    siteVisitDate: '2026-02-15',
    activities: [
      { type: 'created', date: '2026-02-08T16:45:00', note: 'Referral from existing customer' },
      { type: 'call', date: '2026-02-09T10:30:00', note: 'Discussed project details' },
      { type: 'site_visit', date: '2026-02-11T15:00:00', note: 'Site visit scheduled for Feb 15' }
    ]
  },
  {
    id: 4,
    name: 'Pooja Agarwal',
    phone: '9556677889',
    email: 'pooja.a@hotmail.com',
    project: 'Maa Semri Vatika',
    plotSize: '100 sq.yd',
    source: 'Facebook',
    status: 'Negotiation',
    score: 'Hot',
    assignedTo: 3,
    notes: 'Wants discount on booking amount',
    budget: '₹12-18 Lakh',
    city: 'Mathura',
    createdAt: '2026-02-05T09:00:00',
    updatedAt: '2026-02-11T16:30:00',
    followUpDate: '2026-02-12',
    activities: [
      { type: 'created', date: '2026-02-05T09:00:00', note: 'Facebook ad inquiry' },
      { type: 'call', date: '2026-02-06T14:00:00', note: 'Initial discussion' },
      { type: 'site_visit', date: '2026-02-08T11:00:00', note: 'Completed site visit, liked plot #23' },
      { type: 'negotiation', date: '2026-02-11T16:30:00', note: 'Asking for 5% discount' }
    ]
  },
  {
    id: 5,
    name: 'Manoj Tiwari',
    phone: '9334455667',
    email: 'manoj.t@gmail.com',
    project: 'Shree Jagannath Dham',
    plotSize: '50 sq.yd',
    source: 'Walk-in',
    status: 'Booking',
    score: 'Hot',
    assignedTo: 2,
    notes: 'Ready to book, documentation in progress',
    budget: '₹5-8 Lakh',
    city: 'Vrindavan',
    createdAt: '2026-02-01T11:30:00',
    updatedAt: '2026-02-12T10:00:00',
    followUpDate: '2026-02-12',
    activities: [
      { type: 'created', date: '2026-02-01T11:30:00', note: 'Walk-in at office' },
      { type: 'site_visit', date: '2026-02-02T10:00:00', note: 'Site visit completed' },
      { type: 'booking', date: '2026-02-10T14:00:00', note: 'Token amount received ₹25,000' }
    ]
  },
  {
    id: 6,
    name: 'Kavita Rani',
    phone: '9112233445',
    email: 'kavita.r@gmail.com',
    project: 'Kunj Bihari Enclave',
    plotSize: '100 sq.yd',
    source: 'Google',
    status: 'Lost',
    score: 'Cold',
    assignedTo: 3,
    notes: 'Bought from competitor',
    budget: '₹8-12 Lakh',
    city: 'Agra',
    createdAt: '2026-01-25T13:00:00',
    updatedAt: '2026-02-08T17:00:00',
    lostReason: 'Competitor',
    activities: [
      { type: 'created', date: '2026-01-25T13:00:00', note: 'Google search inquiry' },
      { type: 'call', date: '2026-01-26T10:00:00', note: 'Discussed options' },
      { type: 'lost', date: '2026-02-08T17:00:00', note: 'Bought property from another developer' }
    ]
  },
  {
    id: 7,
    name: 'Deepak Verma',
    phone: '9445566778',
    email: 'deepak.v@yahoo.com',
    project: 'Brijvatika',
    plotSize: '250 sq.yd',
    source: 'WhatsApp',
    status: 'New',
    score: 'Warm',
    assignedTo: null,
    notes: 'Premium customer, high budget',
    budget: '₹35-50 Lakh',
    city: 'Gurgaon',
    createdAt: '2026-02-12T08:00:00',
    updatedAt: '2026-02-12T08:00:00',
    followUpDate: '2026-02-12',
    activities: [
      { type: 'created', date: '2026-02-12T08:00:00', note: 'WhatsApp inquiry for premium plot' }
    ]
  },
  {
    id: 8,
    name: 'Anita Sharma',
    phone: '9667788990',
    email: 'anita.s@gmail.com',
    project: 'Shree Gokul Vatika',
    plotSize: '100 sq.yd',
    source: 'Referral',
    status: 'Follow Up',
    score: 'Warm',
    assignedTo: 3,
    notes: 'Will decide after Holi',
    budget: '₹10-15 Lakh',
    city: 'Noida',
    createdAt: '2026-02-07T15:30:00',
    updatedAt: '2026-02-11T12:00:00',
    followUpDate: '2026-03-15',
    activities: [
      { type: 'created', date: '2026-02-07T15:30:00', note: 'Referred by Mrs. Gupta' },
      { type: 'call', date: '2026-02-08T11:00:00', note: 'Interested but wants to wait till Holi' }
    ]
  }
];

// Employee data
const EMPLOYEES = [
  { id: 2, name: 'Priya Sharma', role: 'subadmin', phone: '9876543210', email: 'subadmin@fanbegroup.com' },
  { id: 3, name: 'Amit Singh', role: 'employee', phone: '9123456789', email: 'employee@fanbegroup.com' }
];

export function LeadProvider({ children }) {
  const { user, isAdmin, isSubAdmin } = useAuth();
  const [leads, setLeads] = useState([]);
  const [employees] = useState(EMPLOYEES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load leads from localStorage or use initial data
    const savedLeads = localStorage.getItem('fanbe-leads');
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch (e) {
        setLeads(INITIAL_LEADS);
      }
    } else {
      setLeads(INITIAL_LEADS);
    }
    setLoading(false);
  }, []);

  // Save leads to localStorage whenever they change
  useEffect(() => {
    if (leads.length > 0) {
      localStorage.setItem('fanbe-leads', JSON.stringify(leads));
    }
  }, [leads]);

  // Filter leads based on user role
  const getVisibleLeads = () => {
    if (!user) return [];
    if (isAdmin || isSubAdmin) return leads;
    // Employees only see their assigned leads
    return leads.filter(lead => lead.assignedTo === user.id);
  };

  const addLead = (leadData) => {
    const newLead = {
      ...leadData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      activities: [
        { type: 'created', date: new Date().toISOString(), note: `Lead created by ${user?.name}` }
      ]
    };
    setLeads(prev => [newLead, ...prev]);
    return newLead;
  };

  const updateLead = (id, updates) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        return {
          ...lead,
          ...updates,
          updatedAt: new Date().toISOString()
        };
      }
      return lead;
    }));
  };

  const deleteLead = (id) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  const addActivity = (leadId, activity) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          updatedAt: new Date().toISOString(),
          activities: [
            ...lead.activities,
            { ...activity, date: new Date().toISOString() }
          ]
        };
      }
      return lead;
    }));
  };

  const assignLead = (leadId, employeeId) => {
    updateLead(leadId, { assignedTo: employeeId });
    addActivity(leadId, {
      type: 'assigned',
      note: `Lead assigned to ${employees.find(e => e.id === employeeId)?.name || 'Unassigned'}`
    });
  };

  const getLeadStats = () => {
    const visibleLeads = getVisibleLeads();
    return {
      total: visibleLeads.length,
      new: visibleLeads.filter(l => l.status === 'New').length,
      contacted: visibleLeads.filter(l => l.status === 'Contacted').length,
      siteVisit: visibleLeads.filter(l => l.status === 'Site Visit Scheduled').length,
      negotiation: visibleLeads.filter(l => l.status === 'Negotiation').length,
      booking: visibleLeads.filter(l => l.status === 'Booking').length,
      lost: visibleLeads.filter(l => l.status === 'Lost').length,
      hot: visibleLeads.filter(l => l.score === 'Hot').length,
      warm: visibleLeads.filter(l => l.score === 'Warm').length,
      cold: visibleLeads.filter(l => l.score === 'Cold').length,
      todayFollowUps: visibleLeads.filter(l => {
        const today = new Date().toISOString().split('T')[0];
        return l.followUpDate === today;
      }).length
    };
  };

  return (
    <LeadContext.Provider value={{
      leads: getVisibleLeads(),
      allLeads: leads,
      employees,
      loading,
      addLead,
      updateLead,
      deleteLead,
      addActivity,
      assignLead,
      getLeadStats
    }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
}

export default LeadContext;
