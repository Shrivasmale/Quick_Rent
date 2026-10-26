// frontend/src/middleware/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole, onAuthRequired }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-light text-brand-primary flex items-center justify-center text-3xl mb-4">
          🔒
        </div>
        <h2 className="text-2xl font-bold text-brand-dark mb-2">Authentication Required</h2>
        <p className="text-brand-muted max-w-md mb-6">
          Please log in or create an account to access this section of QuickRent.
        </p>
        <button
          onClick={() => onAuthRequired && onAuthRequired("login")}
          className="px-6 py-2.5 bg-brand-primary hover:bg-brand-hover text-white font-semibold rounded-base transition-colors shadow-soft"
        >
          Sign In to Continue
        </button>
      </div>
    );
  }

  if (requiredRole && user.role !== requiredRole && user.role !== "admin") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-brand-dark mb-2">Access Restricted</h2>
        <p className="text-brand-muted max-w-md">
          This feature requires a {requiredRole} account role.
        </p>
      </div>
    );
  }

  return children;
}
