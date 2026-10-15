import { createSlice } from "@reduxjs/toolkit"; 

const stateSlice = createSlice({
    name: 'stateManager',
    initialState: {
        open: false,
        taskDialog: false
    },

    reducers: {
        setOpen: (state) => {
            state.open = !state.open
        },
        setTaskDialog: (state) => {
            state.taskDialog = !state.taskDialog
        }
    }
})

export const { setOpen, setTaskDialog } = stateSlice.actions
export default stateSlice.reducer