// frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("qr_auth_user")) || null;
    } catch {
      return null;
    }
  });
  const [session, setSession] = useState(() => {
    try {
      const stored = localStorage.getItem("qr_auth_user");
      return stored ? { access_token: "local-token", user: JSON.parse(stored) } : null;
    } catch {
      return null;
    }
  });
  const loading = false;

  // 1. Local Sign Up
  const handleSignup = async ({ email, name, phone, city, role = "renter" }) => {
    const newUser = {
      id: "usr_" + Date.now(),
      email,
      name: name || email.split("@")[0],
      phone: phone || "",
      city: city || "Pune",
      role: role || "renter",
      kyc_verified: true,
      created_at: new Date().toISOString(),
    };

    setUser(newUser);
    setSession({ access_token: "local-token-" + Date.now(), user: newUser });
    try {
      localStorage.setItem("qr_auth_user", JSON.stringify(newUser));
    } catch (err) {
      console.warn("Error caching user:", err);
    }
    return { success: true, user: newUser };
  };

  // 2. Local Sign In
  const handleLogin = async ({ email }) => {
    const existingUser = {
      id: "usr_" + Date.now(),
      email,
      name: email.split("@")[0],
      phone: "",
      city: "Pune",
      role: "renter",
      kyc_verified: true,
    };

    setUser(existingUser);
    setSession({ access_token: "local-token-" + Date.now(), user: existingUser });
    try {
      localStorage.setItem("qr_auth_user", JSON.stringify(existingUser));
    } catch (err) {
      console.warn("Error caching user:", err);
    }
    return { success: true, user: existingUser };
  };

  // 3. Local Sign Out
  const handleLogout = async () => {
    setUser(null);
    setSession(null);
    try {
      localStorage.removeItem("qr_auth_user");
    } catch (err) {
      console.warn("Error clearing auth session:", err);
    }
  };

  // 4. Local Role Switching
  const updateUserRole = async (newRole) => {
    if (!user) return;
    const updated = { ...user, role: newRole };
    setUser(updated);
    try {
      localStorage.setItem("qr_auth_user", JSON.stringify(updated));
    } catch (err) {
      console.warn("Error saving updated role:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        handleLogin,
        handleSignup,
        handleLogout,
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
