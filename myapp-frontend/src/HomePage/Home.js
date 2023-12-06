import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../App";
import { AddItemPopup } from "../AddItemPopup/AddItemPopup";
import { LoginPopup } from "../LoginPopup/LoginPopup";
import { CreateAccountPage } from "../CreateAccountPage/CreateAccountPage";
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './Home.css';

export const Home = () => {

    const { users, setUsers } = useContext(userContext);
    const { items, setItems } = useContext(userContext);
    const { username, setUsername } = useContext(userContext);
    const { password, setPassword } = useContext(userContext);
    const { showAddItemPopup, setShowAddItemPopup } = useContext(userContext);
    const { showLoginPopup, setShowLoginPopup } = useContext(userContext);
    const { showCreateAccountPage, setShowCreateAccountPage } = useContext(userContext);
    const { loggedIn, setLoggedIn } = useContext(userContext);

    const deleteItem = (id) => {
        fetch('http://localhost:8081/Item/' + id, {
            method: 'DELETE'
        })
        .then(() => {
            fetch('http://localhost:8081/Item')
            .then(res => res.json())
            .then(data => setItems(data));
        });
    }

    return (
        <div className="big-container">
            {showAddItemPopup ? <AddItemPopup /> :
            showLoginPopup ? <LoginPopup /> :
            showCreateAccountPage ? <CreateAccountPage /> :
            <div className="home">
                <div className="info">
                    <h1>Home</h1>
                    {loggedIn ? <p>You are logged in as {username} (inventory manager).</p> : <p>You are not logged in.</p>}
                    <div className="buttons">
                        <Button id="create-account" variant='contained' onClick={() => setShowCreateAccountPage(true)}>Create Account</Button>
                        <Button id="login-button" variant='contained' onClick={() => setShowLoginPopup(true)}>Login</Button>
                        <Button id="logout-button" color='error' variant='contained' onClick={() => setLoggedIn(false)}>Logout</Button>
                        {loggedIn ? <Button id="add-item" variant='contained' onClick={() => setShowAddItemPopup(true)}>Add Item</Button> : null}
                    </div>
                </div>
                <div>
                    <h3>Authorized Users:</h3>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id}>{user.first_name} {user.last_name}</li>
                        ))}
                    </ul>
                    <h3>Items in the database:</h3>
                        <ul>
                            {items.map((item) => (
                                <div className="listitem">
                                    <li key={item.id}>{item.item_name} - 
                                    Owner: {users.find(user => user.id == item.userId)?.first_name}</li>
                                    {loggedIn ? <Button id="delete-item" variant="outlined" color="error" startIcon={<DeleteIcon/>} onClick={() => deleteItem(item.id)}>Delete Item</Button> : null}
                                </div>
                            ))}
                        </ul>
                    {loggedIn ? <div>
                    <h3>My Items</h3>
                        <ul>
                            {items.filter(item => item.userId == users.find(user => user.username == username)?.id).map((item) => (
                                <li key={item.id}>{item.item_name}</li>
                            ))}
                        </ul>
                    </div> : null}
                </div>
                {/* <div className="buttons">
                    <Button id="create-account" variant='contained' onClick={() => setShowCreateAccountPage(true)}>Create Account</Button>
                    <Button id="login-button" variant='contained' onClick={() => setShowLoginPopup(true)}>Login</Button>
                    <Button id="logout-button" color='error' variant='contained' onClick={() => setLoggedIn(false)}>Logout</Button>
                    {loggedIn ? <Button id="add-item" variant='contained' onClick={() => setShowAddItemPopup(true)}>Add Item</Button> : null}
                </div> */}
            </div>
            }
        </div>
    );
}

export default Home;