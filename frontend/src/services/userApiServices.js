const URI = "http://localhost:8000/api/v1";

const loginApi = async ({ email, password }) => {
    try {
        const res = await fetch(`${URI}/users/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        console.log(data);
        return data; // data.user gives the user object
    } catch (error) {
        console.log(error);
    }
};

// loginApi("one@gmail.com", "123456");

const registerApi = async ({ name, email, password, phonenumber, role }) => {
    try {
        const res = await fetch(`${URI}/users/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ name, email, password, phonenumber, role }),
        });
        if (!res.ok) {
            throw new Error("responce error");
        }
        const data = await res.json();
        console.log("data in api", data);
        return data;
    } catch (error) {
        console.log("errors in api req => ", error, error.message);
    }
};

const logoutApi = async () => {
    try {
        const res = await fetch(`${URI}/users/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("errors in api req => ", error);
    }
};

const getCurrentLoggedInUser = async () => {
    try {
        const res = await fetch(`${URI}/users/loggedInuser`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error("Server response not ok");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error in server  response : ", error);
    }
};

// registerApi("five", "five@gmail.com", "password", "9000012345", "user");

export { loginApi, registerApi, logoutApi, getCurrentLoggedInUser };
