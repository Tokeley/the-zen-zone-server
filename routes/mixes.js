const express = require('express')
const {
    getMix
} = require('../controllers/mixController')

const router = express.Router()

// GET all soundscapes
router.get('/:id', getMix)


module.exports = router