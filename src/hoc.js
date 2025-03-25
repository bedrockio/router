import history from './history.js';
import useLocation from './useLocation.js';

export function withRouter(Component) {
  function push(path, state) {
    history.pushState(state, null, path);
  }

  function replace(path, state) {
    history.replaceState(state, null, path);
  }

  return (props) => {
    const location = useLocation();

    return (
      <Component {...props} history={{ push, replace }} location={location} />
    );
  };
}
