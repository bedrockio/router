import { useRouter } from './context';

export function useSearch() {
  // @ts-ignore
  return useRouter().search;
}
