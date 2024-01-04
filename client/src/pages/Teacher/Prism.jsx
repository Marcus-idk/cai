import React, { useState } from "react";
import styles from "../../styles/Teacher/Cards1.module.css";
import ToolBar from "../../components/Teacher/Toolbar";
import Card1 from "../../components/Teacher/Card1";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

//Icon
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

//Modals
import ModifyDrawer from "../../components/Teacher/ModifyDrawer";
import DeletePopup from "../../components/UI/DeletePopup";

const Prism = () => {
  //HOOKS
  const [isCardView, setIsCardView] = useState(true);
  const [editData, setEditData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  const [searchJob, setSearchJob] = useState("");
  const [displayAddJob, setDisplayAddJob] = useState(false);

  const [dataGridHeight, setDataGridHeight] = useState(
    window.innerHeight - 400
  );

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

  const handleAddJob = () => {
    setDisplayAddJob(!displayAddJob);
  };

  const displayEditForm = (data) => {
    setEditData(data);
    // setEditFormToggle(!editFormToggle)
  };

  const displayDeletePopup = (data) => {
    setDeleteData(data);
  };

  return (
    <div class="container">
    <div className={styles.Prism}>
      <ToolBar
        count={filteredData.length}
        title="PRISM Project Listings"
        placeholder="Search by ID, Company, Title, or Type"
        isCardView={isCardView}
        onDisplayType={handleDisplayToggle}
        onSearch={handleSearch}
        onAdd={handleAddJob}
        // onFilter={handleFilter}
      />
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
    </div>
  );
};

export default Prism;
