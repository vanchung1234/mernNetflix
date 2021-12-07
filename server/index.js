require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./router/auth')
const movieRouter = require('./router/movies')
const listRouter = require('./router/lists')
const userRoute = require('./router/users')
const connectDB = async() => {
    try {
        await mongoose.connect(
            `
            mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.smjhy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
                `, {

                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        console.log('ConnectDB successfully')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/movies',movieRouter)
app.use('/api/lists',listRouter)
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`))