const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const mongoURL = 'mongodb://localhost:27017/movieapp'

mongoose.connect(mongoURL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Koneksi Berhasil')
}).catch(() => {
    console.log('Koneksi Gagal Coba Lagi')
})

const directory = path.join(__dirname, '/statics')
app.use(express.static(directory))
app.use(cors())

app.use(bodyParser.json({
    extended: true,
    limit: '20mb'
}))

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '20mb'
}))

app.use('/user', require('./routes/user'))
app.use('/movie', require('./routes/movie'))
app.use('/order', require('./routes/order'))

app.listen('8000', () => {
    console.log('Server Telah Dijalankan')
})