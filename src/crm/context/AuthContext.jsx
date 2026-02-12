// Inside AuthContext, update login/setUser:
const login = async (email, password) => {
  // ... existing logic
  const userData = { email, role: 'admin' }; // From backend: 'admin'|'subadmin'|'employee'
  setUser(userData);
};

// Add role check hook:
export const useRole = () => {
  const { user } = useAuth();
  return user?.role || 'employee';
};
