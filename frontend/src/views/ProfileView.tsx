// Importação das bibliotecas necessárias do React e Bootstrap.
import React from 'react';
import { Alert, Button, Card, Form } from "react-bootstrap";
import * as Users from "../Users";
import { IUser } from "../Users";
import Header from "../components/Header"; // Importe o Header

// Substituir o caminho da imagem padrão para a imagem do Wall-E
const avatar = require('../assets/images/avatar.png');

// Definição da classe profileView que estende React.Component.
export class profileView extends React.Component<any, any> {
    // Definição do estado inicial do componente.
    state = {
        profileImage: avatar,  // Inicialize com a imagem de Wall-E
        name: this.props.state.user.name,
        email: this.props.state.user.email,
        password: "",
        confirmPassword: "",
        oldName: this.props.state.user.name,
        oldEmail: this.props.state.user.email,
        view: "not-editing", // not-editing ou editing
        error: ""
    };

    // Função chamada após o componente ser montado.
    componentDidMount() {
        const userId = this.props.state.user.id; // Recupera o ID do utilizador
        const savedImage = localStorage.getItem(`profileImage_${userId}`); // Usa uma chave única para cada utilizador
        if (savedImage) {
            this.setState({ profileImage: savedImage });
        } else {
            this.setState({ profileImage: avatar }); // Foto padrão (Wall-E) se não houver imagem salva
        }
    }

    // Função para lidar com mudanças nos campos de input.
    handleChange = (e: any) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    // Função para lidar com o upload de imagem.
    handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            this.setState({ profileImage: imageUrl });

