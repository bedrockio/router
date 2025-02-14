import { useState, useEffect, useMemo } from 'react';

import { RouterContext } from './context.js';

/**
 * Browser router using history API.
 *
 * @typedef {Object} BrowserRouterProps
 * @property {React.ReactElement} children
 * @param {BrowserRouterProps} props
 */
export default function BrowserRouter(props) {
  const [location, setLocation] = useState(() => {
    return { ...window.location };
  });

  useEffect(() => {
    const updateLocation = () => {
      setLocation({ ...window.location });
    };

    window.addEventListener('popstate', updateLocation);
    window.addEventListener('pushstate', updateLocation);
    window.addEventListener('replacestate', updateLocation);

    return () => {
      window.removeEventListener('popstate', updateLocation);
      window.removeEventListener('pushstate', updateLocation);
      window.removeEventListener('replacestate', updateLocation);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const search = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return Object.fromEntries(params);
  }, [location]);

  return (
    <RouterContext.Provider value={{ location, search }}>
      {props.children}
    </RouterContext.Provider>
  );
}
