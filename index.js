const express = require('express')
const chalk = require('chalk')
const path = require('path')
const { addNote, getNotes, removeNote, editNote } = require('./notes.controller')

const PORT = 3000
const app = express()

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', 'pages')

app.get('/', async (request, response) => {
    response.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })
})

app.post('/', async (request, response) => {
    await addNote(request.body.title)
    response.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: true
    })
})

app.delete('/:id', async (request, response) => {
    await removeNote(request.params.id)
    response.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })
})

app.put('/:id', async (request, response) => {
    await editNote(request.params.id, request.body)
    response.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })
})

app.listen(PORT, () => {
    console.log(chalk.green(`Server has been started on port ${PORT}...`))
})
