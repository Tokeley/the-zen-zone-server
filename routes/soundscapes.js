const express = require('express')
const {
    getSoundscapes,
    createSoundscape,
    deleteSoundscape,
    getRandomSoundscape
} = require('../controllers/soundscapeController')

const router = express.Router()

// GET all soundscapes
router.get('/', getSoundscapes)

// POST a new soundscape
router.post('/', createSoundscape)

// DELETE a soundscape
router.delete('/:id', deleteSoundscape)

// get a random soundscape
router.get('/random', getRandomSoundscape);

module.exports = router