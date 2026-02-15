const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "..", "db", "db.sqlite");
const sqlDir = path.join(__dirname, "..", "src", "tables");
const files = ["USERS.sql", "CATEGORIES.sql", "LISTS.sql", "TASKS.sql"];

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  files.forEach((file) => {
    const sql = fs.readFileSync(path.join(sqlDir, file), "utf-8");
    db.exec(sql);
  });
});

db.close();
console.log("DB initialized:", dbPath);
