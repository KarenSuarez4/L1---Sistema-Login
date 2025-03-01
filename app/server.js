import express from "express";
import cors from "cors";
import connectiondb from "./database/database.js";

const app = express();
const port = process.env.API_PORT || 3001; // Usar un puerto diferente para la API

app.use(cors());
app.use(express.json());

app.get("/api/users", (req, res) => {
  connectiondb.query(
    `
        SELECT 
            u.id_user, 
            u.user_name, 
            u.document_number_person, 
            u.email_user, 
            CONCAT(u.first_name_person, ' ', u.last_name_person) AS full_name, 
            IF(u.is_actived = 1, 'Active', 'Inactive') AS user_status,
            GROUP_CONCAT(r.name_role_user) AS roles
        FROM users u
        LEFT JOIN user_role ur ON u.id_user = ur.id_user
        LEFT JOIN role r ON ur.id_role = r.id_role
        GROUP BY u.id_user
    `,
    (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        res.status(500).json({ error: "Database query error" });
        return;
      }

      results.forEach((row) => {
        if (!row.roles) {
          row.roles = "";
        }
      });

      res.json(results);
    }
  );
});

app.get("/api/users", (req, res) => {
  connectiondb.query(
    `
        SELECT 
            u.id_user, 
            u.user_name, 
            u.document_number_person, 
            u.email_user, 
            CONCAT(u.first_name_person, ' ', u.last_name_person) AS full_name, 
            IF(u.is_actived = 1, 'Active', 'Inactive') AS user_status,
            GROUP_CONCAT(r.name_role_user) AS roles
        FROM users u
        LEFT JOIN user_role ur ON u.id_user = ur.id_user
        LEFT JOIN role r ON ur.id_role = r.id_role
        GROUP BY u.id_user
    `,
    (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        res.status(500).json({ error: "Database query error" });
        return;
      }
      results.forEach((row) => {
        if (!row.roles) {
          row.roles = "";
        }
      });

      res.json(results);
    }
  );
});

app.get("/api/roles", (req, res) => {
  connectiondb.query(
    `SELECT id_role, name_role_user FROM role WHERE name_role_user != 'SuperAdmin'`,
    (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        res.status(500).json({ error: "Database query error" });
        return;
      }

      res.json(results);
    }
  );
});

app.post("/api/users/:id/roles", (req, res) => {
  const userId = req.params.id;
  const roles = req.body.roles;
  connectiondb.query(
    `DELETE FROM user_role WHERE id_user = ?`,
    [userId],
    (error) => {
      if (error) {
        console.error("Database query error:", error);
        res.status(500).json({ error: "Database query error" });
        return;
      }
      const values = roles.map((role) => [userId, role]);
      connectiondb.query(
        `INSERT INTO user_role (id_user, id_role) VALUES ?`,
        [values],
        (error) => {
          if (error) {
            console.error("Database query error:", error);
            res.status(500).json({ error: "Database query error" });
            return;
          }
          res.json({ message: "Roles updated successfully" });
        }
      );
    }
  );
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
