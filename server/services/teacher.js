const dbConfig = require("../config/dbConfig");
const sql = require("mssql");

async function getAllStudents() {
  const connection = await dbConfig.connectDB();
  const result = await connection.query("EXEC GetAllStudents");
  connection.close();
  return result;
}

async function getStudent(id) {
  const connection = await dbConfig.connectDB();
  const result = await connection.query("EXEC GetStudent(" + id + ")");
  connection.close();
  return result;
}

async function AddStudent(id, name, resume, spec, gpa) {
  const connection = await dbConfig.connectDB();
  const result = await connection.query(
    "EXEC AddStudent(" +
      id +
      "," +
      name +
      "," +
      resume +
      "," +
      spec +
      "," +
      gpa +
      "," +
      ")",
  );
  connection.close();
  return result;
}

async function UpdateStudent(StudentID, FullName, Specialisation, GPA) {
  const connection = await dbConfig.connectDB();
  try {
    const query = `
      UPDATE Students
      SET 
        FullName = '?',
        Specialisation = '?',
        GPA = '?'
      WHERE StudentID = '?'`;
    const result = await connection.query(query, [FullName, Specialisation, GPA, StudentID]);

    return result;
  } catch (err) {
    console.error("Error in UpdateStudent", err);
    throw err;
  } finally {
    connection.close();
  }
}


async function Assign(Studid, OppID, comments) {
  const connection = await dbConfig.connectDB();
  const result = await connection.query(
    "EXEC Assign(" + Studid + "," + OppID + "," + comments + ")",
  );
  connection.close();
  return result;
}

async function EditAssign(newID, oldID, opportunityID) {
  try {
    const connection = await dbConfig.connectDB();
    let sql = "";
    if (!newID && oldID) {
      sql = `DELETE FROM Assigned WHERE StudentID = '${oldID}'`;
    } else if (newID && !oldID) {
      sql = `INSERT INTO Assigned (OpportunityID, StudentID) VALUES ('${opportunityID}','${newID}')`;
    } else if (newID && oldID) {
      sql = `UPDATE Assigned SET StudentID = '${newID}' WHERE StudentID = '${oldID}'`;
    }

    let result = null;
    if (sql !== "") {
      result = await connection.query(sql);
    }

    connection.close();
    return result;
  } catch (error) {
    console.error("Error in EditAssign: ", error);
    throw error;
  }
}

async function UnAssign(Studid) {
  const connection = await dbConfig.connectDB();
  const result = await connection.query("EXEC UnAssign(" + Studid + ")");
  connection.close();
  return result;
}

async function getAllPRISM() {
  const connection = await dbConfig.connectDB();
  const result = await connection.query("EXEC GetAllPRISM");
  connection.close();
  return result;
}

async function AllPRISMSummary() {
  const connection = await dbConfig.connectDB();
  const result = await connection.query("EXEC AllPRISMSummary");
  connection.close();
  return result;
}

