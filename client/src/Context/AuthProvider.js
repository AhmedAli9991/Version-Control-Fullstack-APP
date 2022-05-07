import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [Login, setLogin] = useState(false);

  return (
    <AuthContext.Provider value={{ Login, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
