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
    <form onSubmit={handleSubmit} className={styles.form} enctype="multipart/form-data">
      <p className={styles.formText}>Form</p>
      <div className={styles.qboxes}>
        <div className={styles.boxes}>
          <p>What are the coding languages you have learnt during your curriculum/ITP *:</p>
          <FormGroup>
            <FormControlLabel 
              control={<Checkbox checked={codingLanguages.python} onChange={(e) => handleCheckboxChange(e, 'codingLanguages')} name="python" />} 
              label="Python" 
            />
            <FormControlLabel 
              control={<Checkbox checked={codingLanguages.java} onChange={(e) => handleCheckboxChange(e, 'codingLanguages')} name="java" />} 
              label="Java" 
            />
            <FormControlLabel 
              control={<Checkbox checked={codingLanguages.cSharp} onChange={(e) => handleCheckboxChange(e, 'codingLanguages')} name="cSharp" />} 
              label="C#" 
            />
            <TextField
              id="codingLanguagesInput"
              label="Others"
              variant="outlined"
              value={codingLanguages.others}
              onChange={(e) => handleInputChange(e, 'codingLanguages')}
              InputProps={{
                style: {
                  width: '150px',
                  fontSize: '14px',
                  backgroundColor: 'lightgrey',
                  border: 'none',
                },
              }}
            />
          </FormGroup>
        </div>
        <div className={styles.boxes}>
        <p>Rank your interests to be involved in the following types of project *:</p>
        {projectInterests.map((interest, index) => (
            <div key={interest.id}>
                <label>{interest.name}: </label>
                <select
                    value={interest.rank}
                    onChange={(e) => handleRankChange(e, index)}>
                    <option value="">Select Rank</option>
                    {projectInterests.map((_, idx) => (
                        <option key={idx} value={idx + 1}>{idx + 1}</option>
                    ))}
                </select>
            </div>
        ))}
        </div>
        <div className={styles.boxes}>
          <p>What frameworks are you experienced in:</p>
          <FormGroup>
            <FormControlLabel 
              control={<Checkbox checked={frameworks.react} onChange={(e) => handleCheckboxChange(e, 'frameworks')} name="react" />} 
              label="React" 
            />
            <FormControlLabel 
              control={<Checkbox checked={frameworks.vueJs} onChange={(e) => handleCheckboxChange(e, 'frameworks')} name="vueJs" />} 
              label="Vue.js" 
            />
            <FormControlLabel 
              control={<Checkbox checked={frameworks.flask} onChange={(e) => handleCheckboxChange(e, 'frameworks')} name="flask" />} 
              label="Flask" 
            />
            <TextField
              id="frameworksInput"
              label="Others"
              variant="outlined"
              value={frameworks.others}
              onChange={(e) => handleInputChange(e, 'frameworks')}
              InputProps={{
                style: {
                  width: '150px',
                  fontSize: '14px',
                  backgroundColor: 'lightgrey',
                  border: 'none',
                },
              }}
            />
          </FormGroup>
        </div>
        <div className={styles.boxes}>
          <p>State your interests you might want to do in projects/internships:</p>
          <FormGroup>
            <TextField
              id="interestsInput"
              label="Others"
              variant="outlined"
              value={interests}
              onChange={(e) => handleInputChange(e, 'interests')}
              className={styles.customInterestField}
              InputProps={{
                style: {
                  backgroundColor: 'lightgrey',
                  color: 'black',
                },
              }}
              multiline
              rows={4}
            />
          </FormGroup>
        </div>
        <div className={styles.boxes}>
          <p>Send your resume *:</p>
          <FormGroup>
            <input
              id="fileInput"
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
              accept=".pdf,.docx"
            />
            <label htmlFor="fileInput">
              <Button component="span" startIcon={<AddIcon />}>
                Add your resume
              </Button>
            </label>
            {resumeName && <p>Uploaded File: {resumeName}</p>}
            {fileError && <p className={styles.errorText}>{fileError}</p>} { "" }
          </FormGroup>
        </div>
      </div>
      
      <div className={styles.buttons}>
        <Stack spacing={2} direction="row">
          <Button type="button" className={styles.inputbuttons} onClick={resetForm}>Reset</Button>
          <Button type="submit" className={styles.inputbuttons}>Submit</Button>
        </Stack>
      </div>
    </form>
  );
};

export default StudentForm;
