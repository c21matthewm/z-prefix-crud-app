import React, { useState, useContext } from "react";
import { userContext } from "../App";
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './AddItemPopup.css';

export const AddItemPopup = () => {
    
    const { users, setUsers } = useContext(userContext);
    const { items, setItems } = useContext(userContext);
    const { username, setUsername } = useContext(userContext);
    const { itemName, setItemName } = useContext(userContext);
    const { description, setDescription } = useContext(userContext);
    const { quantity, setQuantity } = useContext(userContext);
    const { showAddItemPopup, setShowAddItemPopup } = useContext(userContext);

    const postItem = (item) => {
        fetch('http://localhost:8081/Item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        })
        .then(() => {
            fetch('http://localhost:8081/Item')
            .then(res => res.json())
            .then(data => setItems(data));
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Item Name: 
                    <input
                        type="text"
                        placeholder=""
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>Desciption: 
                    <input
                        type="text"
                        placeholder=""
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>Quanity: 
                    <input
                        type="text"
                        placeholder=""
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}/>
                </label>
            </div>
            <div className="buttons">
                <Button type='submit' id="add-item-button" variant='contained' endIcon={<SendIcon/>} onClick={() => {
                    postItem({
                        userId: users.find(user => user.username == username)?.id,
                        item_name: itemName,
                        description: description,
                        quantity: quantity
                    })
                    setShowAddItemPopup(false)
                    }}
                >Add Item</Button>
                <Button id='cancel' variant='contained' onClick={() => setShowAddItemPopup(false)}>Cancel</Button>
            </div>
        </form>
    );
}