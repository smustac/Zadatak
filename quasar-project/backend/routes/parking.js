import express from 'express'
import pool from '../db/connection.js'
import auth from '../middleware/auth.js'

const router = express.Router()
router.use(auth)


router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM parking_spots ORDER BY id')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Greška pri dohvaćanju parkinga' })
  }
})


router.post('/:id/occupy', async (req, res) => {
  const spotId = req.params.id
  const userId = req.user.id
  const role = req.user.role

  try {

    const [existing] = await pool.query(
      'SELECT id FROM parking_spots WHERE taken_by = ? AND taken = true',
      [userId]
    )
    if (existing.length > 0) return res.status(400).json({ message: 'Već imate zauzeto parking mjesto' })

    const [spotRows] = await pool.query('SELECT * FROM parking_spots WHERE id = ?', [spotId])
    if (spotRows.length === 0) return res.status(404).json({ message: 'Mjesto ne postoji' })
    const spot = spotRows[0]

    if (spot.type === 'vip' && role !== 'vip') return res.status(403).json({ message: 'Nemate pravo na VIP mjesto' })
    if (spot.type === 'invalid' && role !== 'invalid') return res.status(403).json({ message: 'Nemate pravo na invalid mjesto' })
    if (spot.taken) return res.status(400).json({ message: 'Mjesto je već zauzeto' })

    await pool.query(
      `UPDATE parking_spots
       SET taken = true,
           taken_by = ?,
           taken_at = NOW(),
       WHERE id = ? AND taken = false`,
      [userId, spotId]
    )

    res.json({ message: 'Parking mjesto zauzeto' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Greška pri zauzimanju parkinga' })
  }
})


router.post('/:id/release', async (req, res) => {
  const spotId = req.params.id
  const userId = req.user.id

  try {
    await pool.query(
      `UPDATE parking_spots
       SET taken = false,
           taken_by = NULL,
           taken_at = NULL,
       WHERE id = ? AND taken_by = ?`,
      [spotId, userId]
    )
    res.json({ message: 'Parking mjesto oslobođeno' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Greška pri oslobađanju parkinga' })
  }
})

export default router
