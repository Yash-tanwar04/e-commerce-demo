import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAdminAuthenticated: boolean;
  adminUser: { email: string; name: string } | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'vt_admin_auth_v2';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState<{ email: string; name: string } | null>(() => {
    return isAdminAuthenticated ? { email: 'admin@voguethread.com', name: 'Store Director' } : null;
  });

  useEffect(() => {
    if (isAdminAuthenticated) {
      localStorage.setItem(AUTH_KEY, 'true');
      setAdminUser({ email: 'admin@voguethread.com', name: 'Store Director' });
    } else {
      localStorage.removeItem(AUTH_KEY);
      setAdminUser(null);
    }
  }, [isAdminAuthenticated]);

  const login = (email: string, pass: string): boolean => {
    if (email.trim().toLowerCase() === 'admin@voguethread.com' && pass === 'admin123') {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAdminAuthenticated,
        adminUser,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
