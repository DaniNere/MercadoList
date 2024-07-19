import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, Navigate } from "react-router-dom";
import { entrarGoogle, loginUsuario } from "../firebase/auth";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { useContext } from "react";
import "../styles/Login.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const usuario = useContext(UsuarioContext);

  function entrar(data) {
    loginUsuario(data.email, data.senha)
      .then(() => {
        toast.success("Bem-vindo(a)!");
        navigate("/tarefas");
      })
      .catch(() => {
        toast.error("Email e/ou senha incorreta!");
      });
  }

  function handleEntrarGoogle() {
    entrarGoogle().then(() => {
      toast.success("Bem vindo!");
      navigate("/lista-de-compras");
    });
  }

  if (usuario !== null) {
    return <Navigate to="/lista-de-compras" />;
  }

  return (
    <main className="container">
      <form className="form-section" onSubmit={handleSubmit(entrar)}>
        <h1>Login</h1>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email", { required: "O email é obrigatório" })}
          />
          {errors.email && (
            <small className="invalid">{errors.email.message}</small>
          )}
        </div>
        <div>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            className="form-control"
            {...register("senha", {
              required: "A senha é obrigatória",
              minLength: { value: 6, message: "Mínimo de 6 caracteres." },
            })}
          />
          {errors.senha && (
            <small className="invalid">{errors.senha.message}</small>
          )}
        </div>
        <Button className="mt-1 w-100 btn-custom" type="submit">
          Entrar
        </Button>
        <Button
          onClick={handleEntrarGoogle}
          variant="danger"
          className="mt-1 w-100"
          type="button"
        >
          Entrar com o Google
        </Button>
      </form>
    </main>
  );
}

export default Login;
