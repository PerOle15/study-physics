const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  console.log('requested')
  res.status(200).json({ success: true, data: 'Hallo' })
})

module.exports = router
