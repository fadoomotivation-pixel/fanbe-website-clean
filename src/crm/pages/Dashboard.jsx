import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLeads } from '../context/LeadContext';

const colors = {
  navy: '#1a3a5c',
  navyDark: '#0f2439',
  teal: '#4a7c8a',
  gold: '#c9a962',
  goldLight: '#d4bc7d'
};

function Dashboard() {
  const { user, isAdmin, isSubAdmin } = useAuth();
  const { leads, employees, getLeadStats } = useLeads();
  const stats = getLeadStats();

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const todayFollowUps = leads.filter(l => {
    const today = new Date().toISOString().split('T')[0];
    return l.followUpDate === today && l.status !== 'Lost' && l.status !== 'Booking';
  });

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
    const scoreColors = {
      'Hot': '#ef4444',
      'Warm': '#f59e0b',
      'Cold': '#3b82f6'
    };
    return scoreColors[score] || '#64748b';
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: colors.navy, marginBottom: '8px' }}>
          Welcome back, {user?.name} 👋
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px' }}>
          Here's what's happening with your leads today.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {[
          { label: 'Total Leads', value: stats.total, icon: '📊', color: colors.navy },
          { label: 'Hot Leads', value: stats.hot, icon: '🔥', color: '#ef4444' },
          { label: 'Site Visits', value: stats.siteVisit, icon: '🏠', color: '#06b6d4' },
          { label: 'Bookings', value: stats.booking, icon: '✅', color: '#22c55e' },
          { label: 'Today Follow-ups', value: stats.todayFollowUps, icon: '📞', color: '#f59e0b' },
          { label: 'New This Week', value: stats.new, icon: '🆕', color: '#8b5cf6' }
        ].map((stat, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: '1px solid #f1f5f9'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '24px' }}>{stat.icon}</span>
              <span style={{
                background: `${stat.color}15`,
                color: stat.color,
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '600'
              }}>
                {stat.label.includes('Today') ? 'Today' : 'Total'}
              </span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: colors.navy }}>{stat.value}</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '24px'
      }} className="dashboard-grid">
        {/* Today's Follow-ups */}
        {todayFollowUps.length > 0 && (
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: '1px solid #f1f5f9'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.navy, display: 'flex', alignItems: 'center', gap: '8px' }}>
                📞 Today's Follow-ups
                <span style={{
                  background: '#fef3c7',
                  color: '#d97706',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {todayFollowUps.length}
                </span>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {todayFollowUps.slice(0, 3).map(lead => (
                <Link
                  key={lead.id}
                  to={`/crm/leads/${lead.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    background: '#fefce8',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    border: '1px solid #fef08a'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600', color: colors.navy, marginBottom: '4px' }}>{lead.name}</div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>{lead.phone} • {lead.project}</div>
                  </div>
                  <div style={{
                    background: getScoreColor(lead.score),
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {lead.score}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recent Leads */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          border: '1px solid #f1f5f9',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid #f1f5f9'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.navy }}>Recent Leads</h2>
            <Link to="/crm/leads" style={{
              color: colors.gold,
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none'
            }}>
              View All →
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Name</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Project</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Score</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Date</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead, i) => (
                  <tr key={lead.id} style={{ borderBottom: i < recentLeads.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: '600', color: colors.navy }}>{lead.name}</div>
                      <div style={{ fontSize: '13px', color: '#64748b' }}>{lead.phone}</div>
                    </td>
                    <td style={{ padding: '16px 20px', color: '#475569', fontSize: '14px' }}>{lead.project}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        background: `${getStatusColor(lead.status)}15`,
                        color: getStatusColor(lead.status),
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600'
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
                    <td style={{ padding: '16px 20px', color: '#64748b', fontSize: '13px' }}>{formatDate(lead.createdAt)}</td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <Link to={`/crm/leads/${lead.id}`} style={{
                        color: colors.gold,
                        fontWeight: '600',
                        fontSize: '13px',
                        textDecoration: 'none'
                      }}>
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pipeline Summary */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          border: '1px solid #f1f5f9'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.navy, marginBottom: '20px' }}>
            Lead Pipeline
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { status: 'New', count: stats.new, color: '#3b82f6' },
              { status: 'Contacted', count: stats.contacted, color: '#8b5cf6' },
              { status: 'Site Visit', count: stats.siteVisit, color: '#06b6d4' },
              { status: 'Negotiation', count: stats.negotiation, color: '#f97316' },
              { status: 'Booking', count: stats.booking, color: '#22c55e' },
              { status: 'Lost', count: stats.lost, color: '#ef4444' }
            ].map(item => (
              <div key={item.status} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '100px', fontSize: '13px', color: '#64748b' }}>{item.status}</div>
                <div style={{ flex: 1, height: '24px', background: '#f1f5f9', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${stats.total > 0 ? (item.count / stats.total) * 100 : 0}%`,
                    height: '100%',
                    background: item.color,
                    borderRadius: '6px',
                    minWidth: item.count > 0 ? '24px' : '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '8px'
                  }}>
                    {item.count > 0 && (
                      <span style={{ color: '#fff', fontSize: '11px', fontWeight: '600' }}>{item.count}</span>
                    )}
                  </div>
                </div>
                <div style={{ width: '30px', fontSize: '14px', fontWeight: '600', color: colors.navy, textAlign: 'right' }}>
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.navyDark} 100%)`,
          borderRadius: '16px',
          padding: '24px',
          color: '#fff'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Link to="/crm/leads/add" style={{
              background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
              color: colors.navyDark,
              padding: '12px 20px',
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
            <Link to="/crm/leads" style={{
              background: 'rgba(255,255,255,0.15)',
              color: '#fff',
              padding: '12px 20px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📋 View All Leads
            </Link>
            {(isAdmin || isSubAdmin) && (
              <Link to="/crm/employees" style={{
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                padding: '12px 20px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                👥 Manage Team
              </Link>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
