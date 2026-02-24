import { useDispatch, useSelector } from "react-redux"
import { initializeAnecdotes, voteForAnecdote } from "../reducers/anecdoteReducer"
import { removeNotification, setNotification } from "../reducers/notificationReducer"
import { useEffect } from "react"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })
  


    const vote = id => {
        console.log('vote', id)
        dispatch(voteForAnecdote(id))
        dispatch(setNotification(`You voted '${anecdotes.find(a => a.id === id).content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 3000)
    }
    return (
        <div>
            {anecdotes.map(anecdote => (
            <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        ))}
       </div>
    )
}

export default AnecdoteList