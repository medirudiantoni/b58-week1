const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`CREATE TABLE projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_name TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      description TEXT,
      technologies TEXT, 
      image_url TEXT
    )`);
  });
  

module.exports = db;