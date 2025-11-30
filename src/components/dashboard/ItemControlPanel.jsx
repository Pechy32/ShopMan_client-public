import AddItemButton from "../formControls/AddItemButton";
import Checkbox from "../formControls/Checkbox";
import ShowSolvedItemNum from "../formControls/ShowSolvedItemNum";

function ItemControlPanel({ showSolved, onToggleShowSolved, solvedCount, totalCount, onAddItemClick }) {

    return (
        <div className="d-flex align-items-center justify-content-between p-3 bg-light">
            
           
                <Checkbox
                    label="Show solved"
                    initialCheck={showSolved}
                    onChange={onToggleShowSolved}
                />

                <ShowSolvedItemNum 
                    solvedCount={solvedCount}
                    totalCount={totalCount}
                />
            

            <AddItemButton onClick={onAddItemClick}/>
        </div>
    );
}

export default ItemControlPanel;
