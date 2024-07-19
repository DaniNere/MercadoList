import "../styles/NotFoundComponent.css";
import erro from "../assets/erro.png";
import { Button } from "react-bootstrap";

function NotFoundComponent() {
    return (
        <>
            <main className="caixa-nf">
                <img src={erro} alt="Erro-404" width={500} />
                <h1 className="h1-notfound">Erro 404 - Página não encontrada</h1>
                <p>Desculpe, ocorreu um erro, a página solicitada não foi encontrada!</p>
                <div className="botao-nf">
                <Button className="mt-1 w-100 btn-custom" type="submit">
                    Entrar
                </Button>
                </div>
            </main>
        </>
    );
}

export default NotFoundComponent;