import { createSlice } from "@reduxjs/toolkit";

export const playlistSlice = createSlice({
    name: "playlistsData",
    initialState: {
        list: []
    },
    reducers: {
        setPlaylistsList: (state, action) => {
            state.list = action.payload;
        },
        addPlaylist: (state, action) => {
            state.list = [...state.list, action.payload];
        }
    },
});

export const { setPlaylistsList, addPlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;