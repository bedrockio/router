import Link from './Link.js';

import { useRouter } from './context.js';

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

  // @ts-ignore
  const { matcher } = useRouter();

  let activeProps = {};

  const matches = !!matcher?.(props.to, { end: exact });

  if (matches) {
    activeProps = { 'data-active': true, 'aria-current': 'page' };
  }

  return <Link {...activeProps} {...rest} />;
}
