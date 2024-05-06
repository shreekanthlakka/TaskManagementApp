import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Login from "./components/Login";
import Register from "./components/Register";
import AccountDashboard from "./components/AccountDashboard";
import { Toaster } from "react-hot-toast";
import Tasks from "./components/Tasks";
import Task from "./components/Task";
import AccountDetails from "./components/AccountDetails";
import AddTask from "./components/AddTask";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DashBoard />}>
                        <Route path="/login" index element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                    <Route path="/account" element={<AccountDashboard />}>
                        <Route path="tasks" index element={<Tasks />} />
                        <Route path="tasks/:id" element={<Task />} />
                        <Route path="addTask" element={<AddTask />} />
                    </Route>
                    <Route path="/profile" element={<AccountDetails />} />
                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 1500,
                    },
                    error: {
                        duration: 2500,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "white",
                        color: "gray",
                    },
                }}
            />
        </div>
    );
}

export default App;
