import { Outlet } from "react-router-dom";
import AccountHeader from "./AccountHeader";
import { useEffect } from "react";
import { useTask } from "../context/taskContext";
import { useUser } from "../context/userContext";

function AccountDashboard() {
    const { getAllTasks } = useTask();
    const { setLoggedInUser } = useUser();
    useEffect(() => {
        (async () => {
            await setLoggedInUser();
            await getAllTasks();
        })();
    }, []);
    return (
        <div>
            <AccountHeader />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default AccountDashboard;
