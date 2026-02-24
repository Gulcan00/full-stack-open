import { createSlice } from "@reduxjs/toolkit"

const notificationReducer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification() {
            return ''
        }
    }
})

const { setNotification, removeNotification } = notificationReducer.actions

export const setNotificationWithTimeout = (message, timeout) => {
    return dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, timeout * 1000)
    }
}

export default notificationReducer.reducer
