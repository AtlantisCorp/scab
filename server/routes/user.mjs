import express from 'express'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { User } from '../models/user.mjs'
import authenticate from '../services/authenticate.mjs'

export default express.Router()
    .post('/register', (req, res) => {
        const username = req.body.username
        const password = req.body.password 

        if (!username || !password) {
            res.status(400).send('Username or Password are invalid.')
            return 
        }

        bcrypt.hash(password, 10, (err, encrypted) => {
            if (err) {
                res.status(500).send('Error (bcrypt): ' + err)
                return 
            }

            User.create({
                username: username,
                hashedPassword: encrypted
            }, (err, user) => {
                if (err) {
                    res.status(500).send('Error (mongoose): ' + err)
                    return 
                }

                res.status(200).end()
            })
        })
    })

    .post('/login', (req, res) => {
        const username = req.body.username
        const password = req.body.password

        if (!username || !password) {
            res.status(400).send('Error: invalid request.')
            return 
        }

        User.findOne({ username: username }, (err, user) => {
            if (err) {
                res.status(500).send('Error (mongoose): ' + err)
                return 
            }

            if (!user) {
                res.status(400).send('Error (mongoose): User not found.')
                return 
            }

            bcrypt.compare(password, user.hashedPassword, (err, same) => {
                if (err) {
                    res.status(500).send('Error (bcrypt): ' + err) 
                    return 
                }

                if (!same) {
                    res.status(401).send('Error: Password invalid.')
                    return 
                }

                const tokenSecret = process.env['jsonWebTokenSecret']

                jsonwebtoken.sign({
                    timestamp: Date.now(),
                    userId: user._id
                }, tokenSecret, (err, token) => {
                    if (err) {
                        res.status(500).send('Error: jsonwebtoken.sign() failed.')
                        return 
                    }

                    res.status(200).json({ token: token })
                })
            })
        })
    })

    .put('/', authenticate, (req, res) => {
        if (!req.userId) {
            res.status(500).send('Error: null userId.')
            return 
        }

        User.findById(req.userId, (err, user) => {
            if (err) {
                res.status(500).send('Error: cannot find user.')
                return 
            }

            const password = req.body.password
            const newUsername = req.body.newUsername 
            const newPassword = req.body.newPassword

            bcrypt.compare(password, user.hashedPassword, (err, same) => {
                if (err) {
                    res.status(500).send('Error (bcrypt): ' + err)
                    return 
                }

                if (!same) {
                    res.status(401).send('Error: invalid password.')
                    return 
                }

                if (newUsername) {
                    user.username = newUsername
                }
                if (newPassword) {
                    user.hashedPassword = bcrypt.hashSync(newPassword, 10)
                }

                user.save((err) => {
                    if (err) {
                        res.status(500).send('Error (mongoose): ' + err) 
                        return 
                    }

                    res.status(200).end()
                })
            })
        })
    })

    .delete('/', authenticate, (req, res) => {
        if (!req.userId) {
            res.status(500).send('Error: null userId.')
            return 
        }

        User.findByIdAndDelete(req.userId, (err) => {
            if (err) {
                res.status(500).send('Error (mongoose): ' + err)
                return 
            }

            res.status(200).end()
        })
    })
