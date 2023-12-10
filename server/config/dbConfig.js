require("dotenv").config();
const odbc = require("odbc");
const sql = require("mssql");
// const sqlv8 = require("mssql/msnodesqlv8");

async function connectDB() {
  if (process.env.DB_Environment === "Azure") {
    const config = {
      user: process.env.Azure_DB_User,
      password: process.env.Azure_DB_Password,
      server: process.env.Azure_DB_Server,
      port: Number(process.env.Azure_DB_Port),
      database: process.env.Azure_DB_Name,
      authentication: {
        type: "default",
      },
      options: {
        encrypt: true,
      },
    };

    const connect = new sql.connect(config);
    return connect;
  } else if (process.env.DB_Environment === "Local") {
    const config = {
      server: process.env.Local_DB_Server,
      database: process.env.Local_DB_Name,
      driver: "msnodesqlv8",
      options: {
        trustedConnection: true,
      },
    };

    const connect = new sql.connect(config);
    return connect;
  }
}

//Old Method
// async function connectDB() {
//     return await odbc.connect(process.env.LocalDBConnectionString);
// }

module.exports = {
  connectDB,
};
