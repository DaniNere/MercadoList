import React from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAuth, sendEmailVerification } from "firebase/auth";
import "../styles/Cadastro.css";
import { cadastrarUsuario, entrarGoogle } from "../firebase/auth";
import { FaGoogle } from "react-icons/fa";

function CadastroComponent() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const auth = getAuth();

  async function cadastrar(data) {
    try {
      const user = await cadastrarUsuario(data.nome, data.email, data.senha);
      await sendEmailVerification(user); 
      toast.success(`Bem-vindo(a)! ${data.nome}. Verifique seu e-mail.`);
      navigate("/itens");
    } catch (error) {
      toast.error("Um erro aconteceu! " + error.message);
    }
  }

  async function handleEntrarGoogle() {
    try {
      await entrarGoogle();
      toast.success("Bem-vindo(a)!");
      navigate("/itens");
    } catch (error) {
      toast.error("Um erro aconteceu! " + error.message);
    }
  }

  return (
    <div className="page-wrapper">
      <div className="registration-container">
        <form className="registration-form" onSubmit={handleSubmit(cadastrar)}>
          <h1>Cadastro</h1>
          
          <div className="registration-form__input-group">
            <label htmlFor="nome" className="registration-form__label">Nome</label>
            <input
              type="text"
              id="nome"
              className="registration-form__input"
              placeholder="Digite seu nome"
              {...register("nome", { required: true, maxLength: 150 })}
            />
            {errors.nome && <small className="registration-form__error-message">O nome é inválido!</small>}
          </div>
          <div className="registration-form__input-group">
            <label htmlFor="email" className="registration-form__label">Email</label>
            <input
              type="email"
              id="email"
              className="registration-form__input"
              placeholder="Digite seu e-mail"
              {...register("email", { required: true })}
            />
            {errors.email && <small className="registration-form__error-message">O email é inválido!</small>}
          </div>
          <div className="registration-form__input-group">
            <label htmlFor="senha" className="registration-form__label">Senha</label>
            <input
              type="password"
              id="senha"
              className="registration-form__input"
              placeholder="Digite sua senha"
              {...register("senha", {
                required: "A senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter no mínimo 6 caracteres",
                },
              })}
            />
            {errors.senha && <small className="registration-form__error-message">{errors.senha.message}</small>}
          </div>
          <div className="mt-4">
            <Button className="registration-form__button registration-form__button--submit" type="submit">
              Cadastrar
            </Button>
            <Button
              variant="danger"
              className="registration-form__button registration-form__button--google"
              type="button"
              onClick={handleEntrarGoogle}
            >
              <FaGoogle className="registration-form__google-icon" />
              <span className="registration-form__google-text">Cadastrar com Google</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastroComponent;
