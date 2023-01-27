import { createSlice } from "@reduxjs/toolkit";

export const trackSlice = createSlice({
    name: "tracksData",
    initialState: {
        list: []
    },
    reducers: {
        setTracksList: (state, action) => {
            state.list = action.payload;
        },
        setAddTrack: (state, action) => {
            state.list = [...state.list, action.payload]
        }
    }
})

export const { setTracksList, setAddTrack } = trackSlice.actions;

export default trackSlice.reducer;