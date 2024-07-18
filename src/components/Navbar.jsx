import "../styles/Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="container-navbar">
      <img
        className="logo_mercadolist"
        src={logo}
        alt="Logo de um carrinho de compras com um celular dentro e escrita MercadoList"
      />
      <ul>
        <li>Login</li>
        <li>Cadastro</li>
        <li>Lista de Compras</li>
      </ul>
    </nav>
  );
}

export default Navbar;
