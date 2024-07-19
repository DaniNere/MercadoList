import React from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAuth, sendEmailVerification } from "firebase/auth";
import "../styles/Login.css";
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
  const auth = getAuth();

  async function cadastrar(data) {
    try {
      const user = await cadastrarUsuario(data.nome, data.email, data.senha);
      await sendEmailVerification(user);
      toast.success(`Bem-vindo(a)! ${data.nome}. Verifique seu e-mail.`);
      navigate("/");
    } catch (error) {
      toast.error("Um erro aconteceu! " + error.message);
    }
  }

  async function handleEntrarGoogle() {
    try {
      await entrarGoogle();
      toast.success("Bem-vindo(a)!");
      navigate("/");
    } catch (error) {
      toast.error("Um erro aconteceu! " + error.message);
    }
  }

  return (
    <main className="container">
      <form className="form-section" onSubmit={handleSubmit(cadastrar)}>
        <h1>Cadastro</h1>
        <hr />
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            placeholder="Digite seu nome"
            {...register("nome", { required: true, maxLength: 150 })}
          />
          {errors.nome && (
            <small className="invalid">O nome é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Digite seu e-mail"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <small className="invalid">O email é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            className="form-control"
            placeholder="Digite sua senha"
            {...register("senha", {
              required: "A senha é obrigatória",
              minLength: {
                value: 6,
                message: "A senha deve ter no mínimo 6 caracteres",
              },
            })}
          />
          {errors.senha && (
            <small className="invalid">{errors.senha.message}</small>
          )}
        </div>
        <div className="mt-4">
          <Button className="mt-1 w-100 btn-custom" type="submit">
            Cadastrar
          </Button>
          <Button
            variant="danger"
            className="mt-1 w-100"
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
