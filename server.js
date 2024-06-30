require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors'); // Add this line to import the cors package
const soundscapeRoutes = require('./routes/soundscapes')
const userRoutes = require('./routes/user')
const mixRoutes = require('./routes/mixes')

// express app
const app = express()

app.use(cors(
  {
    origin: ["https://www.thezenzone.app/"],
    methods: ["POST", "GET"],
    credentials: true
  }
));
// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/soundscapes', soundscapeRoutes)
app.use('/api/user', userRoutes)
app.use('/api/mixes', mixRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })