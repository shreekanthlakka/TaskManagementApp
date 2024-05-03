import { useState } from "react";
import styled from "styled-components";
import { isEmail } from "validator";
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
    email: "one@gmail.com",
    password: "123456",
};

function Login() {
    const [formData, setFormData] = useState(initialState);
    const [clientErrors, setClientErrors] = useState({});
    const errors = {};
    const { loginUser } = useUser();
    const navigate = useNavigate();

    const runValidations = () => {
        if (formData.email.trim().length === 0) {
            errors.email = "Email is required";
        } else if (!isEmail(formData.email)) {
            errors.email = "Invalid Email Format";
        }
        if (formData.password.trim().length === 0) {
            errors.password = "Password is Required";
        } else if (
            formData.password.trim().length < 5 ||
            formData.password.trim().length > 12
        ) {
            errors.password = "Must be between 5 and 12 characters long";
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        runValidations();
        if (Object.keys(errors).length === 0) {
            //api call
            const res = await loginUser(formData);
            if (res.success) {
                toast.success(res.message);
                navigate("/account/tasks");
            }
            setClientErrors({});
            setFormData(initialState);
        } else {
            setClientErrors(errors);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="email"
                value={formData.email}
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                }
            />
            {clientErrors.email && <p>{clientErrors.email}</p>}
            <input
                type="password"
                placeholder="password"
                value={formData.password}
                onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                }
            />
            {clientErrors.password && <p>{clientErrors.password}</p>}
            <button type="submit">Login</button>
        </Form>
    );
}

export default Login;
