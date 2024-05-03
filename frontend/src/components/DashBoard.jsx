import styled from "styled-components";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Main = styled.main``;

function DashBoard() {
    return (
        <div>
            <Header />
            <Main>
                <Outlet />
            </Main>
        </div>
    );
}

export default DashBoard;
