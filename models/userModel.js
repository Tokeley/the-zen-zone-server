const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  favourites: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Soundscape"
    },
  ],
  mixes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Mix"
    }
  ]
})

// static signup method
userSchema.statics.signup = async function(email, password) {
  const hasNumber = /\d/;
  const hasLetter = /[a-zA-Z]/;

  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (password.length < 8) {
    throw Error('Password must be at least 8 characters long')
  }
  if (!hasNumber.test(password)) {
    throw Error('Password must contain a number')
  }
  if (!hasLetter.test(password)) {
    throw Error('Password must contain a letter')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash,  favourites: []})

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)