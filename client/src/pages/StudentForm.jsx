import React , {useRef} from "react";
import FormGroup from '@mui/material/FormGroup';
import Button from "@mui/material/Button";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import styles from "../styles/studentform.module.css";

const StudentForm= () => {
    const fileInputRef = useRef(null);

    const handleFileInputChange = () => {
      // Handle file input change logic here
      const selectedFile = fileInputRef.current.files[0];
      console.log('Selected file:', selectedFile);
    };


    localStorage.setItem('userRole', 'regular');
    return (
        <>
        <section className={styles["form"]}>
        <p className={styles["formText"]}>Form</p>
        <div className={styles["qboxes"]}>
        <div className={styles["boxes"]}>
            <p>What are the coding langauges you have learnt during your curriculam/ITP * :</p>
        <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Option1" />
                <FormControlLabel control={<Checkbox />} label="Option2" />
                <FormControlLabel control={<Checkbox />} label="Option3" />
                <FormControlLabel
          control={<Checkbox />}
          label={
            <TextField
              id="othersInput"
              label="Others"
              
              className={`${styles.customTextField} ${styles.customNotOutlined}`}
            />
          }
        />
        </FormGroup>
        </div>
        <div className={styles["boxes"]}>
            <p>Rank your interests to be involved in the following types of project* :</p>
        <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Project1" />
                <FormControlLabel control={<Checkbox />} label="Project2" />
                <FormControlLabel control={<Checkbox />} label="Project3" />
                <FormControlLabel
          control={<Checkbox />}
          label={
            <TextField
              id="othersInput"
              label="Others"
              variant="outlined"
              className={styles.customTextField}
              // Add any other props you need for the TextField component
            />
          }
        />
        </FormGroup>
        </div>
        <div className={styles["boxes"]}>
            <p>What frameworks are you experienced in :</p>
        <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Option1" />
                <FormControlLabel control={<Checkbox />} label="Option2" />
                <FormControlLabel control={<Checkbox />} label="Option3" />
                <FormControlLabel
          control={<Checkbox />}
          label={
            <TextField
              id="othersInput"
              label="Others"
              variant="outlined"
              className={styles.customTextField}
              // Add any other props you need for the TextField component
            />
          }
        />
        </FormGroup>
        </div>
        <div className={styles["boxes"]}>
            <p>State your interests you might want to do in projects/ internships:  </p>
              <FormGroup>
                <TextField
                  id="othersInput"
                  label="Others"
                  variant="standard" // Use "standard" instead of "outlined"
                  className={styles.customInterestField}
                  inputProps={{ style: { border: 'none', outline: 'none', backgroundColor: 'lightgrey', color: 'black', height:'150px' } }}
                // Add any other props you need for the TextField component
                />
              </FormGroup>

        </div>
    <div className={styles["boxes"]}>
      <p>Send your resume* : </p>
      <FormGroup>
        <label htmlFor="fileInput">
          <Button
            startIcon={<AddIcon />}
          >
          </Button>
          Add your resume
        </label>
        <input
          id="fileInput"
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />
      </FormGroup>
    </div>
    </div>
    <div className={styles["buttons"]}>
    <Stack spacing={2} direction="row">
      <Button className={styles["editbutton"]}>Edit</Button>
      <Button className={styles["inputbuttons"]}>Submit</Button>
      <Button className={styles["inputbuttons"]}>Reset</Button>
    </Stack>
    </div>
        </section>
        </>
        
    )
}

export default StudentForm;