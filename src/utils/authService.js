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
      message: data.message || "User registered successfully",
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
      message: data.message || "Login successful",
      user: data.user,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred during login",
    };
  }
};


export const addtoWishlist = async (movie) => {
  try {
    const response = await fetch(`${API_BASE_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       movie,
        username: JSON.parse(localStorage.getItem("user"))?.username || "guest",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add to wishlist");
    }

    return {
      success: true,
      message: data.message || "Added to wishlist",
      user: data.user,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred while adding to wishlist",
    };
  }
};


export const removeWishlist = async (movie) => {
  try {
    const response = await fetch(`${API_BASE_URL}/wishList`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username:
          JSON.parse(localStorage.getItem("user"))?.username || "guest",
        movie,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to remove from wishlist");
    }

    return {
      success: true,
      message: data.message || "Removed from wishlist",
      wishlist: data.wishlist || [],
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred while removing from wishlist",
      wishlist: [],
    };
  }
};