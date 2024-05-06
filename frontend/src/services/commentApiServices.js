const URI = "http://localhost:8000/api/v1";

const getAllCommentsApi = async (taskId) => {
    try {
        const res = await fetch(`${URI}/comments?taskId=${taskId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        console.log(data);
        return data; // data.user gives the user object
    } catch (error) {
        console.log(error);
    }
};

const createNewCommentApi = async (taskId, commentBody) => {
    try {
        const res = await fetch(`${URI}/comments?taskId=${taskId}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentBody),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error in creating comment api", error);
    }
};

const getCommentApiById = async (id) => {
    try {
        const res = await fetch(`${URI}/comments/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error in getting comment : ", error);
    }
};

const updateCommentApiById = async (id, updatedComment) => {
    try {
        const res = await fetch(`${URI}/comments/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: JSON.stringify(updatedComment),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error in updating the comment : ", error);
    }
};

const deleteCommentApiById = async (id) => {
    try {
        const res = await fetch(`${URI}/comments/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error in deleting the Comment : ", error);
    }
};

export {
    getAllCommentsApi,
    createNewCommentApi,
    getCommentApiById,
    updateCommentApiById,
    deleteCommentApiById,
};
