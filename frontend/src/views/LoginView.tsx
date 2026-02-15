// Importação das bibliotecas necessárias do React e Bootstrap.
import React from 'react';
import { Alert, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

// Definição da classe LoginView que estende React.Component.
export default class LoginView extends React.Component<any, any> {
    // Definição do estado inicial do componente.
    state = {
        email: "", // Email do utilizador
        password: "" // Palavra-passe do utilizador
    };

    // Função para lidar com mudanças nos campos de input.
    handleChange = (e: any) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // Função de renderização do componente.
    render() {
        return (
            <>
                {/* Título principal com estilo de texto preto e negrito */}
                <h1 className="text-black fw-bolder"> Entrar </h1>
                {/* Div principal com classe para centralização vertical */}
                <div className={"my-auto"}>
                    {/* Formulário de login */}
                    <Form className={""}>
                        {/* Grupo de formulário para o campo Email */}
                        <Form.Group className="mb-3 form mx-auto">
                            <Form.Label className='text-black'>Endereço de E-mail</Form.Label>
                            <Form.Control type="email" id="email" placeholder="examplo@dominio.com" onChange={this.handleChange}></Form.Control>
                            <Form.Text id="emailHelp">Nunca partilharemos o teu e-mail com ninguém.</Form.Text>
                        </Form.Group>
                        {/* Grupo de formulário para o campo Palavra-Passe */}
                        <Form.Group className="mb-3 form mx-auto">
                            <Form.Label className="text-black">Palavra-Passe</Form.Label>
                            <Form.Control type="password" id="password" placeholder="A tua Palavra-Passe" onChange={this.handleChange} />
                        </Form.Group>
                        {/* Botão para submeter o formulário de login */}
                        <Button className="btn btn-primary" style={{ backgroundColor: "purple", borderColor: "purple" }} onClick={() => this.props.state.loginUser(this.state.email, this.state.password)}>Entrar</Button>
                    </Form>
                    {/* Div para registo com estilo de margem superior */}
                    <div className="mt-3">
                        <span>Ainda não tem conta? </span>
                        <Button className="btn btn-secondary" style={{ backgroundColor: "#FF00FF", borderColor: "purple", color: "white" }} onClick={() => this.props.state.showView("register")}>Registar</Button>
                    </div>
                    {/* Exibe um alerta se o erro for "userDoesntExist" */}
                    {this.props.state.error == "userDoesntExist" && <Alert key={"userDoesntExist"} variant={"danger"}>Endereço de e-mail não registado.</Alert>}
                    {/* Exibe um alerta se o erro for "noMatchPassword" */}
                    {this.props.state.error == "noMatchPassword" && <Alert key={"noMatchPassword"} variant={"danger"}>Palavra-Passe incorreta.</Alert>}
                    {/* Botão para a página "Sobre nós" com estilo transparente */}
                    <div className="mt-3">
                        <Button style={{ backgroundColor: "transparent", borderColor: "transparent", color: "black" }} className="btn btn-link" onClick={() => this.props.state.showView("about")}>Sobre nós</Button>
                    </div>
                </div>
            </>
        );
    }
}