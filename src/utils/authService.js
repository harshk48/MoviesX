// API Base URL
const API_BASE_URL = "http://localhost:5000";

/**
 * Export registration data - Registers a new user
 * Checks if user exists in JSON file, if not adds new user
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Promise} - Response with success or error message
 */
export const exportRegisterData = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred during registration",
    };
  }
};

/**
 * Login user - Verifies user credentials against JSON file
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Promise} - Response with success or error message
 */
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return {
      success: true,
      message: data.message,
      user: data.user,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred during login",
    };
  }
};
