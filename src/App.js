// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Auth from './Auth';
import UserManagement from './UserManagement';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Container>
                <h1>Firebase Auth & CRUD</h1>
                <Routes>
                    {/* Route for the login page */}
                    <Route path="/" element={<Auth />} />

                    {/* Protected route for user management */}
                    <Route
                        path="/users"
                        element={
                            <ProtectedRoute>
                                <UserManagement />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
