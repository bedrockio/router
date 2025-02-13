import { useRouter } from './context';

export function useLocation() {
  // @ts-ignore
  return useRouter().location;
}
