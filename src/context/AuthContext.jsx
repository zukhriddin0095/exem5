import { createContext, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { TOKEN } from "../constants";

export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const [IsAuthenticated, setIsAuthenticated] = useState(
    Boolean(Cookies.get(TOKEN))
  );
  const state = {
    IsAuthenticated,
    setIsAuthenticated,
  };
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
