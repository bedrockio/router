import { useRouter } from './context.js';

export default function useParams() {
  // @ts-ignore
  return useRouter().current?.params;
}
