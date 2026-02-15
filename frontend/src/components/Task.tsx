// Importação dos componentes necessários da biblioteca mdb-react-ui-kit.
import { MDBBadge, MDBBtn, MDBCard, MDBCardBody, MDBCardFooter } from "mdb-react-ui-kit";
// Importação da interface ITask.
import { ITask } from "../Task";

// Definição do componente funcional Task.
export const Task = ({ task, state }: { task: ITask, state: any }) => {
    return (
        <>
            {/* Cartão do MDB com margem inferior e largura total */}
            <MDBCard className={"mb-4 w-100"} style={{ background: "#cc55ff" }}>
                <MDBCardBody>
                    {/* Div para alinhar os itens horizontalmente e justificar o espaço entre eles */}
                    <div className='d-flex justify-content-between align-items-center'>
                        {/* Div para alinhar os itens horizontalmente */}
                        <div className='d-flex align-items-center' style={{ overflowBlock: "hidden" }}>
                            <div className='ms-3'>
                                {/* Título da tarefa */}
                                <p className='fw-normal text-start'>{task.title}</p>
                                {/* Descrição da tarefa, se existir */}
                                {task.description != "" &&
                                    <>
                                        <hr className={"divider"} />
                                        <p className='text-white small mb-0 text-start'>{task.description}</p>
                                    </>
                                }
                            </div>
                        </div>
                        {/* Badge para o estado da tarefa */}
                        {task.state == "Acabada" &&
                            <MDBBadge pill color='success' light>
                                {task.state}
                            </MDBBadge>
                        }
                        {task.state == "Em Curso" &&
                            <MDBBadge pill color='warning' light>
                                {task.state}
                            </MDBBadge>
                        }
                        {task.state == "Por Começar" &&
                            <MDBBadge pill color='danger' light>
                                {task.state}
                            </MDBBadge>
                        }
                    </div>
                </MDBCardBody>
                {/* Rodapé do cartão com botões e dropdown */}
                <MDBCardFooter border='0' className='p-2 d-flex justify-content-around'>
                    <div className="dropdown">
                        {/* Botão para abrir o dropdown */}
                        <button className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="categoryType" data-bs-toggle="dropdown"
                        >
                            Ações
                        </button>
                        {/* Menu dropdown com opções */}
                        <ul className="dropdown-menu" aria-labelledby="categoryType">
                            <li>
                                <button
                                    className="dropdown-item"
                                    type="button"
                                    onClick={() => state.startEditTask(task)}
                                >
                                    Editar
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    type="button"
                                    onClick={() => state.deleteTask(task.id)}
                                >
                                    Apagar
                                </button>
                            </li>
                        </ul>
                    </div>
                    {/* Botão para marcar a tarefa como concluída */}
                    <MDBBtn color="success" onClick={() => state.completeTask(task.id)}>Concluir</MDBBtn>
                </MDBCardFooter>
            </MDBCard>
        </>
    );
}