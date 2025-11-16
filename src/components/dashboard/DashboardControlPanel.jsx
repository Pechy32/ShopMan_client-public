import AddListButton from "../formControls/AddListButton";
import Checkbox from "../formControls/Checkbox";
import SelectInput from "../formControls/SelectInput";
import { Filter, SortDownAlt } from "react-bootstrap-icons";

function DashboardControlPanel({
    filterOptions,
    sortOptions,
    currentFilter,
    currentSort,
    showArchived,
    onFilterChange,
    onSortChange,
    onShowArchivedChange,
    onAddListClick
}) {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                    padding: "6px 0",
                }}
            >

                {/* FILTER */}
                <div>
                    <div style={{ display: "flex" }}>
                        <Filter size={"25px"} />
                        <SelectInput
                            value={currentFilter}
                            options={filterOptions}
                            onChange={opt => onFilterChange(opt.value)}
                            getOptionLabel={o => o.label}
                            getOptionValue={o => o.value}
                        />
                    </div>

                    {/* SORT */}
                    <div style={{ display: "flex" }}>
                        <SortDownAlt size={"25px"} />
                        <SelectInput
                            value={currentSort}
                            options={sortOptions}
                            onChange={opt => onSortChange(opt.value)}
                            getOptionLabel={o => o.label}
                            getOptionValue={o => o.value}
                        />
                    </div>
                </div>


                <div>
                    {/* CREATE NEW LIST */}
                    <AddListButton onClick={onAddListClick}/>

                    {/* ARCHIVED */}
                    <div className="d-flex align-items-center" style={{marginTop:"20px"}}>
                        <Checkbox
                            label="Show archived"
                            initialCheck={showArchived}
                            onChange={onShowArchivedChange}
                        />
                    </div>


                </div>

            </div>
            <hr></hr>
        </>
    );
}

export default DashboardControlPanel;
