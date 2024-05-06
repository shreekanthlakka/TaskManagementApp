import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

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
`;

function Header() {
    const location = useLocation();
    const url = location.pathname;

    return (
        <Container>
            <Link to="/">
                <h3>Task Management App</h3>
            </Link>
            {url === "/register" ? (
                <Link to="/login">Login</Link>
            ) : (
                <Link to="/register">Register</Link>
            )}
        </Container>
    );
}

export default Header;
