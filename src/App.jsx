import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Website imports (restored)
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetail';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { LanguageProvider } from './context/LanguageContext';

// CRM imports
import { AuthProvider } from './crm/context/AuthContext';
import { LeadProvider } from './crm/context/LeadContext';
import ProtectedRoute from './crm/components/ProtectedRoute';
import CrmLayout from './crm/components/CrmLayout';
import Login from './crm/pages/Login';
import Dashboard from './crm/pages/Dashboard';
import Leads from './crm/pages/Leads';
import BulkUpload from './crm/pages/BulkUpload';
// ... import other CRM pages (AddLead, LeadDetail, BulkImport, etc.)

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <LeadProvider>
          <BrowserRouter>
            <Header />
            
            <Routes>
              {/* Public Website Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* CRM Routes */}
              <Route path="/crm/login" element={<Login />} />
              <Route path="/crm" element={<ProtectedRoute><CrmLayout /></ProtectedRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="leads" element={<Leads />} />
                <Route path="bulk-upload" element={<BulkUpload />} />
                {/* Add other CRM routes: */}
                {/* <Route path="add-lead" element={<AddLead />} /> */}
                {/* <Route path="lead/:id" element={<LeadDetail />} /> */}
                {/* <Route path="import" element={<BulkImport />} /> */}
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <Footer />
            <WhatsAppButton />
          </BrowserRouter>
        </LeadProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
