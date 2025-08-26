// db.js
const mysql = require("mysql");
const { getParameter } = require("./ssm");

let pool;

async function initPool() {
  try {
    const host = await getParameter("/myapp/db/host", false);
    const user = await getParameter("/myapp/db/user", false);
    const password = await getParameter("/myapp/db/password", true);
    const database = await getParameter("/myapp/db/database", false);

    pool = mysql.createPool({
      connectionLimit: 10,
      host,
      user,
      password,
      database,
    });

    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("✅ Connected to database");
      connection.release();
    });
  } catch (err) {
    console.error("❌ DB Pool initialization failed:", err);
    process.exit(1); // stop server if DB cannot connect
  }
}

// Initialize immediately
initPool();

// Export a function returning the pool
module.exports = () => pool;