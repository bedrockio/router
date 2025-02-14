import { useRouter } from './context.js';

export function useParams() {
  // @ts-ignore
  return useRouter().params;
}
