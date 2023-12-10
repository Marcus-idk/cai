const dbConfig = require('../config/dbConfig')

async function getAllStudents() {
    const connection = await dbConfig.connectDB();
    const result = await connection.query('EXEC GetAllStudents');
    connection.close();
    return result;
}

async function getStudent(id) {
    const connection = await dbConfig.connectDB();
    const result = await connection.query('EXEC GetStudent(' + id + ')');
    connection.close();
    return result;
}

async function AddStudent(id,name,resume,spec,gpa) {
    const connection = await dbConfig.connectDB();
    const result = await connection.query('EXEC AddStudent(' + id + ',' + name + ',' + resume + ',' + spec + ',' + gpa + ',' +')');
    connection.close();
    return result;
}

async function Assign(Studid,OppID,comments) {
    const connection = await dbConfig.connectDB();
    const result = await connection.query('EXEC Assign(' + Studid + ',' + OppID +','+ comments +')');
    connection.close();
    return result;
}

async function UnAssign(Studid) {
    const connection = await dbConfig.connectDB();
    const result = await connection.query('EXEC UnAssign(' + Studid +')');
    connection.close();
    return result;
}

async function getAllPRISM() {
    const connection = await dbConfig.connectDB();
    const result = await connection.query('EXEC GetAllPRISM');
    connection.close();
    return result;
}

async function AddPRISM(title,type,desc,Slots,supervisor,spec,startDate,endDate,company) {
    const connection = await dbConfig.connectDB();
    const result = await connection.query('EXEC AddPRISM('+title +','+type+','+desc+','+Slots+','+
    supervisor+','+spec+','+startDate+','+endDate+','+company+',' +')');
    connection.close();
    return result;
}

async function getAllITP() {
    const connection = await dbConfig.connectDB();
    const result = await connection.query('EXEC GetAllITP');
    connection.close();
    return result;
}

async function AddITP(company,job,desc,Slots,Teach,spec,startDate,endDate) {
    const connection = await dbConfig.connectDB();
    const result = await connection.query('EXEC AddITP('+company +','+job +','+desc+','+Slots+','+
    Teach+','+spec+','+startDate+','+endDate+',' +')');
    connection.close();
    return result;
}

async function getSlots(id) {
    const connection = await dbConfig.connectDB();
    const result = await connection.query('EXEC GetSlots('+id+')');
    connection.close();
    return result;
}

async function getITPTable(){
    const connection = await dbConfig.connectDB();
    const result = await connection.query('SELECT * FROM dbo.ITP');
    connection.close();
    return result;
}

async function getPRISMTable(){
    const connection = await dbConfig.connectDB();
    const result = await connection.query('SELECT * FROM dbo.PRISM');
    connection.close();
    return result;
}
async function UpdatePRISM(Id,title,type,desc,Slots,supervisor,spec,startDate,endDate,company) {
    const connection = await dbConfig.connectDB();
    const result = await connection.query('EXEC UpdatePRISM('+Id + ',' +title +','+type+','+desc+','+Slots+','+
    supervisor+','+spec+','+startDate+','+endDate+','+company+',' +')');
    connection.close();
    return result;
}

async function UpdateITP(Id,company,job,desc,Slots,Teach,spec,startDate,endDate) {
    const connection = await dbConfig.connectDB();
    const result = await connection.query('EXEC UpdateITP('+Id+','+company +','+job +','+desc+','+Slots+','+
    Teach+','+spec+','+startDate+','+endDate+',' +')');
    connection.close();
    return result;
}

module.exports = {
    getAllStudents,getStudent,AddStudent,Assign,UnAssign,getAllPRISM,AddPRISM,getSlots,getAllITP,AddITP,getSlots,getITPTable,getPRISMTable,UpdatePRISM,UpdateITP
};