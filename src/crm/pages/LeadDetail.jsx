import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { canDeleteLeads } = useAuth();
  const { leads, employees, updateLead, addActivity, deleteLead } = useLeads();

  const lead = leads.find(l => l.id === Number(id));
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(lead || {});
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [newActivity, setNewActivity] = useState({ type: 'call', note: '' });

  if (!lead) {
    return (
      <div style={{ padding: '48px', textAlign: 'center' }}>
        <h2 style={{ color: colors.navy, marginBottom: '16px' }}>Lead not found</h2>
        <Link to="/crm/leads" style={{ color: colors.gold }}>← Back to Leads</Link>
      </div>
    );
  }

  const statuses = ['New', 'Contacted', 'Follow Up', 'Site Visit Scheduled', 'Negotiation', 'Booking', 'Lost'];
  const scores = ['Hot', 'Warm', 'Cold'];
  const activityTypes = [
    { value: 'call', label: '📞 Phone Call' },
    { value: 'whatsapp', label: '💬 WhatsApp' },
    { value: 'email', label: '✉️ Email' },
    { value: 'site_visit', label: '🏠 Site Visit' },
    { value: 'meeting', label: '🤝 Meeting' },
    { value: 'note', label: '📝 Note' }
  ];

  const getStatusColor = (status) => {
    const statusColors = {
      'New': '#3b82f6', 'Contacted': '#8b5cf6', 'Follow Up': '#f59e0b',
      'Site Visit Scheduled': '#06b6d4', 'Negotiation': '#f97316', 'Booking': '#22c55e', 'Lost': '#ef4444'
    };
    return statusColors[status] || '#64748b';
  };

  const getScoreColor = (score) => ({ 'Hot': '#ef4444', 'Warm': '#f59e0b', 'Cold': '#3b82f6' }[score] || '#64748b');
  const getActivityIcon = (type) => ({ call: '📞', whatsapp: '💬', email: '✉️', site_visit: '🏠', meeting: '🤝', note: '📝', created: '✨', assigned: '👤', booking: '🎉', lost: '❌' }[type] || '📌');

  const formatDateTime = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const getAssignedName = (id) => employees.find(e => e.id === id)?.name || 'Unassigned';

  const handleSave = () => { updateLead(lead.id, editData); setIsEditing(false); };
  const handleAddActivity = () => { if (!newActivity.note.trim()) return; addActivity(lead.id, newActivity); setNewActivity({ type: 'call', note: '' }); setShowActivityForm(false); };
  const handleDelete = () => { if (window.confirm(`Delete "${lead.name}"?`)) { deleteLead(lead.id); navigate('/crm/leads'); } };

  const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
        <div>
          <button onClick={() => navigate('/crm/leads')} style={{ background: 'none', border: 'none', color: colors.teal, fontSize: '14px', cursor: 'pointer', marginBottom: '8px', padding: 0 }}>← Back to Leads</button>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: colors.navy, marginBottom: '8px' }}>{lead.name}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ background: `${getStatusColor(lead.status)}15`, color: getStatusColor(lead.status), padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600' }}>{lead.status}</span>
            <span style={{ background: getScoreColor(lead.score), color: '#fff', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600' }}>{lead.score}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a href={`tel:${lead.phone}`} style={{ background: colors.navy, color: '#fff', padding: '12px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>📞 Call</a>
          <a href={`https://wa.me/91${lead.phone}`} target="_blank" rel="noopener noreferrer" style={{ background: '#25D366', color: '#fff', padding: '12px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>💬 WhatsApp</a>
          {!isEditing && <button onClick={() => setIsEditing(true)} style={{ background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`, color: colors.navyDark, padding: '12px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>✏️ Edit</button>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="lead-detail-grid">
        {/* Lead Info */}
        <div>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.navy, marginBottom: '20px' }}>Lead Information</h2>
            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  {[['name', 'Name'], ['phone', 'Phone'], ['email', 'Email'], ['city', 'City'], ['budget', 'Budget']].map(([key, label]) => (
                    <div key={key}><label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#64748b' }}>{label}</label><input value={editData[key] || ''} onChange={(e) => setEditData({ ...editData, [key]: e.target.value })} style={inputStyle} /></div>
                  ))}
                  <div><label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#64748b' }}>Project</label><select value={editData.project} onChange={(e) => setEditData({ ...editData, project: e.target.value })} style={inputStyle}>{projectsData.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}</select></div>
                  <div><label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#64748b' }}>Status</label><select value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })} style={inputStyle}>{statuses.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                  <div><label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#64748b' }}>Score</label><select value={editData.score} onChange={(e) => setEditData({ ...editData, score: e.target.value })} style={inputStyle}>{scores.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                  <div><label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#64748b' }}>Follow-up</label><input type="date" value={editData.followUpDate || ''} onChange={(e) => setEditData({ ...editData, followUpDate: e.target.value })} style={inputStyle} /></div>
                </div>
                <div><label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#64748b' }}>Notes</label><textarea value={editData.notes || ''} onChange={(e) => setEditData({ ...editData, notes: e.target.value })} rows={3} style={inputStyle} /></div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button onClick={() => setIsEditing(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '2px solid #e2e8f0', background: '#fff', color: '#64748b', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={handleSave} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: colors.gold, color: colors.navyDark, fontWeight: '600', cursor: 'pointer' }}>Save</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                {[['Phone', lead.phone], ['Email', lead.email || '-'], ['City', lead.city || '-'], ['Project', lead.project], ['Plot Size', lead.plotSize], ['Budget', lead.budget || '-'], ['Source', lead.source], ['Assigned', getAssignedName(lead.assignedTo)], ['Follow-up', lead.followUpDate || 'Not set'], ['Created', formatDateTime(lead.createdAt)]].map(([label, value]) => (
                  <div key={label}><div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>{label}</div><div style={{ fontSize: '15px', color: colors.navy, fontWeight: '500' }}>{value}</div></div>
                ))}
                {lead.notes && <div style={{ gridColumn: '1 / -1' }}><div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>Notes</div><div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>{lead.notes}</div></div>}
              </div>
            )}
          </div>

          {/* Activity Timeline */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.navy }}>Activity Timeline</h2>
              <button onClick={() => setShowActivityForm(!showActivityForm)} style={{ background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`, color: colors.navyDark, padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>+ Add Activity</button>
            </div>

            {showActivityForm && (
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                <select value={newActivity.type} onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })} style={{ ...inputStyle, marginBottom: '12px' }}>{activityTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select>
                <textarea value={newActivity.note} onChange={(e) => setNewActivity({ ...newActivity, note: e.target.value })} placeholder="Add notes..." rows={2} style={inputStyle} />
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '12px' }}>
                  <button onClick={() => setShowActivityForm(false)} style={{ padding: '8px 16px', borderRadius: '8px', border: '2px solid #e2e8f0', background: '#fff', color: '#64748b', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                  <button onClick={handleAddActivity} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: colors.navy, color: '#fff', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>Add</button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[...lead.activities].reverse().map((activity, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                  {i < lead.activities.length - 1 && <div style={{ position: 'absolute', left: '19px', top: '40px', bottom: '-20px', width: '2px', background: '#e2e8f0' }} />}
                  <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0, zIndex: 1 }}>{getActivityIcon(activity.type)}</div>
                  <div style={{ flex: 1, paddingBottom: '24px' }}>
                    <div style={{ fontSize: '14px', color: colors.navy, fontWeight: '500', marginBottom: '4px' }}>{activity.note}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{formatDateTime(activity.date)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: colors.navy, marginBottom: '16px' }}>Quick Actions</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#64748b' }}>Status</label>
              <select value={lead.status} onChange={(e) => { updateLead(lead.id, { status: e.target.value }); addActivity(lead.id, { type: 'note', note: `Status → ${e.target.value}` }); }} style={inputStyle}>{statuses.map(s => <option key={s} value={s}>{s}</option>)}</select>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#64748b' }}>Score</label>
              <div style={{ display: 'flex', gap: '8px' }}>{scores.map(score => <button key={score} onClick={() => { updateLead(lead.id, { score }); addActivity(lead.id, { type: 'note', note: `Score → ${score}` }); }} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: lead.score === score ? 'none' : '2px solid #e2e8f0', background: lead.score === score ? getScoreColor(score) : '#fff', color: lead.score === score ? '#fff' : '#64748b', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>{score}</button>)}</div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#64748b' }}>Follow-up</label>
              <input type="date" value={lead.followUpDate || ''} onChange={(e) => updateLead(lead.id, { followUpDate: e.target.value })} style={inputStyle} />
            </div>
            {canDeleteLeads && <button onClick={handleDelete} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: '#fef2f2', color: '#ef4444', fontWeight: '600', cursor: 'pointer', fontSize: '14px', marginTop: '16px' }}>🗑️ Delete Lead</button>}
          </div>
        </div>
      </div>

      <style>{`@media (min-width: 1024px) { .lead-detail-grid { grid-template-columns: 2fr 1fr; } }`}</style>
    </div>
  );
}

export default LeadDetail;
