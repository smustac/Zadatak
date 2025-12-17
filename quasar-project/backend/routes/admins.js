import express from "express";
import pool from "../db/connection.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM admins");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




export default router;
