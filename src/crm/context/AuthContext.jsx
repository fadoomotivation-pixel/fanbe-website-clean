import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Demo users - In production, this would come from a database
const DEMO_USERS = [
  { id: 1, email: 'admin@fanbegroup.com', password: 'admin123', name: 'Rajesh Kumar', role: 'admin', phone: '9319169463' },
  { id: 2, email: 'subadmin@fanbegroup.com', password: 'subadmin123', name: 'Priya Sharma', role: 'subadmin', phone: '9876543210' },
  { id: 3, email: 'employee@fanbegroup.com', password: 'employee123', name: 'Amit Singh', role: 'employee', phone: '9123456789' }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('fanbe-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('fanbe-user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const foundUser = DEMO_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password;
      setUser(userData);
      localStorage.setItem('fanbe-user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fanbe-user');
  };

  const isAdmin = user?.role === 'admin';
  const isSubAdmin = user?.role === 'subadmin';
  const isEmployee = user?.role === 'employee';
  const canManageEmployees = isAdmin;
  const canViewAllLeads = isAdmin || isSubAdmin;
  const canAssignLeads = isAdmin || isSubAdmin;
  const canDeleteLeads = isAdmin;

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user,
      isAdmin,
      isSubAdmin,
      isEmployee,
      canManageEmployees,
      canViewAllLeads,
      canAssignLeads,
      canDeleteLeads
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
