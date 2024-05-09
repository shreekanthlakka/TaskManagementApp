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
        const fd = new FormData();
        fd.append("title", newTask.title);
        fd.append("description", newTask.description);
        fd.append("priority", newTask.priority);
        fd.append("duedate", newTask.duedate);
        fd.append("taskfile", newTask.taskfile);
        fd.append("assignedTo", JSON.stringify(newTask.assignedTo));
        // Array.from(newTask.files).forEach((file) => {
        //     fd.append("taskfiles", file);
        // });

        const res = await fetch(`${URI}/tasks`, {
            method: "POST",
            credentials: "include",
            body: fd,
        });
        const data = await res.json();
        // console.log("data res ==> ", data);
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
        console.log("task in Apiservice=====> ", updatedTask);
        const res = await fetch(`${URI}/tasks/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                // "Content-Type": "multipart/form-data",
                "Content-Type": "application/json",
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
