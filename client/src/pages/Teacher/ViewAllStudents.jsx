import React, { useState, useEffect } from "react";
import { DataGrid, gridClasses, GridActionsCellItem } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GetAppIcon from "@mui/icons-material/GetApp";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "../../styles/Teacher/ITP-Prism.module.css";
import EditDrawer from "../../components/Teacher/StudentForm";
import { fetchStudent, updateStudent, addStudent } from "../../api/Student";
import useAdminAuthCheck from "../../utils/useAdminAuthCheck";
import UploadStudentBulkPopUp from "../../components/Teacher/UploadStudentBulkPopUp";
import CustomNoRowsOverlay from "../../components/UI/CustomNoRowsOverlay";
import { fetchAPI, getResumeLink } from "../../utils/fetchAPI";
import "animate.css";
const ViewAllStudents = () => {
  useAdminAuthCheck(true);
  const ODD_OPACITY = 0.2;
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [editData, setEditData] = useState({});
  const [error, setError] = useState();
  const [searchText, setSearchText] = useState("");
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [isEditDrawerOpen, setEditDrawerOpen] = useState(false);
  const [isUploadExcelOpen, setIsUploadExcelOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  async function fetchData() {
    setIsFetching(true);
    setError();
    try {
      const response = await fetchAPI("/api/teacher/getAllStudents");
      const resData = await response.json();
      console.log(resData);
      setStudents(resData.recordset);

      //prevent app crash if error is thrown
      if (!response.ok) {
        const error = new Error("Failed to fetch Students");
        throw error;
      }
      console.log(resData.recordset);
    } catch (error) {
      setError({ message: error.message || "Failed to fetch Students" });
    } finally {
      setIsFetching(false);
    }
  }
  const handleOpenPopup = () => {
    setIsUploadExcelOpen(true);
  };

  const handleClosePopup = () => {
    setIsUploadExcelOpen(false);
  };

  const handleSubmitStudents = async (file) => {
    setIsAdding(true);
    setSuccessMsg("");
    setErrMsg("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetchAPI("/api/teacher/bulkAddStudent", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        setSuccessMsg("Students added!");
        fetchData();
      } else {
        console.error("Server responded with: ", response.status);
        setErrMsg("HTTP Error: " + response.status);
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      setErrMsg(error.toString());
    } finally {
      setIsAdding(false);
    }
  };

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
          ODD_OPACITY + theme.palette.action.selectedOpacity,
        ),
        "&:hover, &.Mui-hovered": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity,
          ),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
          },
        },
      },
    },
  }));

  useEffect(() => {
    fetchData();
  }, []);

  // const handleFetchJobs = async () => {
  //   console.log("handleFetchJobs");
  //   setIsFetching(true);
  //   try {
  //     const fetchedData = await fetchStudent();
  //     let { recordset } = fetchedData;
  //     setJobs(recordset);
  //   } catch (error) {
  //     setError({ message: error.message || "Failed to fetch job listings" });
  //   } finally {
  //     setIsFetching(false);
  //   }
  // };

  const urlExists = async (url) => {
    const res = await fetch(url);
    return res.ok;
  };

  const f = async (id) => {
    const pdf = getResumeLink(id) + ".pdf",
      docx = getResumeLink(id) + ".docx";
    if (await urlExists(pdf)) return pdf;
    else if (await urlExists(docx)) return docx;
    else return "";
  };

  const mappedData = students.map((item) => ({
    ...item,
    id: item.StudentID, //Required by datagrid
    resumeLink: f(item.StudentID),
  }));

  const columns = [
    { field: "id", headerName: "Student ID", flex: 1 },
    { field: "FullName", headerName: "Student Name", flex: 1 },
    { field: "Specialisation", headerName: "Specialisation", flex: 1 },
    {
      field: "GPA",
      headerName: "GPA",
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == null) return "";
        return (Math.round(params.value * 100) / 100).toFixed(2);
      },
    },
  ];

  const rows = mappedData.filter(
    (item) =>
      search === "" ||
      item.StudentID.toLowerCase().includes(search) ||
      item.FullName.toLowerCase().includes(search) ||
      item.ResumeLink.toLowerCase().includes(search) ||
      item.Specialisation.toLowerCase().includes(search) ||
      item.GPA.toLowerCase().includes(search),
  );
  const actionColumns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => [
        <GridActionsCellItem
          className="DatagridIcons DatagridIcon_Edit"
          icon={<EditIcon />}
          onClick={() => displayEditForm(params.row)}
          label="Edit"
        ></GridActionsCellItem>,
      ],
    },
    {
      field: "resume",
      headerName: "Resume",
      width: 100,
      renderCell: (data) => [
        <GridActionsCellItem
          className="DatagridIcons DatagridIcon_Edit"
          icon={<GetAppIcon />}
          onClick={async () => {
            const l = await data.row.resumeLink;
            if (l === "") alert("No resume found");
            else window.open(l, "_blank");
          }}
          label="Download"
        ></GridActionsCellItem>,
      ],
    },
  ];

  const displayEditForm = (data) => {
    setEditData(data);
    setEditDrawerOpen(true);
  };

  const closeEditDrawer = () => {
    setEditDrawerOpen(false);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  const updateStudentData = async (data) => {
    setSuccessMsg("");
    setErrMsg("");
    closeEditDrawer();
    setIsFetching(true);
    console.log("=============");
    console.log(data);
    try {
      await updateStudent({
        StudentID: data.StudentId,
        FullName: data.FullName,
        spec: data.specialisation,
        gpa: data.gpa,
      });
      setSuccessMsg("Student updated!");
    } catch (error) {
      console.error("Failed to update student data", error);
      setErrMsg(error.toString());
    } finally {
      fetchData();
    }
  };

  return (
    <div className="container animate__animated animate__fadeIn">
      {successMsg !== "" && (
        <div
          class="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Success!</strong> {successMsg}
          <button
            type="button"
            class="btn-close"
            onClick={() => setSuccessMsg("")}
            aria-label="Close"
          ></button>
        </div>
      )}
      {errMsg !== "" && (
        <div
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>Error!</strong> {errMsg}
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            onClick={() => setErrMsg("")}
          ></button>
        </div>
      )}
      <div className={styles["maindiv"]}>
        <div className={styles["searchAdd"]}>
          <div
            className={styles["search-div"]}
            class="d-flex justify-content-between my-3"
          >
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
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleOpenPopup}
              disabled={isAdding}
            >
              {isAdding ? (
                <>
                  <span
                    class="spinner-border spinner-border-sm mx-1"
                    aria-hidden="true"
                  ></span>
                  <span role="status">Loading...</span>
                </>
              ) : (
                "Bulk Add"
              )}
            </Button>
            <UploadStudentBulkPopUp
              open={isUploadExcelOpen}
              onClose={handleClosePopup}
              onSubmit={handleSubmitStudents}
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
            loading={isFetching}
            autoHeight
            slots={{ noRowsOverlay: CustomNoRowsOverlay }}
            sx={{ "--DataGrid-overlayHeight": "300px" }}
          />

          {isEditDrawerOpen && (
            <EditDrawer
              data={editData}
              onClose={closeEditDrawer}
              onSubmit={updateStudentData}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ViewAllStudents;
