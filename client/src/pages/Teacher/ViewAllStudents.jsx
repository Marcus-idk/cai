import React, { useState, useEffect } from "react";
import { DataGrid, gridClasses, GridActionsCellItem } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import styles from "../../styles/Teacher/ITP-Prism.module.css";

const ViewAllStudents = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    // fetch('http://localhost:5000/api/teacher/getAllStudents')
    //   .then((response) => console.log(response.json))
    //   .then((data) => setData(data))
    //   .catch((error) => console.error('Error fetching data:', error));

    // console.log(data);
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/api/teacher/getAllStudents");
        const resData = await response.json();

        //prevent app crash if error is thrown
        if (!response.ok) {
          const error = new Error("Failed to fetch ITP Listing");
          throw error;
        }

        console.log(resData.recordset);
      } catch (error) {
      
      }
    }
    fetchData();
  }, []);

  localStorage.setItem('userRole', 'admin');
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
    { field: "id", headerName: "Student ID" },
    { field: "StudName", headerName: "Student Name" },
    { field: "Res", headerName: "Resume Uploaded" },
    { field: "interest", headerName: "Interested Coding Languages" },
    { field: "desc", headerName: "Decription" },
    { field: "framework", headerName: "Frameworks Experienced" },
    { field: "ProjRank", headerName: "Project Rank" },
    { field: "spec", headerName: "Specialisation" },
    { field: "GPA", headerName: "GPA" },
  ];

  // const rows = data.map((row) => ({
  //   id: row.column1,
  //   StudName: row.column2,
  //   Res: row.column3,  
  //   interest: row.column4,
  //   desc: row.column5,
  //   framework: row.column6,
  //   ProjRank: row.cloumn7,
  //   spec: row.column8,
  //   GPA: row.cloumn9,
  // }));

  const rows =  [
      {id: '11111A',
      StudName: 'Saim Shady',
      Res: 'Yes',  
      interest: 'Machine Learning',
      desc: 'Interest in AI',
      framework: 'Node JS',
      ProjRank: 'RPA,WebDev,SQL',
      spec: 'SWA',
      GPA: '3.0',
  }
    ];

  const ODD_OPACITY = 0.2;
  const [searchText, setSearchText] = useState("");

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
          label="Edit"
        ></GridActionsCellItem>,
        <GridActionsCellItem
          className="DatagridIcons DatagridIcon_Delete"
          icon={<DeleteIcon />}
          label="Delete"
        ></GridActionsCellItem>,
      ],
    },
  ];

  return (
    <div class="container">
      <div className={styles["maindiv"]}>
        <div className={styles["searchAdd"]}>
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
          <div>
            <Button variant="outlined" startIcon={<AddIcon />}>
              Add
            </Button>
          </div>
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
      </div>
    </div>
  );
};
export default ViewAllStudents;
