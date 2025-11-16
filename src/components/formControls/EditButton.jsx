import { Pencil } from "react-bootstrap-icons";

function Edit({size, style, onClick}){

    return (
        <>
            <Pencil color="orange" onClick={onClick} size={size} style={style}/>
        </>
    )
}

export default Edit;