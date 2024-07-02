import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app'; // For the core Firebase module
import 'firebase/compat/firestore'; // For the Firestore database
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

// Firebase configuration
const firebaseConfig = {
  
    apiKey: "AIzaSyDbxfMPYiFedIZUncKKZuzo8MoCpB28xPE",
    authDomain: "purechatproject.firebaseapp.com",
    projectId: "purechatproject",
    storageBucket: "purechatproject.appspot.com",
    messagingSenderId: "333478395454",
    appId: "1:333478395454:web:2b9e98974ccf7f2d071b6f",
    measurementId: "G-DQPY5MFN29"
  
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const unsubscribe = db.collection('items').onSnapshot(snapshot => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })));
    });
    return () => unsubscribe();
  }, []);

  const addItem = () => {
    if (name.trim() !== '') { // Check if name is not empty or whitespace
      db.collection('items').add({ name });
      setName('');
    } else {
      alert('Please enter a valid item name.');
    }
  };

  const deleteItem = (id) => {
    db.collection('items').doc(id).delete();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card mt-5">
            <div className="card-header bg-primary text-white">
              <h3 className="text-center">ToDo List</h3>
            </div>
            <div className="card-body">
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Enter item name"
                  value={name} onChange={(e) => setName(e.target.value)} />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button" onClick={addItem}>Add</button>
                </div>
              </div>
              <ul className="list-group">
                {items.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.name}
                    <button className="btn btn-danger" onClick={() => deleteItem(item.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;