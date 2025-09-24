import { createContext, useState } from 'react';
import { showError } from '../helpers/alert';
import { http } from '../helpers/http';

export const AuthContext = createContext({
  profile: {},
  fetchProfile: () => {},
});

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState({});
  const fetchProfile = async () => {
    try {
      const { data } = await http({
        method: 'GET',
        url: '/profile',
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
      setProfile(data);
    } catch (error) {
      showError(error);
    }
  };

  return <AuthContext.Provider value={{ profile, fetchProfile }}>{children}</AuthContext.Provider>;
}
