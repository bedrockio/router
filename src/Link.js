import { useNavigate } from './navigate.js';

/**
 * A link for client-side routing.
 *
 * @typedef {Object} LinkProps
 * @property {string} to - The path to link to.
 * @param {LinkProps & React.HTMLAttributes<HTMLAnchorElement>} props
 */
export default function Link(props) {
  const { to, ...rest } = props;

  const navigate = useNavigate();

  function onClick(evt) {
    evt.preventDefault();
    navigate(to);
  }

  return <a {...rest} href={to} onClick={onClick} />;
}
