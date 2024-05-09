const URI = "http://localhost:8000/api/v1";

const uploadFilesApi = async (id, files) => {
    const fd = new FormData();
    Array.from(files).forEach((file) => {
        fd.append("taskfiles", file);
    });
    try {
        const res = await fetch(`${URI}/files/upload/${id}`, {
            method: "POST",
            credentials: "include",
            body: fd,
        });
        if (!res.ok) {
            throw {
                status: res.status,
                message: res.message,
            };
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

const getAllFilesApi = async (id) => {
    try {
        const res = await fetch(`${URI}/files/${id}`, {
            method: "GET",
            credentials: "include",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error while fetching files");
    }
};

export { uploadFilesApi, getAllFilesApi };
