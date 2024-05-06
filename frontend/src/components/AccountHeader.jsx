import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    background-color: aliceblue;
    justify-content: space-between;
    align-items: center;
    & a {
        text-decoration: none;
        font-size: large;
        font-weight: 800;
        margin-right: 30px;
    }
    & button {
        height: 40px;
        width: 100px;
        font-size: large;
        font-weight: 500;
    }
`;

function AccountHeader() {
    const { user, logoutUser } = useUser();
    const navigate = useNavigate();

    async function handleLogout() {
        const res = await logoutUser();
        if (res.success) {
            navigate("/login");
            toast.success("Successfully logged out!");
        }
    }

    return (
        <>
            {user && (
                <Container>
                    <Link to="/">
                        <h3>Hi , {user?.name}</h3>
                    </Link>
                    <div>
                        <Link to="/account/tasks">DashBoard</Link>
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </Container>
            )}
        </>
    );
}

export default AccountHeader;
