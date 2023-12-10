const dbConfig = require('../config/dbConfig');

async function loginUser(email, password) {
    const connection = await dbConfig.connectDB();
    const result = await connection.query('EXEC LoginUser(@Email, @Password)', {
        Email: email,
        Password: password
    });
    connection.close();
    return result;
}

module.exports = {
    loginUser
};
