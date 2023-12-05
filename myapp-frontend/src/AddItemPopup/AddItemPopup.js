import React, { useState, useContext } from "react";
import { userContext } from "../App";
import './AddItemPopup.css';

export const AddItemPopup = () => {
    
    const { users, setUsers } = useContext(userContext);
    const { items, setItems } = useContext(userContext);
    const { showAddItemPopup, setShowAddItemPopup } = useContext(userContext);
    const [newItem, setNewItem] = useState({
        userId: '',
        item_name: "",
        description: "",
        quantity: ''
    });

    const renderInputField = () => {
        return (
            <div>
                {Object.keys(newItem).map((key) => {
                    return (
                        <div>
                        <label>{key}: </label>
                        <input type="text" 
                        id={key + "-input"} 
                        placeholder=""
                        name={key} 
                        value={newItem[key]} 
                        onChange={handleInputChange}/>
                    </div>
                    );
                })}
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prev) => ({
          ...prev,
          [name]: value,
        }));
      };      


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

        return (
            <div className="add-item-popup">
                <h1>Add Item</h1>
                <p>Enter the item you would like to add:</p>
                {renderInputField()}
                <button id="add-item-button" onClick={() => {
                    setShowAddItemPopup(false)
                    postItem(newItem)}}
                    >Add Item</button>
            </div>
        );
}