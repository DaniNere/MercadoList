import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, Navigate } from "react-router-dom";
import { entrarGoogle, loginUsuario } from "../firebase/auth";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { useContext } from "react";
import "../styles/Login.css";
import { FaGoogle } from "react-icons/fa";

function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { usuarioLogado } = useContext(UsuarioContext);

  function entrar(data) {
    loginUsuario(data.email, data.senha)
      .then(() => {
        toast.success(`Bem-vindo(a)!`);
        navigate("/itens");
      })
      .catch(() => {
        toast.error("Email e/ou senha incorreta!");
      });
  }

  function handleEntrarGoogle() {
    entrarGoogle().then(() => {
      toast.success("Bem vindo!");
      navigate("/itens");
    });
  }

  if (usuarioLogado) {
    return <Navigate to="/itens" />;
  }

  return (
    <div className="page-wrapper">
      <div className="login-container">
        <div className="login-form">
          <form onSubmit={handleSubmit(entrar)}>
            <h1>Login</h1>

            <div className="login-form__input-group">
              <label htmlFor="email" className="login-form__label">Email</label>
              <input
                type="email"
                id="email"
                className="login-form__input"
                {...register("email", { required: "O email é obrigatório" })}
              />
              {errors.email && (
                <small className="login-form__error-message">{errors.email.message}</small>
              )}
            </div>
            <div className="login-form__input-group">
              <label htmlFor="senha" className="login-form__label">Senha</label>
              <input
                type="password"
                id="senha"
                className="login-form__input"
                {...register("senha", {
                  required: "A senha é obrigatória",
                  minLength: { value: 6, message: "Mínimo de 6 caracteres." },
                })}
              />
              {errors.senha && (
                <small className="login-form__error-message">{errors.senha.message}</small>
              )}
            </div>
            <Button className="login-form__button btn-custom login-form__button--submit" type="submit">
              Entrar
            </Button>
            <Button
              onClick={handleEntrarGoogle}
              variant="danger"
              className="login-form__button login-form__button--google"
              type="button"
            >
              <FaGoogle className="login-form__google-icon" />
              <span className="login-form__google-text ">Entrar com o Google</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
