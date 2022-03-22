import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: 1,
        columnsToHide: [],
    },
    reducers: {
        update: (state) => {
            state.data += 1;
        },
        hide: (state, action) => {
            state.columnsToHide = action.payload;
        }
    }
})

export const {update, hide} = userSlice.actions;
export default userSlice.reducer;