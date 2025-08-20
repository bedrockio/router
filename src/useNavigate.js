import history from './history.js';

/**
 * Pushes a new entry onto the session history stack.
 *
 * @param {string} [path] A new URL or path to show in the address bar.
 * @param {any} [state] The state object associated with the new history entry.
 */
function navigate(path, state) {
  history.pushState(state, undefined, path);
}

/**
 * Wraps history.go, loading a specific page from the session history.
 * If no argument is provided, the current page is reloaded.
 *
 * @param {number} [delta=0] The relative position in the history stack (e.g. -1 for back, 1 for forward).
 * @see https://developer.mozilla.org/docs/Web/API/History/go
 */
function go(delta = 0) {
  history.go(delta);
}

/**
 * Wraps history.back, moving one entry back in the session history.
 * @see https://developer.mozilla.org/docs/Web/API/History/back
 */
function back() {
  history.back();
}

/**
 * Wraps history.forward, moving one entry forward in the session history.
 * @see https://developer.mozilla.org/docs/Web/API/History/forward
 */

function forward() {
  history.forward();
}

/**
 * Replaces the current session history entry.
 *
 * @param {string} [path] A new URL or path to show in the address bar.
 * @param {any} [state] The state object associated with the new history entry.
 */
function replace(path, state) {
  history.replaceState(state, undefined, path);
}

navigate.go = go;
navigate.back = back;
navigate.forward = forward;
navigate.replace = replace;

export default function useNavigate() {
  return navigate;
}
