const teacherModel = require("../services/teacher");

async function getAllITP(req, res) {
  try {
    const result = await teacherModel.getAllITP();
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function getAllPRISM(req, res) {
  try {
    const result = await teacherModel.getAllPRISM();
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function getAllStudents(req, res) {
  try {
    const result = await teacherModel.getAllStudents();
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function getStudent(req, res) {
  try {
    const id = req.params.id;
    const result = await teacherModel.getStudent(id);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function addStudent(req, res) {
  try {
    const { id,name,resume,spec,gpa } = req.body;
    const result = await teacherModel.addStudent(id,name,resume,spec,gpa);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}


async function getITPTable(req, res) {
  try {
    const result = await teacherModel.getITPTable();
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function getPRISMTable(req, res) {
  try {
    const result = await teacherModel.getPRISMTable();
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function updatePRISM(req, res) {
  try {
    const id = req.params.id;
    const {title, type, desc, Slots, supervisor, spec, startDate, endDate, company } = req.body;
    const result = await teacherModel.updatePRISM(id, title, type, desc, Slots, supervisor, spec, startDate, endDate, company);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function updateITP(req, res) {
  try {
    const id = req.params.id;
    const { company, job, desc, Slots, Teach, spec, startDate, endDate } = req.body;
    const result = await teacherModel.updateITP(id, company, job, desc, Slots, Teach, spec, startDate, endDate);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function addPRISM(req, res) {
  try {
    const {title, type, desc, Slots, supervisor, spec, startDate, endDate, company } = req.body;
    const result = await teacherModel.addPRISM(title, type, desc, Slots, supervisor, spec, startDate, endDate, company);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function addITP(req, res) {
  try {
    const { company, job, desc, Slots, Teach, spec, startDate, endDate } = req.body;
    const result = await teacherModel.addITP(company, job, desc, Slots, Teach, spec, startDate, endDate);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function getSlots(req, res) {
  try {
    const id = req.params.id;
    
    const result = await teacherModel.getSlots(id);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function Assign(req, res) {
  try {
    const id = req.params.id;
    const { oppId,comments } = req.body;
    const result = await teacherModel.Assign(id,oppId,comments);//id is studentId, this functions adds record to Assign table
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}

async function UnAssign(req, res) {
  try {
    const id = req.params.id;
    const result = await teacherModel.UnAssign(id);//Uses student Id and deletes row from student table
    res.status(200).json(result);
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(err.message);
  }
}


module.exports = {
  getAllITP,
  getAllPRISM,
  getAllStudents,
  getStudent,
  addStudent,
  getITPTable,
  getPRISMTable,
  updatePRISM,
  updateITP,
  addITP,
  addPRISM,
  getSlots,
  Assign,
  UnAssign,
};
