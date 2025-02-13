import history from './history';

function navigate(path, state) {
  history.pushState(state, undefined, path);
}

function replace(path, state) {
  history.replaceState(state, undefined, path);
}

navigate.replace = replace;

export function useNavigate() {
  return navigate;
}
