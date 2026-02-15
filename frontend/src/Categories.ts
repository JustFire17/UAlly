/**
 * Importa o axios para fazer requests http
 */
import axios, {AxiosResponse} from "axios";
/**
 * Importa o ip para o qual vão ser feitos os requests.
 */
import {config} from "./config"

/**
 * Esta interface descreve a estrutura de uma categoria.
 */
export interface ICategory {
    id?: string,
    title: string,
    description: string,
    userID: number,
    type: string
}

/**
 * Esta enumeração descreve quais os diferentes tipos de categorias.
 */
export enum ECategoryType {
    Pessoal,
    Universidade
}

/**
 * Classe com todas as funcionalidades de uma categoria.
 */
export class Worker {

    /**
     * Executa uma post request para adicionar uma nova categoria à base de dados.
     * @param cat Categoria a ser adicionada
     */
    public async addNewCategory(cat: ICategory): Promise<ICategory> {
        console.log("addCategory");
        const response: AxiosResponse = await axios.post(`${config.serverAddress}/createCategory/`, cat)
        return response.data
    }

    /**
     * Executa um get request para obter uma categoria através do seu id.
     * @param id ID do utilizador
     */
    public async getCategories(userID: number): Promise<ICategory[]> {
        console.log("getCategories");
        const response: AxiosResponse = await axios.get(`${config.serverAddress}/getCategories/` + userID);
        return response.data;
    }

    /**
     * Executa um delete request para remover uma categoria da base de dados.
     * @param id ID da categoria.
     */
    public async deleteCategory(id: number): Promise<boolean> {
        console.log("getCategories");
        const response: AxiosResponse = await axios.delete(`${config.serverAddress}/deleteCategory/` + id);
        return response.data;
    }
}