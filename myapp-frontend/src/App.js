import './App.css';
import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './HomePage/Home';

export const userContext = createContext(null);

function App() {

  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [showAddItemPopup, setShowAddItemPopup] = useState(false);


  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8081/User').then((res) => res.json()),
      fetch('http://localhost:8081/Item').then((res) => res.json()),
    ])
    .then(([users, items]) => {
      setUsers(users);
      setItems(items);
    });
  });

  return (
    <>
      <userContext.Provider value={{
        users,
        setUsers,
        items,
        setItems,
        showAddItemPopup, 
        setShowAddItemPopup
      }}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </userContext.Provider>
    </>
  );
}

export default App;
