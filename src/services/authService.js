// Authentication Service
// This file handles all authentication operations with AWS Cognito

import { Auth } from 'aws-amplify';

// ✅ Toggle this flag to simulate a 400 error on login
const simulate400 = true;

export const authService = {
  // Sign up a new user
  signUp: async (username, password, email) => {
    try {
      const result = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Confirm user registration with verification code
  confirmSignUp: async (username, code) => {
    try {
      await Auth.confirmSignUp(username, code);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // ✅ Simulate 400 error in sign-in (login)
  signIn: async (username, password) => {
    try {
      if (simulate400) {
        // Simulated 400 error
        const error = new Error("Bad Request: Invalid login credentials");
        error.status = 400;
        throw error;
      }

      const user = await Auth.signIn(username, password);
      return { success: true, data: user };
    } catch (error) {
      // Preserve real error or simulated one
      const errorMessage = error.message || "An unknown error occurred";
      const status = error.status || null;
      return { success: false, error: errorMessage, status };
    }
  },

  // Sign out user
  signOut: async () => {
    try {
      await Auth.signOut();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get current authenticated user
  getCurrentUser: async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    try {
      await Auth.currentAuthenticatedUser();
      return true;
    } catch (error) {
      return false;
    }
  }
};
