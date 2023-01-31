
export const fetchDelete = async (action, serverUrl, deleteAction, token) => {
    const tokenHelper = await token
    const response = await fetch(`${serverUrl}/api/${action}/delete/${deleteAction._id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenHelper}`,
        },
    });
    const data = await response.json();
    return data.info;
};