import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  user: {
    username: "",
    email: "",
    profilePic: "",
  },
  loginUser: async () => {},
  logoutUser: async () => {},
  signupUser: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getCurrentUser() {
      const response = await fetch("api/users/");
      const data = await response.json();
      if (response.ok) {
        // console.log("frontend user: ", data);
        setUser(data);
      } else {
        // console.log("error in frontend user: ", data);
      }
    }
    getCurrentUser();
  }, []);

  const logoutUser = async () => {
    const response = await fetch("api/auth/signout");
    const data = await response.json();
    if (!response.ok) {
      console.log("error signing out: ", data);
    }
    setUser(null);
    console.log("signed out user");
  };
  const loginUser = async (userDetails) => {
    try {
      const response = await fetch("api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Successfully signed in:", data.user);
        setUser(data.user);
      } else {
        const data = await response.json();
        throw new Error(data.err);
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      throw error; // Propagate error to component
    }
  };

  const signupUser = async (userDetails) => {
    try {
      const response = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Successfully signed up:", data.user);
        setUser(data.user);
      } else {
        const data = await response.json();
        throw new Error(data.err);
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      throw error; // Propagate error to component
    }
  };
  return (
    <AuthContext.Provider value={{ user, logoutUser, loginUser, signupUser }}>
      {children}
    </AuthContext.Provider>
  );
};
