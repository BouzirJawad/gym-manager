const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/users')
const sessionRoutes = require('./routes/sessions')
require('dotenv').config()

const app = express()
const PORT = 8080
const MONGO_URL = process.env.MONGO_URL

app.use(cors())
app.use(express.json())

mongoose.connect(MONGO_URL)
.then(()=>{console.log('MongoDB is Connected')})
.catch((err)=> console.log(err))

app.use("/api/users", userRoutes)
app.use("/api/sessions", sessionRoutes)

app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`)
})

