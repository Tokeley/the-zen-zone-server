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

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// get favoutites route
router.post('/getFavourites', postFavorites);

// add soundscape to favourites
router.post('/addSoundscapeToFavourites', addSoundscapeToFavourite);

// remove soundscape to favourites
router.post('/removeSoundscapeFromFavourites', removeSoundscapeFromFavourites);

// get favoutites route
router.post('/getMixes', postMixes);

// add soundscape to favourites
router.post('/addMix', addMix);

// remove soundscape to favourites
router.post('/removeMix', removeMix);

module.exports = router;