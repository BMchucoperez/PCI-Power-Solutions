import React from "react";
import { AllCommunityModules, GridApi } from "@ag-grid-community/all-modules";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Task #2
const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation", sortable: true, filter: "agTextColumnFilter" },
  { field: "discovery_date", headerName: "Discovery Date", sortable: true, filter: "agDateColumnFilter", valueFormatter: (params)=>{
    const date = new Date(params.value);
    return date.toLocaleDateString();
  } }, // Task #3
  { field: "h_mag", headerName: "H (mag)", sortable: true, filter: "agNumberColumnFilter" },
  { field: "moid_au", headerName: "MOID (au)", sortable: true, filter: "agNumberColumnFilter" },
  { field: "q_au_1", headerName: "q (au)", sortable: true, filter: "agNumberColumnFilter" },
  { field: "q_au_2", headerName: "Q (au)", sortable: true, filter: "agNumberColumnFilter" },
  { field: "period_yr", headerName: "Period (yr)", sortable: true, filter: "agNumberColumnFilter"},
  { field: "i_deg", headerName: "Inclination (deg)", sortable: true, filter: "agNumberColumnFilter" },
  { field: "pha", headerName: "Potentially Hazardous", sortable: true, filter: "agTextColumnFilter", valueFormatter: (params) => {
    const value = params.value;
    if(value === "Y"){
      return "Yes";
    } else if(value === "N"){
      return "No";
    } else if(value === "n/a"){
      return "";
    }
    return value;
  } }, // Task #4
  { field: "orbit_class", headerName: "Orbit Class", sortable: true, filter: "agTextColumnFilter", enableRowGroup: true },
];

const NeoGrid = (): JSX.Element => {
  const gridRef = React.useRef<AgGridReact | null>(null);
  const clearFiltersAndSort = () => {
    if (gridRef.current) {
      const gridInstance = gridRef.current;
      gridInstance.api.setFilterModel({});
      gridInstance.api.setSortModel([]);
      gridInstance.api.refreshServerSideStore({ purge: true }); 
    }
  };

  return (
    <div>
      <h1 style={{ display: "inline-block", marginRight: "15px" }}>Near-Earth Object Overview</h1> {/*Task #1*/}
      <button onClick={clearFiltersAndSort}>Clear Filters and Sorters</button>
      <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
        <AgGridReact
          ref={gridRef}
          rowData={data}
          columnDefs={columnDefs}
          enableRangeSelection={true}
          modules={AllCommunityModules}
          rowGroupPanelShow={'always'}
        />
      </div>
    </div>
  );
};

export default NeoGrid;
