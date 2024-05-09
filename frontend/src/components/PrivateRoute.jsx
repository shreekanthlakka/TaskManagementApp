import { useEffect } from "react";
import { useUser } from "../context/userContext";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

function PrivateRoute({ children, permittedRoles }) {
    const { setLoggedInUser, isAuthenticated, user, isLoading } = useUser();

    useEffect(() => {
        (async () => {
            // await setLoggedInUser();
            if (!isAuthenticated && !isLoading) {
                <Navigate to="/login" />;
            }
        })();
    }, [isAuthenticated, isLoading]);

    if (isLoading) {
        <Loading />;
    }
    return children;
}

export default PrivateRoute;
