import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UsuarioContext } from "../contexts/UsuarioContext";
import logo from "../assets/logo.png";
import { logout } from "../firebase/auth";
import "../styles/Navbar.css";

function Navbar() {
  const { usuarioLogado } = useContext(UsuarioContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="container-navbar">
      <img
        className="logo_mercadolist"
        src={logo}
        alt="Logo de um carrinho de compras com um celular dentro e escrita MercadoList"
      />
      <ul>
        {!usuarioLogado && (
          <Link className="link-login" to="/">
            Login
          </Link>
        )}
        {!usuarioLogado && <Link to="/cadastro">Cadastro</Link>}
        {usuarioLogado && <Link to="/itens">Lista de Compras</Link>}
        {usuarioLogado && (
          <span className="text-light nav-link mx-3">{usuarioLogado.displayName}</span>
        )}
        {usuarioLogado && <Link onClick={handleLogout}>Logout</Link>}
      </ul>
    </nav>
  );
}

export default Navbar;
