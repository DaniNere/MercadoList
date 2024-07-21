import { Container, Spinner } from "react-bootstrap";

function Loader() {
  return (
    <Container>
      <Spinner variant="dark"></Spinner>
      <span className="ms-1">Carregando...</span>
    </Container>
  );
}
export default Loader;

