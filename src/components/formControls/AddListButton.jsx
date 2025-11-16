import { Button } from "react-bootstrap";
import { ClipboardPlus } from "react-bootstrap-icons";

function AddListButton({onClick}) {

    return (
        <>
            <div style={{display:"flex"}}>
                <Button variant="light" className="btn btn-outline-dark" onClick={onClick} style={{marginTop:"-26px", paddingLeft:"28px", paddingRight:"28px"}}><ClipboardPlus style={{marginRight:"5px", marginBottom:"3px"}} />Add List</Button>
            </div>
        </>
    )
}

export default AddListButton;