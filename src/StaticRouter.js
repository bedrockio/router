import { RouterContext } from './context.js';

/**
 * Static router for SSR and SSG.
 *
 * @typedef {Object} StaticRouterProps
 * @property {string} path - The static path to use.
 * @property {React.ReactElement} children
 * @param {StaticRouterProps} props
 */
export default function StaticRouter(props) {
  const location = {
    pathname: props.path,
  };

  return (
    <RouterContext.Provider value={{ location }}>
      {props.children}
    </RouterContext.Provider>
  );
}
