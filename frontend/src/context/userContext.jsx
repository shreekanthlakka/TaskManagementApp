import { createContext, useContext, useReducer } from "react";
import {
    getCurrentLoggedInUser,
    loginApi,
    logoutApi,
} from "../services/userApiServices";

const userContext = createContext();

const initialState = {
    user: null,
    isLoading: false,
    isLoggedIn: false,
    errors: {},
    isAuthenticated: false,
    userProfile: {},
};

function userReducer(state, action) {
    switch (action.type) {
        case "START":
            return { ...state, isLoading: true, errors: {} };
        case "ERROR":
            return { ...state, isLoading: false, errors: action.payload };
        case "LOGIN":
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                isLoggedIn: true,
            };
        case "LOGOUT":
            return initialState;
        case "SET_USER":
            return {
                ...state,
                isLoading: false,
                isAuthenticated: action.isAuthenticated,
                userProfile: action.payload,
            };
        case "DEFAULT":
            return state;
    }
}

function UserContextProvider({ children }) {
    const [{ user, isLoading, isLoggedIn, isAuthenticated, errors }, dispatch] =
        useReducer(userReducer, initialState);

    const loginUser = async ({ email, password }) => {
        try {
            dispatch({ type: "START" });
            const res = await loginApi({ email, password });
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                    errors: res.error,
                };
            }
            if (res.success) {
                localStorage.setItem("token", res.session.accessToken);
                dispatch({ type: "LOGIN", payload: res.data });
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
        }
    };

    const logoutUser = async () => {
        try {
            dispatch({ type: "START" });
            const res = await logoutApi();
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                };
            }
            if (res.success) {
                localStorage.removeItem("token");
                dispatch({ type: "LOGOUT" });
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
        }
    };

    const setLoggedInUser = async () => {
        try {
            const res = await getCurrentLoggedInUser();
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                };
            } else {
                dispatch({
                    type: "SET_USER",
                    payload: res.data,
                    isAuthenticated: res.isAuthenticated,
                });
            }
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
        }
    };

    const value = {
        user,
        isLoading,
        isLoggedIn,
        errors,
        isAuthenticated,
        loginUser,
        logoutUser,
        setLoggedInUser,
    };
    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    );
}

function useUser() {
    const context = useContext(userContext);
    if (!context) {
        throw new Error("useUser must be used within the UserContextProvider");
    }
    return context;
}

export { UserContextProvider, useUser };
