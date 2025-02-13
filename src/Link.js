import { useNavigate } from './navigate';

export default function Link(props) {
  const { to, ...rest } = props;

  const navigate = useNavigate();

  function onClick(evt) {
    evt.preventDefault();
    navigate(to);
  }

  return <a {...rest} href={to} onClick={onClick} />;
}
