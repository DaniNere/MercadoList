import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

function ListaCompra() {
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const checkEmailVerification = async () => {
      const user = auth.currentUser;

      if (user) {
        await user.reload(); // Recarrega as informações do usuário
        setEmailVerified(user.emailVerified);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    checkEmailVerification();
  }, [auth]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!emailVerified) {
    return <div>Seu e-mail ainda não foi verificado. Por favor, verifique seu e-mail.</div>;
  }

  return (
    <div>
      <h1>LISTANDO OS ITENS</h1>
      {/* Aqui você renderiza a lista de compras */}
    </div>
  );
}

export default ListaCompra;
