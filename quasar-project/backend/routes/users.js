import express from "express";
import pool from "../db/connection.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/", async (req, res) => {
  const { name, email } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO users (username, email) VALUES (?, ?)",
      [name, email]
    );
    res.json({ id: result.insertId, name, email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




export default router;
