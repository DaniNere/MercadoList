import React, { useEffect, useContext, useState } from "react";
import "../styles/VerifyEmail.css";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";

function VerifyEmail() {
  const auth = getAuth();
  const navigate = useNavigate();
  const usuario = useContext(UsuarioContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkEmailVerification = async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload();
        setIsVerified(user.emailVerified);
        setIsLoading(false);
      } else {
        navigate("/");
      }
    };

    checkEmailVerification();

    const intervalId = setInterval(checkEmailVerification, 5000);

    return () => clearInterval(intervalId);
  }, [auth, navigate]);

  const resendVerificationEmail = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(user);
        alert(
          "E-mail de verificação reenviado. Por favor, verifique sua caixa de entrada."
        );
      } catch (error) {
        alert("Erro ao reenviar o e-mail de verificação. " + error.message);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!usuario || !auth.currentUser || isVerified) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container-reenviar-email">
      <MdMarkEmailUnread className="email-icon"/>
      <h1>Verifique seu E-mail</h1>
      <p>Por favor, verifique seu e-mail para confirmar sua conta.</p>
      <div>
        <button className="reenviar-email" onClick={resendVerificationEmail}>
          Reenviar E-mail
        </button>
        <Link className="retornar" to="/">
          Retornar para o Login
        </Link>
        <FaArrowRightLong className="seta-icon"/>
      </div>
    </div>
  );
}

export default VerifyEmail;
