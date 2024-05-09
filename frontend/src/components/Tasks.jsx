import { useTask } from "../context/taskContext";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    & table {
        border: 1px solid black;
        margin: 10px;
    }
    & th,
    td {
        border: 1px solid black;
        padding: 10px;
        text-align: center;
    }
    & button {
        height: 30px;
        width: 100px;
    }
`;

const Div = styled.div`
    z-index: 1;
`;

function Tasks() {
    const navigate = useNavigate();
    const { setLoggedInUser, isLoggedIn } = useUser();
    const { tasks } = useTask();
    const { deleteATask, isLoading } = useTask();
    const [selectedId, setSelectedId] = useState("");

    const events = tasks.map((task) => ({
        title: task.title,
        start: task.createdAt,
    }));

    function eventContent(eventInfo) {
        return (
            <>
                <b> {eventInfo?.timeText}</b>
                <i> {eventInfo?.event.title}</i>
            </>
        );
    }

    // useEffect(() => {
    //     (async () => {
    //         await setLoggedInUser();
    //     })();
    // }, [isLoggedIn]);

    return (
        <>
            <Container>
                <div>
                    <h2> Tasks - {tasks?.length}</h2>
                    <button onClick={() => navigate("/addTask")}>
                        Add Task
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>DueDate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((ele) => (
                            <tr key={ele._id}>
                                <td>{ele.title}</td>
                                <td>{ele.description}</td>
                                <td>{ele.priority}</td>
                                <td>
                                    {`${ele.duedate}`
                                        .split("T")[0]
                                        .split("-")
                                        .reverse()
                                        .join("/")}
                                </td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setSelectedId(ele._id);
                                            navigate(`/updateTask/${ele._id}`);
                                        }}
                                    >
                                        update
                                    </button>
                                    <button
                                        onClick={() => {
                                            deleteATask(ele._id);
                                            setSelectedId(ele._id);
                                        }}
                                        disabled={isLoading}
                                    >
                                        {isLoading && ele._id === selectedId
                                            ? "deleating..."
                                            : "delete"}
                                    </button>
                                </td>
                                <td>
                                    <Link to={`/tasks/${ele._id}`}>
                                        <button>View Details</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
            <Div>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    eventContent={eventContent}
                />
            </Div>
        </>
    );
}

export default Tasks;

/**
 *  
 * 
 * 
 * <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>DueDate</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((ele) => (
                    <tr key={ele._id}>
                        <td>{ele.title}</td>
                        <td>{ele.description}</td>
                        <td>{ele.priority}</td>
                        <td>
                            {ele.duedate
                                ?.split("T")[0]
                                .split("-")
                                .reverse()
                                .join("/")}
                        </td>
                        <td>
                            <button
                                onClick={() => {
                                    setSelectedId(ele._id);
                                    navigate(`/updateTask/${ele._id}`);
                                }}
                            >
                                update
                            </button>
                            <button
                                onClick={() => {
                                    deleteATask(ele._id);
                                    setSelectedId(ele._id);
                                }}
                                disabled={isLoading}
                            >
                                {isLoading && ele._id === selectedId
                                    ? "deleating..."
                                    : "delete"}
                            </button>
                        </td>
                        <td>
                            <Link to={`/tasks/${ele._id}`}>
                                <button>View Details</button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

 * 
 * 
 */
