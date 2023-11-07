import React, {useRef} from "react";
import { AllCommunityModules } from "@ag-grid-community/all-modules";
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
    } 
  }, // Task #3
  { field: "h_mag", headerName: "H (mag)", sortable: true, filter: "agTextColumnFilter" },
  { field: "moid_au", headerName: "MOID (au)", sortable: true, filter: "agTextColumnFilter" },
  { field: "q_au_1", headerName: "q (au)", sortable: true, filter: "agTextColumnFilter" },
  { field: "q_au_2", headerName: "Q (au)", sortable: true, filter: "agTextColumnFilter" },
  { field: "period_yr", headerName: "Period (yr)", sortable: true, filter: "agTextColumnFilter"},
  { field: "i_deg", headerName: "Inclination (deg)", sortable: true, filter: "agTextColumnFilter" },
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
    } 
  }, // Task #4
  { field: "orbit_class", headerName: "Orbit Class", sortable: true, filter: "agTextColumnFilter", enableRowGroup: true },
];

const NeoGrid = (): JSX.Element => {
  const gridRef = useRef<AgGridReact | null>(null);
  
  // Task #6
  const clearFiltersAndSort = () => {
    if (gridRef.current) {
      const gridApi = gridRef.current.api;
      const columnApi = gridRef.current.columnApi;
      gridApi.setFilterModel(null);
      
      const allColumns = columnApi.getAllColumns();
      const columnState = allColumns.map((column) => ({
        colId: column.getColId(),
        sort: null, 
      }));
      columnApi.applyColumnState({ state: columnState });
      gridApi.refreshClientSideRowModel(undefined);
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
          rowSelection="multiple"
          suppressRowClickSelection={true}
          enableSorting={true}
          rowGroupPanelShow={'always'}
        />
      </div>
    </div>
  );
};

export default NeoGrid;
