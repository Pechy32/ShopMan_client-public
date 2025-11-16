import { Plus } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

function AddItemButton({onClick}){

    return(
        <>
            <div style={{display:"flex"}}>
                <Button variant="light" className="btn btn-outline-dark" onClick={onClick}><Plus />Add Item</Button>
            </div>
        </>
    )
}

export default AddItemButton;