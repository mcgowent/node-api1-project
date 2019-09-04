// implement your API here

const express = require('express')
const db = require('./data/db.js')

const server = express();

server.use(express.json())

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => res.status(200).json(users))
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})

server.post('/api/users', (req, res) => {
    console.log(req.body)
    const user = req.body
    db.insert(user)
        .then(({ id }) => {
            db.findById(id)
                .then(user => {
                    res.status(201).json(user)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ error: 'Server Error while retrieving user' })
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Server Error while inerting user' })
        })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params  //Yay destructuring
    db.findById(id)
        .then(user => {
            console.log('Users', user)
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The user information could not be retrieved." })
        })
})

server.listen(4444, () => { console.log("server of 4444") })