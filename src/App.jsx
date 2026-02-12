import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

// Website Pages
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetail';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Website Components
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// CRM
import { AuthProvider } from './crm/context/AuthContext';
import { LeadProvider } from './crm/context/LeadContext';
import ProtectedRoute from './crm/components/ProtectedRoute';
import CrmLayout from './crm/components/CrmLayout';
import LoginPage from './crm/pages/LoginPage';
import Dashboard from './crm/pages/Dashboard';
import LeadsList from './crm/pages/LeadsList';
import AddLead from './crm/pages/AddLead';
import LeadDetail from './crm/pages/LeadDetail';

// Website Layout
function WebsiteLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <LeadProvider>
          <BrowserRouter>
            <Routes>
              {/* Website Routes */}
              <Route path="/" element={<WebsiteLayout><HomePage /></WebsiteLayout>} />
              <Route path="/projects" element={<WebsiteLayout><ProjectsPage /></WebsiteLayout>} />
              <Route path="/projects/:id" element={<WebsiteLayout><ProjectDetail /></WebsiteLayout>} />
              <Route path="/about" element={<WebsiteLayout><AboutPage /></WebsiteLayout>} />
              <Route path="/contact" element={<WebsiteLayout><ContactPage /></WebsiteLayout>} />

              {/* CRM Routes */}
              <Route path="/crm/login" element={<LoginPage />} />
              <Route path="/crm" element={<ProtectedRoute><CrmLayout /></ProtectedRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="leads" element={<LeadsList />} />
                <Route path="leads/add" element={<AddLead />} />
                <Route path="leads/:id" element={<LeadDetail />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LeadProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
