import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/AddItemComponent.css";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";

function AddItemComponent() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const [numero, setNumero] = useState(0);

    function cadastrar(data) {
        cadastrarUsuario(data.nome, data.preco, data.descricao)
            .then(() => {
                toast.success(`Bem vindo (a)! ${data.nome}`);
                navigate("/tarefas");
            })
            .catch((error) => {
                toast.error("Um erro aconteceu!" + error.code);
            });
    }

    function handleIncremento() {
        setNumero(numero + 1);
    }

    function handleDecremento() {
        if (numero > 0) {
            setNumero(numero - 1);
        }
    }

    return (
        <main className="container">
            <form className="form-section" onSubmit={handleSubmit(cadastrar)}>
                <h1>Adicionar Item</h1>
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        className="form-control"
                        placeholder="Digite o seu item"
                        {...register("nome", { required: true, maxLength: 100 })}
                    />
                    {errors.nome && (
                        <small className="invalid">O nome é inválido!</small>
                    )}
                </div>
                <div>
                    <label htmlFor="preco">Preço</label>
                    <input
                        type="number"
                        id="preco"
                        className="form-control"
                        placeholder="Digite o preço"
                        {...register("preco", { required: true })}
                    />
                    {errors.preco && (
                        <small className="invalid">O preço é inválido!</small>
                    )}
                </div>
                <div>
                    <label htmlFor="quantidade">Quantidade</label>
                    <div  className="quantidade">
                    <Button 
                    className="mt-1 w-20 btn-custom" 
                    type="button"
                    onClick={handleDecremento}>
                        -
                    </Button>
                    {numero}
                    <Button 
                    className="mt-1 w-20 btn-custom" 
                    type="button"
                    onClick={handleIncremento}>
                        +
                    </Button>
                    </div>
                </div>
                <div>
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        id="categoria"
                        className="form-select"
                        {...register("categoria")}
                    >
                        <option value="Selecionar">Selecionar categoria</option>
                        <option value="Alimentos">Alimentos</option>
                        <option value="Higiene">Hortifruti</option>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Higiene">Higiene</option>
                        <option value="Limpeza">Limpeza</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                        id="descricao"
                        className="form-control"
                        {...register("descricao", { required: true })}
                    ></textarea>
                    {errors.descricao && <small className="invalid">A descrição é inválida</small>}
                </div>
                <div className="mt-4">
                    <Button className="mt-1 w-100 btn-custom" type="submit">
                        Adicionar
                    </Button>
                </div>
            </form>
        </main>
    );
}

export default AddItemComponent;
