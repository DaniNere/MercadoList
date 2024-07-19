import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../firebase/auth";
import { useContext } from "react";
import { UsuarioContext } from "../contexts/UsuarioContext";

function Navbar() {
  const usuario = useContext(UsuarioContext);
  const navigate = useNavigate();
  function handleLogout() {
    logout().then(() => {
      navigate("/");
    });
  }

  return (
    <nav className="container-navbar">
      <img
        className="logo_mercadolist"
        src={logo}
        alt="Logo de um carrinho de compras com um celular dentro e escrita MercadoList"
      />
      <ul>
        {!usuario && (
          <Link className="link-login" to="/">
            Login
          </Link>
        )}
        {!usuario && <Link to="/cadastro">Cadastro</Link>}
        {usuario && <Link to="/lista-de-compras">Lista de Compras</Link>}
        {usuario && <Link onClick={handleLogout}>Logout</Link>}
      </ul>
    </nav>
  );
}

export default Navbar;
