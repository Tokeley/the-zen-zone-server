const express = require('express')
const {
    getAmbiences,
    createAmbience,
    deleteAmbience,
    getRandomAmbience
} = require('../controllers/ambienceController')

const router = express.Router()

// GET all ambiences
router.get('/', getAmbiences)

// POST a new ambience
router.post('/', createAmbience)

// DELETE a ambience
router.delete('/:id', deleteAmbience)

// get a random ambience
router.get('/random', getRandomAmbience);

module.exports = router