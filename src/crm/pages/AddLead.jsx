import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

function AddLead() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addLead, employees } = useLeads();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: '',
    plotSize: '100 sq.yd',
    source: 'WhatsApp',
    status: 'New',
    score: 'Warm',
    assignedTo: user?.role === 'employee' ? user.id : null,
    notes: '',
    budget: '',
    city: '',
    followUpDate: ''
  });

  const [errors, setErrors] = useState({});

  const sources = ['WhatsApp', 'Website', 'Facebook', 'Google', 'Referral', 'Walk-in', 'Phone Call', 'Other'];
  const plotSizes = ['50 sq.yd', '100 sq.yd', '150 sq.yd', '200 sq.yd', '250 sq.yd'];
  const statuses = ['New', 'Contacted', 'Follow Up', 'Site Visit Scheduled', 'Negotiation', 'Booking'];
  const scores = ['Hot', 'Warm', 'Cold'];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.project) newErrors.project = 'Project is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newLead = addLead({
      ...formData,
      assignedTo: formData.assignedTo || null
    });

    navigate(`/crm/leads/${newLead.id}`);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '10px',
    border: '2px solid #e2e8f0',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: colors.navy
  };

  const errorStyle = {
    color: '#ef4444',
    fontSize: '12px',
    marginTop: '4px'
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            color: colors.teal,
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '8px',
            padding: 0
          }}
        >
          ← Back
        </button>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: colors.navy }}>Add New Lead</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          border: '1px solid #f1f5f9'
        }}>
          {/* Contact Information */}
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.navy, marginBottom: '24px' }}>
            Contact Information
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div>
              <label style={labelStyle}>Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
                style={{ ...inputStyle, borderColor: errors.name ? '#ef4444' : '#e2e8f0' }}
              />
              {errors.name && <p style={errorStyle}>{errors.name}</p>}
            </div>

            <div>
              <label style={labelStyle}>Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                placeholder="10 digit mobile number"
                style={{ ...inputStyle, borderColor: errors.phone ? '#ef4444' : '#e2e8f0' }}
              />
              {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                style={{ ...inputStyle, borderColor: errors.email ? '#ef4444' : '#e2e8f0' }}
              />
              {errors.email && <p style={errorStyle}>{errors.email}</p>}
            </div>

            <div>
              <label style={labelStyle}>City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g., Delhi, Faridabad"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Project Interest */}
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.navy, marginBottom: '24px' }}>
            Project Interest
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div>
              <label style={labelStyle}>Project *</label>
              <select
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                style={{ ...inputStyle, cursor: 'pointer', borderColor: errors.project ? '#ef4444' : '#e2e8f0' }}
              >
                <option value="">Select Project</option>
                {projectsData.map(p => (
                  <option key={p.id} value={p.name}>{p.name} - {p.location}</option>
                ))}
              </select>
              {errors.project && <p style={errorStyle}>{errors.project}</p>}
            </div>

            <div>
              <label style={labelStyle}>Plot Size</label>
              <select
                value={formData.plotSize}
                onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {plotSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Budget</label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="e.g., ₹10-15 Lakh"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Source</label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {sources.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Lead Status */}
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.navy, marginBottom: '24px' }}>
            Lead Status
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div>
              <label style={labelStyle}>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Score</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {scores.map(score => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setFormData({ ...formData, score })}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '10px',
                      border: formData.score === score ? 'none' : '2px solid #e2e8f0',
                      background: formData.score === score
                        ? score === 'Hot' ? '#ef4444' : score === 'Warm' ? '#f59e0b' : '#3b82f6'
                        : '#fff',
                      color: formData.score === score ? '#fff' : '#64748b',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Assign To</label>
              <select
                value={formData.assignedTo || ''}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value ? Number(e.target.value) : null })}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="">Unassigned</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Follow-up Date</label>
              <input
                type="date"
                value={formData.followUpDate}
                onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Notes */}
          <div style={{ marginBottom: '32px' }}>
            <label style={labelStyle}>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any additional notes about the lead..."
              rows={4}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          {/* Submit Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                padding: '14px 28px',
                borderRadius: '10px',
                border: '2px solid #e2e8f0',
                background: '#fff',
                color: '#64748b',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '14px 28px',
                borderRadius: '10px',
                border: 'none',
                background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
                color: colors.navyDark,
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Create Lead
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddLead;
