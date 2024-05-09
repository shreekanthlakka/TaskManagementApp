import { createContext, useContext, useReducer } from "react";
import {
    createNewTaskApi,
    deleteTaskApi,
    getAllTasksApi,
    getTaskApi,
    updateTaskApi,
} from "../services/taskApiServices";
import toast from "react-hot-toast";

const taskContext = createContext();

const initialState = {
    tasks: [],
    isLoading: false,
    selectedTask: {},
    errors: {},
};

function taskReducer(state, action) {
    switch (action.type) {
        case "START":
            return { ...state, isLoading: true, errors: {} };
        case "ALL_TASKS":
            return { ...state, isLoading: false, tasks: action.payload };
        case "NEW_TASK":
            return {
                ...state,
                isLoading: false,
                tasks: [...state.tasks, action.payload],
            };
        case "DELETE_TASK":
            return {
                ...state,
                isLoading: false,
                tasks: state.tasks.filter((ele) => ele._id !== action.payload),
            };
        case "UPDATE_TASK":
            return {
                ...state,
                isLoading: false,
                tasks: state.tasks.map((ele) =>
                    ele._id === action.payload._id ? action.payload : ele
                ),
            };
        case "SET_TASK":
            return {
                ...state,
                isLoading: false,
                selectedTask: action.payload,
            };
        case "default":
            return state;
    }
}

function TaskContextProvider({ children }) {
    const [{ tasks, isLoading, selectedTask, errors }, dispatch] = useReducer(
        taskReducer,
        initialState
    );

    const createNewTasks = async (newObj) => {
        try {
            dispatch({ type: "START" });
            const res = await createNewTaskApi(newObj);
            if (res.success) {
                dispatch({ type: "NEW_TASK", payload: res.data });
                toast.success("Task added sucessfully");
            }
            if (!res.success) {
                toast.error("failed to create/add task");
                throw {
                    status: res.status,
                    message: res.message,
                };
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
        }
    };

    const getAllTasks = async () => {
        try {
            dispatch({ type: "START" });
            const res = await getAllTasksApi();
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                };
            }
            if (res.success) {
                dispatch({ type: "ALL_TASKS", payload: res.data });
            }
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
        }
    };

    const deleteATask = async (id) => {
        try {
            dispatch({ type: "START" });
            const res = await deleteTaskApi(id);
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                };
            } else {
                dispatch({ type: "DELETE_TASK", payload: res.data._id });
                toast.success("task deleated sucessfully");
            }
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
        }
    };

    const updatedTask = async (id, updateObj) => {
        try {
            dispatch({ type: "START" });
            const res = await updateTaskApi(id, updateObj);
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                };
            } else {
                dispatch({ type: "UPDATE_TASK", payload: res.data });
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
        }
    };

    const getATask = async (id) => {
        try {
            dispatch({ type: "START" });
            const res = await getTaskApi(id);
            if (res.success) {
                dispatch({ type: "SET_TASK", payload: res.data });
            }
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                };
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
        }
    };

    const value = {
        tasks,
        isLoading,
        selectedTask,
        errors,
        createNewTasks,
        getAllTasks,
        deleteATask,
        updatedTask,
        getATask,
    };
    return (
        <taskContext.Provider value={value}>{children}</taskContext.Provider>
    );
}

function useTask() {
    const context = useContext(taskContext);
    if (!context) {
        throw new Error("useTask must be used within the TaskContextProvider");
    }
    return context;
}

export { TaskContextProvider, useTask };
