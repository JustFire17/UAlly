/**
 * Importa o axios para fazer requests http
 */
import axios, {AxiosResponse} from "axios";
/**
 * Importa o ip para o qual vão ser feitos os requests.
 */
import {config} from "./config"

/**
 * Esta interface descreve a estrutura de uma tarefa.
 */
export interface ITask {
    id?: number,
    title: string,
    description: string,
    state: string,
    listID: number
}

/**
 * Esta enumeracao representa os diferentes estados de uma tarefa.
 */
export enum ETaskStates {
    PorComecar,
    Acabada,
    EmCurso
}

/**
 * Classe com todas as funcionalidades de uma tarefa.
 */
export class Worker {

    /**
     * Executa um get request para obter as tarefas de uma lista através do id da lista.
     * @param listId ID da lista
     */
    public async getTasks(listId: number): Promise<ITask[]> {
        console.log("getTasks");
        const response: AxiosResponse = await axios.get(`${config.serverAddress}/getTasks/` + listId)
        return response.data
    }

    /**
     * Executa um post request para criar uma nova entrada de uma tarefa na base de dados.
     * @param task Tarefa a ser adicionada.
     */
    public async addNewTask(task: ITask): Promise<ITask> {
        console.log("addTask");
        const response: AxiosResponse = await axios.post(`${config.serverAddress}/createTask/`, task)
        return response.data
    }

    /**
     * Executa um delete request para remover uma tarefa da base de dados.
     * @param taskID ID da tarefa.
     */
    public async deleteTask(taskID: number): Promise<boolean> {
        console.log("deleteTask");
        const response: AxiosResponse = await axios.delete(`${config.serverAddress}/deleteTask/`+ taskID)
        return response.data
    }

    /**
     * Executa um delete request para remover todas as tarefas de uma categoria através do id da categoria.
     * @param categoryID ID da categoria.
     */
    public async deleteTaskFromCat(categoryID: number): Promise<boolean> {
        console.log("deleteTasks");
        const response: AxiosResponse = await axios.delete(`${config.serverAddress}/deleteTasks/`+ categoryID)
        return response.data
    }

    /**
     * Executa um post request para atualizar o estado de uma tarefa.
     * @param taskID ID da tarefa.
     * @param newState Novo estado.
     */
    public async updateTaskState(taskID: string, newState: string): Promise<ITask> {
        console.log("addTask");
        const response: AxiosResponse = await axios.post(`${config.serverAddress}/updateTaskState/`, {taskID: taskID, newState: newState})
        return response.data
    }

    /**
     * Executa um post request para atualizar os dados de uma tarefa.
     * @param task Tarefa com os dados atualizados.
     */
    public async updateTask(task: ITask): Promise<ITask> {
        console.log("updateTask");
        const response: AxiosResponse = await axios.post(`${config.serverAddress}/updateTask/`, task)
        return response.data
    }
}
