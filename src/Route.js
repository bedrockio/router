/**
 * @typedef {import('react').ReactNode|import('react').ElementType} Node
 *
 * @typedef {Object} RouteProps
 * @property {string} path - The path to use.
 * @property {Node} render - The component or element to render.
 *
 * @param {RouteProps} props
 */
export default function Route(props) {
  let { render: node } = props;

  if (typeof node === 'function') {
    const Component = node;
    node = <Component />;
  }

  return node;
}
