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
        createNewPlaylist: (state, action) => {
            state.list = [...state.list, action.payload];
        },
        deletePlaylist: (state, action) => {
            state.list = [...state.list, action.payload];
        },
        addSongToPlaylist: (state, action) => {
            state.list = action.payload;
        },
        setPlaylistEdit: (state, action) => {
            state.list = [...state.list, action.payload]
        }
    }
})

export const { setPlaylistsList, createNewPlaylist, deletePlaylist, addSongToPlaylist, setPlaylistEdit } = playlistSlice.actions;

export default playlistSlice.reducer;