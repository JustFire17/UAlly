// Importação das bibliotecas necessárias do React e Bootstrap.
import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
// Importação do componente HelpView.
import HelpView from '../views/HelpView';
// Importação das imagens.
const logo = require("../assets/images/logo.png");
const help_button = require("../assets/images/help_button.png");

// Definição do componente funcional Header.
const Header = ({ state }: { state: any }) => {
    // Definição do estado local para controlar a visibilidade do HelpView.
    const [showHelp, setShowHelp] = useState(false);

    // Função para mostrar o HelpView.
    const handleShowHelp = () => setShowHelp(true);
    // Função para fechar o HelpView.
    const handleCloseHelp = () => setShowHelp(false);

    return (
        // Cabeçalho principal com a classe "header-top".
        <header className={"header-top"}>
            <div>
                {/* Navbar do Bootstrap com variante branca e expansão em lg */}
                <Navbar variant={"white"} expand="lg" className="p-0">
                    <Container className="p-0">
                        {/* Marca da Navbar com clique para mudar de vista */}
                        <Navbar.Brand
                            style={{ color: "white" }}
                            onClick={() => state.isLoggedIn ? state.showView("logged") : state.showView("welcome")}
                        >
                            {/* Logotipo da aplicação */}
                            <img src={logo} height={"55"} alt="Logo" />UAlly
                        </Navbar.Brand>
                        {/* Navegação à direita */}
                        <Nav className={"ml-auto"}>
                            {/* Link para mostrar o HelpView */}
                            <Nav.Link onClick={handleShowHelp}>
                                <img src={help_button} alt="Help" height="30" />
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
            {/* Componente HelpView para mostrar a ajuda */}
            <HelpView show={showHelp} handleClose={handleCloseHelp} />
        </header>
    );
}

// Exportação do componente Header como o padrão.
export default Header;