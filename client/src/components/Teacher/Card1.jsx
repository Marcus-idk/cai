import React, { useState } from "react";
import styles from "../../styles/Teacher/Card1.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CompanyIcon from "@mui/icons-material/WorkOutlineOutlined";
import RoleIcon from "@mui/icons-material/SettingsOutlined";
import TeacherIcon from "@mui/icons-material/SupervisorAccountOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlined";

const Card1 = ({
  id,
  company,
  teacher,
  role,
  description,
  onEdit,
  onDelete,
}) => {
  const [detailsToggle, setDetailsToggle] = useState(false);

  const handleDetailsToggle = () => {
    setDetailsToggle(!detailsToggle);
  };

  const handleEdit = () => {
    onEdit({
      id: id,
      company: company,
      role: role,
      teacher: teacher,
      description: description,
    });
  };

  const handleDelete = () => {
    onDelete({
      id: id,
      company: company,
      role: role,
      teacher: teacher,
      description: description,
    });
  };

  return (
    <div className={styles["card-wrapper"]}>
      <div className={styles.card}>
        <div className={styles["header-wrapper"]}>
          <div className={styles["job-wrapper"]}>
            <p>Job ID </p>
            <h2>{id}</h2>
          </div>
          <div className={styles["action-wrapper"]}>
            <EditIcon className={styles.editIcon} onClick={handleEdit} />
            <DeleteIcon className={styles.deleteIcon} onClick={handleDelete} />
          </div>
        </div>
        <hr />
        {!detailsToggle ? (
          <>
            <div className={styles["company_role-wrapper"]}>
              <div className={styles["company-wrapper"]}>
                <CompanyIcon className={styles.companyIcon} />
                <div>
                  <p>Company</p>
                  <h3>{company}</h3>
                </div>
              </div>
              <div className={styles["role-wrapper"]}>
                <RoleIcon className={styles.roleIcon} />
                <div>
                  <p>Job Role</p>
                  <h3>{role}</h3>
                </div>
              </div>
            </div>
            <hr />
            <div className={styles["teacher-wrapper"]}>
              <TeacherIcon className={styles.teacherIcon} />
              <div>
                <p>Teacher-In-Charge</p>
                <h3>{teacher}</h3>
              </div>
            </div>
            <hr />
            <div className={styles["description-wrapper"]}>
              <InfoIcon className={styles.infoIcon} />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum
                eius quasi, modi saepe odit nostrum, et sequi reprehenderit,
                optio ea id! Sunt tenetur dolorum aut ea voluptates perspiciatis
                possimus vero recusandae sed rerum, inventore voluptatibus
                maxime alias debitis atque repellat?
              </p>
            </div>
          </>
        ) : (
          <>
            <div
              className={`${styles["description-wrapper"]} ${styles.active}`}
            >
              <InfoIcon className={styles.infoIcon} />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum
                eius quasi, modi saepe odit nostrum, et sequi reprehenderit,
                optio ea id! Sunt tenetur dolorum aut ea voluptates perspiciatis
                possimus vero recusandae sed rerum, inventore voluptatibus
                maxime alias debitis atque repellat? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Vitae beatae maiores perferendis
                libero vel sapiente mollitia. Nam at consectetur maxime
                voluptates velit non maiores reiciendis, ipsa error quas magni
                quae.
              </p>
            </div>
          </>
        )}

        <div className={styles["detailsButton-wrapper"]}>
          <button
            className={styles.detailsButton}
            onClick={handleDetailsToggle}
          >
            {!detailsToggle ? "More" : "Less"} Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card1;
