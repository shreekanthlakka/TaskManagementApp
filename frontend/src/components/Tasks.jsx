import { useTask } from "../context/taskContext";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div``;

function Tasks() {
    const navigate = useNavigate();
    const { tasks } = useTask();
    return (
        <Container>
            <div>
                <h2> Tasks - {tasks?.length}</h2>
                <button onClick={() => navigate("/account/addTask")}>
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
                            <td>{ele.duedate}</td>

                            <td>
                                <button>update</button>
                                <button>delete</button>
                            </td>
                            <td>
                                <Link to={`/account/tasks/${ele._id}`}>
                                    <button>View Details</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}

export default Tasks;
