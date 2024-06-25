const express = require('express');

// controller functions
const { 
    loginUser, 
    signupUser,
    postFavorites,
    addSoundscapeToFavourite,
    removeSoundscapeFromFavourites,
    postMixes,
    addMix,
    removeMix
} = require('../controllers/userController');

const requireAuth = require('../controllers/authController');

const router = express.Router();

// public routes
router.post('/login', loginUser);
router.post('/signup', signupUser);

// Protected routes
router.use(requireAuth);

router.post('/getFavourites', postFavorites);
router.post('/addSoundscapeToFavourites', addSoundscapeToFavourite);
router.post('/removeSoundscapeFromFavourites', removeSoundscapeFromFavourites);
router.post('/getMixes', postMixes);
router.post('/addMix', addMix);
router.post('/removeMix', removeMix);

module.exports = router;