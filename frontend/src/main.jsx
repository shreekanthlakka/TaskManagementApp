import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./context/userContext.jsx";
import { TaskContextProvider } from "./context/taskContext.jsx";
import { CommentsContextProvider } from "./context/CommentsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UserContextProvider>
            <TaskContextProvider>
                <CommentsContextProvider>
                    <App />
                </CommentsContextProvider>
            </TaskContextProvider>
        </UserContextProvider>
    </React.StrictMode>
);
