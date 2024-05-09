import { useEffect, useState } from "react";
import styled from "styled-components";
import { useTask } from "../context/taskContext";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { getAllUsersData } from "../services/userApiServices";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    & input {
        height: 40px;
        width: 300px;
        margin-bottom: 20px;
        border: 1px solid black;
        border-radius: 10px;
        font-size: large;
        text-align: center;
        font-weight: 500;
    }
    & button {
        height: 40px;
        width: 200px;
        font-size: large;
        font-weight: 500;
    }
    & p {
        color: red;
    }
`;

const initialState = {
    title: "",
    description: "",
    priority: "",
    // status: "",
    duedate: "",
    taskfile: "",
    assignedTo: [],
};

function UpdateTask() {
    const { taskId } = useParams();
    const { isLoading, updatedTask, getATask } = useTask();
    // const [selectedTask, setSelectedTask] = useState({});
    const [formData, setFormData] = useState(initialState);
    const [clientErrors, setClientErrors] = useState({});
    const errors = {};
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const runValidations = () => {
        if (formData.title.trim().length === 0) {
            errors.title = "title is required";
        }
        if (formData.description.trim().length === 0) {
            errors.description = "description is required";
        }
        if (formData.priority.trim().length === 0) {
            errors.priority = "priority is Required";
        } else if (!["high", "medium", "low"].includes(formData.priority)) {
            errors.priority =
                "Invalid Priority! Please enter either high, medium or low.";
        }
        // if (formData.status.trim().length === 0) {
        //     errors.status = "status is required";
        // }
        if (formData.duedate.trim().length === 0) {
            errors.duedate = "duedate field can't be empty";
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("====>", formData);
        runValidations();
        if (Object.keys(errors).length === 0) {
            //api call
            const res = await updatedTask(taskId, formData);
            if (res?.success) {
                navigate("/account/tasks");
            }
            setClientErrors({});
        } else {
            setClientErrors(errors);
        }
    }

    function handleMultiChange(selectedOptions) {
        const assignedUsers = users
            .filter((user) =>
                selectedOptions.map((opt) => opt.value).includes(user._id)
            )
            .map((user) => ({
                _id: user._id,
                name: user.name,
                email: user.email,
            }));
        setFormData({
            ...formData,
            assignedTo: assignedUsers,
        });
    }

    useEffect(() => {
        async function fetchData() {
            const [resUser] = await Promise.all([getAllUsersData()]);
            if (resUser.success) {
                setUsers(resUser.data);
            }
        }
        fetchData();
    }, []);

    const options = users.map((user) => ({
        value: user._id,
        label: user.name,
    }));

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Update Task</h1>
            <input
                type="text"
                placeholder="title"
                name="title"
                value={formData.title}
                onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                }
            />
            {clientErrors.title && <p>{clientErrors.title}</p>}
            <input
                type="text"
                placeholder="description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                }
            />
            {clientErrors.description && <p>{clientErrors.description}</p>}
            <input
                type="date"
                placeholder="duedate"
                name="duedate"
                value={formData.duedate}
                onChange={(e) =>
                    setFormData({ ...formData, duedate: e.target.value })
                }
            />
            {clientErrors.duedate && <p>{clientErrors.duedate}</p>}

            <input
                type="file"
                placeholder="TaskFIle"
                name="taskfile"
                multiple
                onChange={(e) =>
                    setFormData({ ...formData, taskfile: e.target.files[0] })
                }
            />
            {clientErrors.taskfile && <p>{clientErrors.taskfile}</p>}
            <Select
                options={options}
                isMulti
                placeholder="assign tast to "
                onChange={handleMultiChange}
            />
            <div>
                <label>Select Priority</label>
                <input
                    style={{
                        width: "auto",
                        height: "auto",
                    }}
                    type="radio"
                    id="high"
                    value="high"
                    checked={formData.priority === "high"}
                    onChange={(e) =>
                        setFormData({ ...formData, priority: e.target.value })
                    }
                />
                <label htmlFor="high">High</label>
                <input
                    style={{
                        width: "auto",
                        height: "auto",
                    }}
                    type="radio"
                    id="medium"
                    value="medium"
                    checked={formData.priority === "medium"}
                    onChange={(e) =>
                        setFormData({ ...formData, priority: e.target.value })
                    }
                />
                <label htmlFor="medium">Medium</label>
                <input
                    style={{
                        width: "auto",
                        height: "auto",
                    }}
                    type="radio"
                    id="low"
                    value="low"
                    checked={formData.priority === "low"}
                    onChange={(e) =>
                        setFormData({ ...formData, priority: e.target.value })
                    }
                />
                <label htmlFor="low">Low</label>
                {clientErrors.priority && <p>{clientErrors.priority}</p>}
            </div>
            <div>
                <button onClick={() => navigate("/account/tasks")}>
                    Cancel
                </button>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "updating ... " : "UpdateTask"}
                </button>
            </div>
        </Form>
    );
}

export default UpdateTask;
