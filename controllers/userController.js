const User = require('../models/userModel');
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

    res.status(200).json({email, token});
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

    res.status(200).json({email, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// get user's favoutite ambiences
const getFavorites = async (req, res) => {
    const { userId } = req.body;

    const user = await User.findById(userId).populate('favourites');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const favorites = user.favourites;

    res.status(200).json({ favorites });
};

// add ambience to user's favourites
const addAmbienceToFavourite = async (req, res) => {
    const { userId, ambienceId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!mongoose.Types.ObjectId.isValid(ambienceId)) {
      return res.status(404).json({error: 'Invalid ambience ID'});
    }

    if (user.favourites.includes(ambienceId)) {
      return res.status(404).json({error: 'Ambince already in favourites'});
    }

    user.favourites.push(ambienceId);
    await user.save();

    res.status(200).json({ message: `Ambience: "${ambienceId}" added to user: "${userId}" favorites successfully` });

}

const removeAmbienceFromFavourites = async (req, res) => {
  const { userId, ambienceId } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!mongoose.Types.ObjectId.isValid(ambienceId)) {
    return res.status(404).json({error: 'Invalid ambience ID'});
  }

  if (!user.favourites.includes(ambienceId)) {
    return res.status(404).json({error: 'Ambince not in favourites'});
  }

  user.favourites.remove(ambienceId);
  await user.save();

  res.status(200).json({ message: `Ambience: "${ambienceId}" removed from user: "${userId}" favorites successfully` });
}

module.exports = { 
  signupUser, 
  loginUser,
  getFavorites, 
  addAmbienceToFavourite,
  removeAmbienceFromFavourites
}