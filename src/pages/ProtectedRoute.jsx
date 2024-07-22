import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "firebase/auth";

function ProtectedRoute() {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const checkEmailVerification = async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload();
        setIsVerified(user.emailVerified);
      }
      setLoading(false);
    };

    checkEmailVerification();
  }, [auth]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isVerified) {
    return <Navigate to="/verify-email" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
