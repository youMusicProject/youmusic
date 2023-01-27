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

