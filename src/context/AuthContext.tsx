import React, { createContext, useContext, ReactNode, useState } from "react";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextData {
  userData: string | null;
  setUserData: (userData: string | null) => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [userData, setUserData] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
