// Importação das bibliotecas necessárias do React e Bootstrap.
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

// Definição do componente funcional HelpView.
const HelpView = ({ show, handleClose }: { show: boolean, handleClose: () => void }) => {
    return (
        // Renderização do Modal do Bootstrap.
        <Modal show={show} onHide={handleClose} centered>
            {/* Cabeçalho do Modal com botão para fechar */}
            <Modal.Header closeButton>
                {/* Título do Modal com estilo de cor roxa */}
                <Modal.Title style={{ color: "purple" }}>Ajuda</Modal.Title>
            </Modal.Header>
            {/* Corpo do Modal */}
            <Modal.Body>
                {/* Parágrafo com instruções sobre a página de disciplinas/projetos */}
                <p style={{ color: "black" }}>
                    Na página dedicada às tuas disciplinas/projetos poderás criá-los e adicioná-los às respetivas categorias (Universidade e Pessoal). 
                    Posteriormente poderás consultá-los e editá-los.
                    Após criadas as disciplinas, poderão ser adicionados trabalhos, e dentro dos trabalhos poderão ser adicionadas tarefas.
                </p>
                {/* Parágrafo com instruções sobre a página da Conta */}
                <p style={{ color: "black" }}>
                    Na página da tua Conta poderás editar os teus respetivos dados e sair da tua Conta.
                </p>
            </Modal.Body>
            {/* Rodapé do Modal */}
            <Modal.Footer>
                {/* Botão para fechar o Modal com estilo personalizado */}
                <Button 
                    variant="secondary" 
                    onClick={handleClose} 
                    style={{ backgroundColor: "purple", borderColor: "purple", color: "white" }}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

// Exportação do componente HelpView como o padrão.
export default HelpView;