import { ClipboardCheck } from "react-bootstrap-icons";

function Archive({size, style, onClick}){

    return (
        <>
            <ClipboardCheck onClick={onClick} color="green" size={size} style={style}/>
        </>
    )
}

export default Archive;