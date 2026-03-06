import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { MOCK_USER } from "../mock/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    
    const login = (username, password) => {
        try {
          if (username === MOCK_USER.email && password) {
            toast.success("Login efetuado com sucesso!");
            setAuthenticated(true);
            return true;
          } else {
            toast.error("Credenciais inválidas.");
            setAuthenticated(false);
            return false;
          };
        } catch (error) {
            console.log('error:', error);
            toast.error("Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.");
            setAuthenticated(false);
            return false;
        };
    };

    return (
        <AuthContext.Provider value={{
            login,
            authenticated,
            setAuthenticated,
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
};

export default AuthContext;