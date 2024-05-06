import { useUser } from "../context/userContext";
import AccountHeader from "./AccountHeader";

function AccountDetails() {
    const { user } = useUser();
    return (
        <>
            <AccountHeader />
            {user && (
                <div>
                    <h3>Account Details</h3>
                    <p>Name : {user.name}</p>
                    <p>Email : {user.email}</p>
                    <p>Role : {user.role}</p>
                    <p>PhoneNumber : {user.phonenumber}</p>
                </div>
            )}
        </>
    );
}

export default AccountDetails;
