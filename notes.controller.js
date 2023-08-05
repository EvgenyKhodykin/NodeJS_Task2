const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.green('Note has been added!'))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.blue('Here is the list of notes:'))
    notes.forEach(note => console.log(chalk.yellow(note.id, note.title)))
}

async function removeNote(id) {
    const currentNotes = await getNotes()
    const filteredNotes = currentNotes.filter(note => note.id !== id.toString())
    await fs.writeFile(notesPath, JSON.stringify(filteredNotes))
    console.log(chalk.red('Note has been removed!'))
    await printNotes()
}

async function editNote(id, payload) {
    const notes = await getNotes()
    const index = notes.findIndex(note => note.id === id)
    notes[index].title = payload.title
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.blue('Note has been edited!'))
}

module.exports = {
    addNote,
    getNotes,
    removeNote,
    editNote
}
