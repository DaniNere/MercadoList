import { Badge, Button, Card, Container, Form } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { deleteItem, getItensUsuario } from "../firebase/itens";
import { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { UsuarioContext } from "../contexts/UsuarioContext";
import "../styles/ListaCompras.css";

function ListaCompra() {
  const [compras, setCompras] = useState([]);
  const [filteredCompras, setFilteredCompras] = useState([]);
  const [precoTotal, setPrecoTotal] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const usuario = useContext(UsuarioContext);
  const navigate = useNavigate();

  function calcularTotal(items) {
    const total = items.reduce((acc, item) => acc + item.precoTotal, 0);
    setPrecoTotal(total);
  }

  function carregarItens() {
    if (usuario?.usuarioLogado) {
      setIsLoading(true); 
      getItensUsuario(usuario.usuarioLogado.uid)
        .then((resultado) => {
          setCompras(resultado);
          setFilteredCompras(resultado);
          calcularTotal(resultado);
        })
        .catch((error) => {
          console.error("Erro ao carregar itens:", error);
          toast.error("Erro ao carregar itens");
        })
        .finally(() => {
          setIsLoading(false); 
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
    filterItems(searchTerm, category);
  }

  function handleSearchChange(event) {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    filterItems(term, selectedCategory);
  }

  function filterItems(term, category) {
    let filtered = compras;

    if (category) {
      filtered = filtered.filter(item => item.categoria === category);
    }

    if (term) {
      filtered = filtered.filter(item =>
        item.nome.toLowerCase().includes(term)
      );
    }

    setFilteredCompras(filtered);
    calcularTotal(filtered);
  }

  useEffect(() => {
    carregarItens();
  }, [usuario]);

  useEffect(() => {
    filterItems(searchTerm, selectedCategory);
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
      <Container fluid className="mt-5">
        <div className="header-container">
          <h1>Suas Compras</h1>
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <Link className="btn-custom" to="/itens/adicionar">
              Adicionar Item
            </Link>
            <h5>Total de Compras: {formatarPreco(precoTotal)}</h5>
          </div>
          <div className="filters-container mt-3">
            <div className="pesquisar-container">
              <Form.Control
                type="text"
                placeholder="Pesquisar itens"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="filter-container">
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
          </div>
        </div>
      </Container>
      <div className="items-container mt-2">
        {isLoading ? (
          <Loader />
        ) : filteredCompras.length > 0 ? (
          <section>
            {filteredCompras.map((item) => (
              <Card key={item.id} className="item-card">
                <Card.Body className="bloco-container">
                  <div className="title-container">
                    <Card.Title>{item.nome}</Card.Title>
                    <Badge className="categoria-badge">{item.categoria}</Badge>
                    <Card.Text className="descricao-text">{item.descricao}</Card.Text>
                  </div>
                  <div className="price-container">
                    <Card.Text>Preço: {formatarPreco(item.preco)}</Card.Text>
                    <Card.Text>Preço Total: {formatarPreco(item.precoTotal)}</Card.Text>
                    <Card.Text>Quantidade: {item.quantidade}</Card.Text>
                    <div className="button-container">
                      <Button
                        className="edit-button"
                        onClick={() => {
                          navigate(`/itens/atualizar/${item.id}`);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        className="delete-button"
                        variant="danger"
                        onClick={() => deletarItem(item.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </section>
        ) : (
          <p className="mt-3">Nenhum item encontrado para a categoria ou pesquisa selecionada.</p>
        )}
      </div>
    </main>
  );
}

export default ListaCompra;
