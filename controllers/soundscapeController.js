const Soundscape = require('../models/soundscapeModel')
const mongoose = require('mongoose')

// get all soundscapes
const getSoundscapes = async (req, res) => {

  const soundscapes = await Soundscape.find({}).sort({createdAt: -1})

  res.status(200).json(soundscapes)
}

// create a new soundscape
const createSoundscape = async (req, res) => {
  const {title, audioPath, imagePath} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!audioPath) {
    emptyFields.push('audioPath')
  }
  if(!imagePath) {
    emptyFields.push('imagePath')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const soundscape = await Soundscape.create({title, audioPath, imagePath})
    res.status(200).json(soundscape)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete an soundscape
const deleteSoundscape = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such soundscape'})
  }

  const soundscape = await Soundscape.findOneAndDelete({_id: id})

  if (!soundscape) {
    return res.status(400).json({error: 'No such soundscape'})
  }

  res.status(200).json(soundscape)
}

// get a random soundscape
const getRandomSoundscape = async (req, res) => {
  const soundscapes = await Soundscape.find({}).sort({createdAt: -1})
  //const index = Math.floor(Math.random() * soundscapes.length);
  const index = 5;
  const randomSoundscape = soundscapes[index]

  res.status(200).json(randomSoundscape)
}


module.exports = {
  getSoundscapes,
  createSoundscape,
  deleteSoundscape,
  getRandomSoundscape
}