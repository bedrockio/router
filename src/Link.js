import useNavigate from './useNavigate.js';

/**
 * A link for client-side routing.
 *
 * @typedef {Object} LinkProps
 * @property {string} to - The path to link to.
 * @property {boolean} [back] - Attempt to navigate back with navigation.back.
 * @property {Function} [onClick] - An additional onClick handler
 * @param {LinkProps & React.HTMLAttributes<HTMLAnchorElement>} props
 */
export default function Link(props) {
  const { to, back, ...rest } = props;

  const navigate = useNavigate();

  function isModifiedEvent(evt) {
    return evt.altKey || evt.ctrlKey || evt.metaKey || evt.shiftKey;
  }

  function canGoBack() {
    return back && navigation.canGoBack;
  }

  function getHref() {
    let href;
    if (canGoBack()) {
      href = getPreviousHref();
    } else {
      href = to;
    }

    return href;
  }

  function getPreviousHref() {
    const { index } = navigation.currentEntry;
    const { url } = navigation.entries()[index - 1];

    if (url) {
      const { pathname, search, hash } = new URL(url);
      return pathname + search + hash;
    } else {
      return to;
    }
  }

  function onClick(evt) {
    if (!isModifiedEvent(evt)) {
      evt.preventDefault();

      if (canGoBack()) {
        navigation.back();
      } else {
        navigate(to);
      }
    }
    props.onClick?.(evt);
  }

  return <a {...rest} href={getHref()} onClick={onClick} />;
}
