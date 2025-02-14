/**
 * A route to resolve a component based on location.
 *
 * @typedef {Object} RouteProps
 * @property {string} path - The path to use.
 * @property {React.ReactNode|React.ReactElement|Function} render - The component or element to render.
 * @param {RouteProps} props
 */
export default function Route(props) {
  let { render: node } = props;

  if (typeof node === 'function') {
    const Component = node;
    // @ts-ignore
    node = <Component />;
  }

  return node;
}
