import { RouterContext } from './context';

export default function StaticRouter(props) {
  const location = {
    pathname: props.path,
  };

  return (
    <RouterContext.Provider value={{ location }}>
      {props.children}
    </RouterContext.Provider>
  );
}
