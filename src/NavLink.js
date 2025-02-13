import Link from './Link';

import { useRouter } from './context';

export default function NavLink(props) {
  const { to, exact, ...rest } = props;

  // @ts-ignore
  const { matcher } = useRouter();

  let activeProps;

  const matches = !!matcher?.(to, { end: exact });

  if (matches) {
    activeProps = { 'data-active': true, 'aria-current': 'page' };
  }

  return <Link {...rest} {...activeProps} to={to} />;
}
