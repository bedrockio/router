import Link from './Link.js';
import useLocation from './useLocation.js';

/**
 * A navigational link for client-side routing.
 *
 * @typedef {Object} NavLinkProps
 * @property {string} to - The path to link to.
 * @property {boolean} exact - Does the path match exactly.
 * @param {NavLinkProps & React.HTMLAttributes<HTMLAnchorElement>} props
 */
export default function NavLink(props) {
  const { exact, ...rest } = props;
  const { to } = props;

  const { pathname } = useLocation();

  let activeProps = {};

  let matches = pathname === to;

  if (!matches && !exact && pathname.startsWith(to)) {
    matches = pathname.replace(to, '').startsWith('/');
  }

  if (matches) {
    activeProps = { 'data-active': true, 'aria-current': 'page' };
  }

  return <Link {...activeProps} {...rest} />;
}
