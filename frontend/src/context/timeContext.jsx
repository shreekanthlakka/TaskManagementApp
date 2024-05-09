import { createContext, useContext, useReducer } from "react";
import {
    deleteTimerApi,
    endTimeApi,
    startTimeApi,
    totalTimeObjsApi,
} from "../services/timetrackerApiServices";
import { differenceInSeconds } from "date-fns";

const timeContext = createContext();

const initialState = {
    timeDetails: [],
    isTimerRunning: false,
    isLoading: false,
    lapsedCount: 0,
    errors: {},
    timeStampObjects: [],
    totalDuration: 0,
};

function timeReducer(state, action) {
    switch (action.type) {
        case "START":
            return { ...state, isLoading: true, errors: {} };
        case "ERROR":
            return { ...state, isLoading: false, errors: action.payload };
        case "GET_INITIAL_DATA":
            return { ...state, isLoading: false, timeDetails: action.payload };
        case "START_TIMER":
            return {
                ...state,
                isLoading: false,
                isTimerRunning: true,
                timeDetails: [...state.timeDetails, action.payload],
            };
        case "STOP_TIMER":
            return {
                ...state,
                isLoading: false,
                isTimerRunning: false,
                timeDetails: state.timeDetails.map((ele) =>
                    ele._id === action.payload._id ? action.payload : ele
                ),
                lapsedCount: state.lapsedCount + 1,
            };
        case "UPDATE_OBJS":
            return {
                ...state,
                timeStampObjects: state.timeDetails.map((ele) => ({
                    id: Math.random(),
                    userId: ele.userId,
                    taskId: ele.taskId,
                    duration: differenceInSeconds(
                        ele.endDateTime,
                        ele.startDateTime
                    ),
                })),
            };
        case "UPDATE_DURIATION":
            return {
                ...state,
                totalDuration: state.timeStampObjects.reduce(
                    (acc, val) => acc + val.duration,
                    0
                ),
            };
        case "DELETE_TIMER":
            return { ...initialState };
        case "default":
            return state;
    }
}

function TimeContextProvider({ children }) {
    const [{ timeDetails, isRunning, isLoading, totalDuration }, dispatch] =
        useReducer(timeReducer, initialState);

    const startTimer = async (taskId) => {
        try {
            dispatch({ type: "START" });
            const obj = { start: new Date() };
            const res = await startTimeApi(taskId, obj);
            if (res.success) {
                dispatch({ type: "START_TIMER", payload: res.data });
            } else {
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

    const stopTimer = async (id) => {
        try {
            dispatch({ type: "START" });
            const obj = { end: new Date() };
            const res = await endTimeApi(id, obj);
            if (res.success) {
                dispatch({
                    type: "STOP_TIMER",
                    payload: res.data,
                    _id: res.data._id,
                });
                dispatch({ type: "UPDATE_OBJS" });
                dispatch({ type: "UPDATE_DURIATION" });
            } else {
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

    const getInitialTimerData = async (id) => {
        try {
            dispatch({ type: "START" });
            const res = await totalTimeObjsApi(id);
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                };
            }
            dispatch({ type: "GET_INITIAL_DATA", payload: res.data });
            dispatch({ type: "UPDATE_OBJS" });
            dispatch({ type: "UPDATE_DURIATION" });
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
        }
    };

    const deleteTimer = async (id) => {
        try {
            dispatch({ type: "START" });
            const res = await deleteTimerApi(id);
            if (!res.success) {
                throw {
                    status: res.status,
                    message: res.message,
                };
            }
            dispatch({ type: "DELETE_TIMER" });
            return res;
        } catch (error) {
            dispatch({ type: "ERROR", payload: error });
        }
    };

    const values = {
        timeDetails,
        isRunning,
        isLoading,
        startTimer,
        stopTimer,
        getInitialTimerData,
        totalDuration,
        deleteTimer,
    };
    return (
        <timeContext.Provider value={values}>{children}</timeContext.Provider>
    );
}

function useTimer() {
    return useContext(timeContext);
}

export { TimeContextProvider, useTimer };
