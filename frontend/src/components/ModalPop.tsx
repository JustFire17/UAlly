import React from 'react'
import {Alert, Button, Form, Modal} from 'react-bootstrap'

export class ModalPop extends React.Component<any, any> {
    /** 
     * Conjuto de propriedades do componente ModalPop que define 
     * **/
    state = {
        taskTitle: "",
        taskDescription: "",
        taskState: "",
        categoryTitle: "",
        categoryDescription: "",
        categoryType: "Universidade",
        listTitle: "",
        listDescription: "",
    }

    handleChange = (e: any) => {
        this.setState({[e.target.id]: e.target.value})
    }


    /** 
     * Funcao que verica que tipo de formulario esta a ser apresentado e que tipo de nova entrada tera de fazer na base de dados 
     * **/
    handleCreate = () => {
        switch (this.props.state.modalView) {
            case "createTask":
                this.createTask()
                break
            case "editTask":
                this.updateTask()
                break
            case "createCategory":
                this.createCategory()
                break
            case "createList":
                this.createList()
                break
        }
    }

    handleClose = () => {
        this.props.state.showModalView("");
    }

    componentDidUpdate(prevProps: any) {
        const prevView = prevProps.state.modalView;
        const nextView = this.props.state.modalView;

        if (prevView !== nextView && nextView === "createTask") {
            this.setState({
                taskTitle: "",
                taskDescription: "",
                taskState: ""
            });
        }

        if (prevView !== nextView && nextView === "editTask") {
            const currentTask = this.props.state.currentTask;
            this.setState({
                taskTitle: currentTask ? currentTask.title : "",
                taskDescription: currentTask ? currentTask.description : "",
                taskState: currentTask ? currentTask.state : ""
            });
        }
    }

    /** 
     * Funcao do componente modalPop que tem como objetivo criar uma nova lista de tarefas.
     * A função acesse ao state, passado ateriormente com um prop em loggedMainView.tsx, e por fim a funcao addList() presente em state.ts
     * Da mesma forma a função acede a showModalView() para fazer desaparecer o popUp formulario
     * Por fim a funcao usa this.setState() para redefinir as propriedades do componente que foram utilizadadas
     * **/
    createList = () => {
        this.props.state.addList({
            title: this.state.listTitle,
            description: this.state.listDescription,
            categoryID: this.props.state.currentCatID,
            userID: this.props.state.user.id
        })
        this.props.state.showModalView("")

        this.setState({
            listTitle: "",
            listDescription: ""
        })
    }

     /** 
     * Funcao do componente modalPop que tem como objetivo criar uma nova tarefa.
     * A função acesse ao state, passado ateriormente com um prop em loggedMainView.tsx, e por fim a funcao addTask() presente em state.ts
     * Da mesma forma a função acede a showModalView() para fazer desaparecer o popUp formulario
     * Por fim a funcao usa this.setState() para redefinir as propriedades do componente que foram utilizadadas
     *  
     * **/
    createTask = () => {
        if (this.state.taskTitle == "") {
            this.props.state.updateError("noName")
            return
        }

        const taskState = this.state.taskState || "Por Começar"

        this.props.state.addTask({
            title: this.state.taskTitle,
            description: this.state.taskDescription,
            state: taskState,
            listID: this.props.state.currentList.id
        })
        this.props.state.showModalView("")

        this.setState({
            taskTitle: "",
            taskDescription: "",
            taskState: ""
        })
    }

    /**
     * Atualiza uma tarefa existente.
     */
    updateTask = () => {
        const currentTask = this.props.state.currentTask
        const taskTitle = this.state.taskTitle || (currentTask ? currentTask.title : "")
        const taskDescription = this.state.taskDescription || (currentTask ? currentTask.description : "")
        const taskState = this.state.taskState || (currentTask ? currentTask.state : "Por Começar")

        if (taskTitle == "") {
            this.props.state.updateError("noName")
            return
        }

        this.props.state.updateTaskDetails({
            id: currentTask?.id,
            title: taskTitle,
            description: taskDescription,
            state: taskState,
            listID: this.props.state.currentList.id
        })

        this.props.state.showModalView("")

        this.setState({
            taskTitle: "",
            taskDescription: "",
            taskState: ""
        })
    }


    /** 
     * Funcao do componente modalPop que tem como objetivo criar uma nova categoria.
     * A função acesse ao state, passado ateriormente com um prop em loggedMainView.tsx, e por fim a funcao addCategory() presente em state.ts
     * Da mesma forma a função acede a showModalView() para fazer desaparecer o popUp formulario
     * Por fim a funcao usa this.setState() para redefinir as propriedades do componente que foram utilizadadas
     * **/
    createCategory = () => {
        this.props.state.addCategory({
            title: this.state.categoryTitle,
            description: this.state.categoryDescription,
            type: this.state.categoryType,
            userID: this.props.state.user.id
        })
        this.props.state.showModalView("")

        this.setState({
            categoryTitle: "",
            categoryDescription: "",
            categoryType: "Universidade"
        })
    }

