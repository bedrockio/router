import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { RouterContext } from './context.js';
import useNavigate from './useNavigate.js';

/**
 * Browser router using history API.
 *
 * @typedef {Object} BrowserRouterProps
 * @property {React.ReactElement} children
 * @param {BrowserRouterProps} props
 */
export default function BrowserRouter(props) {
  const [location, setLocation] = useState(getLocation);

  const navigate = useNavigate();

  // Using layout effect here so that the router can be
  // ready for navigation when child routes are mounted.
  useLayoutEffect(() => {
    const updateLocation = () => {
      setLocation(getLocation);
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

  function getLocation() {
    return {
      ...window.location,
      state: window.history.state,
    };
  }

  const search = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      get(name) {
        return params.get(name);
      },
      set(name, value) {
        params.set(name, value);
        if (params.size) {
          navigate(`?${params.toString()}`);
        } else {
          navigate('');
        }
      },
    };
  }, [location]);

  return (
    <RouterContext.Provider value={{ location, search }}>
      {props.children}
    </RouterContext.Provider>
  );
}
