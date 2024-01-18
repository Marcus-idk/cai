const teacherServices = require("../services/teacher");
const xlsx = require('xlsx');

async function getAllITP(req, res) {
  try {
    const result = await teacherServices.getAllITP();
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function getAllPRISM(req, res) {
  try {
    const result = await teacherServices.getAllPRISM();
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function AllITPSummary(req, res) {
  try {
    const result = await teacherServices.AllITPSummary();
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function AllPRISMSummary(req, res) {
  try {
    const result = await teacherServices.AllPRISMSummary();
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function getAllStudents(req, res) {
  try {
    const result = await teacherServices.getAllStudents();
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function getStudent(req, res) {
  try {
    const id = req.params.id;
    const result = await teacherServices.getStudent(id);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function addStudent(req, res) {
  try {
    const { id, name, resume, spec, gpa } = req.body;
    const result = await teacherServices.addStudent(
      id,
      name,
      resume,
      spec,
      gpa,
    );
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function updateStudent(req, res) {
  try {
    const { StudentID, FullName, spec, gpa } = req.body;
    
    const result = await teacherServices.UpdateStudent(
      StudentID,
      FullName,
      spec,
      gpa,
    );

    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function getITPTable(req, res) {
  try {
    const result = await teacherServices.getITPTable();
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function getPRISMTable(req, res) {
  try {
    const result = await teacherServices.getPRISMTable();
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function updatePRISM(req, res) {
  try {
    const id = req.params.id;

    const {
      slots,
      type,
      title,
      teacher,
      specialisation,
      company,
      startDate,
      endDate,
      description,
    } = req.body;

    if (
      !id ||
      !slots ||
      !type ||
      !title ||
      !teacher ||
      !specialisation ||
      !company ||
      !startDate ||
      !endDate ||
      !description
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await teacherServices.UpdatePRISM(
      id,
      type,
      title,
      description,
      company,
      slots,
      teacher,
      specialisation,
      startDate,
      endDate,
    );

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateITP(req, res) {
  try {
    const id = req.params.id;

    const {
      company,
      role,
      description,
      slots,
      teacher,
      specialisation,
      startDate,
      endDate,
    } = req.body;

    if (
      !id ||
      !company ||
      !role ||
      !description ||
      !slots ||
      !teacher ||
      !specialisation ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await teacherServices.UpdateITP(
      id,
      company,
      role,
      description,
      slots,
      teacher,
      specialisation,
      startDate,
      endDate,
    );

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function addPRISM(req, res) {
  try {
    const {
      slots,
      type,
      title,
      teacher,
      specialisation,
      company,
      startDate,
      endDate,
      description,
    } = req.body;

    if (
      !slots ||
      !type ||
      !title ||
      !teacher ||
      !specialisation ||
      !company ||
      !startDate ||
      !endDate ||
      !description
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await teacherServices.AddPRISM(
      slots,
      type,
      title,
      teacher,
      specialisation,
      company,
      startDate,
      endDate,
      description,
    );
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function addITP(req, res) {
  try {
    const {
      company,
      role,
      description,
      slots,
      teacher,
      specialisation,
      startDate,
      endDate,
    } = req.body;

    if (
      !company ||
      !role ||
      !description ||
      !slots ||
      !teacher ||
      !specialisation ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await teacherServices.AddITP(
      company,
      role,
      description,
      slots,
      teacher,
      specialisation,
      startDate,
      endDate,
    );

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getSlots(req, res) {
  try {
    const id = req.params.id;

    const result = await teacherServices.getSlots(id);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

// wrong
async function Assign(req, res) {
  try {
    const id = req.params.id;
    const { oppId, comments } = req.body;
    const result = await teacherServices.Assign(id, oppId, comments);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function EditAssign(req, res) {
  try {
    const opportunityID = req.params.id;
    const { newID, oldID } = req.body;
    const result = await teacherServices.EditAssign(
      newID,
      oldID,
      opportunityID,
    );
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

// wrong
async function UnAssign(req, res) {
  try {
    const id = req.params.id;
    const result = await teacherServices.UnAssign(id); //Uses student Id and deletes row from student table
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function deleteITP(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "Missing required field" });
    }

    const result = await teacherServices.deleteITP(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deletePRISM(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "Missing required field" });
    }

    const result = await teacherServices.deletePRISM(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function bulkInsertStudents(req, res) {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const processedData = jsonData.map(row => ({
      adminNo: row.AdminNo,
      studentName: row['Student Name'],
      gpa: row.GPA,
      specialization: row.Specialization
    }));

   await teacherServices.bulkInsertStudentsData(processedData);

    res.status(200).json({ message: "Data processed and inserted successfully" });
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

module.exports = {
  getAllITP,
  getAllPRISM,
  AllITPSummary,
  AllPRISMSummary,
  getAllStudents,
  getStudent,
  addStudent,
  updateStudent,
  getITPTable,
  getPRISMTable,
  updatePRISM,
  updateITP,
  addITP,
  addPRISM,
  getSlots,
  Assign,
  EditAssign,
  UnAssign,
  deleteITP,
  deletePRISM,
};
