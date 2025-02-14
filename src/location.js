import { useRouter } from './context.js';

export function useLocation() {
  // @ts-ignore
  return useRouter().location;
}
