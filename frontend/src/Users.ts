/**
 * Importa o axios para fazer requests http
 */
import axios, {AxiosResponse} from "axios";
/**
 * Importa o ip para o qual vão ser feitos os requests.
 */
import {config} from "./config"

/**
 * Esta interface descreve a estrutura de um user.
 */
export interface IUser {
    id?: number,
    name: string,
    email: string,
    password: string

}

/**
 * Classe com todas as funcionalidades de um utilizador.
 */
export class Worker {

    /**
     * Executa um get request com os dados do utilizador.
     * @param email email do utilizador.
     * @param password password do utilizador.
     */
    public async loginUser(email: string, password: string): Promise<IUser> {
        console.log("Users.Worker.addUser()");
        let data = email.concat("_").concat(password)

        const response: AxiosResponse = await axios.get(`${config.serverAddress}/loginUser/` + data);
        return response.data;
    }

    /**
     * Executa um get request para obter um utilizador através do seu email.
     * @param email email do utilizador
     */
    public async findUser(email: string): Promise<boolean> {
        const response: AxiosResponse = await axios.get(`${config.serverAddress}/getUserByEmail/` + email);
        if (!response.data || typeof response.data === "string") {
            return false;
        }

        return response.data.id !== undefined && response.data.id !== null;
    }

    /**
     * Executa um delete requeste para remover user da base de dados.
     * @param id ID do utilizador
     */
    public async deleteAccount(id: string): Promise<boolean> {
        const response: AxiosResponse = await axios.delete(`${config.serverAddress}/deleteAccount/` + id);
        return response.data != "";
    }

    /**
     * Executa um post request para criar um novo user na bd.
     * @param user Utilizador a ser inserido
     */
    public async registerUser(user: IUser): Promise<IUser> {
        console.log("Users.Worker.addUser()");
        const response: AxiosResponse = await axios.post(`${config.serverAddress}/registerUser/`, user);
        return response.data;
    }

    /**
     * Executa um post request para atualizar os dados de um utilizador na bd.
     * @param user Objeto IUser atualizado.
     */
    public async updateUserInfo(user: IUser): Promise<IUser | string> {
        const response: AxiosResponse = await axios.post(`${config.serverAddress}/updateUserData/`, user);
        return response.data;
    }

}
