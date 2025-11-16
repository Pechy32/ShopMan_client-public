import { ListTask } from "react-bootstrap-icons";

function ItemSwitch({ size, style, onClick }) {
  return (
    <ListTask size={size} style={style} onClick={onClick} />
  );
}

export default ItemSwitch;
