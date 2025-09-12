// Main App Component
// Handles routing between authentication and dashboard pages

import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { authService } from './services/authService';
import awsConfig from './config/awsConfig';
import './App.css';

// Configure AWS Amplify with our Cognito settings
Amplify.configure(awsConfig);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('login'); // 'login' or 'register'

  // Check if user is already authenticated when app loads
  useEffect(() => {
    const checkAuthStatus = async () => {
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Handle successful login
  const handleLoginSuccess = (user) => {
    console.log('Login successful:', user.username);
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    console.log('User logged out');
    setIsAuthenticated(false);
    setCurrentView('login');
  };

  // Switch between login and register views
  const switchToRegister = () => setCurrentView('register');
  const switchToLogin = () => setCurrentView('login');

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

// // Simulate a 404 error for testing rollback
// const simulate404 = true;

// if (simulate404) {
//   // This will render a 404-style error in the UI
//   return (
//     <div className="app">
//       <div className="error-page">
//         <h1>404 - Page Not Found</h1>
//         <p>This page does not exist (simulated error for rollback).</p>
//       </div>
//     </div>
//   );
// }


  return (
    <div className="app">
      {isAuthenticated ? (
        // Show dashboard for authenticated users
        <Dashboard onLogout={handleLogout} />
      ) : (
        // Show authentication forms for non-authenticated users
        <div className="auth-wrapper">
          <div className="app-header">
            <h1>AWS Cognito Authentication Pipeline testing</h1>
            <p>Simple and secure user authentication with React</p>
          </div>
          
          {currentView === 'login' ? (
            <Login 
              onLoginSuccess={handleLoginSuccess}
              switchToRegister={switchToRegister}
            />
          ) : (
            <Register 
              switchToLogin={switchToLogin}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
