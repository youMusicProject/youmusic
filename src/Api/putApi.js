import axios from "axios";

export const fetchEdit = async (action, serverUrl, editAction, token, dispatch, setEdit) => {
    const tokenHelper = await token
    const response = await fetch(`${serverUrl}/api/${action}/edit/${editAction._id}`, {
        method: "PUT",
        body: JSON.stringify(editAction),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenHelper}`,
        },
    });
    const data = await response.json();
    if (data.response) {
        dispatch(setEdit(editAction));
    }
};
export const fetchEditSong = async (action, serverUrl, editAction, token, dispatch, setTracksList, tracks) => {
    const tokenHelper = await token
    const response = await fetch(`${serverUrl}/api/${action}/edit/${editAction._id}`, {
        method: "PUT",
        body: JSON.stringify(editAction),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenHelper}`,
        },
    });
    const data = await response.json();
    //* Dispatch
    const allTracks = tracks.map(e => e._id === data.info._id ? data.info : e);
    dispatch(setTracksList(allTracks));
};

