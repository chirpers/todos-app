import { useEffect } from 'react';
import {  } from 'recoil';

function useCooldux(atom) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    set(store.getState());
    const dispose = store.subscribe(() => set(store.getState()));
    return () => dispose();
  }, []);


  return isOnline;
}