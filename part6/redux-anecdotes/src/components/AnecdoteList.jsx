import { useDispatch, useSelector } from "react-redux"
import { setAnecdotes, voteAnecdote } from "../reducers/anecdoteReducer"
import { removeNotification, setNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"
import { useEffect } from "react"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => {
    dispatch(setAnecdotes(anecdotes))
    })
  }, [dispatch])

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })
  


    const vote = id => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
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