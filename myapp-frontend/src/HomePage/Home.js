import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../App";
import { AddItemPopup } from "../AddItemPopup/AddItemPopup";
import '../AddItemPopup/AddItemPopup.css';

export const Home = () => {

    const { users, setUsers } = useContext(userContext);
    const { items, setItems } = useContext(userContext);
    const { showAddItemPopup, setShowAddItemPopup } = useContext(userContext);

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
        <>
            {showAddItemPopup ? <AddItemPopup /> :
            <div className="home">
                <h1>Home</h1>
                <p>Welcome to myapp-frontend!</p>
                <p>Here are the users in the database:</p>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.first_name} {user.last_name}</li>
                    ))}
                </ul>
                <p>Here are the items in the database:</p>
                    <ul>
                        {items.map((item) => (
                            <div>
                                <li key={item.id}>{item.item_name}</li>
                                <button id="delete-item" onClick={() => deleteItem(item.id)}>Delete Item</button>
                            </div>
                        ))}
                    </ul>
                <button id="login-button">Login</button>
                <button id="guest-button">Continue as Guest</button>
                <button id="add-item" onClick={() => setShowAddItemPopup(true)}>Add Item</button>
            </div>
        }
        </>

    );
}

export default Home;