import { useDispatch } from "react-redux"
import { appendAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAcnedote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(appendAnecdote(content))
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