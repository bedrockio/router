import { useEffect } from 'react';

import useNavigate from './useNavigate.js';

/**
 * A route to resolve a component based on location.
 *
 * @typedef {Object} RedirectProps
 * @property {string} to - The path to redirect to.
 * @param {RedirectProps} props
 */
export default function Redirect(props) {
  const { to } = props;
  const { replace } = useNavigate();

  useEffect(() => {
    queueMicrotask(() => {
      replace(to);
    });
  }, []);

  return null;
}
