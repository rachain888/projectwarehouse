require('dotenv').config()
const mongoose = require('mongoose')
const db = process.env.ATLAS_URI

const ConnectDB =  async () => {
    try {
        await mongoose.connect(db, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
        })
        console.log('Connected to MongoDB successfuly...')
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = ConnectDB
