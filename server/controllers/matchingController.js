const { spawn } = require("child_process");
const path = require("path");
const matchingService = require("../services/matchingService");

function callPythonScript(students, internships) {
  return new Promise((resolve, reject) => {
    const studentDataStr = JSON.stringify(students);
    const internshipDataStr = JSON.stringify(internships);

    const scriptPath = path.join(__dirname, "path/to/match_students.py");
    const scriptCommand = `python ${scriptPath} '${studentDataStr}' - '${internshipDataStr}'`;

    const pythonProcess = spawn(scriptCommand, { shell: true });

    let outputData = "";

    pythonProcess.stdout.on("data", (data) => {
      outputData += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python script error: ${data.toString()}`);
      reject(new Error(data.toString()));
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(outputData);
          resolve(result);
        } catch (error) {
          reject(new Error("Failed to parse output from Python script"));
        }
      } else {
        reject(new Error(`Python script exited with code ${code}`));
      }
    });
  });
}

async function handleMatchingAndUpdate(req, res) {
  try {
    const { students, internships } = req.body;
    const result = await callPythonScript(students, internships);

    // Update assignments in the database
    for (const [studentId, opportunityId] of Object.entries(result)) {
      await matchingService.assignStudent(opportunityId, studentId);
    }

    res
      .status(200)
      .json({ message: "Matching and database update successful." });
  } catch (error) {
    console.us(500).send(error.message);
  }
}

module.exports = {
  handleMatchingAndUpdate,
};
