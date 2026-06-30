import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { fetchWishlist } from "./utils/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      return stored?.username || "";
    } catch {
      return "";
    }
  });
  const [movieDetails, setMovieDetails] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("selectedGenre") || "";
  });
  const [selectedMode, setSelectedMode] = useState(() => {
    if (typeof window === "undefined") return "Light";
    return localStorage.getItem("selectedMode") || "Light";
  });
  const [loading, setLoading] = useState(true);
  const [wishList, setWishList] = useState([]);

  // Persist only genre/mode preferences, never the wishlist
  useEffect(() => {
    localStorage.setItem("selectedGenre", selectedGenre || "");
    localStorage.setItem("selectedMode", selectedMode || "Light");
  }, [selectedGenre, selectedMode]);

  // Fetch wishlist fresh from the server whenever the logged-in user changes
  // (covers login, and page refresh once `user` is restored above)
  useEffect(() => {
    const loadWishlist = async () => {
      if (!user) {
        setWishList([]);
        return;
      }
      const result = await fetchWishlist(user);
      setWishList(result.wishlist || []);
    };
    loadWishlist();
  }, [user]);

  const login = useCallback((userData) => {
    // userData can be a string (email) or an object { username, ... }
    const username =
      typeof userData === "string" ? userData : userData?.username;
    setUser(username || "");
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser("");
    setWishList([]);
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
      movieDetails,
      setMovieDetails,
      wishList,
      setWishList,
      selectedMode,
      setSelectedMode,
      loading,
      setLoading,
      selectedGenre,
      setSelectedGenre,
    }),
    [
      user,
      login,
      logout,
      movieDetails,
      wishList,
      selectedMode,
      loading,
      selectedGenre,
    ],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default ContextProvider;
export { AuthContext };