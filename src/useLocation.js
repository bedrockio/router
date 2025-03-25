import { useRouter } from './context.js';

export default function useLocation() {
  // @ts-ignore
  return useRouter().location;
}
