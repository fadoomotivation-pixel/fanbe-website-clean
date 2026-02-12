import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Contexts
import { AuthProvider } from './crm/context/AuthContext';
import { LeadProvider } from './crm/context/LeadContext';

// Website
import Home from './pages/Home';

// CRM
import ProtectedRoute from './crm/components/ProtectedRoute';
import CrmLayout from './crm/components/CrmLayout';
import Login from './crm/pages/Login';
import Dashboard from './crm/pages/Dashboard';
import Leads from './crm/pages/Leads';
import LeadDetail from './crm/pages/LeadDetail';
import AddLead from './crm/pages/AddLead';
import QuickCall from './crm/pages/QuickCall';
import EODReport from './crm/pages/EODReport';
import BulkImport from './crm/pages/BulkImport';
import Duplicates from './crm/pages/Duplicates';

export default function App() {
  return (
    <AuthProvider>
      <LeadProvider>
        <BrowserRouter>
          <Routes>
            {/* Website */}
            <Route path="/" element={<Home />} />

            {/* CRM */}
            <Route path="/crm/login" element={<Login />} />
            
            <Route path="/crm" element={<ProtectedRoute><CrmLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="leads" element={<Leads />} />
              <Route path="lead/:id" element={<LeadDetail />} />
              <Route path="add" element={<AddLead />} />
              <Route path="call" element={<QuickCall />} />
              <Route path="report" element={<EODReport />} />
              <Route path="import" element={<BulkImport />} />
              <Route path="duplicates" element={<Duplicates />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LeadProvider>
    </AuthProvider>
  );
}
