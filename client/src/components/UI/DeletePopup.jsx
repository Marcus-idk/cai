import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import styles from "../../styles/UI/DeletePopup.module.css";
import WarningIcon from "@mui/icons-material/WarningAmberRounded";
import { TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeletePopup = ({data}) => {
  const [popupToggle, setPopupToggle] = useState(false);

  useEffect(() => {
    setPopupToggle(!popupToggle);
  }, [data]);

  const handleDelete = (e) => {
    setPopupToggle(!popupToggle);
    toast.success(`Job ID: ${data.id} has been deleted!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleCancel = () => {
    setPopupToggle(!popupToggle);
  };

  return (
    <>
      {!popupToggle && (
        <Modal>
          <div className={styles["deletePopup-content"]}>
            <div className={styles.header}>
              <div className={styles["warningIcon-wrapper"]}>
                <WarningIcon className={styles.warningIcon} />
              </div>
            </div>
            <p className={styles.p}>Are you sure you want to delete Job ID?</p>
            <h2 className={styles.h2}>{data.id || "Error"}</h2>
            <button className={styles.deleteButton} onClick={handleDelete}>
              Delete Job
            </button>
            <button className={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
      <ToastContainer />
    </>
  );
};

export default DeletePopup;
