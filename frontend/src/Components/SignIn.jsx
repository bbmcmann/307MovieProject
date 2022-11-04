import React, {useState} from "react";
import Header from "./Header";

function SignIn() {
    const [person, setPerson] = useState({
        username: "",
        password: "",
    });



    function submitForm() {
        // props.handleSubmit(person);
        setPerson({username: "", password: ""});
        <input type="button" value="Submit" onClick={submitForm} />
    }

    return (
        <form>
            <label htmlFor="username">Username</label>
            <input 
                type="text"
                name="username"
                id="username"
                value={person.username}
            />
            <label htmlFor="password">Password</label>
            <input
                type="text"
                name="password"
                id="password"
                value={person.password}
            />
            <input type="button" value="Submit" onClick={submitForm} />
        </form>
    )
}

export default SignIn;