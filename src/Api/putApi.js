import axios from "axios";

export const fetchEditUser = async (serverUrl, editUser, token, dispatch, setUserEdit) => {
    const response = await fetch(`${serverUrl}/api/user/edit/${editUser._id}`, {
        method: "PUT",
        body: JSON.stringify(editUser),
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (data.response) {
        dispatch(setUserEdit(editUser));
    }
};

// export const fetchAddPlaylist = async (playlistAdded) => {
//     try {
//         await axios.put(`http://localhost:4000/playlists/${playlistAdded.id}`, playlistAdded)
//     } catch (error) {
//         console.log(error);
//     }
// }
