const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;

let db;

function connectWithRetry() {
  console.log("Trying to connect to DB...");

  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  db.connect((err) => {
    if (err) {
      console.log("DB not ready, retrying in 3 seconds...");
      setTimeout(connectWithRetry, 3000);
    } else {
      console.log("Connected to MySQL!");
    }
  });
}

connectWithRetry();

app.get("/api/data", (req, res) => {
  db.query("SELECT 'Hello from MySQL' AS message", (err, results) => {
    if (err) {
      res.status(500).send("DB Error");
      return;
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});