import { useState, useEffect } from 'react';
import { Expedition } from '../classes/Expedition';

export function useExpeditions() {
  const [expeditionInfo, setExpeditionInfo] = useState<Expedition[]>([]);


  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpedition = async () => {
      try {
        const response = await fetch('/api/expedition');
        if (!response.ok) {
          throw new Error('Veri alınamadı.');
        }
        const responseData = await response.json();
        setExpeditionInfo(responseData);
        setIsLoading(false);
      } catch (error:any) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchExpedition();
  }, []);

  return { expeditionInfo, isLoading, error };
}
