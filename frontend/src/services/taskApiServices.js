const URI = "http://localhost:8000/api/v1";

const getAllTasksApi = async () => {
    try {
        const res = await fetch(`${URI}/tasks`, {
            method: "GET",
            credentials: "include",
            headers: {
                // "Content-Type": "multipart/form-data",
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

const createNewTaskApi = async (newTask) => {
    try {
        console.log("TASK FILE ===> ", newTask);
        const res = await fetch(`${URI}/tasks`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "multipart/form-data",
                // "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error in creating api", error);
    }
};

const getTaskApi = async (id) => {
    try {
        const res = await fetch(`${URI}/tasks/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error in getting task : ", error);
    }
};

const updateTaskApi = async (id, updatedTask) => {
    try {
        const res = await fetch(`${URI}/tasks/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: JSON.stringify(updatedTask),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error in updating the Task : ", error);
    }
};

const deleteTaskApi = async (id) => {
    try {
        const res = await fetch(`${URI}/tasks/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error in updating the Task : ", error);
    }
};

export {
    getAllTasksApi,
    getTaskApi,
    createNewTaskApi,
    updateTaskApi,
    deleteTaskApi,
};
