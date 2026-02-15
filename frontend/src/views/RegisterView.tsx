// Importação das bibliotecas necessárias do React.
import React from 'react';
import { Alert, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

// Definição da classe RegisterView que estende React.Component.
export default class RegisterView extends React.Component<any, any> {
    // Definição do estado inicial do componente.
    state = {
        name: "", // Nome do utilizador
        email: "", // Email do utilizador
        password: "", // Palavra-passe do utilizador
        passwordConfirm: "" // Confirmação da palavra-passe
    };

    // Função para lidar com mudanças nos campos de input.
    handleChange = (e: any) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // Função para validar o formato do email.
    validEmail(email: string) {
        return email.indexOf("@");
    }

    // Mapeia codigos de erro para mensagens amigaveis.
    getErrorMessage(errorCode: string) {
        const messages: { [key: string]: string } = {
            missingData: "Preenche o nome e o e-mail.",
            emptyPassword: "Insere e confirma a palavra-passe.",
            notEqualPassword: "As palavras-passe não coincidem.",
            incorrectEmail: "E-mail inválido.",
            userExists: "Já existe uma conta com este e-mail.",
            register: "Não foi possível criar a conta. Tenta novamente."
        };

        return messages[errorCode] || "";
    }

    // Função para lidar com a submissão do formulário.
    handleSubmit = () => {
        // Verifica se o nome ou email estão vazios.
        if (this.state.name == "" || this.state.email == "") {
            this.props.state.updateError("missingData")
            return;
        }
        // Verifica se a palavra-passe ou a confirmação da palavra-passe estão vazias.
        if (this.state.password == "" && this.state.passwordConfirm == "") {
            this.props.state.updateError("emptyPassword");
            return
        }
        // Verifica se a palavra-passe e a confirmação da palavra-passe são iguais.
        if (this.state.password != this.state.passwordConfirm) {
            this.props.state.updateError("notEqualPassword");
            return;
        }
        // Verifica se o email é válido.
        if (this.validEmail(this.state.email) == -1) {
            this.props.state.updateError("incorrectEmail");
            return;
        }

        // Regista o utilizador com os dados fornecidos.
        this.props.state.registerUser({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        });
    }

    // Função de renderização do componente.
    render() {
        const errorMessage = this.getErrorMessage(this.props.state.error);
        return (
            <>
                {/* Div principal com classe para estilo específico */}
                <div className="register-container">
                    {/* Título principal com estilo de texto preto e negrito */}
                    <h1 className="text-black fw-bolder">Registar</h1>
                    {/* Formulário de registo */}
                    <Form className="register-form mx-auto">
                        {/* Grupo de formulário para o campo Nome */}
                        <Form.Group className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                id="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        {/* Grupo de formulário para o campo Email */}
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                id="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        {/* Grupo de formulário para o campo Palavra-Passe */}
                        <Form.Group className="mb-3">
                            <Form.Label>Palavra-Passe</Form.Label>
                            <Form.Control
                                type="password"
                                id="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        {/* Grupo de formulário para o campo Confirmar Palavra-Passe */}
                        <Form.Group className="mb-3">
                            <Form.Label>Confirmar Palavra-Passe</Form.Label>
                            <Form.Control
                                type="password"
                                id="passwordConfirm"
                                value={this.state.passwordConfirm}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        {/* Botão para submeter o formulário de registo */}
                        <Button className="btn btn-primary" onClick={this.handleSubmit}>Registar</Button>
                    </Form>
                    {/* Exibe um alerta se houver um erro no estado */}
                    {errorMessage && (
                        <Alert variant="danger" className="mt-3">
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </>
        );
    }
}