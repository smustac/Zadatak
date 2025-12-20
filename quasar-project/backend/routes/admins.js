import express from "express";
import pool from "../db/connection.js";
import auth from "../../middleware/auth.js";
import isAdmin from "../../middleware/isAdmin.js";

const router = express.Router();

/**
 * 🔒 Apply protection to ALL admin routes
 * - auth → verifies token & sets req.user
 * - isAdmin → allows only admin role
 */
router.use(auth);
router.use(isAdmin);

/**
 * GET /admins
 * Only accessible by authenticated admins
 */
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM admins");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
