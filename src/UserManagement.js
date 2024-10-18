// src/UserManagement.js
import React, { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { TextField, Button, Container, List, ListItem, AppBar, Toolbar, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [Email, setEmail] = useState('');

    const [id, setId] = useState('');

    const usersCollectionRef = collection(db, 'users');

    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const addUser = async () => {
        await addDoc(usersCollectionRef, { name });
        setName('');
        getUsers();
    };

    const updateUser = async () => {
        const userDoc = doc(db, 'users', id);
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists()) {
            await updateDoc(userDoc, { name });
        } else {
            alert('No document found with the given ID');
        }
        setId('');
        setName('');
        setEmail('');
        getUsers();
    };

    const deleteUser = async (userId) => {
        const userDoc = doc(db, 'users', userId);
        await deleteDoc(userDoc);
        getUsers();
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            alert('Signed out successfully');
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        User Management
                    </Typography>
                    <Button onClick={handleSignOut} color="inherit">Sign Out</Button>
                </Toolbar>
            </AppBar>
            <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="User ID (for updating)"
                variant="outlined"
                value={id}
                onChange={(e) => setId(e.target.value)}
                fullWidth
                margin="normal"
            /><TextField
            label="Email"
            variant="outlined"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
        />
            <Button onClick={addUser} variant="contained" color="primary">Add User</Button>
            <Button onClick={updateUser} variant="contained" color="secondary">Update User</Button>

            <List>
                {users.map((user) => (
                    <ListItem key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{user.name}</span>
                        <div>
                            <Button onClick={() => updateUser(user.id)} color="secondary" style={{ marginRight: '8px' }}>Update</Button>
                            <Button onClick={() => deleteUser(user.id)} color="error">Delete</Button>
                        </div>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default UserManagement;
