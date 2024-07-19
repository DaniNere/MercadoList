import React, { useEffect } from "react";
import "../styles/VerifyEmail.css";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function VerifyEmail() {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkEmailVerification = async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          navigate("/lista-de-compras");
        }
      }
    };

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

  return (
    <div className="container-reenviar-email">
      <h1>Verifique seu E-mail</h1>
      <p>Por favor, verifique seu e-mail para confirmar sua conta.</p>
      <div>
        <button className="reenviar-email" onClick={resendVerificationEmail}>
          Reenviar E-mail
        </button>
        <Link className="retornar" to="/">
          Retornar para o Login
        </Link>
      </div>
    </div>
  );
}

export default VerifyEmail;
