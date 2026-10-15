import { createSlice } from "@reduxjs/toolkit"; 

const stateSlice = createSlice({
    name: 'stateManage',
    initialState: {
        open: false,
        taskDialog: false
    },

    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload
        },
        setTaskDialog: (state, action) => {
            state.taskDialog = action.payload
        }
    }
})

export const { setOpen, setTaskDialog } = stateSlice.actions
export const stateReducer = stateSlice.reducer