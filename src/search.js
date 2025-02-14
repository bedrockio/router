import { useRouter } from './context.js';

export function useSearch() {
  // @ts-ignore
  return useRouter().search;
}
