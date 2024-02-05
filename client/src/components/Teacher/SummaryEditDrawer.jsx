import React, { useEffect, useState } from "react";
import styles from "../../styles/Teacher/EditDrawer.module.css";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

function EditDrawer({ title, type, data, isOpen, onClose, onSubmit }) {
  const [isDisabled, setDisabled] = useState(false);

  const [userInput, setUserInput] = useState({
    id: "",
    StudentID: "",
    Company: "",
    JobRole: "",
    FullName: "",
    StudName: "",
    Title: "",
  });
  const [companyNames, setCompanyNames] = useState([]);
  useEffect(() => {
    setUserInput({
      id: data.id || "",
      StudentID: data.StudentID || "",
      Company: data.Company || "",
      JobRole: data.JobRole || "",
      FullName: data.FullName || "",
      StudName: data.StudName || "",
      Title: data.Title || "",
    });

    const fetchCompanyNames = async () => {
      try {
        const response = await fetch('/getAllITP');
        // get only names and filter based on slots
        const names = await response.json();
        setCompanyNames(names);
      } catch (error) {
        console.error('Failed to fetch company names:', error);
      }
    };
  
    fetchCompanyNames();
  }, [data]);

  const handleInputChange = (field, value) => {
    setUserInput((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const handleSubmit = async () => {
    setDisabled(true);
    await onSubmit(userInput);
    onClose();
    setDisabled(false);
  };
  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {userInput.id ? (
                <>Edit Job Listing - {userInput.id}</>
              ) : (
                <>Add Job Listing</>
              )}
            </Grid>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            {type === "ITP" && (
              <>
                {/* <Grid item xs={6}>
                  <label>
                    Company: <strong>{userInput.Company}</strong>
                  </label>
                </Grid> */}
                <Grid item xs={6}>
                  <label>
                    Job Name: <strong>{userInput.StudName}</strong>
                  </label>
                </Grid>
                <Grid item xs={6}>
                  <label>
                    Job Name: <strong>{userInput.JobRole}</strong>
                  </label>
                </Grid>
                <Grid item xs={6}>
                  <label>
                    Teacher In Charge: <strong>{userInput.FullName}</strong>{" "}
                  </label>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="company-select-label">Company</InputLabel>
                    <Select
                      labelId="company-select-label"
                      id="company-select"
                      value={userInput.Company}
                      label="Company"
                      onChange={(e) => handleInputChange("Company", e.target.value)}
                    >
                      <MenuItem value="">Select/Change Assignment</MenuItem>
                      {companyNames.map((name, index) => (
                        <MenuItem key={index} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Admin Number"
                    name="Admin Number"
                    size="small"
                    value={userInput.StudentID}
                    onChange={(e) =>
                      handleInputChange("StudentID", e.target.value)
                    }
                  />
                </Grid> */}
              </>
            )}
            {type === "PRISM" && (
              <>
                <Grid item xs={4}>
                  <label>
                    Project Name: <strong>{userInput.Title}</strong>
                  </label>
                </Grid>
                <Grid item xs={4}>
                  <label>
                    Teacher In Charge: <strong>{userInput.FullName}</strong>{" "}
                  </label>
                </Grid>
                <Grid item xs={4}>
                  <label>
                    Student Name: <strong>{userInput.StudName}</strong>{" "}
                  </label>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Admin Number"
                    name="StudentID"
                    size="small"
                    value={userInput.StudentID}
                    onChange={handleInputChange}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={6}></Grid>
            <Grid item xs={3} container justifyContent="flex-end">
              <Button fullWidth variant="outlined" onClick={onClose}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={3} container justifyContent="flex-end">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isDisabled}
              >
                {title}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default EditDrawer;
