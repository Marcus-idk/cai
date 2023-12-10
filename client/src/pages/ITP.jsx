import React, { useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import ViewIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import JobIcon from "@mui/icons-material/WorkOutlineOutlined";
import TeacherIcon from "@mui/icons-material/SupervisorAccountOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import styles from "../styles/Cards1.module.css";
import Card1 from "../components/Teacher/Card1";
import EditDrawer from "../components/EditDrawer";
import DeletePopup from "../components/UI/DeletePopup";
import ToolBar from "../components/Teacher/Toolbar";

const Itp = () => {
  // const actionColumns = [
  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     width: 300,
  //     renderCell: (params) => [
  //       <GridActionsCellItem
  //         className="DatagridIcons DatagridIcon_View"
  //         icon={<ViewIcon />}
  //         label="View"
  //       ></GridActionsCellItem>,
  //       <GridActionsCellItem
  //         className="DatagridIcons DatagridIcon_Edit"
  //         icon={<EditIcon />}
  //         label="Edit"
  //       ></GridActionsCellItem>,
  //       <GridActionsCellItem
  //         className="DatagridIcons DatagridIcon_Delete"
  //         icon={<DeleteIcon />}
  //         label="Delete"
  //       ></GridActionsCellItem>,
  //     ],
  //   },
  // ];

  // const columns = [
  //   { field: "jobID", headerName: "JobID", width: 100 },
  //   { field: "name", headerName: "Name", width: 100 },
  //   { field: "description", headerName: "Description", width: 300 },
  //   { field: "teacher", headerName: "Teacher", width: 100 },
  // ];

  // //static data
  // //Convert into dynamic by getting from backend through fetch
  // const rows = [
  //   {
  //     id: 1,
  //     jobID: 1,
  //     name: "Sembcorp",
  //     description: "Full-Stack-Developer",
  //     teacher: "Flex Tio",
  //   },
  //   {
  //     id: 2,
  //     jobID: 2,
  //     name: "Sembcorp",
  //     description: "Full-Stack-Developer",
  //     teacher: "Flex Tio",
  //   },
  // ];

  const DATA = [
    {
      jobID: 1,
      company: "Fakesoft",
      role: "Developer",
      teacher: "ANON",
      description: "Coding in Java",
    },
    {
      jobID: 2,
      company: "YouI",
      role: "Web Designer",
      teacher: "BRULE",
      description: "Design web pages",
    },
    {
      jobID: 4,
      company: "initTech",
      role: "Tester",
      teacher: "JCKBLK",
      description: "Test applications",
    },
  ];

  const [editData, setEditData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  // const [editFormToggle, setEditFormToggle]= useState(false);
  const handleClick = () => {
    // console.log("clicked");
  };

  const displayEditForm = (data) => {
    setEditData(data);
    // setEditFormToggle(!editFormToggle)
  };

  const displayDeletePopup = (data) => {
    setDeleteData(data);
  };
  return (
    <div className="itp">
      <ToolBar />
      {/* <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Internship Job Listings (3)
          </Typography>
          <TextField
            label="Search field"
            type="search"
            variant="outlined"
            size="small"
            sx={{ marginRight: 2 }}
          />
          <Button color="inherit" startIcon={<FilterIcon />}>
            Filter
          </Button>
          <IconButton color="inherit">
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar> */}
      <div className={styles.cards}>
        {DATA.map((item) => (
          <Card1
            onView={handleClick}
            onEdit={displayEditForm}
            onDelete={displayDeletePopup}
            id={item.jobID}
            company={item.company}
            teacher={item.teacher}
            role={item.role}
            description={item.description}
          />
        ))}
        {/* <Card1
          onView={handleClick}
          onEdit={showForm}
          company="Sembcorp"
          teacher="Flex Tio"
          role="Full-Stack-Developer"
        />
        <Card1
          onView={handleClick}
          company="MAS"
          teacher="Wong Shaw"
          role="Project Manager"
        />
        <Card1
          onView={handleClick}
          company="Sembcorp"
          teacher="Flex Tio"
          role="Full-Stack-Developer"
        />
        <Card1
          onView={handleClick}
          company="Sembcorp"
          teacher="Flex Tio"
          role="Full-Stack-Developer"
        />
        <Card1
          onView={handleClick}
          company="Sembcorp"
          teacher="Flex Tio"
          role="Full-Stack-Developer"
        /> */}
      </div>
      <EditDrawer data={editData} />
      <DeletePopup data={deleteData} />
    </div>
  );
};

export default Itp;

// const Itp = () => {

//     const columns = [
//       { field: "jobID", headerName: "JobID", width: 100 },
//       { field: "name", headerName: "Name", width: 100 },
//       { field: "description", headerName: "Description", width: 300 },
//       { field: "teacher", headerName: "Teacher", width: 100 },
//     ];

//     //static data
//     //Convert into dynamic by getting from backend through fetch
//     const rows = [
//       {
//         id: 1,
//         jobID: 1,
//         name: "Sembcorp",
//         description: "Full-Stack-Developer",
//         teacher: "Flex Tio",
//       },
//       {
//         id: 2,
//         jobID: 2,
//         name: "Sembcorp",
//         description: "Full-Stack-Developer",
//         teacher: "Flex Tio",
//       },
//     ];
//     return (
//       <div className="itp">
//         <h2>ITPqwe</h2>
//         <div style={{ height: 400, width: "100%" }}>
//           <DataGrid
//             rows={rows}
//             columns={actionColumns.concat(columns)}
//             pageSize={5}
//           />
//         </div>
//       </div>
//     );
//   };
