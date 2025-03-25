import history from './history.js';

function navigate(path, state) {
  history.pushState(state, undefined, path);
}

function replace(path, state) {
  history.replaceState(state, undefined, path);
}

navigate.replace = replace;

export default function useNavigate() {
  return navigate;
}
