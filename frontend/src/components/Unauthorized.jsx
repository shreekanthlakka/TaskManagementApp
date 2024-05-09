import { Link } from "react-router-dom";
import AccountHeader from "./AccountHeader";

function Unauthorized() {
    return (
        <>
            <AccountHeader />
            <div>
                <h2> you are not authorized to use this page</h2>
                <Link to="/login">go to login page</Link>
            </div>
        </>
    );
}

export default Unauthorized;
