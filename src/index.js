const express = require("express");
const bodyParser = require("body-parser");
const db = require("./model/db");

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.post("/projects", (req, res) => {
  const {
    project_name,
    start_date,
    end_date,
    description,
    technologies,
    image_url,
  } = req.body;
  const techJSON = JSON.stringify(technologies);
  db.run(
    `INSERT INTO projects (project_name, start_date, end_date, description, technologies, image_url) 
          VALUES (?, ?, ?, ?, ?, ?)`,
    [project_name, start_date, end_date, description, techJSON, image_url],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
});

app.get("/projects", (req, res) => {
  db.get(`SELECT * FROM projects`, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }

    const projects = rows.map((row) => {
      row.technologies = JSON.parse(row.technologies);
      return row;
    });

    res.json({ data: projects });
  });
});

app.get("/projects/:id", (req, res) => {
  const { id } = req.params;

  db.get(`SELECT * FROM projects WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (row) {
      row.technologies = JSON.parse(row.technologies);
    }

    res.json({ data: row });
  });
});

app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM projects WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({
      message: "Project deleted successfully",
      changes: this.changes,
    });
  });
});

app.use("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => console.log(`Running on port: ${port}`));
