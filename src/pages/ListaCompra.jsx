import { Badge, Button, Card, Container, Form } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { deleteItem, getItensUsuario } from "../firebase/itens";
import { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { UsuarioContext } from "../contexts/UsuarioContext";

function ListaCompra() {
  const [compras, setCompras] = useState([]);
  const [filteredCompras, setFilteredCompras] = useState([]);
  const [precoTotal, setPrecoTotal] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const usuario = useContext(UsuarioContext);
  const navigate = useNavigate();

  function calcularTotal(items) {
    const total = items.reduce((acc, item) => acc + item.precoTotal, 0);
    setPrecoTotal(total);
  }

  function carregarItens() {
    if (usuario?.usuarioLogado) { 
      getItensUsuario(usuario.usuarioLogado.uid)
        .then((resultado) => {
          setCompras(resultado);
          setFilteredCompras(resultado);
          calcularTotal(resultado); // Calcula o total de todos os itens inicialmente
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

  function handleCategoryChange(event) {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category === '') {
      setFilteredCompras(compras);
      calcularTotal(compras); // Calcula o total de todos os itens
    } else {
      const filtered = compras.filter(item => item.categoria === category);
      setFilteredCompras(filtered);
      calcularTotal(filtered); // Calcula o total apenas dos itens filtrados
    }
  }

  useEffect(() => {
    carregarItens();
  }, [usuario]); 

  useEffect(() => {
    handleCategoryChange({ target: { value: selectedCategory } });
  }, [compras]);

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
          <div className="d-flex justify-content-between align-items-center">
            <Link className="btn btn-dark" to="/itens/adicionar">
              Adicionar Item
            </Link>
            <h4>Total de Compras: {formatarPreco(precoTotal)}</h4>
          </div>
          <div className="mt-3">
            <Form.Select
              aria-label="Filtrar por categoria"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Todos</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Hortifruti">Hortifruti</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Higiene">Higiene</option>
              <option value="Limpeza">Limpeza</option>
              <option value="Outros">Outros</option>
            </Form.Select>
          </div>
          {filteredCompras.length > 0 ? (
            <section className="mt-2">
              {filteredCompras.map((item) => (
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
            <p className="mt-3">Nenhum item encontrado para a categoria selecionada.</p>
          )}
        </div>
      </Container>
    </main>
  );
}

export default ListaCompra;
