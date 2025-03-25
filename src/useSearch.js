import { useRouter } from './context.js';

export default function useSearch() {
  // @ts-ignore
  return useRouter().search;
}
