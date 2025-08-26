const mysql = require("mysql");
const { getParameter } = require("./ssm");

async function createPool() {
  const host = await getParameter("/myapp/db/host", false);
  const user = await getParameter("/myapp/db/user", false);
  const password = await getParameter("/myapp/db/password", true);
  const database = await getParameter("/myapp/db/database", false);

  const pool = mysql.createPool({
    connectionLimit: 10,
    host,
    user,
    password,
    database,
  });

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Joined to the database");
    connection.release();
  });

  return pool;
}

// Export promise (wait until pool is created)
module.exports = createPool();