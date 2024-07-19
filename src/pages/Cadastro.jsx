import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/Cadastro.css";
import { FaGoogle } from "react-icons/fa";
import { cadastrarUsuario, entrarGoogle } from "../firebase/auth";

function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function cadastrar(data) {
    cadastrarUsuario(data.nome, data.email, data.senha)
      .then(() => {
        toast.success(`Bem vindo (a)! ${data.nome}`);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Um erro aconteceu!" + error.code);
      });
  }

  function handleEntrarGoogle() {
    entrarGoogle().then(() => {
      toast.success("Bem vindo (a)!");
      navigate("/");
    });
  }

  return (
    <main className="cadastro-container">
      <form className="cadastro-form-section" onSubmit={handleSubmit(cadastrar)}>
        <h1 className="cadastro-h1">Cadastro</h1>
        <div>
          <label htmlFor="nome" className="cadastro-label">Nome</label>
          <input
            type="text"
            id="nome"
            className="cadastro-input form-control"
            placeholder="Digite seu nome"
            {...register("nome", { required: true, maxLength: 150 })}
          />
          {errors.nome && (
            <small className="cadastro-small invalid">O nome é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="email" className="cadastro-label">Email</label>
          <input
            type="email"
            id="email"
            className="cadastro-input form-control"
            placeholder="Digite seu e-mail"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <small className="cadastro-small invalid">O email é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="senha" className="cadastro-label">Senha</label>
          <input
            type="password"
            id="senha"
            className="cadastro-input form-control"
            placeholder="Digite sua senha"
            {...register("senha", {
              required: "A senha é obrigatória",
              minLength: {
                value: 6,
                message: "A senha deve ter acima de 6 caracteres",
              },
            })}
          />
          {errors.senha && (
            <small className="cadastro-small invalid">{errors.senha.message}</small>
          )}
        </div>
        <div className="mt-4">
          <Button className="cadastro-button mt-1 w-100 btn-custom" type="submit">
            Cadastrar
          </Button>
          <Button
            variant="danger"
            className="cadastro-button mt-1 w-100"
            type="button"
            onClick={handleEntrarGoogle}
          >
            Entrar com Google
          </Button>
        </div>
      </form>
    </main>
  );
}

export default Cadastro;