import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLeads } from '../context/LeadContext';
import { projectsData } from '../../data/projectsData';

const colors = {
  navy: '#1a3a5c',
  navyDark: '#0f2439',
  teal: '#4a7c8a',
  gold: '#c9a962',
  goldLight: '#d4bc7d'
};

function LeadsList() {
  const { isAdmin, canAssignLeads, canDeleteLeads } = useAuth();
  const { leads, employees, deleteLead, assignLead } = useLeads();
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showAssignModal, setShowAssignModal] = useState(null);

  const statuses = ['New', 'Contacted', 'Follow Up', 'Site Visit Scheduled', 'Negotiation', 'Booking', 'Lost'];
  const scores = ['Hot', 'Warm', 'Cold'];

  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(lead =>
        lead.name.toLowerCase().includes(searchLower) ||
        lead.phone.includes(search) ||
        lead.email?.toLowerCase().includes(searchLower) ||
        lead.project.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(lead => lead.status === statusFilter);
    }

    // Score filter
    if (scoreFilter !== 'all') {
      result = result.filter(lead => lead.score === scoreFilter);
    }

    // Project filter
    if (projectFilter !== 'all') {
      result = result.filter(lead => lead.project === projectFilter);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'score':
          const scoreOrder = { 'Hot': 0, 'Warm': 1, 'Cold': 2 };
          return scoreOrder[a.score] - scoreOrder[b.score];
        default:
          return 0;
      }
    });

    return result;
  }, [leads, search, statusFilter, scoreFilter, projectFilter, sortBy]);

  const getStatusColor = (status) => {
    const statusColors = {
      'New': '#3b82f6',
      'Contacted': '#8b5cf6',
      'Follow Up': '#f59e0b',
      'Site Visit Scheduled': '#06b6d4',
      'Negotiation': '#f97316',
      'Booking': '#22c55e',
      'Lost': '#ef4444'
    };
    return statusColors[status] || '#64748b';
  };

  const getScoreColor = (score) => {
    const scoreColors = { 'Hot': '#ef4444', 'Warm': '#f59e0b', 'Cold': '#3b82f6' };
    return scoreColors[score] || '#64748b';
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete lead "${name}"?`)) {
      deleteLead(id);
    }
  };

  const handleAssign = (leadId, employeeId) => {
    assignLead(leadId, employeeId);
    setShowAssignModal(null);
  };

  const getAssignedName = (assignedTo) => {
    if (!assignedTo) return 'Unassigned';
    const employee = employees.find(e => e.id === assignedTo);
    return employee?.name || 'Unknown';
  };

  const selectStyle = {
    padding: '10px 14px',
    borderRadius: '10px',
    border: '2px solid #e2e8f0',
    fontSize: '14px',
    outline: 'none',
    background: '#fff',
    cursor: 'pointer',
    minWidth: '140px'
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: colors.navy, marginBottom: '4px' }}>All Leads</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>{filteredLeads.length} leads found</p>
        </div>
        <Link to="/crm/leads/add" style={{
          background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
          color: colors.navyDark,
          padding: '12px 24px',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: '600',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          ➕ Add New Lead
        </Link>
      </div>

      {/* Filters */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        border: '1px solid #f1f5f9'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ flex: '1', minWidth: '200px' }}>
            <input
              type="text"
              placeholder="🔍 Search by name, phone, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '2px solid #e2e8f0',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Status Filter */}
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={selectStyle}>
            <option value="all">All Status</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {/* Score Filter */}
          <select value={scoreFilter} onChange={(e) => setScoreFilter(e.target.value)} style={selectStyle}>
            <option value="all">All Scores</option>
            {scores.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {/* Project Filter */}
          <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)} style={selectStyle}>
            <option value="all">All Projects</option>
            {projectsData.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>

          {/* Sort */}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={selectStyle}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A-Z</option>
            <option value="score">Score (Hot First)</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        border: '1px solid #f1f5f9',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Lead</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Contact</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Project</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Score</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Assigned</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Date</th>
                <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '48px', textAlign: 'center', color: '#64748b' }}>
                    No leads found matching your filters
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, i) => (
                  <tr key={lead.id} style={{ borderBottom: i < filteredLeads.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: '600', color: colors.navy }}>{lead.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{lead.source}</div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontSize: '14px', color: '#475569' }}>{lead.phone}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>{lead.email || '-'}</div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontSize: '14px', color: '#475569' }}>{lead.project}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>{lead.plotSize}</div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        background: `${getStatusColor(lead.status)}15`,
                        color: getStatusColor(lead.status),
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        whiteSpace: 'nowrap'
                      }}>
                        {lead.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        background: getScoreColor(lead.score),
                        color: '#fff',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}>
                        {lead.score}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {canAssignLeads ? (
                        <button
                          onClick={() => setShowAssignModal(lead.id)}
                          style={{
                            background: lead.assignedTo ? '#f1f5f9' : '#fef3c7',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            color: colors.navy,
                            cursor: 'pointer'
                          }}
                        >
                          {getAssignedName(lead.assignedTo)}
                        </button>
                      ) : (
                        <span style={{ fontSize: '13px', color: '#64748b' }}>{getAssignedName(lead.assignedTo)}</span>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '13px', color: '#64748b' }}>
                      {formatDate(lead.createdAt)}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <Link to={`/crm/leads/${lead.id}`} style={{
                          background: colors.navy,
                          color: '#fff',
                          padding: '8px 14px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textDecoration: 'none'
                        }}>
                          View
                        </Link>
                        <a
                          href={`https://wa.me/91${lead.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: '#25D366',
                            color: '#fff',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            textDecoration: 'none'
                          }}
                        >
                          💬
                        </a>
                        {canDeleteLeads && (
                          <button
                            onClick={() => handleDelete(lead.id, lead.name)}
                            style={{
                              background: '#fef2f2',
                              color: '#ef4444',
                              padding: '8px 12px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }} onClick={() => setShowAssignModal(null)}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '400px',
            width: '100%'
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.navy, marginBottom: '20px' }}>
              Assign Lead
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => handleAssign(showAssignModal, null)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '2px solid #e2e8f0',
                  background: '#fff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                ❌ Unassigned
              </button>
              {employees.map(emp => (
                <button
                  key={emp.id}
                  onClick={() => handleAssign(showAssignModal, emp.id)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '2px solid #e2e8f0',
                    background: '#fff',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  👤 {emp.name} <span style={{ color: '#64748b', fontSize: '12px' }}>({emp.role})</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAssignModal(null)}
              style={{
                marginTop: '16px',
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                background: '#f1f5f9',
                color: '#64748b',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeadsList;
