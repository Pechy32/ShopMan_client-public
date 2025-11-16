import { Trash } from "react-bootstrap-icons";

function Delete({size, style, onClick}){

    return (
        <>
            <Trash color="red" onClick={onClick} size={size} style={style}/>
        </>
    )
}

export default Delete;