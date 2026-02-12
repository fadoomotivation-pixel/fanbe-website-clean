import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const EMPLOYEES = [
  { id: 1, name: 'Admin User', email: 'admin@fanbegroup.com', role: 'admin' },
  { id: 2, name: 'Sales Manager', email: 'manager@fanbegroup.com', role: 'subadmin' },
  { id: 3, name: 'Sales Rep', email: 'sales@fanbegroup.com', role: 'employee' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Simple demo login
    if (email === 'admin@fanbegroup.com' && password === 'admin123') {
      setUser({ email, role: 'admin', name: 'Admin User' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const useRole = () => {
  const { user } = useAuth();
  return user?.role || 'employee';
};
