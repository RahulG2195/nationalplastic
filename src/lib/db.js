import mysql from "mysql2/promise";
import "../../envConfig.js";

export async function query({ query, values = [] }) {
  try {
    const dbconnection = await mysql.createConnection({
      Host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: process.env.MYSQL_PORT,
    });
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    console.log("error in connecting Database: " + error);
    throw Error(error.message);
    return { error };
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
