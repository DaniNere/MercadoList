import "../styles/NotFoundComponent.css";
import erro from "../assets/erro.png";

function NotFoundComponent() {
    return (
        <>
            <img src={erro} alt="Erro-404" width={500}/>
            <h1 className="h1-notfound">Erro 404 - Página não encontrada</h1>
            <p>Desculpe, ocorreu um erro, a página solicitada não foi encontrada!</p>
        </>
    );
}

export default NotFoundComponent;