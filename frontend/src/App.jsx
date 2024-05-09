import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Login from "./components/Login";
import Register from "./components/Register";
import AccountDashboard from "./components/AccountDashboard";
import { Toaster } from "react-hot-toast";
import Tasks from "./components/Tasks";
import Task from "./components/Task";
import AccountDetails from "./components/AccountDetails";
import AddTask from "./components/AddTask";
import UpdateTask from "./components/UpdateTask";
import PrivateRoute from "./components/PrivateRoute";
import Unauthorized from "./components/Unauthorized";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<DashBoard />}>
                        <Route
                            index
                            element={<Navigate replace to="/login" />}
                        />
                        <Route path="/login" index element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                    <Route
                        element={
                            <PrivateRoute permittedRoles={["admin", "user"]}>
                                <AccountDashboard />
                            </PrivateRoute>
                        }
                    >
                        <Route element={<Navigate to="/tasks" />} />
                        <Route path="tasks" index element={<Tasks />} />
                        <Route path="tasks/:id" element={<Task />} />
                        <Route path="addTask" element={<AddTask />} />
                        <Route
                            path="updateTask/:taskId"
                            element={<UpdateTask />}
                        />
                    </Route>
                    <Route path="/profile" element={<AccountDetails />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
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
