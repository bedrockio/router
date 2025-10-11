import { compile } from 'path-to-regexp';
import { useEffect } from 'react';

import useNavigate from './useNavigate.js';
import useParams from './useParams.js';

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

  const params = useParams();

  useEffect(() => {
    queueMicrotask(() => {
      const toPath = compile(to);
      replace(toPath(params));
    });
  }, []);

  return null;
}
