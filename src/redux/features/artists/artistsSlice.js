import { createSlice } from "@reduxjs/toolkit";

export const artistSlice = createSlice({
    name: "artistsData",
    initialState: {
        list: []
    },
    reducers: {
        setArtistsList: (state, action) => {
            state.list = action.payload;
        },
        setNewArtist:(state, action) => {
            state.list = [...state.list, action.payload];
        }
    }
})

export const { setArtistsList, setNewArtist } = artistSlice.actions;

export default artistSlice.reducer;