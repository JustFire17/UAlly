/**
 * Importa o axios para fazer requests http
 */
import axios, {AxiosResponse} from "axios";
/**
 * Importa o ip para o qual vão ser feitos os requests.
 */
import {config} from "./config"

/**
 * Esta interface descreve a estrutura de uma lista.
 */
export interface IList {
    id?: number,
    title: string,
    description: string,
    categoryID: number,
    userID: number
}

/**
 * Classe com todas as funcionalidades das listas.
 */
export class Worker {

    /**
     * Obtém as listas de um dado utilizador através do seu id.
     * @param userID ID do utilizador
     */
    public async getLists(userID: number): Promise<IList[]> {
        console.log("getLists");
        const response: AxiosResponse = await axios.get(`${config.serverAddress}/getLists/` + userID)
        return response.data
    }

    /**
     * Obtém uma lista através do seu id.
     * @param id ID da lista
     */
    public async getList(id: number): Promise<IList> {
        console.log("getList");
        const response: AxiosResponse = await axios.get(`${config.serverAddress}/getList/` + id)
        return response.data
    }

    /**
     * Adicionar uma lista à base de dados.
     * @param list Lista a ser adicionada à bd.
     */
    public async addList(list: IList): Promise<IList> {
        console.log("addList")
        const response: AxiosResponse = await axios.post(`${config.serverAddress}/createList/`, list)
        return response.data
    }

    /**
     * Remove uma lista da base de dados.
     * @param listID ID da lista
     */
    public async deleteList(listID: number): Promise<boolean> {
        console.log("deleteList")
        const response: AxiosResponse = await axios.delete(`${config.serverAddress}/deleteList/` + listID)
        return response.data
    }

    /**
     * Remover todas as listas de uma categoria.
     * @param categoryID ID da categoria.
     */
    public async deleteListsFromCat(categoryID: number): Promise<boolean> {
        console.log("deleteLists")
        const response: AxiosResponse = await axios.delete(`${config.serverAddress}/deleteLists/` + categoryID)
        return response.data
    }
}