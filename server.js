const express = require('express')

const path = require('path')

const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: 'd84a4c049e4d45699f1e7005e55873cb',
    captureUncaught: true,
    captureUnhandledRejections: true
})
const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

let students = []

app.post('/api/student', (req, res) => {
    const {name} = req.body
    name = name.trim()

    students.push(name)
    rollbar.log('Student Added successfully', {
        author: 'John', type: 'manual entry'
    })
    res.status(200).send(students)
})
app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}`))