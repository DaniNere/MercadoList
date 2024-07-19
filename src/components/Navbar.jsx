import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="container-navbar">
      <img
        className="logo_mercadolist"
        src={logo}
        alt="Logo de um carrinho de compras com um celular dentro e escrita MercadoList"
      />
      <ul>
        <Link className="link-login" to="/">Login</Link>
        <Link to="/cadastro">Cadastro</Link>
        <Link to="/lista-de-compras">Lista de Compras</Link>
      </ul>
    </nav>
  );
}

export default Navbar;
