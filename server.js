const express = require('express')
const app = express()
const path = require('path')

const cors = require('cors')

const PORT = process.env.PORT || 3000 

// used to fetch css files on reload of website
app.use(express.static('public'))

// used to fetch json data.. req.body
app.use(express.json())

const connectDB = require('./config/db')
connectDB() 

// CORS
const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
    // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:8000']
}

app.use(cors(corsOptions))

// Template Engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs') 

// Routes
app.use('/api/files', require('./routes/files'))

app.use('/files', require('./routes/show'))

app.use('/files/download', require('./routes/download'))

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})