    /** 
     * Função render responsavel por dar render/display de um popup em formato de formulario.
     * Retorna um bloco de codigo HTML
     * Dentro do bloco de codigo sao feitas verificacoes i.e {this.props.state.modalView == "createTask" && <this.CreateTaskForm/>}
     *  para saber que tipo de formulario deve ser apresentado, ditando tambem os campos apresentados no formulario
     * Dentro do bloco de codigo são chamadas funcoes que estão definidas dentro deste componente, as funcoes que são chamadas ditam o comportamento do popup i.e onClick={this.handleCreate} 
     * **/
    render() {
        const isEdit = this.props.state.modalView == "editTask"
        return (
            <>
                <Modal
                    show={this.props.state.showModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header className={"container-top"}>
                        <Modal.Title className={"text-white modal-title-center"} id="contained-modal-title-vcenter">
                            {this.props.state.modalView == "createTask" &&
                                "Adicionar nova tarefa"}
                            {this.props.state.modalView == "editTask" &&
                                "Editar tarefa"}
                            {this.props.state.modalView == "createCategory" &&
                                "Adicionar Disciplina/Categoria"}
                            {this.props.state.modalView == "createList" &&
                                "Adicionar trabalho"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={"container-top"}>
                        {this.props.state.modalView == "createTask" && <this.CreateTaskForm/>}
                        {this.props.state.modalView == "editTask" && <this.CreateTaskForm/>}
                        {this.props.state.modalView == "createCategory" && <this.CreateCategoryForm/>}
                        {this.props.state.modalView == "createList" && <this.CreateListForm/>}
                    </Modal.Body>
                    <Modal.Footer className={"container-top"}>
                        <Button className={"mx-auto btn-noglow  w-25 mb-2"} onClick={this.handleCreate}>
                            {isEdit ? "Guardar" : "Adicionar"}
                        </Button>
                        <Button className={"btn-danger btn-noglow mx-auto w-25 mb-2"}
                                onClick={this.handleClose}>Cancelar</Button>
                        {this.props.state.error == "noName" && <Alert key={"noMatchPassword"} variant={"danger"}>
                            Deve conter um nome.
                        </Alert>}
                    </Modal.Footer>

                </Modal>
            </>
        )
    }

    /** 
     * Funcao que retorna um bloco de codigo HTML que representa um formulario com os campos dedicados para a criacao de uma nova lista 
     * **/
    CreateListForm = () => {
        return (
            <form className="modal-form">
                <Form.Group className="mb-3">
                    <Form.Label className={"text-white"}>Título</Form.Label>
                    <Form.Control type="Title" id="listTitle"
                                  onChange={this.handleChange}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={"text-white"}>Descrição</Form.Label>
                    <Form.Control type="description" id="listDescription"
                                  onChange={this.handleChange}></Form.Control>
                </Form.Group>
            </form>
        )
    }

    /** 
     * Funcao que retorna um bloco de codigo HTML que representa um formulario com os campos dedicados para a criacao de uma nova categoria
     * **/
    CreateCategoryForm = () => {
        return (
            <form className="modal-form">
                <Form.Group className="mb-3">
                    <Form.Label className={"text-white"}>Título</Form.Label>
                    <Form.Control type="Title" id="categoryTitle"
                                  onChange={this.handleChange}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={"text-white"}>Descrição</Form.Label>
                    <Form.Control type="description" id="categoryDescription"
                                  onChange={this.handleChange}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={"text-white"}>Tipo</Form.Label>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button"
                                id="categoryType" data-bs-toggle="dropdown"
                                aria-expanded="false">
                            {this.state.categoryType}
                        </button>
                           <ul className="dropdown-menu">
                            <li><a className="dropdown-item"
                                onClick={() => this.setState({categoryType: "Universidade"})}>Universidade</a>
                            </li>
                            <li><a className="dropdown-item"
                                onClick={() => this.setState({categoryType: "Pessoal"})}>Pessoal</a>
                            </li>
                           </ul>
                    </div>
                </Form.Group>
            </form>
        )
    }

    /** 
     * Funcao que retorna um bloco de codigo HTML que representa um formulario com os campos dedicados para a criacao de uma nova tarefa
     * **/
    CreateTaskForm = () => {
        const currentTask = this.props.state.currentTask
        const isEdit = this.props.state.modalView == "editTask"
        const taskTitle = this.state.taskTitle || (currentTask ? currentTask.title : "")
        const taskDescription = this.state.taskDescription || (currentTask ? currentTask.description : "")
        const taskState = isEdit
            ? (this.state.taskState || (currentTask ? currentTask.state : ""))
            : (this.state.taskState || "Por Começar")
        return (
            <form className="modal-form">
                <Form.Group className="mb-3">
                    <Form.Label className={"text-white"}>Título</Form.Label>
                    <Form.Control type="Title" id="taskTitle"
                                  value={taskTitle}
                                  onChange={this.handleChange}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={"text-white"}>Descrição</Form.Label>
                    <Form.Control type="description" id="taskDescription"
                                  value={taskDescription}
                                  onChange={this.handleChange}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={"text-white"}>Estado</Form.Label>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button"
                                id="taskState" data-bs-toggle="dropdown"
                                aria-expanded="false">
                            {taskState}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item"
                                   onClick={() => this.setState({taskState: "Por Começar"})}>Por começar</a>
                            </li>
                            <li><a className="dropdown-item"
                                   onClick={() => this.setState({taskState: "Acabada"})}>Acabada</a>
                            </li>
                            <li><a className="dropdown-item"
                                   onClick={() => this.setState({taskState: "Em Curso"})}>Em curso</a>
                            </li>
                        </ul>
                    </div>
                </Form.Group>
            </form>
        )
    }
}

export default ModalPop