async function AddPRISM(
  slots,
  type,
  title,
  teacher,
  specialisation,
  company,
  startDate,
  endDate,
  description,
) {
  let connection;

  try {
    const connection = await dbConfig.connectDB(); // Ensure proper connection handling
    const request = new sql.Request(connection);

    // Prevent SQL Injection
    request.input("PRISMType", sql.NVarChar(50), type);
    request.input("PRISMTitle", sql.NVarChar(50), title);
    request.input("PRISMDescription", sql.NVarChar(sql.MAX), description);
    request.input("PRISMCompany", sql.NVarChar(50), company);
    request.input("OpportunitiesSlots", sql.Int, slots);
    request.input("OpportunitiesTeacher", sql.NVarChar(50), teacher);
    request.input("OpportunitiesSpecialisation", sql.Char(3), specialisation);
    request.input("OpportunitiesStartDate", sql.DateTime, new Date(startDate));
    request.input("OpportunitiesEndDate", sql.DateTime, new Date(endDate));

    const result = await request.execute("AddPRISM");
    return result;
  } catch (error) {
    console.error("Error in AddPRISM:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function getAllITP() {
  const connection = await dbConfig.connectDB();
  const result = await connection.query("EXEC GetAllITP");
  connection.close();
  return result;
}

async function AllITPSummary() {
  const connection = await dbConfig.connectDB();
  const result = await connection.query("EXEC AllITPSummary");
  connection.close();
  return result;
}

// async function AddITP(company,job,desc,Slots,Teach,spec,startDate,endDate) {
//     const connection = await dbConfig.connectDB();
//     const result = await connection.query('EXEC AddITP('+company +','+job +','+desc+','+Slots+','+
//     Teach+','+spec+','+startDate+','+endDate+',' +')');
//     connection.close();
//     return result;
// }

async function AddITP(
  company,
  role,
  description,
  slots,
  teacher,
  specialisation,
  startDate,
  endDate,
) {
  let connection;

  try {
    const connection = await dbConfig.connectDB(); // Ensure proper connection handling
    const request = new sql.Request(connection);

    // Prevent SQL Injection
    request.input("Company", sql.NVarChar(50), company);
    request.input("JobRole", sql.NVarChar(50), role);
    request.input("Description", sql.NVarChar(sql.MAX), description);
    request.input("Slots", sql.Int, slots);
    request.input("Teacher", sql.NVarChar(50), teacher);
    request.input("Specialisation", sql.Char(3), specialisation);
    request.input("StartDate", sql.DateTime, new Date(startDate));
    request.input("EndDate", sql.DateTime, new Date(endDate));

    const result = await request.execute("AddITP");
    return result;
  } catch (error) {
    console.error("Error in AddITP:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function getSlots(id) {
  const connection = await dbConfig.connectDB();
  const result = await connection.query("EXEC GetSlots(" + id + ")");
  connection.close();
  return result;
}

async function getITPTable() {
  const connection = await dbConfig.connectDB();
  const result = await connection.query("EXEC GetALLITP");
  connection.close();
  return result;
}

async function getPRISMTable() {
  const connection = await dbConfig.connectDB();
  const result = await connection.query("SELECT * FROM dbo.PRISM");
  connection.close();
  return result;
}
async function UpdatePRISM(
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
) {
  let connection;
  try {
    const connection = await dbConfig.connectDB(); // Ensure proper connection handling
    const request = new sql.Request(connection);

    // Prevent SQL Injection
    request.input("PRISMOpportunityID", sql.Char(5), id);
    request.input("PRISMType", sql.NVarChar(50), type);
    request.input("PRISMTitle", sql.NVarChar(50), title);
    request.input("PRISMDescription", sql.NVarChar(sql.MAX), description);
    request.input("PRISMCompany", sql.NVarChar(50), company);
    request.input("OpportunitiesSlots", sql.Int, slots);
    request.input("OpportunitiesTeacher", sql.NVarChar(50), teacher);
    request.input("OpportunitiesSpecialisation", sql.Char(3), specialisation);
    request.input("OpportunitiesStartDate", sql.DateTime, new Date(startDate));
    request.input("OpportunitiesEndDate", sql.DateTime, new Date(endDate));

    const result = await request.execute("UpdatePRISM");
    return result;
  } catch (error) {
    console.error("Error in UpdatePRISM:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function UpdateITP(
  id,
  company,
  role,
  description,
  slots,
  teacher,
  specialisation,
  startDate,
  endDate,
) {
  let connection;
  try {
    const connection = await dbConfig.connectDB();
    const request = new sql.Request(connection);

    request.input("OpportunityID", sql.Char(5), id);
    request.input("Company", sql.NVarChar(50), company);
    request.input("JobRole", sql.NVarChar(50), role);
    request.input("Description", sql.NVarChar(sql.MAX), description);
    request.input("Slots", sql.Int, slots);
    request.input("Teacher", sql.NVarChar(50), teacher);
    request.input("Specialisation", sql.Char(3), specialisation);
    request.input("StartDate", sql.DateTime, new Date(startDate));
    request.input("EndDate", sql.DateTime, new Date(endDate));

    const result = await request.execute("UpdateITP");
    return result;
  } catch (error) {
    console.error("Error in UpdateITP:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function deleteITP(id) {
  let connection;
  try {
    const connection = await dbConfig.connectDB();
    const request = new sql.Request(connection);

    request.input("OpportunityID", sql.Char(5), id.toString());

    const result = await request.execute("DelITP");
    return result;
  } catch (error) {
    console.error("Error in DelITP:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function deletePRISM(id) {
  let connection;
  try {
    const connection = await dbConfig.connectDB();
    const request = new sql.Request(connection);

    request.input("OpportunityID", sql.Char(5), id.toString());

    const result = await request.execute("DELPrism");
    return result;
  } catch (error) {
    console.error("Error in DelITP:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function bulkInsertStudentData(studentData) {
  const connection = await dbConfig.connectDB();
  
  try {
    for (const student of studentData) {
      let query = "INSERT INTO Students (StudentID, FullName, GPA, Specialisation) VALUES (?, ?, ?, ?)";
      const values = [student.adminNo, student.studentName, student.gpa, student.specialization];

      await connection.query(query, values);
    }

    return { message: "All students inserted successfully" };
  } catch (err) {
    console.error("Error during database operation", err);
    throw err;
  } finally {
    connection.close();
  }
}

module.exports = {
  getAllStudents,
  getStudent,
  AddStudent,
  UpdateStudent,
  Assign,
  EditAssign,
  UnAssign,
  getAllPRISM,
  AllPRISMSummary,
  AddPRISM,
  getSlots,
  getAllITP,
  AllITPSummary,
  AddITP,
  getSlots,
  getITPTable,
  getPRISMTable,
  UpdatePRISM,
  UpdateITP,
  deleteITP,
  deletePRISM,
};
