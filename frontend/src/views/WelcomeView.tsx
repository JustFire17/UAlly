// Importação do ficheiro de estilos CSS específico para a aplicação.
import '../assets/styles/App.css';

// Importação do componente Button do React Bootstrap.
import Button from "react-bootstrap/Button";

// Importação do componente ModalPop.
import Modal from "../components/ModalPop";

// Definição do componente funcional WelcomeView.
const WelcomeView = ({ state }: { state: any }) => {
    return (
        // Div principal com classes para centralização e estilo específico.
        <div className="centered-div welcomeview">
            {/* Renderização do componente ModalPop com o estado passado como prop */}
            <Modal state={state} />
            <div>
                {/* Título principal com estilo de texto roxo e tamanho grande */}
                <h1 className="centered-div2 text-purple large-text">Qual é o teu próximo<br /> passo académico?</h1>
                {/* Texto descritivo com estilo de texto roxo e tamanho médio */}
                <div className="centered-div2 text-purple medium-text">
                    Organiza o teu mundo universitário<br />
                    listas, projetos e lembretes organizados de forma mais produtiva.
                </div>
                {/* Botão para registo com estilo personalizado */}
                <div className="centered-div2">
                    <Button style={{ backgroundColor: "purple", borderColor: "purple" }} className="btn btn-primary mx-3 my-4" onClick={() => state.showView("register")}>Obter Gratuitamente</Button>
                </div>
                {/* Texto e botão para login com estilo personalizado */}
                <div className="centered-div2 mt-2">
                    <span>Já tem conta? </span>
                    <Button style={{ backgroundColor: "#FF00FF", borderColor: "purple", color: "white" }} className="btn btn-secondary mx-3" onClick={() => state.showView("login")}>Login</Button>
                </div>
                {/* Botão para a página "Sobre nós" com estilo transparente */}
                <div className="centered-div2 mt-2">
                    <Button style={{ backgroundColor: "transparent", borderColor: "transparent", color: "black" }} className="btn btn-link" onClick={() => state.showView("about")}>Sobre nós</Button>
                </div>
            </div>
        </div>
    );
}

// Exportação do componente WelcomeView como o padrão.
export default WelcomeView;