import { useRouter } from './context.js';

export default function useQuery() {
  // @ts-ignore
  return useRouter().query;
}
