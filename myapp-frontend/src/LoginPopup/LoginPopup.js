import React from "react";
import { useContext } from "react";
import { userContext } from "../App";
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './LoginPopup.css';

export const LoginPopup = () => {
    const { users, setUsers } = useContext(userContext);
    const { username, setUsername } = useContext(userContext);
    const { password, setPassword } = useContext(userContext);
    const { showLoginPopup, setShowLoginPopup } = useContext(userContext);
    const { loggedIn, setLoggedIn } = useContext(userContext);

    const handleSubmit = (event) => {
        event.preventDefault();
};

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username: 
                    <input
                        type="text"
                        value={username}
                        placeholder=""
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
                <Button type="submit" variant="contained" endIcon={<SendIcon />}
                    onClick={() => {
                        const userExists = users.some(user => user.username == username && user.password == password);

                        if (userExists) {
                            setLoggedIn(true);
                            setShowLoginPopup(false);
                        } else {
                            alert("Incorrect username or password");
                        }
                    }}
                >Login</Button>
                <Button variant="contained" color="error" onClick={() => setShowLoginPopup(false)}>Cancel</Button>
            </div>
        </form>
    );
}

export default LoginPopup;