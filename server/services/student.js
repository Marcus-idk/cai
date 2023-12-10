const dbConfig = require('../config/dbConfig')

async function UpdateStudent(id,name,resume,gpa,interest,Framework,ProjRank) {
    const connection = await dbConfig.connectDB();
    const result = await connection.query('EXEC UpdateStudent(' + id + ',' + name + ',' + resume + ',' + gpa + ',' + interest + ',' + Framework + ',' + ProjRank + ',' + ')');
    connection.close();
    return result;
}

async function updateStudentProjectRankings(studentID, projectRankings) {
    try {
        const connection = await dbConfig.connectDB();

        const sql = `UPDATE dbo.Students SET ProjRank = '${projectRankings}' WHERE StudentID = '${studentID}'`;
        await connection.query(sql);

        console.log('Project rankings updated successfully for student:', studentID);
        connection.close();
    } catch (error) {
        console.error('Error in updateStudentProjectRankings:', error);
        throw error;
    }
}

async function ensureTagsExist(tags) {
    const connection = await dbConfig.connectDB();
    let tagIDs = [];
    for (const tag of tags) {
        let result = await connection.query('EXEC EnsureTagExists @TagName = "' + tag + '"');
        tagIDs.push(result.recordset[0].TagID);
    }
    connection.close();
    return tagIDs;
}


async function getExistingStudentTagAssociations(studentID) {
    const connection = await dbConfig.connectDB();
    const result = await connection.query('EXEC GetStudentTags @StudentID = ' + studentID);
    connection.close();
    return result;
}

async function updateStudentTagAssociations(studentID, tagIDs) {
    console.log("StudentID:" + studentID);
    const connection = await dbConfig.connectDB();
    await connection.query('EXEC DeleteOldStudentTags @StudentID = "' + studentID + '"');
    for (const tagID of tagIDs) {
        await connection.query('EXEC UpdateStudentTags @StudentID = "' + studentID + '", @TagID = ' + tagID);
    }
    connection.close();
}

module.exports = {
    UpdateStudent,
    updateStudentProjectRankings,
    ensureTagsExist,
    getExistingStudentTagAssociations,
    updateStudentTagAssociations
};