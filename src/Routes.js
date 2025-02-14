import { useMemo, Children } from 'react';
import { match } from 'path-to-regexp';
import { useContext } from 'react';

const OPTIONAL_REG = /\/:(\w+)\?/g;

import { useLocation } from './location.js';
import { RouterContext } from './context.js';

/**
 * A route to resolve a component based on location.
 *
 * @typedef {Object} RoutesProps
 * @property {React.ReactElement} children
 * @param {RoutesProps} props
 */
export default function Routes(props) {
  const { children } = props;

  const location = useLocation();
  const parent = useContext(RouterContext);

  const routes = useMemo(() => {
    return Children.toArray(children).map((node) => {
      // @ts-ignore
      let { path = '*', exact = false, subdomain } = node.props;

      path = path.replace(OPTIONAL_REG, '{/:$1}');

      if (!exact) {
        if (path === '/') {
          path = '*';
        }
      }

      if (path.endsWith('*')) {
        path += 'splat';
      }

      const matchPath = match(path, {
        end: exact,
      });

      const matchSubdomain = getSubdomainMatcher(subdomain);

      // Note to support NavLink the matcher must
      // take the pathname as the first agument.
      const matcher = (pathname, hostname) => {
        return matchPath(pathname) || matchSubdomain(hostname);
      };

      return {
        node,
        matcher,
      };
    });
  }, [children]);

  const route = matchRoute(routes, location);

  if (!route) {
    return null;
  }

  const { node, params, matcher } = route;

  return (
    <RouterContext.Provider value={{ ...parent, params, matcher }}>
      {node}
    </RouterContext.Provider>
  );
}

function matchRoute(routes, location) {
  const { pathname, hostname } = location;
  for (let route of routes) {
    const match = route.matcher(pathname, hostname);
    if (match) {
      return {
        node: route.node,
        params: match.params,
        matcher: route.matcher,
      };
    }
  }
}

function getSubdomainMatcher(subdomain) {
  return (hostname) => {
    if (!subdomain) {
      return false;
    }
    return hostname.split('.')[0] === subdomain;
  };
}
