import { createContext, useContext, useReducer } from "react";
import { getAllFilesApi, uploadFilesApi } from "../services/fileApiService";

const fileContext = createContext();

const initialState = {
    taskFiles: [],
    isLoading: false,
    errors: {},
};

function fileReducer(state, action) {
    switch (action.type) {
        case "START":
            return { ...state, isLoading: true, errors: {} };
        case "ERROR":
            return { ...state, isLoading: false, errors: action.payload };
        case "UPLOAD":
            return {
                ...state,
                isLoading: false,
                taskFiles: [...state.taskFiles, action.payload],
            };
        case "GET_FILES":
            return { ...state, isLoading: false, taskFiles: action.payload };
        case "default":
            return state;
    }
}

function FileContextProvider({ children }) {
    const [{ taskFiles, isLoading, errors }, dispatch] = useReducer(
        fileReducer,
        initialState
    );
    const uploadFiles = async (id, file) => {
        try {
            dispatch({ type: "START" });
            const res = await uploadFilesApi(id, file);
            if (res.success) {
                dispatch({ type: "UPLOAD", payload: res.data });
            }
            if (!res.success) {
                throw {
                    message: res.message,
                    status: res.status,
                };
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
        }
    };

    const getFiles = async (id) => {
        try {
            dispatch({ type: "START" });
            const res = await getAllFilesApi(id);
            if (res.success) {
                dispatch({ type: "GET_FILES", payload: res.data });
            } else {
                throw {
                    message: res.message,
                    status: res.status,
                };
            }
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
        }
    };

    const value = {
        taskFiles,
        isLoading,
        errors,
        uploadFiles,
        getFiles,
    };
    return (
        <fileContext.Provider value={value}>{children}</fileContext.Provider>
    );
}

function useFiles() {
    const context = useContext(fileContext);
    if (!context) {
        throw new Error("useFiles must be used within a FileContextProvider");
    }
    return context;
}

export { FileContextProvider, useFiles };
