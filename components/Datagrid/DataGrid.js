import DataGrid from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";

export default function Datagrid({ rows, columns }) {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      style={{
        height: "650px",
        fontSize: "16px",
        width: "1100px",
      }}
    />
  );
}
