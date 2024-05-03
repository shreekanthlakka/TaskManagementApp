import { useState } from "react";
import styled from "styled-components";
import { isEmail, isMobilePhone } from "validator";
import { registerApi } from "../services/userApiServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTask } from "../context/taskContext";

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
};

function Register() {
    const [formData, setFormData] = useState(initialState);
    const [clientErrors, setClientErrors] = useState({});
    const errors = {};
    const navigate = useNavigate();
    const { createNewTasks } = useTask();

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
        console.log(formData);
        runValidations();
        if (Object.keys(errors).length === 0) {
            //api call

            const res = await createNewTasks(formData);
            console.log("response from server ", res);
            setClientErrors({});
        } else {
            setClientErrors(errors);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Add Task</h1>
            <input
                type="text"
                placeholder="title"
                value={formData.title}
                onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                }
            />
            {clientErrors.title && <p>{clientErrors.title}</p>}
            <input
                type="text"
                placeholder="description"
                value={formData.description}
                onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                }
            />
            {clientErrors.description && <p>{clientErrors.description}</p>}
            <input
                type="date"
                placeholder="duedate"
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
            <button type="submit">Add Task</button>
        </Form>
    );
}

export default Register;

/**
 * 
 *  title: {
            type: String,
        },
        description: {
            type: String,
        },
        priority: {
            type: String,
        },
        status: {
            type: String,
        },
        duedate: {
            type: Date,
            default: new Date(Date.now() + 24 * 60 * 60 * 1000), // one
        },
        taskfile: {
            id: {
                type: String,
                default: "id",
            },
            url: {
                type: String,
                default: "url",
            },
        },
 * 
 */
