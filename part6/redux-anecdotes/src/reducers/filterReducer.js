import { createSlice } from "@reduxjs/toolkit"

const filterReducer = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        setFilter(state, action) {
            return action.payload.filter
        }
    }
})

export const { setFilter } = filterReducer.actions
export default filterReducer.reducer
