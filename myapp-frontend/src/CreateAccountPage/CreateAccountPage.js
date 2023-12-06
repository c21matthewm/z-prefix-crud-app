import React from "react";
import { useContext } from "react";
import { userContext } from "../App";
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './CreateAccountPage.css';

export const CreateAccountPage = () => {
    const { users, setUsers } = useContext(userContext);
    const { username, setUsername } = useContext(userContext);
    const { password, setPassword } = useContext(userContext);
    const { firstName, setFirstName } = useContext(userContext);
    const { lastName, setLastName } = useContext(userContext);
    const { showLoginPopup, setShowLoginPopup } = useContext(userContext);
    const { showCreateAccountPage, setShowCreateAccountPage } = useContext(userContext);
    const { loggedIn, setLoggedIn } = useContext(userContext);

    const postUser = (user) => {
        fetch('http://localhost:8081/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
        .then(() => {
            fetch('http://localhost:8081/User')
            .then(res => res.json())
            .then(data => setUsers(data));
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name: 
                    <input
                        type="text"
                        placeholder=""
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>Last Name: 
                    <input
                        type="text"
                        placeholder=""
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>Username: 
                    <input
                        type="text"
                        placeholder=""
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>Password: 
                    <input
                        type="text"
                        placeholder=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </label>
            </div>
            <div className="buttons">
                <Button type="submit" variant="contained" endIcon={<SendIcon/>}
                    onClick={() => {
                        if(firstName == '' || lastName == '' || username == '' || password == '') { 
                            alert("Invalid input.")
                        } else {
                            postUser({
                                first_name: firstName,
                                last_name: lastName,
                                username: username,
                                password: password
                            })
                            setShowCreateAccountPage(false);
                            setShowLoginPopup(true);
                        }
                    }}
                >Create Account</Button>
                <Button variant="contained" color="error" onClick={() => setShowCreateAccountPage(false)}>Cancel</Button>
            </div>
        </form>
    );
}

export default CreateAccountPage;