// src/Auth.js
import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [email, setEmail] = useState('superadmin@test.com');
    const [password, setPassword] = useState('123456');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                alert('Login successful');
                navigate('/users'); // Redirect after successful login
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                alert('User created successfully');
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    {isLogin ? 'Login' : 'Register'}
                </Button>
                <Button
                    onClick={() => setIsLogin(!isLogin)}
                    color="secondary"
                >
                    Switch to {isLogin ? 'Register' : 'Login'}
                </Button>
            </form>
        </Container>
    );
};

export default Auth;
