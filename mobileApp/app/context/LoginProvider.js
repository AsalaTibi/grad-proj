import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [adminEmail ,setAdminEmail] = useState('');
  const [adminTask ,setAdminTask] = useState([]);
  const [adminHarvest ,setAdminHarvest] = useState([]);
  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn,
              profile, setProfile,
              adminEmail,setAdminEmail ,
              adminTask,setAdminTask,
              adminHarvest,setAdminHarvest
            }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
