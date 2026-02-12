import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeads } from '../context/LeadContext';

const C = { navy: '#1a3a5c', gold: '#c9a962' };

export default function QuickCall() {
  const nav = useNavigate();
  const { leads, logCall, CALL_OUTCOMES, STATUSES } = useLeads();
  
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState('');
  const [lead, setLead] = useState(null);
  const [outcome, setOutcome] = useState('');
  const [notes, setNotes] = useState('');
  const [feedback, setFeedback] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [siteVisit, setSiteVisit] = useState(false);
  const [success, setSuccess] = useState(false);

  const filtered = search.length >= 2 ? leads.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.phone.includes(search)).slice(0, 8) : [];

  const submit = () => {
    if (!lead || !outcome) return;
    logCall({
      leadId: lead.id,
      outcome,
      notes,
      feedback,
      newStatus: newStatus || undefined,
      followUpDate: followUp || undefined,
      siteVisitFixed: siteVisit
    });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setStep(1);
      setSearch('');
      setLead(null);
      setOutcome('');
      setNotes('');
      setFeedback('');
      setNewStatus('');
      setFollowUp('');
      setSiteVisit(false);
    }, 1200);
  };

  if (success) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#22c55e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
        <div style={{ fontSize: 80, marginBottom: 16 }}>✅</div>
        <div style={{ color: '#fff', fontSize: 24, fontWeight: 700 }}>Call Logged!</div>
      </div>
    );
  }

  const scoreColor = (s) => s === 'Hot' ? '#ef4444' : s === 'Warm' ? '#f59e0b' : '#3b82f6';

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: '#22c55e', padding: '20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => nav(-1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, padding: 0 }}>←</button>
          <div>
            <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>📞 Quick Call Log</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Log calls in seconds</p>
          </div>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Step 1: Search Lead */}
        {step === 1 && (
          <>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="🔍 Search by name or phone..."
              autoFocus
              style={{ width: '100%', padding: 16, borderRadius: 14, border: '2px solid #e2e8f0', fontSize: 16, marginBottom: 16, boxSizing: 'border-box' }}
            />
            
            {filtered.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filtered.map(l => (
                  <button key={l.id} onClick={() => { setLead(l); setStep(2); }} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: '2px solid #e2e8f0', borderRadius: 14, padding: 14, textAlign: 'left', cursor: 'pointer' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: scoreColor(l.score), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 16 }}>{l.name[0]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: C.navy, fontSize: 15 }}>{l.name}</div>
                      <div style={{ color: '#64748b', fontSize: 13 }}>{l.phone} • {l.project}</div>
                    </div>
                    <a href={`tel:${l.phone}`} onClick={e => e.stopPropagation()} style={{ width: 40, height: 40, background: C.navy, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📞</a>
                  </button>
                ))}
              </div>
            ) : search.length >= 2 ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>
                <div>No leads found</div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>👆</div>
                <div>Type to search leads</div>
              </div>
            )}
          </>
        )}

        {/* Step 2: Log Call */}
        {step === 2 && lead && (
          <>
            {/* Selected Lead */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '2px solid #22c55e', borderRadius: 16, padding: 14, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: scoreColor(lead.score), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 18 }}>{lead.name[0]}</div>
                <div>
                  <div style={{ fontWeight: 600, color: C.navy, fontSize: 16 }}>{lead.name}</div>
                  <div style={{ color: '#64748b', fontSize: 13 }}>{lead.phone}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <a href={`tel:${lead.phone}`} style={{ width: 44, height: 44, background: C.navy, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📞</a>
                <button onClick={() => { setStep(1); setLead(null); }} style={{ width: 44, height: 44, background: '#f1f5f9', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: 'none', cursor: 'pointer' }}>✕</button>
              </div>
            </div>

            {/* Call Outcome */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 10, fontWeight: 600, color: C.navy }}>Call Outcome *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {CALL_OUTCOMES.map(o => (
                  <button key={o.value} onClick={() => setOutcome(o.value)} style={{
                    padding: 14, borderRadius: 12, border: outcome === o.value ? `2px solid ${o.color}` : '2px solid #e2e8f0',
                    background: outcome === o.value ? `${o.color}15` : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10
                  }}>
                    <span style={{ fontSize: 20 }}>{o.icon}</span>
                    <span style={{ fontWeight: 500, color: outcome === o.value ? o.color : C.navy, fontSize: 13 }}>{o.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Site Visit Fixed */}
            {outcome === 'connected' && (
              <button onClick={() => setSiteVisit(!siteVisit)} style={{
                width: '100%', padding: 14, borderRadius: 12, border: siteVisit ? '2px solid #22c55e' : '2px solid #e2e8f0',
                background: siteVisit ? '#dcfce7' : '#fff', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer'
              }}>
                <span style={{ fontSize: 20 }}>{siteVisit ? '✅' : '🏠'}</span>
                <span style={{ fontWeight: 600, color: siteVisit ? '#166534' : '#64748b' }}>Site Visit Fixed</span>
              </button>
            )}

            {/* Update Status */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: C.navy }}>Update Status</label>
              <select value={newStatus} onChange={e => setNewStatus(e.target.value)} style={{ width: '100%', padding: 14, borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 15, background: '#fff', boxSizing: 'border-box' }}>
                <option value="">No Change</option>
                {STATUSES.filter(s => s !== 'New').map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Follow-up Date */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: C.navy }}>Next Follow-up</label>
              <input type="date" value={followUp} onChange={e => setFollowUp(e.target.value)} style={{ width: '100%', padding: 14, borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>

            {/* Buyer Feedback */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: C.navy }}>Buyer Feedback / Objection</label>
              <input type="text" value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="e.g., location concern, price issue..." style={{ width: '100%', padding: 14, borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>

            {/* Notes */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: C.navy }}>Quick Notes</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any additional notes..." rows={2} style={{ width: '100%', padding: 14, borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 15, resize: 'none', boxSizing: 'border-box' }} />
            </div>

            {/* Submit */}
            <button onClick={submit} disabled={!outcome} style={{
              width: '100%', padding: 18, borderRadius: 14, border: 'none',
              background: outcome ? '#22c55e' : '#e2e8f0', color: outcome ? '#fff' : '#94a3b8',
              fontSize: 17, fontWeight: 600, cursor: outcome ? 'pointer' : 'not-allowed'
            }}>
              ✓ Log This Call
            </button>
          </>
        )}
      </div>
    </div>
  );
}
