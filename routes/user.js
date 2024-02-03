const express = require('express');

// controller functions
const { 
    loginUser, 
    signupUser,
    getFavorites,
    addAmbienceToFavourite
} = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// get favoutites route
router.get('/getFavourites', getFavorites);

// add ambience to favourites
router.post('/addAmbienceToFavourites', addAmbienceToFavourite);

module.exports = router;