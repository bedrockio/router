import { useRouter } from './context';

export function useParams() {
  // @ts-ignore
  return useRouter().params;
}
