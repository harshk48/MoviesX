import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
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
  const [wishList, setWishList] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("selectedGenre", selectedGenre || "");
    localStorage.setItem("selectedMode", selectedMode || "Light");
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [selectedGenre, selectedMode, wishList]);

  const login = useCallback((email) => setUser(email), []);
  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser("");
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
