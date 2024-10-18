// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const ProtectedRoute = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>;  // Keep showing the loading message if it's in a loading state
    }

    if (error) {
        console.error("Error during authentication:", error);
        return <div>Error: {error.message}</div>;  // Display any error encountered during authentication
    }

    if (!user) {
        return <Navigate to="/" />;  // Redirect to login if the user is not authenticated
    }

    return children;  // If the user is authenticated, show the protected content
};

export default ProtectedRoute;
