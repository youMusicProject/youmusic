

export const uploadCloudinary = async (file, folder, type) => {

    const data = new FormData();
    data.append("file", file[0]);
    data.append("upload_preset", folder);
    data.append("api_key", "364769913857561");

    const res = await fetch(`https://api.cloudinary.com/v1_1/dtmhsomgg/${type}/upload`, {
        method: "POST",
        body: data,
    });
    const info = await res.json();
    const src = await info.secure_url
    
    return src
}