import { createContext, useContext } from 'react';

export const RouterContext = createContext({});

export function useRouter() {
  return useContext(RouterContext);
}
