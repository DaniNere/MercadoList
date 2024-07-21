import { Badge, Button, Card, Container } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { deleteItem, getItensUsuario } from "../firebase/itens";
import { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { UsuarioContext } from "../contexts/UsuarioContext";

function ListaCompra() {
  const [compras, setCompras] = useState(null);
  const usuario = useContext(UsuarioContext);
  const navigate = useNavigate();

  function carregarItens() {
    if (usuario?.usuarioLogado) { 
      getItensUsuario(usuario.usuarioLogado.uid)
        .then((resultado) => {
          setCompras(resultado);
        })
        .catch((error) => {
          console.error("Erro ao carregar itens:", error);
          toast.error("Erro ao carregar itens");
        });
    }
  }

  function deletarItem(id) {
    const deletar = confirm("Tem certeza?");
    if (deletar) {
      deleteItem(id).then(() => {
        toast.success("Item excluído!");
        carregarItens();
      });
    }
  }

  useEffect(() => {
    carregarItens();
  }, [usuario]); 

  function formatarPreco(preco) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(preco);
  }

  if (usuario === null) {
    return <Navigate to="/" />;
  }

  return (
    <main>
      <Container className="mt-5">
        <div>
          <h1>Suas Compras</h1>
          <hr />
          <Link className="btn btn-dark" to="/itens/adicionar">
            Adicionar Item
          </Link>
          {compras ? (
            <section className="mt-2">
              {compras.map((item) => (
                <Card key={item.id}>
                  <Card.Body>
                    <Card.Title>{item.nome}</Card.Title>
                    <Card.Text>Preço: {formatarPreco(item.preco)}</Card.Text>
                    <Card.Text>
                      Preço Total: {formatarPreco(item.precoTotal)}
                    </Card.Text>
                    <Card.Text>{item.descricao}</Card.Text>
                    <Card.Text>Quantidade: {item.quantidade}</Card.Text>
                    <div className="mb-2">
                      <Badge>{item.categoria}</Badge>
                    </div>
                    <Button
                      onClick={() => {
                        navigate(`/itens/atualizar/${item.id}`);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deletarItem(item.id)}
                    >
                      Excluir
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </section>
          ) : (
            <Loader />
          )}
        </div>
      </Container>
    </main>
  );
}

export default ListaCompra;
