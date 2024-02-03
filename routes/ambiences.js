const express = require('express')
const {
    getAmbiences,
    createAmbience,
    deleteAmbience
} = require('../controllers/ambienceController')

const router = express.Router()

// GET all ambiences
router.get('/', getAmbiences)

// POST a new ambience
router.post('/', createAmbience)

// DELETE a ambience
router.delete('/:id', deleteAmbience)


module.exports = router