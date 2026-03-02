export const getAnecdotes = async () => {
    const response = await fetch('http://localhost:3001/anecdotes')

    if (!response.ok) {
        throw new Error('anecdotes could not be fetched')
    }

    return response.json()
}