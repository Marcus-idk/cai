import React, { useState, useRef } from 'react';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import styles from '../../styles/Student/StudentForm.module.css';

const StudentForm = () => {

  const [codingLanguages, setCodingLanguages] = useState({
    python: false,
    java: false,
    cSharp: false,
    others: '',
  });

  const [projectInterests, setProjectInterests] = useState([
    { id: 'webdev', name: 'Web Dev', rank: '' },
    { id: 'mobileappdev', name: 'Mobile App Dev', rank: '' },
    { id: 'automation', name: 'Automation', rank: '' },
  ]);

  const [frameworks, setFrameworks] = useState({
    react: false,
    vueJs: false,
    flask: false,
    others: '',
  });

  const resetForm = () => {
    setCodingLanguages({ python: false, java: false, cSharp: false, others: '' });
    setProjectInterests([
        { id: 'webdev', name: 'Web Dev', rank: '' },
        { id: 'mobileappdev', name: 'Mobile App Dev', rank: '' },
        { id: 'automation', name: 'Automation', rank: '' },
    ]);
    setFrameworks({ react: false, vueJs: false, flask: false, others: '' });
    setInterests('');
    setResumeName('');
    setFileError('');

    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const [interests, setInterests] = useState('');

  const fileInputRef = useRef(null);

  const handleCheckboxChange = (event, category) => {
    const { name, checked } = event.target;
    
    if (category === 'codingLanguages') {
        setCodingLanguages(prev => ({ ...prev, [name]: checked }));
    } else if (category === 'frameworks') {
        setFrameworks(prev => ({ ...prev, [name]: checked }));
    }
  };

  const handleInputChange = (event, category) => {
    const { value } = event.target;

    if (category === 'codingLanguages') {
        setCodingLanguages(prev => ({ ...prev, others: value }));
    } else if (category === 'frameworks') {
        setFrameworks(prev => ({ ...prev, others: value }));
    } else if (category === 'interests') {
        setInterests(value);
    }
  };

  const handleRankChange = (event, index) => {
      const newRank = parseInt(event.target.value);

      const isRankAssigned = projectInterests.some((interest, idx) => idx !== index && interest.rank === newRank);
      
      if (isRankAssigned) {
          alert(`Rank ${newRank} is already assigned to another interest. Please choose a different rank.`);
      } else {
          setProjectInterests(currentInterests =>
              currentInterests.map((interest, idx) => {
                  if (idx === index) {  
                      return { ...interest, rank: newRank };
                  }
                  return interest;
              })
          );
      }
  };

  const [resumeName, setResumeName] = useState('');
  const [fileError, setFileError] = useState('');
  
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "application/pdf" || 
          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setResumeName(file.name);
        setFileError('');
      } else {
        setResumeName('');
        setFileError('Please upload a .pdf or .docx file.');
      }
    } else {
      setResumeName('');
      setFileError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submission started");

    const formData = new FormData();
    formData.append('data', JSON.stringify({
        codingLanguages,
        projectInterests,
        frameworks,
        interests
    }));
    console.log("Form data appended:", {
      codingLanguages,
      projectInterests,
      frameworks,
      interests
    });

    if (fileInputRef.current.files[0]) {
        formData.append('resume', fileInputRef.current.files[0]);
        console.log("Resume file appended:", fileInputRef.current.files[0]);
    } else {
        console.log("No resume file selected");
    }
    
    try {
        console.log("Sending request to the server");
        const response = await fetch('http://localhost:5000/api/user/submit-form', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Response received:", result);
        } else {
            console.error('Form submission failed', response);
        }
    } catch (error) {
        console.error('There was an error submitting the form', error);
    }
  };

  localStorage.setItem('userRole', 'regular');

  return (
    <div class="container">
      <div class="py-5 text-center">
        <h1 class="display-5">Student Form</h1>
        <p class="lead">Answer the following questions to the best of your ability.</p>
      </div>
      <div class="row g-5">
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <p><strong>What are the coding languages you have learnt during your curriculum/ITP *</strong></p>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="pythonCheckbox" value="python" name="python" checked={codingLanguages.python} onChange={(e) => handleCheckboxChange(e, 'codingLanguages')} />
            <label class="form-check-label" for="pythonCheckbox">Python</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="javaCheckbox" value="java" name="java" checked={codingLanguages.java} onChange={(e) => handleCheckboxChange(e, 'codingLanguages')} />
            <label class="form-check-label" for="javaCheckbox">Java</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="cSharpCheckbox" value="cSharp" name="cSharp" checked={codingLanguages.cSharp} onChange={(e) => handleCheckboxChange(e, 'codingLanguages')} />
            <label class="form-check-label" for="cSharpCheckbox">C#</label>
          </div>
          <div class="form-check form-check-inline">
            <input type="text" class="form-control" placeholder="Others" id="codingLanguagesInput" value={codingLanguages.others} onChange={(e) => handleInputChange(e, 'codingLanguages')} />
          </div>
          <hr />
          <p><strong>Rank your interests to be involved in the following types of project *</strong></p>
          <div class="row g-3">
            {projectInterests.map((interest, index) => (
              <div class="col-md-2" key={interest.id}>
                <label class="form-label">{interest.name}</label>
                <select class="form-select" value={interest.rank} onChange={(e) => handleRankChange(e, index)}>
                  <option value="">Select Rank</option>
                  {projectInterests.map((_, idx) => (
                      <option key={idx} value={idx + 1}>{idx + 1}</option>
                  ))}
                </select>
                <div class="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
            ))}
          </div>
          <hr />
          <p><strong>What frameworks are you experienced in</strong></p>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="reactCheckbox" value="react" name="react" checked={frameworks.react} onChange={(e) => handleCheckboxChange(e, 'frameworks')} />
            <label class="form-check-label" for="reactCheckbox">React</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="vueJsCheckbox" value="vueJs" name="vueJs" checked={frameworks.vueJs} onChange={(e) => handleCheckboxChange(e, 'frameworks')} />
            <label class="form-check-label" for="vueJsCheckbox">Vue.js</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="flaskCheckbox" value="flask" name="flask" checked={frameworks.flask} onChange={(e) => handleCheckboxChange(e, 'frameworks')} />
            <label class="form-check-label" for="flaskCheckbox">Flask</label>
          </div>
          <div class="form-check form-check-inline">
            <input type="text" class="form-control" placeholder="Others" id="frameworksInput" value={frameworks.others} onChange={(e) => handleInputChange(e, 'frameworks')} />
          </div>
          <hr />
          <p><strong>State any interests you might want to pursue in projects/internships</strong></p>
          <div class="form-floating">
            <textarea class="form-control" placeholder="Others" id="interestsInput" value={interests} onChange={(e) => handleInputChange(e, 'interests')}></textarea>
            <label htmlFor="interestsInput">Others</label>
          </div>
          <hr />
          <div class="row">
            <p><strong>Attach your resume *</strong></p>
            <div class="col-md-4">
              <div class="mb-3">
                <input class="form-control" type="file" id="fileInput" ref={fileInputRef} onChange={handleFileInputChange} accept=".pdf,.docx" />
                {fileError && <p className={styles.errorText}>{fileError}</p>}
              </div>
            </div>
            <div class="col-md-4 ms-auto">
              <button type="submit" class="btn btn-primary mx-1">Submit</button>
              <button type="button" class="btn btn-outline-secondary mx-1" onClick={resetForm}>Reset</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
