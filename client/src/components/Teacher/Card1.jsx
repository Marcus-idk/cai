import React, { useState } from "react";
import styles from "../../styles/Teacher/Card1.module.css";
import IconEdit from "@mui/icons-material/Edit";
import IconDelete from "@mui/icons-material/Delete";
import IconCompany from "@mui/icons-material/WorkOutlineOutlined";
import IconRole from "@mui/icons-material/SettingsOutlined";
import IconTeacher from "@mui/icons-material/SupervisorAccountOutlined";
import IconDescription from "@mui/icons-material/InfoOutlined";
import IconPeriod from "@mui/icons-material/DateRange";
import IconSpecialisation from "@mui/icons-material/ExploreOutlined";
import IconSlots from "@mui/icons-material/EventSeat";
import { formatDateToDDMMYY } from "../../utils/formatTime";

const Card = ({ onEdit, onDelete, data, headerData, bodyData }) => {
  const [detailsToggle, setDetailsToggle] = useState(false);

  const handleDetailsToggle = () => {
    setDetailsToggle((prevState) => !prevState);
  };

  const {
    id,
    slots,
    specialisation,
    company,
    role,
    teacher,
    startDate,
    endDate,
    description,
  } = data;

  const handleEdit = () => {
    onEdit({
      ...data,
    });
  };

  // const handleEdit = () => {
  //   // Construct the data object from the props
  //   const editData = {
  //     id,
  //     slots: headerData.value,
  //     description,
  //   };
  //   bodyData.forEach((item) => {
  //     editData[item.label.toLowerCase()] = item.value;
  //   });
  //   onEdit(editData);
  // };

  const handleDelete = () => {
    onDelete(id);
  };

  const groupedBodyData = [];
  for (let i = 0; i < bodyData.length; i += 2) {
    groupedBodyData.push(bodyData.slice(i, i + 2));
  }

  return (
    <div className={styles["card-wrapper"]}>
      <div className={styles.card}>
        <div className={styles["header-wrapper"]}>
          <div>
            {/* <IconSlots className={styles.icon} /> */}
            {headerData.icon}
            <p>{headerData.value}</p>
          </div>
          <div>
            <h2>{id}</h2>
          </div>
          <div className={styles["header-right-wrapper"]}>
            <IconEdit className={styles.editIcon} onClick={handleEdit} />
            <IconDelete className={styles.deleteIcon} onClick={handleDelete} />
          </div>
        </div>
        <hr />
        {!detailsToggle ? (
          <>
            {groupedBodyData.map((pair, rowIndex) => (
              <div key={rowIndex}>
                <div className={styles["row-wrapper"]}>
                  {pair.map((item, colIndex) => (
                    <div
                      key={colIndex}
                      className={
                        colIndex === 0
                          ? styles["col1-wrapper"]
                          : styles["col2-wrapper"]
                      }
                    >
                      {item.icon}
                      <div>
                        <p>{item.label}</p>
                        <h3>{item.value}</h3>
                      </div>
                    </div>
                  ))}
                </div>
                <hr />
                {/* {rowIndex !== groupedBodyData.length - 1 ||
                (rowIndex === groupedBodyData.length - 1 && pair.length < 2) ? (
                  <hr />
                ) : null} */}
              </div>
            ))}
            {/* <div className={styles["row-wrapper"]}>
              <div className={styles["col1-wrapper"]}>
                <IconCompany className={styles.icon} />
                <div>
                  <p>Company</p>
                  <h3>{company}</h3>
                </div>
              </div>
              <div className={styles["col2-wrapper"]}>
                <IconRole className={styles.icon} />
                <div>
                  <p>Role</p>
                  <h3>{role}</h3>
                </div>
              </div>
            </div>
            <hr />
            <div className={styles["row-wrapper"]}>
              <div className={styles["col1-wrapper"]}>
                <IconTeacher className={styles.icon} />
                <div>
                  <p>Teacher-In-Charge</p>
                  <h3>{teacher}</h3>
                </div>
              </div>
              <div className={styles["col2-wrapper"]}>
                <IconSpecialisation className={styles.icon} />
                <div>
                  <p>Specialisation</p>
                  <h3>{specialisation}</h3>
                </div>
              </div>
            </div>
            <hr />
            <div className={styles["row-wrapper"]}>
              <div className={styles["col1-wrapper"]}>
                <IconPeriod className={styles.icon} />
                <div>
                  <p>Period</p>
                  <h3>
                    {formatDateToDDMMYY(startDate)}-
                    {formatDateToDDMMYY(endDate)}
                  </h3>
                </div>
              </div>
              <div className={styles["col2-wrapper"]}>
                <IconSlots className={styles.icon} />
                <div>
                  <p>Slots</p>
                  <h3>{slots}</h3>
                </div>
              </div>
            </div>
            <hr /> */}
            <div className={styles["description-wrapper"]}>
              <IconDescription
                className={`${styles.icon} + ${styles.infoIcon}`}
              />
              <p>{description}</p>
            </div>
          </>
        ) : (
          <>
            <div
              className={`${styles["description-wrapper"]} ${styles.active}`}
            >
              <IconDescription
                className={`${styles.icon} + ${styles.infoIcon}`}
              />
              <p>{description}</p>
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

export default Card;
