import React, { useState, useEffect } from "react";
import { DataGrid, gridClasses, GridActionsCellItem } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import styles from "../../styles/Teacher/ITP-Prism.module.css";
import EditDrawer from "../../components/Teacher/PRISMSumEditDrawer";
import axios from "axios";

const PrismSummary = (props) => {
  const ODD_OPACITY = 0.2;
  const [searchText, setSearchText] = useState("");
  const [editData, setEditData] = useState({});
  const [isEditDrawerOpen, setEditDrawerOpen] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetch("http://localhost:5000/api/teacher/getAllPRISM")
      .then((response) => response.json())
      .then(console.log(data), (data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[300],
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
      "&.Mui-selected": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity
        ),

        "&:hover, &.Mui-hovered": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity
          ),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity
            ),
          },
        },
      },
    },
  }));
  const columns = [
    { field: "id", headerName: "Project ID", width: 150 },
    { field: "projectName", headerName: "Project Name", width: 400 },
    { field: "tic", headerName: "Teacher-In-Charge", width: 350 },
    { field: "student", headerName: "Student Name", width: 200 },
  ];

  /*    const rows = data.map((row) => ({
    id: row.column1,
    projectName: row.column2,
    tic: row.column3,
    student: row.column5,
    
  })); */

  const rows = {};

  const displayEditForm = (data) => {
    setEditData(data);
    setEditDrawerOpen(true);
  };

  const closeEditDrawer = () => {
    setEditDrawerOpen(false);
  };
  const handleEdit = () => {
    props.onEdit({
      id: props.id,
      projectName: props.projectName,
      tic: props.tic,
      student: props.student,
    });
  };
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" && // Check if the value is a string
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const actionColumns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => [
        <GridActionsCellItem
          className="DatagridIcons DatagridIcon_Edit"
          icon={<EditIcon />}
          onClick={() => displayEditForm(params.row)}
          label="Edit"
        ></GridActionsCellItem>,
      ],
    },
  ];

  return (
    <div>
      <div className={styles["maindiv"]}>
        <div className={styles["search-div"]}>
          <TextField
            className={styles["search"]}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
            value={searchText}
            onChange={handleSearch}
          />
        </div>
        <StripedDataGrid
          className={styles["table"]}
          disableRowSelectionOnClick
          rows={filteredRows}
          columns={columns.concat(actionColumns)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15]}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
        />
        {isEditDrawerOpen && (
          <EditDrawer data={editData} onClose={closeEditDrawer} />
        )}
      </div>
    </div>
  );
};
export default PrismSummary;
