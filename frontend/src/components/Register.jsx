import { useState } from "react";
import styled from "styled-components";
import { isEmail, isMobilePhone } from "validator";
import { registerApi } from "../services/userApiServices";
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
    name: "",
    email: "",
    password: "",
    phonenumber: "",
    role: "",
};

function Register() {
    const [formData, setFormData] = useState(initialState);
    const [clientErrors, setClientErrors] = useState({});
    const errors = {};
    const navigate = useNavigate();

    const runValidations = () => {
        if (formData.name.trim().length === 0) {
            errors.name = "Name is required";
        }
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
        if (formData.phonenumber.trim().length === 0) {
            errors.phonenumber = "Phone number is required";
        } else if (!isMobilePhone(formData.phonenumber, "any")) {
            errors.phonenumber = "Invalid Phone Number format";
        }
        if (formData.role.trim().length === 0) {
            errors.role = "Role field can't be empty";
        } else if (!["admin", "user"].includes(formData.role)) {
            errors.role = "role shound be either admin or user";
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
        runValidations();
        if (Object.keys(errors).length === 0) {
            //api call
            const res = await registerApi(formData);
            if (res.success) {
                toast.success(res.message);
                navigate("/login");
                setFormData(initialState);
            }
            setClientErrors({});
        } else {
            setClientErrors(errors);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="name"
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
            />
            {clientErrors.name && <p>{clientErrors.name}</p>}
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

            <input
                type="text"
                placeholder="phonenumber"
                value={formData.phonenumber}
                onChange={(e) =>
                    setFormData({ ...formData, phonenumber: e.target.value })
                }
            />
            {clientErrors.phonenumber && <p>{clientErrors.phonenumber}</p>}
            <div>
                <label>Select Role</label>
                <input
                    style={{
                        width: "auto",
                        height: "auto",
                    }}
                    type="radio"
                    id="admin"
                    value="admin"
                    checked={formData.role === "admin"}
                    onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                    }
                />
                <label htmlFor="admin">Admin</label>
                <input
                    style={{
                        width: "auto",
                        height: "auto",
                    }}
                    type="radio"
                    id="user"
                    value="user"
                    checked={formData.role === "user"}
                    onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                    }
                />
                <label htmlFor="user">User</label>
                {clientErrors.role && <p>{clientErrors.role}</p>}
            </div>
            <button type="submit">Register</button>
        </Form>
    );
}

export default Register;
