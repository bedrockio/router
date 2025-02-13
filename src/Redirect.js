import { useEffect } from 'react';

import { useNavigate } from './navigate';

export default function Redirect(props) {
  const { to } = props;
  const { replace } = useNavigate();

  useEffect(() => {
    replace(to);
  }, []);

  return null;
}
