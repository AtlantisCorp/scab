import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

import UserRouter from './routes/user.mjs'

const globalDb = {
    url: process.env['dbUrl'],
    name: process.env['dbName'],
    connection: null,
    express: null,
    expressPort: process.env['serverPort'] || 8888
}

console.log(`Connecting to MongoDb: ${globalDb.url}/${globalDb.name}...`)

mongoose.connect(`${globalDb.url}/${globalDb.name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

globalDb.connection = mongoose.connection
globalDb.connection.on('error', console.error.bind(console, 'MongoDb Connection Error: '))

globalDb.connection.once('open', () => {
    console.log('Connected to MongoDb database.')

    globalDb.express = express()
    globalDb.express.use(cors())
    globalDb.express.use(bodyParser.json())
    globalDb.express.use(bodyParser.urlencoded({ extended: true }))

    globalDb.express.use((req, res, next) => {
        console.log(`New request from ${req.ip}: ${req.method} ${req.originalUrl}.`)
        console.log('Headers: ', req.headers)
        console.log('Body: ', req.body)

        next()
    })

    globalDb.express.use('/api/v1/about', (req, res) => {
        res.status(200).send(`
            <h4>Scab REST API</h4>
            <p>Version 0.1</p>
            <p>Dedicated to Michel Gay, beloved Grandfather.</p>
        `)
    })

    globalDb.express.use('/api/v1/user', UserRouter)

    globalDb.express.use('*', (req, res) => {
        res.status(404).end()
    })

    globalDb.express.listen(globalDb.expressPort, () => {
        console.log(`Listening on PORT ${globalDb.expressPort}.`)
    })

    process.on('SIGINT', () => {
        console.log('\nExiting server.');
        process.exit();
    })
})