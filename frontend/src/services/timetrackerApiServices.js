const URI = "http://localhost:8000/api/v1";

const startTimeApi = async (taskId, obj) => {
    try {
        const res = await fetch(`${URI}/timetracker/start/${taskId}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const endTimeApi = async (id, obj) => {
    try {
        const res = await fetch(`${URI}/timetracker/end/${id}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const totalTimeObjsApi = async (id) => {
    try {
        const res = await fetch(`${URI}/timetracker/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const deleteTimerApi = async (id) => {
    try {
        const res = await fetch(`${URI}/timetracker/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export { startTimeApi, endTimeApi, totalTimeObjsApi, deleteTimerApi };
