import { createContext, useContext, useReducer } from "react";
import {
    createNewCommentApi,
    deleteCommentApiById,
    getAllCommentsApi,
} from "../services/commentApiServices";

const commentsContext = createContext();

const initialState = {
    comments: [],
    isLoading: false,
    errors: {},
};

function commentsReducer(state, action) {
    switch (action.type) {
        case "start":
            return { ...state, isLoading: true, errors: {} };
        case "error":
            return { ...state, isLoading: false, errors: action.payload };
        case "allComments":
            return { ...state, isLoading: false, comments: action.payload };
        case "createComment":
            return {
                ...state,
                isLoading: false,
                comments: [...state.comments, action.payload],
            };
        case "deleteComment":
            return {
                ...state,
                isLoading: false,
                comments: state.comments.filter(
                    (ele) => ele._id !== action.payload
                ),
            };
        case "default":
            return state;
    }
}

function CommentsContextProvider({ children }) {
    const [{ comments, isLoading, errors }, dispatch] = useReducer(
        commentsReducer,
        initialState
    );

    const allComments = async (taskId) => {
        try {
            dispatch({ type: "start" });
            const res = await getAllCommentsApi(taskId);
            if (res.success) {
                dispatch({ type: "allComments", payload: res.data });
            } else {
                throw {
                    status: res.status,
                    message: res.message,
                };
            }
        } catch (error) {
            dispatch({ type: "error", payload: error });
        }
    };

    const createComment = async (taskId, Obj) => {
        try {
            dispatch({ type: "start" });
            const res = await createNewCommentApi(taskId, Obj);
            if (res.success) {
                dispatch({ type: "createComment", payload: res.data });
            } else {
                throw {
                    status: res.status,
                    message: res.message,
                };
            }
            return res;
        } catch (error) {
            dispatch({ type: "error", payload: error });
        }
    };

    const deleteComment = async (id) => {
        try {
            dispatch({ type: "start" });
            const res = await deleteCommentApiById(id);
            if (res.success) {
                dispatch({ type: "deleteComment", payload: res.data._id });
            } else {
                throw {
                    status: res.status,
                    message: res.message,
                };
            }
        } catch (error) {
            dispatch({ type: "error", payload: error });
        }
    };

    const value = {
        comments,
        isLoading,
        errors,
        allComments,
        createComment,
        deleteComment,
    };
    return (
        <commentsContext.Provider value={value}>
            {children}
        </commentsContext.Provider>
    );
}

function useComments() {
    const context = useContext(commentsContext);
    if (!context) {
        throw new Error("context used outside scope");
    }
    return context;
}

export { CommentsContextProvider, useComments };
