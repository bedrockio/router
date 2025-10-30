import useNavigate from './useNavigate.js';

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

  function isModifiedEvent(evt) {
    if (evt.button !== 0) {
      return false;
    }
    return evt.altKey || evt.ctrlKey || evt.metaKey || evt.shiftKey;
  }

  function onClick(evt) {
    if (!isModifiedEvent(evt)) {
      evt.preventDefault();
      navigate(to);
    }
  }

  return <a {...rest} href={to} onClick={onClick} />;
}
