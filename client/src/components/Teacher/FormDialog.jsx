import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

// Internship period is an enum corresponding to the 2 possible start/end dates:
// '1': 6 Mar to 19 Aug
// '2': 4 Sep to 17 Feb

function FormDialog({ title, type, data, isOpen, onClose, onSubmit }) {
  const [input, setInput] = useState({
    id: "",
    company: "",
    role: "",
    title: "",
    teacher: "",
    specialisation: "",
    startDate: "",
    endDate: "",
    slots: 0,
    type: "",
    description: "",
    citizenship: "",
    period: "", // enum
  });
  const [err, setErr] = useState(false);
  useEffect(() => {
    const formattedStartDate = data.startDate
      ? new Date(data.startDate).toISOString().split("T")[0]
      : "";
    const formattedEndDate = data.endDate
      ? new Date(data.endDate).toISOString().split("T")[0]
      : "";

    let period = "";
    if (data.startDate && data.endDate) {
      const ds = new Date(data.startDate),
        de = new Date(data.endDate);
      if (
        ds.getMonth() === 2 &&
        ds.getDate() === 6 &&
        de.getMonth() === 7 &&
        de.getDate() === 19
      )
        period = "1";
      if (
        ds.getMonth() === 8 &&
        ds.getDate() === 4 &&
        de.getMonth() === 1 &&
        de.getDate() === 17
      )
        period = "2";
    }

    setInput({
      id: data.id || "",
      company: data.company || "",
      role: data.role || "",
      title: data.title || "",
      teacher: data.teacher || "",
      specialisation: data.specialisation || "",
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      slots: data.slots || 0,
      type: data.type || "",
      description: data.description || "",
      period,
    });
    setInput((prevState) => ({
      ...prevState,
      citizenship: data.citizentype || "All",
    }));
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!input.teacher) {
      setErr(true);
      return;
    }
    setErr(false);
    await onSubmit(input);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {input.id ? (
                <>Edit Job Listing - {input.id}</>
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
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    name="company"
                    size="small"
                    value={input.company}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Role"
                    name="role"
                    size="small"
                    value={input.role}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small" error={err}>
                    <InputLabel id="teacher-select-label">Teacher</InputLabel>
                    <Select
                      labelId="teacher-select-label"
                      id="teacher-select"
                      value={input.teacher}
                      label="Teacher"
                      name="teacher"
                      size="small"
                      onChange={handleInputChange}
                      required
                    >
                      {data.teachers?.map((t) => (
                        <MenuItem key={t} value={t}>
                          {t}
                        </MenuItem>
                      ))}
                    </Select>
                    {err && <FormHelperText>This is required!</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Specialisation"
                    name="specialisation"
                    size="small"
                    value={input.specialisation}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    fullWidth
                    label="Citizenship"
                    name="citizenship"
                    size="small"
                    value={input.citizenship}
                    onChange={handleInputChange}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="Singaporean/PR">Singaporean/PR</option>
                    <option value="All">All</option>
                  </TextField>
                </Grid>
              </>
            )}
            {type === "PRISM" && (
              <>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Type"
                    name="type"
                    size="small"
                    value={input.type}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    size="small"
                    value={input.title}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Specialisation"
                    name="specialisation"
                    size="small"
                    value={input.specialisation}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    name="company"
                    size="small"
                    value={input.company}
                    onChange={handleInputChange}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="period-select-label">Period</InputLabel>
                <Select
                  labelId="period-select-label"
                  id="period-select"
                  value={input.period}
                  label="Period"
                  size="small"
                  onChange={(e) => {
                    const period = e.target.value;
                    const year = new Date().getFullYear();
                    let newStartDate = input.startDate;
                    let newEndDate = input.endDate;
                    // months are 0 indexed, days are 1 bigger due to timezone diff
                    if (period === "1") {
                      newStartDate = new Date(year, 2, 7);
                      newEndDate = new Date(year, 7, 20);
                    }
                    if (period === "2") {
                      newStartDate = new Date(year, 8, 5);
                      newEndDate = new Date(year + 1, 1, 18);
                    }
                    setInput((prevState) => ({
                      ...prevState,
                      period,
                      startDate: newStartDate.toISOString().split("T")[0],
                      endDate: newEndDate.toISOString().split("T")[0],
                    }));
                  }}
                >
                  <MenuItem value={"1"}>6 Mar to 19 Aug</MenuItem>
                  <MenuItem value={"2"}>4 Sep to 17 Feb</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Slots"
                name="slots"
                type="number"
                size="small"
                value={input.slots}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                variant="outlined"
                size="small"
                value={input.description}
                onChange={handleInputChange}
              />
            </Grid>
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
              >
                {title}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );
}

export default FormDialog;