            const userId = this.props.state.user.id; // Recupera o ID do utilizador
            // Salvar a imagem no localStorage com a chave única
            localStorage.setItem(`profileImage_${userId}`, imageUrl);
        }
    };

    // Função de renderização do componente.
    render() {
        return (
            <>
                {/* Renderiza o Header com o estado passado como prop */}
                <Header state={this.props.state} />
                {/* Div principal com padding superior */}
                <div style={{ paddingTop: '70px' }}>
                    {/* Renderiza o cartão normal ou o cartão de edição com base no estado da vista */}
                    {this.state.view == "not-editing" && <this.NormalCard />}
                    {this.state.view == "editing" && <this.EditingCard />}
                </div>
            </>
        );
    }

    // Função para renderizar o cartão normal.
    NormalCard = () => {
        return (
            <Card className={'m-auto'} style={{ width: '18rem' }}>
                <Card.Body>
                    {/* Imagem de perfil */}
                    <Card.Img
                        src={this.state.profileImage}
                        style={{
                            backgroundColor: "violet",
                            borderRadius: "50%",
                            border: "2px solid black",
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            margin: "0 auto",
                        }}
                    />
                    {/* Título do cartão com o nome do utilizador */}
                    <Card.Title>{this.state.name}</Card.Title>
                    {/* Texto do cartão com o email do utilizador */}
                    <Card.Text style={{ color: 'black' }}> E-mail: {this.state.email}</Card.Text>
                    {/* Botão para editar o perfil */}
                    <Button onClick={() => {
                        this.setState({ view: 'editing' })
                    }}>Editar</Button>
                    {/* Botão para sair */}
                    <div className="mt-2">
                        <Button variant="danger" onClick={() => this.props.state.logoutUser()}>Sair</Button>
                    </div>
                </Card.Body>
            </Card>
        );
    }

    // Função para renderizar o cartão de edição.
    EditingCard = () => {
        return (
            <Card className={'m-auto'} style={{ width: '18rem' }}>
                <Card.Body>
                    <Form>
                        {/* Campo para editar o nome */}
                        <Form.Group className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="name" id="name" onChange={this.handleChange}
                                value={this.state.name}></Form.Control>
                        </Form.Group>
                        {/* Campo para editar o email */}
                        <Form.Group className="mb-3">
                            <Form.Label>Endereço de E-mail</Form.Label>
                            <Form.Control type="email" id="email" onChange={this.handleChange}
                                value={this.state.email}></Form.Control>
                            <Form.Text id="emailHelp">Nunca partilharemos o teu e-mail com ninguém.</Form.Text>
                        </Form.Group>
                        {/* Campo para editar a palavra-passe */}
                        <Form.Group className="mb-3">
                            <Form.Label>Nova Palavra-passe</Form.Label>
                            <Form.Control type="password" id="password" placeholder="Nova Palavra-Passe"
                                onChange={this.handleChange} />
                        </Form.Group>
                        {/* Campo para confirmar a nova palavra-passe */}
                        <Form.Group className="mb-3">
                            <Form.Label>Confirmar Nova Palavra-Passe</Form.Label>
                            <Form.Control type="password" id="confirmPassword" placeholder="Confirmar Nova Palavra-Passe"
                                onChange={this.handleChange} />
                        </Form.Group>
                        {/* Campo para alterar a foto do perfil */}
                        <Form.Group className="mb-3">
                            <Form.Label>Alterar Foto do Perfil</Form.Label>
                            <Form.Control type="file" onChange={this.handleImageUpload} />
                            <img
                                src={this.state.profileImage}
                                alt="Foto de Perfil"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50%",
                                    marginTop: "10px",
                                }}
                            />
                        </Form.Group>
                        {/* Botão para guardar as alterações */}
                        <Button className={"mx-2 mb-2 btn-noglow"} onClick={this.submitChanges}>Guardar</Button>
                        {/* Botão para apagar a conta */}
                        <Button variant={"danger"} className={"mb-2 btn-noglow"} onClick={this.deleteAccount}>Apagar Conta</Button>
                        {/* Botão para cancelar as alterações */}
                        <Button onClick={this.cancelChanges}>Cancelar</Button>
                    </Form>
                    {/* Exibe um alerta se houver um erro de palavra-passe */}
                    {this.state.error == "password" &&
                        <Alert key={"password"} variant={"danger"}>
                            As palavras-passe nao coincidem.
                        </Alert>
                    }
                    {this.state.error == "emailExists" &&
                        <Alert key={"emailExists"} variant={"danger"}>
                            Ja existe uma conta com este e-mail.
                        </Alert>
                    }
                    {this.state.error == "incorrectEmail" &&
                        <Alert key={"incorrectEmail"} variant={"danger"}>
                            E-mail invalido.
                        </Alert>
                    }
                    {this.state.error == "updateUser" &&
                        <Alert key={"updateUser"} variant={"danger"}>
                            Nao foi possivel atualizar o perfil.
                        </Alert>
                    }
                </Card.Body>
            </Card>
        );
    }

    // Função para apagar a conta do utilizador.
    deleteAccount = () => {
        this.props.state.deleteAccount(); // Chama a função deleteAccount do estado
        this.setState({ view: 'not-editing' }); // Define a vista como 'not-editing'

        const userId = this.props.state.user.id;
        localStorage.removeItem(`profileImage_${userId}`); // Remover a imagem salva no localStorage
    };

    // Função para submeter as alterações do perfil.
    submitChanges = async () => {
        const usersWorker: Users.Worker = new Users.Worker();
        const emailChanged = this.state.email !== this.props.state.user.email;

        if (this.state.email.indexOf("@") === -1) {
            this.setState({ error: "incorrectEmail" });
            return;
        }

        if (emailChanged) {
            const emailExists = await usersWorker.findUser(this.state.email);
            if (emailExists) {
                this.setState({ error: "emailExists" });
                return;
            }
        }

        // Cria um objeto user com os dados do utilizador
        let user: IUser = {
            id: this.props.state.user.id,
            name: this.state.name,
            email: this.state.email,
            password: "null" // Define a palavra-passe como "null" inicialmente
        };

        // Verifica se a palavra-passe e a confirmação da palavra-passe são iguais e não estão vazias
        if (this.state.confirmPassword === this.state.password && this.state.password !== "") {
            user = {
                id: this.props.state.user.id,
                name: this.state.name,
                email: this.state.email,
                password: this.state.password // Atualiza a palavra-passe com o valor fornecido
            };
        } else if (!(this.state.password === "" && this.state.confirmPassword === "")) {
            this.setState({ error: "password" }); // Define o erro como "password" se as palavras-passe não coincidirem
            return;
        }
        // Atualiza as informações do utilizador chamando a função updateUserInfo do estado
        this.setState({ error: "" });
        const result = await this.props.state.updateUserInfo(user);
        if (result === "emailExists") {
            this.setState({ error: "emailExists" });
            return;
        }

        if (!result) {
            this.setState({ error: "updateUser" });
            return;
        }

        // Define a vista como 'not-editing' e atualiza os valores antigos do nome e email
        this.setState({
            view: 'not-editing', oldName: this.state.name, oldEmail: this.state.email
        });
    };

    // Função para cancelar as alterações e reverter para os valores antigos.
    cancelChanges = () => {
        this.setState({
            view: 'not-editing', // Define a vista como 'not-editing'
            name: this.state.oldName, // Reverte o nome para o valor antigo
            email: this.state.oldEmail // Reverte o email para o valor antigo
        });
    };
}

// Exportação do componente profileView como o padrão.
export default profileView;