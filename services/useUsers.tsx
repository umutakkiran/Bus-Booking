import { useState, useEffect } from 'react';
import { User } from '../classes/User';

export function useUser() {
  const [userInfo, setUserInfo] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error('Veri alınamadı.');
        }
        const responseData = await response.json();
        setUserInfo(responseData[0]);
        setIsLoading(false);
      } catch (error:any) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { userInfo, isLoading, error };
}
