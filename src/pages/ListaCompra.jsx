import { Badge, Button, Card, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { deleteItem, getItens } from "../firebase/itens";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function ListaCompra() {
  const [compras, setCompras] = useState(null);
  const navigate = useNavigate();

  function carregarItens() {
    getItens().then((resultados) => {
      setCompras(resultados);
    });
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
  }, []);

  function formatarPreco(preco) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(preco);
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
