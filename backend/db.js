const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin@123",
  database: "blood_D"
});

db.connect(err => {
  if(err) throw err;
  console.log("MySQL Connected");
});

module.exports = db;
