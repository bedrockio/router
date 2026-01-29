import { compile } from 'path-to-regexp';
import { useEffect } from 'react';

import useLocation from './useLocation.js';
import useNavigate from './useNavigate.js';
import useParams from './useParams.js';

const DEFAULT_STORAGE_KEY = 'redirectUrl';

/**
 * A route to resolve a component based on location.
 *
 * @typedef {Object} RedirectProps
 * @property {string} to - The path to redirect to.
 * @property {boolean|string} capture - Captures redirect url in localStorage.
 *                                      Defaults to `redirectUrl` if `true`.
 * @param {RedirectProps} props
 */
export default function Redirect(props) {
  const { to, capture } = props;
  const { replace } = useNavigate();
  const location = useLocation();

  const params = useParams();

  useEffect(() => {
    queueMicrotask(() => {
      if (capture === true) {
        captureCurrentLocation(location, DEFAULT_STORAGE_KEY);
      } else if (typeof capture === 'string') {
        captureCurrentLocation(location, capture);
      }

      const toPath = compile(to);
      replace(toPath(params));
    });
  }, []);

  return null;
}

export function getRedirectUrl(key = DEFAULT_STORAGE_KEY) {
  return localStorage.getItem(key);
}

export function popRedirectUrl(key) {
  const value = getRedirectUrl(key);
  clearRedirectUrl(key);
  return value;
}

export function clearRedirectUrl(key = DEFAULT_STORAGE_KEY) {
  localStorage.removeItem(key);
}

function captureCurrentLocation(location, key) {
  if (getRedirectUrl(key)) {
    return;
  }
  const url = location.pathname + location.search + location.hash;
  localStorage.setItem(key, url);
}
