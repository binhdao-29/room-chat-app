import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase/config';
import { Spin } from 'antd';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscribed = auth.onAuthStateChanged((user) => {
      console.log(user);
  
      if (user) {
        console.log("Done")
        const { displayName, email, uid, photoURL } = user;
        setUser({ 
          displayName, email, uid, photoURL 
        })

        setLoading(false);
        history.push('/');
        return;
      }
      history.push('/login');
    })
    return () => {
      unSubscribed();
    }
  }, [history]);

  return (
    <div>
      <AuthContext.Provider value={user}>
        {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
      </AuthContext.Provider>
    </div>
  )
}
