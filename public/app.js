document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    } else if (event.target.dataset.type === 'edit') {
        const newTitle = prompt('Enter a new title')
        const id = event.target.dataset.id
        if (newTitle === null) return
        else edit(id, newTitle).then(() => window.location.reload())
    }
})

async function remove(id) {
    return await fetch(`/${id}`, { method: 'DELETE' })
}

async function edit(id, title) {
    return await fetch(`/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, id })
    })
}
