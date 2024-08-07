import mysql from "mysql2/promise";
// import "../../envConfig.js";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
export async function query({ query, values = [] }) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [results] = await connection.execute(query, values);
    return results;
  } catch (error) {
    throw Error(error.message);
  } finally {
    if (connection) connection.release();
  }
}
// // db.js file
// import mysql from "mysql2/promise";

// export async function query({ query, values = [] }) {
//   const connection = await mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     port: process.env.MYSQL_PORT,
//     database: process.env.MYSQL_DATABASE,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//   });

//   try {
//     const [results] = await connection.execute(query, values);
//     return results;
//   } catch (error) {
//     throw Error(error.message);
//   } finally {
//     await connection.end();
//   }
// }