import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const USERS = [
  { id: 1, email: 'admin@fanbegroup.com', password: 'admin123', name: 'Rajesh Kumar', role: 'admin', phone: '9319169463', target: 50 },
  { id: 2, email: 'priya@fanbegroup.com', password: 'priya123', name: 'Priya Sharma', role: 'subadmin', phone: '9876543210', target: 40 },
  { id: 3, email: 'amit@fanbegroup.com', password: 'amit123', name: 'Amit Singh', role: 'employee', phone: '9123456789', target: 30 },
  { id: 4, email: 'ankita@fanbegroup.com', password: 'ankita123', name: 'Ankita', role: 'employee', phone: '9988776655', target: 30 }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('fanbe-user');
    if (saved) try { setUser(JSON.parse(saved)); } catch {}
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const found = USERS.find(u => u.email === email.toLowerCase() && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem('fanbe-user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => { setUser(null); localStorage.removeItem('fanbe-user'); };

  const isAdmin = user?.role === 'admin';
  const isSubAdmin = user?.role === 'subadmin';

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user, isAdmin, isSubAdmin, canManage: isAdmin || isSubAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export const EMPLOYEES = USERS.filter(u => u.role !== 'admin');
