import React, { useEffect, useState } from "react";
import styles from "../../styles/Teacher/EditDrawer.module.css";
import TextField from "@mui/material/TextField";

const EditDrawer = (props) => {
  const [formToggle, setFormToggle] = useState(false);

  const [userInput, setUserInput] = useState({
    company: 'MAS',
    jobName: 'Tester',
    tic: 'Lim Khai Cher',
    student: "",
  });

  useEffect(() => {
    setFormToggle(false);
    setUserInput({
      projectName: props.data.projectName,
      tic: props.data.tic,
      student: props.data.student,
    });
  }, [props.data]);
  
  const handleInputChange = (identifier, value) => {
    const fieldToMap = {
      student: "student",
    };

    const fieldToUpdate = fieldToMap[identifier] || "";

    setUserInput((prevState) => {
      return {
        ...prevState,
        [fieldToUpdate]: value,
      };
    });
  };

  const handleCancel = () => {
    setFormToggle(!formToggle);
  };
  const handleUpdate = (e) => {
    console.log(e);
    e.preventDefault();
    setFormToggle(!formToggle);
    console.log(userInput);
  };
  return (
    !formToggle && (
      <div className="overlay">
        <div className={styles.editDrawer}>
          <form>
            <h2>
              Edit Project <strong>{props.data.id}</strong>
            </h2>
            <div className={styles["input-wrapper"]}>
              <label>Project Name: <strong>{props.data.projectName}</strong></label>
            </div>
            <div className={styles["input-wrapper"]}>
              <label>Teacher In Charge: <strong>{props.data.tic}</strong> </label>
            </div>
            <div className={styles["input-wrapper"]}>
              <label>Student Name: </label>
              <TextField
                className={styles.inputBox}
                sx={{
                  height: 40,
                  marginBottom: 2.5,
                  input: { height: 40 },
                  ".MuiInputBase-input": { padding: "0 14px", height: "40px" },
                  ".MuiOutlinedInput-root": { height: "40px" },
                }}
                value={userInput.student}
                onChange={(e) => handleInputChange("student", e.target.value)}
              />
            </div>
            <div className={styles["buttons-wrapper"]}>
              <button className={styles.cancelButton} onClick={handleCancel}>
                Cancel
              </button>
              <button className={styles.updateButton} onClick={handleUpdate}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditDrawer;