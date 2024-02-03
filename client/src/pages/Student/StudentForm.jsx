import React, { useState, useRef } from "react";
import styles from "../../styles/Student/StudentForm.module.css";
import useAdminAuthCheck from "../../utils/useAdminAuthCheck";
import { fetchAPI } from "../../utils/fetchAPI";

const StudentForm = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useAdminAuthCheck(false);
  const [codingLanguages, setCodingLanguages] = useState({
    python: false,
    java: false,
    cSharp: false,
    others: "",
  });

  const [projectInterests, setProjectInterests] = useState([
    { id: "webdev", name: "Web Dev", rank: "" },
    { id: "mobileappdev", name: "Mobile App Dev", rank: "" },
    { id: "automation", name: "Automation", rank: "" },
  ]);

  const [frameworks, setFrameworks] = useState({
    react: false,
    vueJs: false,
    flask: false,
    others: "",
  });

  const resetForm = () => {
    setCodingLanguages({
      python: false,
      java: false,
      cSharp: false,
      others: "",
    });
    setProjectInterests([
      { id: "webdev", name: "Web Dev", rank: "" },
      { id: "mobileappdev", name: "Mobile App Dev", rank: "" },
      { id: "automation", name: "Automation", rank: "" },
    ]);
    setFrameworks({ react: false, vueJs: false, flask: false, others: "" });
    setInterests("");
    setFileError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const [interests, setInterests] = useState("");

  const fileInputRef = useRef(null);

  const handleCheckboxChange = (event, category) => {
    const { name, checked } = event.target;

    if (category === "codingLanguages") {
      setCodingLanguages((prev) => ({ ...prev, [name]: checked }));
    } else if (category === "frameworks") {
      setFrameworks((prev) => ({ ...prev, [name]: checked }));
    }
  };

  const handleInputChange = (event, category) => {
    const { value } = event.target;

    if (category === "codingLanguages") {
      setCodingLanguages((prev) => ({ ...prev, others: value }));
    } else if (category === "frameworks") {
      setFrameworks((prev) => ({ ...prev, others: value }));
    } else if (category === "interests") {
      setInterests(value);
    }
  };

  const handleRankChange = (event, index) => {
    const newRank = parseInt(event.target.value);

    const isRankAssigned = projectInterests.some(
      (interest, idx) => idx !== index && interest.rank === newRank,
    );

    if (isRankAssigned) {
      alert(
        `Rank ${newRank} is already assigned to another interest. Please choose a different rank.`,
      );
    } else {
      setProjectInterests((currentInterests) =>
        currentInterests.map((interest, idx) => {
          if (idx === index) {
            return { ...interest, rank: newRank };
          }
          return interest;
        }),
      );
    }
  };

  const [fileError, setFileError] = useState("");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (
        file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFileError("");
      } else {
        setFileError("Please upload a .pdf or .docx file.");
      }
    } else {
      setFileError("");
    }
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        codingLanguages,
        projectInterests,
        frameworks,
        interests,
        studentID: localStorage.getItem("studentID"),
      }),
    );

    if (fileInputRef.current.files[0]) {
      formData.append("resume", fileInputRef.current.files[0]);
    }

    try {
      const response = await fetchAPI("/api/user/submit-form", {
        method: "POST",
        body: formData,
        headers: {
          userRole: localStorage.getItem("userRole"),
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Response received:", result);
        setSuccessMsg("Form submitted.");
      } else {
        console.error("Form submission failed", response);
        setErrMsg(await response.text());
      }
    } catch (error) {
      console.error("There was an error submitting the form", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
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
      <div className="py-5 text-center">
        <h1 className="display-5">Student Form</h1>
        <p className="lead">
          Answer the following questions to the best of your ability.
        </p>
      </div>
      <div className="row g-5">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <p>
            <strong>
              What are the coding languages you have learnt during your
              curriculum/ITP
            </strong>
          </p>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="pythonCheckbox"
              value="python"
              name="python"
              checked={codingLanguages.python}
              onChange={(e) => handleCheckboxChange(e, "codingLanguages")}
            />
            <label className="form-check-label" htmlFor="pythonCheckbox">
              Python
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="javaCheckbox"
              value="java"
              name="java"
              checked={codingLanguages.java}
              onChange={(e) => handleCheckboxChange(e, "codingLanguages")}
            />
            <label className="form-check-label" htmlFor="javaCheckbox">
              Java
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="cSharpCheckbox"
              value="cSharp"
              name="cSharp"
              checked={codingLanguages.cSharp}
              onChange={(e) => handleCheckboxChange(e, "codingLanguages")}
            />
            <label className="form-check-label" htmlFor="cSharpCheckbox">
              C#
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="text"
              className="form-control"
              placeholder="Others"
              id="codingLanguagesInput"
              value={codingLanguages.others}
              onChange={(e) => handleInputChange(e, "codingLanguages")}
            />
          </div>
          <hr className="my-3" />
          <p>
            <strong>
              Rank your interests to be involved in the following types of
              project *
            </strong>
          </p>
          <div className="row g-3">
            {projectInterests.map((interest, index) => (
              <div className="col-md-2" key={interest.id}>
                <label className="form-label">{interest.name}</label>
                <select
                  className="form-select"
                  value={interest.rank}
                  onChange={(e) => handleRankChange(e, index)}
                  required
                >
                  <option value="">Select Rank</option>
                  {projectInterests.map((_, idx) => (
                    <option key={idx} value={idx + 1}>
                      {idx + 1}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
            ))}
          </div>
          <hr className="my-3" />
          <p>
            <strong>What frameworks are you experienced in</strong>
          </p>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="reactCheckbox"
              value="react"
              name="react"
              checked={frameworks.react}
              onChange={(e) => handleCheckboxChange(e, "frameworks")}
            />
            <label className="form-check-label" htmlFor="reactCheckbox">
              React
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="vueJsCheckbox"
              value="vueJs"
              name="vueJs"
              checked={frameworks.vueJs}
              onChange={(e) => handleCheckboxChange(e, "frameworks")}
            />
            <label className="form-check-label" htmlFor="vueJsCheckbox">
              Vue.js
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="flaskCheckbox"
              value="flask"
              name="flask"
              checked={frameworks.flask}
              onChange={(e) => handleCheckboxChange(e, "frameworks")}
            />
            <label className="form-check-label" htmlFor="flaskCheckbox">
              Flask
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="text"
              className="form-control"
              placeholder="Others"
              id="frameworksInput"
              value={frameworks.others}
              onChange={(e) => handleInputChange(e, "frameworks")}
            />
          </div>
          <hr className="my-3" />
          <p>
            <strong>
              State any interests you might want to pursue in
              projects/internships
            </strong>
          </p>
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Others"
              id="interestsInput"
              value={interests}
              onChange={(e) => handleInputChange(e, "interests")}
            ></textarea>
            <label htmlFor="interestsInput">Others</label>
          </div>
          <hr className="my-3" />
          <div className="row">
            <p>
              <strong>Attach your resume</strong>
            </p>
            <div className="col-md-4">
              <div className="mb-3">
                <input
                  className="form-control"
                  type="file"
                  id="fileInput"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  accept=".pdf,.docx"
                />
                {fileError && <p className={styles.errorText}>{fileError}</p>}
              </div>
            </div>
            <div className="col-md-4 ms-auto">
              <button
                type="submit"
                className="btn btn-primary mx-1"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      class="spinner-border spinner-border-sm mx-1"
                      aria-hidden="true"
                    ></span>
                    <span role="status">Loading...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary mx-1"
                onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
