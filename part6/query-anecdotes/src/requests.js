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