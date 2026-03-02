export const getAnecdotes = async () => {
    const response = await fetch('http://localhost:3001/anecdotes')

    if (!response.ok) {
        throw new Error('anecdotes could not be fetched')
    }

    return response.json()
}

export const createAnecdote = async (newAnecdote) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnecdote)
    }

    const response = await fetch('http://localhost:3001/anecdotes', options)

    if (!response.ok) {
        throw new Error('anecdote could not be created')
    }

    return response.json()
}

export const updateAnecdote = async (updatedAnecdote) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAnecdote)
    }

    const response = await fetch(`http://localhost:3001/anecdotes/${updatedAnecdote.id}`, options)

    if (!response.ok) {
        throw new Error('anecdote could not be updated')
    }

    return response.json()
}