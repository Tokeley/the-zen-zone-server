const Ambience = require('../models/ambienceModel')
const mongoose = require('mongoose')

// get all ambiences
const getAmbiences = async (req, res) => {

  const ambiences = await Ambience.find({}).sort({createdAt: -1})

  res.status(200).json(ambiences)
}

// create a new ambience
const createAmbience = async (req, res) => {
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
    const ambience = await Ambience.create({title, audioPath, imagePath})
    res.status(200).json(ambience)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete an ambience
const deleteAmbience = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such ambience'})
  }

  const ambience = await Ambience.findOneAndDelete({_id: id})

  if (!ambience) {
    return res.status(400).json({error: 'No such ambience'})
  }

  res.status(200).json(ambience)
}

// get a random ambience
const getRandomAmbience = async (req, res) => {
  const ambiences = await Ambience.find({}).sort({createdAt: -1})
  const index = Math.floor(Math.random() * ambiences.length);
  const randomAmbience = ambiences[index]

  res.status(200).json(randomAmbience)
}


module.exports = {
  getAmbiences,
  createAmbience,
  deleteAmbience,
  getRandomAmbience
}