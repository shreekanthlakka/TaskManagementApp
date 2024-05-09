import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import styled from "styled-components";
import { useTimer } from "../context/timeContext";

const StyledTable = styled.table`
    border: 1px solid black;
    & th,
    td {
        border: 1px solid black;
        padding: 10px;
        text-align: center;
    }
`;

function TimeTracker({ task }) {
    const {
        getInitialTimerData,
        timeDetails,
        totalDuration,
        startTimer,
        stopTimer,
        isTimerRunning,
        deleteTimer,
    } = useTimer();

    const [isTimerStarted, setIsTimerStarted] = useState(
        isTimerRunning || false
    );

    async function handleClick() {
        setIsTimerStarted((e) => !e);
        if (!isTimerStarted) {
            const res = await startTimer(task._id);
            if (res.success) {
                toast.success("Timer started");
            }
        }
        if (isTimerStarted) {
            const id = timeDetails[timeDetails.length - 1]._id;
            const res = await stopTimer(id);
            if (res.success) {
                toast.success("Timer ended");
            }
        }
    }
    async function handleDelete() {
        const res = await deleteTimer(task._id);
        if (res.success) {
            toast.success("deleated sucessfully");
        }
    }

    useEffect(() => {
        (async () => {
            await getInitialTimerData(task._id);
        })();
    }, [task]);

    return (
        <div>
            <button onClick={handleClick}>
                {isTimerStarted ? "End" : "Start"}
            </button>
            <button onClick={handleDelete}>Delete timer</button>
            <h3>Time Details</h3>
            {timeDetails.length !== 0 && <Table data={timeDetails} />}
            <h3>Total duration : {totalDuration} seconds</h3>
        </div>
    );
}

function Table({ data }) {
    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>Start Date</th>
                    <th>Start Time</th>
                    <th>End Date</th>
                    <th>End Time</th>
                </tr>
            </thead>
            <tbody>
                {data.map((ele) => (
                    <tr key={ele._id}>
                        <td>{ele.startDateTime?.split("T")[0]}</td>
                        <td>{ele.startDateTime?.split("T")[1]}</td>
                        <td>{ele.endDateTime?.split("T")[0]}</td>
                        <td>{ele.endDateTime?.split("T")[1]}</td>
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    );
}

export default TimeTracker;

/**
 * 
 *  async function handleButtonClick() {
        if (!startTime) {
            setStartTime(true);
            const obj = { start: new Date() };
            const res = await startTimeApi(task._id, obj);
            if (res.success) {
                toast.success("timer has started");
                setData((prev) => [...prev, res.data]);
            }
        }
        if (startTime) {
            setStartTime(false);
            const obj = { end: new Date() };
            const id = data[data.length - 1]._id;
            const res = await endTimeApi(id, obj);
            if (res.success) {
                toast.success("timer has stopped");
                setData((prev) =>
                    prev.map((ele) => (ele._id === id ? res.data : ele))
                );
            }
        }
    }
    if (data[data.length - 1]?.endDateTime) {
        duration = data
            .map((ele) => ({
                id: Math.random(),
                userId: ele.userId,
                taskId: ele.taskId,
                duration: differenceInSeconds(
                    ele.endDateTime,
                    ele.startDateTime
                ),
            }))
            .reduce((acc, val) => acc + val.duration, 0);
    }
 * 
 */
