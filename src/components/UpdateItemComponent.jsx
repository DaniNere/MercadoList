import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { NumericFormat } from "react-number-format";
import "../styles/UpdateItemComponent.css";
import { getItem, updateItem } from "../firebase/itens";
import { UsuarioContext } from "../contexts/UsuarioContext";
import { Link } from "react-router-dom";

function UpdateItemComponent() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const [numero, setNumero] = useState(1);
  const [preco, setPreco] = useState(0);
  const [precoTotal, setPrecoTotal] = useState(0);
  const usuario = useContext(UsuarioContext);

  function carregarItem() {
    getItem(id).then((item) => {
      if (item) {
        reset(item);
        setNumero(item.quantidade || 1);
        setPreco(item.preco || 0);
        setPrecoTotal((item.preco || 0) * (item.quantidade || 1));
      } else {
        navigate("/itens");
      }
    });
  }

  function atualizarItem(data) {
    data.quantidade = numero;
    data.precoTotal = precoTotal;

    updateItem(id, data)
      .then(() => {
        toast.success("Item atualizado com sucesso!");
        navigate("/itens");
      })
      .catch((error) => {
        if (error.code === 'permission-denied') {
          toast.error("Permissão negada para atualizar este item.");
        } else {
          toast.error("Permissão negada.");
        }
        console.error("Permissão negada:", error);
      });
  }

  useEffect(() => {
    carregarItem();
  }, []);

  function handleIncremento() {
    const newNumero = numero + 1;
    setNumero(newNumero);
    setPrecoTotal(newNumero * preco);
  }

  function handleDecremento() {
    if (numero > 1) {
      const newNumero = numero - 1;
      setNumero(newNumero);
      setPrecoTotal(newNumero * preco);
    }
  }

  function handlePrecoChange(values) {
    const { floatValue } = values;
    if (typeof floatValue === "number" && floatValue >= 0) {
      setPreco(floatValue);
      setPrecoTotal(floatValue * numero);
      setValue("preco", floatValue);
    }
  }

  if (usuario === null) {
    return <Navigate to="/" />;
  }

  return (
    <main className="container">
      <form className="form-section" onSubmit={handleSubmit(atualizarItem)}>
        <h1 className="h1-update-item">Atualizar Item</h1>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            placeholder="Digite o nome do item"
            {...register("nome", { required: true, maxLength: 100 })}
          />
          {errors.nome && <small className="invalid">O nome é inválido!</small>}
        </div>
        <div>
          <label htmlFor="preco">Preço</label>
          <NumericFormat
            id="preco"
            className="form-control"
            placeholder="Digite o preço"
            thousandSeparator=""
            decimalSeparator=","
            allowNegative={false}
            onValueChange={handlePrecoChange}
            value={preco}
            {...register("preco", {
              required: "O preço é obrigatório",
              validate: (value) =>
                (value !== "" && !isNaN(value)) || "O preço é inválido",
            })}
          />
          {errors.preco && (
            <small className="invalid">{errors.preco.message}</small>
          )}
        </div>
        <div>
          <label htmlFor="quantidade">Quantidade</label>
          <section className="quantidade">
            <Button
              className="mt-1 w-20 btn-custom"
              type="button"
              onClick={handleDecremento}
            >
              -
            </Button>
            {numero}
            <Button
              className="mt-1 w-20 btn-custom"
              type="button"
              onClick={handleIncremento}
            >
              +
            </Button>
          </section>
        </div>
        <div>
          <label htmlFor="precoTotal">Preço Total</label>
          <input
            type="text"
            id="precoTotal"
            className="form-control"
            value={`R$ ${precoTotal.toFixed(2)}`}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            className="form-select"
            {...register("categoria")}
          >
            <option value="">Selecionar categoria</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Hortifruti">Hortifruti</option>
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
            {...register("descricao", { maxLength: 150 })}
          ></textarea>
          {errors.descricao && (
            <small className="invalid">A descrição é inválida</small>
          )}
        </div>
        <div className="botoes-update-item mt-4">
          <Button className="mt-1 w-40 btn-custom" type="submit">
            Atualizar
          </Button>
          <Link to="/">
            <Button className="cancelar mt-1 w-40" variant="danger" type="button">
              Cancelar
            </Button>   
          </Link>
        </div>
      </form>
    </main>
  );
}

export default UpdateItemComponent;
