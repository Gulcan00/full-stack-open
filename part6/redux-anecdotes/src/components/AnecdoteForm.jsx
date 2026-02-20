import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAcnedote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`You created '${content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 3000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAcnedote}>
            <div>
              <input name="anecdote"/>
            </div>
            <button>create</button>
                  </form>
        </div>
    )
}

export default AnecdoteForm