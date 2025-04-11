// useWebContainer.ts
import { useEffect, useState } from 'react';
import { WebContainer } from '@webcontainer/api';

declare global {
  interface Window {
    __webContainer__?: WebContainer;
  }
}

export const useWeb = () => {
  const [instance, setInstance] = useState<WebContainer | null>(null);

  useEffect(() => {
    const boot = async () => {
        
      if (typeof window === 'undefined') return;

      // ✅ If already exists, use it
      if (window.__webContainer__) {
        setInstance(window.__webContainer__);
        return;
      }

      // ✅ Boot only once and persist globally
      const webContainer = await WebContainer.boot();
      window.__webContainer__ = webContainer;
      setInstance(webContainer);
      console.log('🟢 WebContainer booted and set globally');
    };

    boot();

    
  // 🧹 Cleanup on tab close/reload
//   const cleanup = () => {
//     delete window.__webContainer__;
//     console.log('🧼 WebContainer instance cleared');
//   };
//   window.addEventListener('beforeunload', cleanup);

//   // Remove listener when hook unmounts (SSR safety)
//   return () => {
//     window.removeEventListener('beforeunload', cleanup);
//   };
  }, []);

  return instance;
};
