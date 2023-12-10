import React, { useState, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import ViewIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../../styles/Teacher/Cards1.module.css";
import Card1 from "../../components/Teacher/Card1";
import DeletePopup from "../../components/UI/DeletePopup";
import ToolBar from "../../components/Teacher/Toolbar";
import ModifyDrawer from "../../components/Teacher/ModifyDrawer";

const Itp = () => {
  localStorage.setItem("userRole", "admin");
  //HOOKS
  const [isCardView, setIsCardView] = useState(true);
  const [editData, setEditData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  const [searchJob, setSearchJob] = useState("");
  // const [showFilter, setShowFilter] = useState(false);
  // const [filterCriteria, setFilterCriteria] = useState({
  //   field: "",
  //   query: "",
  // });
  const [displayAddJob, setDisplayAddJob] = useState(false);
  // const [editFormToggle, setEditFormToggle]= useState(false);

  const [dataGridHeight, setDataGridHeight] = useState(
    window.innerHeight - 400
  );

  const [isFetching, setIsFetching] = useState(false);
  const [jobListings, setJobListings] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    setIsFetching(true);

    async function fetchITP() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/teacher/getITPTable"
        );
        const resData = await response.json();

        //prevent app crash if error is thrown
        if (!response.ok) {
          const error = new Error("Failed to fetch ITP Listing");
          throw error;
        }
        setJobListings(resData.recordset);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later.",
        });
        setIsFetching(false);
      }
    }
    fetchITP();
  }, []);
  console.log(jobListings);

  useEffect(() => {
    const handleResize = () => {
      setDataGridHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const actionColumns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => [
        <GridActionsCellItem
          key="edit"
          className="DatagridIcons DatagridIcon_Edit"
          icon={<EditIcon />}
          label="Edit"
        ></GridActionsCellItem>,
        <GridActionsCellItem
          key="delete"
          className="DatagridIcons DatagridIcon_Delete"
          icon={<DeleteIcon />}
          label="Delete"
        ></GridActionsCellItem>,
      ],
    },
  ];

  const columns = [
    {
      field: "jobID",
      headerName: "JobID",
      width: 100,
      disableColumnFilter: true,
      disableColumnMenu: true,
    },
    {
      field: "company",
      headerName: "Company",
      width: 200,
      disableColumnFilter: true,
      disableColumnMenu: true,
    },
    {
      field: "teacher",
      headerName: "Teacher",
      width: 200,
      disableColumnFilter: true,
      disableColumnMenu: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 500,
      disableColumnFilter: true,
      disableColumnMenu: true,
    },
  ];

  //static data
  //Convert into dynamic by getting from backend through fetch
  const rows = [
    {
      id: 1,
      jobID: 1,
      name: "Sembcorp",
      description: "Full-Stack-Developer",
      teacher: "Flex Tio",
    },
    {
      id: 2,
      jobID: 2,
      name: "Sembcorp",
      description: "Full-Stack-Developer",
      teacher: "Flex Tio",
    },
  ];

  const DATA = [
    {
      id: 1,
      jobID: 1,
      company: "Fakesoft",
      role: "Developer",
      teacher: "ANON",
      description: "Coding in Java",
    },
    {
      id: 2,
      jobID: 2,
      company: "YouI",
      role: "Web Designer",
      teacher: "BRULE",
      description: "Design web pages",
    },
    {
      id: 3,
      jobID: 4,
      company: "initTech",
      role: "Tester",
      teacher: "JCKBLK",
      description: "Test applications",
    },
    {
      id: 4,
      jobID: 5,
      company: "Fakesoft",
      role: "Developer",
      teacher: "ANON",
      description: "Coding in Java",
    },
    {
      id: 5,
      jobID: 6,
      company: "YouI",
      role: "Web Designer",
      teacher: "BRULE",
      description: "Design web pages",
    },
    {
      id: 6,
      jobID: 7,
      company: "initTech",
      role: "Tester",
      teacher: "JCKBLK",
      description: "Test applications",
    },
    {
      id: 7,
      jobID: 8,
      company: "Fakesoft",
      role: "Developer",
      teacher: "ANON",
      description: "Coding in Java",
    },
    {
      id: 8,
      jobID: 9,
      company: "YouI",
      role: "Web Designer",
      teacher: "BRULE",
      description: "Design web pages",
    },
    {
      id: 9,
      jobID: 10,
      company: "initTech",
      role: "Tester",
      teacher: "JCKBLK",
      description: "Test applications",
    },
  ];

  //FUNCTIONS

  const handleDisplayToggle = (display) => {
    if (display === "card") setIsCardView(true);
    if (display === "datagrid") setIsCardView(false);
    // setIsCardView((curView) => !curView); //best practice! Ensure immutability of data. Recommended by React Team
  };

  const handleSearch = (e) => {
    setSearchJob(e.target.value.toLowerCase());
  };

  const filteredData = DATA.filter(
    (item) =>
      searchJob === "" ||
      item.description.toLowerCase().includes(searchJob) ||
      item.role.toLowerCase().includes(searchJob) ||
      item.teacher.toLowerCase().includes(searchJob) ||
      item.company.toLowerCase().includes(searchJob) ||
      item.jobID.toString().includes(searchJob)
  );

  // const filteredData = DATA.filter((item) => {
  //   if (filterCriteria.field && filterCriteria.query) {
  //     return item[filterCriteria.field]
  //       .toLowerCase()
  //       .includes(filterCriteria.query.toLowerCase());
  //   }
  //   return (
  //     searchJob === "" ||
  //     item.description.toLowerCase().includes(searchJob) ||
  //     item.role.toLowerCase().includes(searchJob) ||
  //     item.teacher.toLowerCase().includes(searchJob) ||
  //     item.company.toLowerCase().includes(searchJob) ||
  //     item.jobID.toString().includes(searchJob)
  //   );
  // });

  const handleAddJob = () => {
    setDisplayAddJob(!displayAddJob);
  };

  // const handleFilter = () => {
  //   setShowFilter(!showFilter);
  // };

  const displayEditForm = (data) => {
    setEditData(data);
    // setEditFormToggle(!editFormToggle)
  };

  const displayDeletePopup = (data) => {
    setDeleteData(data);
  };

  return (
    <div className="itp">
      <ToolBar
        count={filteredData.length}
        title="Internship Job Listings"
        placeholder="Search by Job ID, Company, Teacher, or Role..."
        isCardView={isCardView}
        onDisplayType={handleDisplayToggle}
        onSearch={handleSearch}
        onAdd={handleAddJob}
        // onFilter={handleFilter}
      />
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
      {isCardView ? (
        <div className={styles.cards}>
          {filteredData.map((item) => (
            <Card1
              key={item.jobID} //Prevent suboptimal code that causes all Card1 component to rerender caused by
              //missing unique identifier
              onEdit={displayEditForm}
              onDelete={displayDeletePopup}
              id={item.jobID}
              company={item.company}
              teacher={item.teacher}
              role={item.role}
              description={item.description}
            />
          ))}
        </div>
      ) : (
        <>
          <br />
          <div style={{ height: dataGridHeight, width: "100%" }}>
            <DataGrid
              rows={filteredData}
              columns={actionColumns.concat(columns)}
              pageSize={5}
              // pagination
              // disableColumnFilter
            />
          </div>
        </>
      )}
      <ModifyDrawer data={editData} title="Edit" />
      <ModifyDrawer data={displayAddJob} title="Add" />
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
// <div style={{ height: 400, width: "100%" }}>
//   <DataGrid
//     rows={rows}
//     columns={actionColumns.concat(columns)}
//     pageSize={5}
//   />
// </div>
//       </div>
//     );
//   };
