import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./context/userContext.jsx";
import { TaskContextProvider } from "./context/taskContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UserContextProvider>
            <TaskContextProvider>
                <App />
            </TaskContextProvider>
        </UserContextProvider>
    </React.StrictMode>
);
