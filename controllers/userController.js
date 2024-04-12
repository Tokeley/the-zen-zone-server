const User = require('../models/userModel');
const Mix = require('../models/mixModel');
const Soundscape = require('../models/soundscapeModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    const id = user._id;

    res.status(200).json({email, token, id});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.signup(email, password);

    // create a token
    const token = createToken(user._id);
    const id = user._id;

    res.status(200).json({email, token, id});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// get user's favoutite soundscapes
const postFavorites = async (req, res) => {
    const { userId } = req.body;

    const user = await User.findById(userId).populate('favourites');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const favorites = user.favourites;

    res.status(200).json(favorites);
};

// add soundscape to user's favourites
const addSoundscapeToFavourite = async (req, res) => {
    const { userId, soundscapeId } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({error: 'Invalid user ID'});
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!mongoose.Types.ObjectId.isValid(soundscapeId)) {
      return res.status(404).json({error: 'Invalid soundscape ID'});
    }

    const soundScape = await Soundscape.findById(soundscapeId);

    if (!soundScape) {
      return res.status(404).json({ error: "Soundscape not found" });
    }

    if (user.favourites.includes(soundscapeId)) {
      return res.status(404).json({error: 'Ambince already in favourites'});
    }

    user.favourites.push(soundscapeId);
    await user.save();

    // Populate the favourites array with actual soundscape documents
    await user.populate('favourites');

    // Return the updated user favorites
    res.status(200).json({ favourites: user.favourites });

}

const removeSoundscapeFromFavourites = async (req, res) => {
  const { userId, soundscapeId } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!mongoose.Types.ObjectId.isValid(soundscapeId)) {
    return res.status(404).json({error: 'Invalid soundscape ID'});
  }

  if (!user.favourites.includes(soundscapeId)) {
    return res.status(404).json({error: 'Ambince not in favourites'});
  }

  user.favourites.remove(soundscapeId);
  await user.save();

  // Populate the favourites array with actual soundscape documents
  await user.populate('favourites');

  // Return the updated user favorites
  res.status(200).json({ favourites: user.favourites });
}

// get user's mixes
const postMixes = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId).populate('mixes');

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const mixes = user.mixes;

  res.status(200).json(mixes);
};

// create mix, and add to user mixes
const addMix = async (req, res) => {
  const { userId, mix: mixData , title} = req.body;

  const user = await User.findById(userId);


  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!title) {
    return res.status(404).json({ error: "Title required" });
  }

  if (user.mixes.some(item => item.title === title)){
    return res.status(404).json({ error: "Title already in use" });
  }

  try {
    
    const mix = await Mix.makeMix(title, mixData);
    user.mixes.push(mix);
    await user.save();

    // Respond with the created mix
    res.status(200).json({ userId, mix });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
};

const removeMix = async (req, res) => {
  const { userId, mixId } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!mongoose.Types.ObjectId.isValid(mixId)) {
    return res.status(404).json({error: 'Invalid mix ID'});
  }

  if (!user.mixes.includes(mixId)) {
    return res.status(404).json({error: 'Mix not in mixes'});
  }

  user.mixes.remove(mixId);
  await user.save();

  // Populate the favourites array with actual soundscape documents
  await user.populate('mixes');

  // Return the updated user favorites
  res.status(200).json({ mixes: user.mixes });
}

module.exports = { 
  signupUser, 
  loginUser,
  postFavorites, 
  addSoundscapeToFavourite,
  removeSoundscapeFromFavourites,
  postMixes,
  addMix,
  removeMix
}