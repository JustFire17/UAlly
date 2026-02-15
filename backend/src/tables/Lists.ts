/**
 * Import da package sqlite3
 */
import path from "path";
const sqlite3 = require('sqlite3')

/**
 * Lê o ficheiro db e associa-o a uma variavel
 */
const dbPath = path.join(__dirname, "..", "..", "db", "db.sqlite");
let db = new sqlite3.Database(dbPath, (err: Error | null) => {
        if (err) console.log(err);
    }
)

/**
 * Ativa as funcionalidades de foreign_keys.
 */
db.get("PRAGMA foreign_keys = ON")

/**
 * Interface que descreve uma lista
 */
export interface IList {
    id?: number,
    title: string,
    description: string,
    categoryID: number,
    userID: number
}

/**
 * Classe com todas as funcionalidades de uma lista.
 */
export class Worker {
    /**
     * Executa uma query que obtem todas as listas de um userID e retorna um array IList.
     * @param userID ID do utilizador
     */
    public async getLists(userID: string): Promise<IList[]> {
        let query = `SELECT *
                     FROM Lists
                     WHERE userID = ?`

        return new Promise((resolve, reject) => {
            db.all(query, [userID], function (err: Error | null, rows: IList[]) {
                if (err) reject(err);
                resolve(rows)
            })
        })
    }

    /**
     * Executa uma query que obtem uma lista e retorna-a.
     * @param id ID da lista
     */
    public async getList(id: string): Promise<IList> {
        let query = `SELECT *
                     FROM Lists
                     WHERE id = ?`
                     
        return new Promise((resolve, reject) => {
            db.get(query, [id], function (err: Error | null, row: IList) {
                if (err) reject(err);
                resolve(row)
            })
        })
    }

    /**
     * Encontra uma lista por titulo e id de utilizador.
     * @param title titulo da lista
     * @param userID ID do utilizador
     */
    public async getListByTitleAndUserID(title: string, userID: string): Promise<IList> {
        let query = `SELECT *
                     FROM Lists
                     WHERE title = ?
                       AND userID = ?`

        return new Promise((resolve, reject) => {
            db.get(query, [title, userID], function (err: Error | null, row: IList) {
                if (err) reject(err);
                resolve(row)
            })
        })
    }

    /**
     * Obtem a ultima lista na tabela
     */
    private async getLastList(): Promise<IList> {
        let query = `SELECT *
                     FROM Lists
                     ORDER BY id DESC
                     LIMIT 1`
        return new Promise((resolve, reject) => {
            db.get(query, function (err: Error | null, row: IList) {
                if (err) reject(err);
                else {
                    if (row) {
                        resolve(row)
                    } else reject("no row");
                }
            })
        })
    }

    /**
     * Cria uma nova entrade da lista na tabela.
     * Recebe um objeto IList e retorna o objeto criado com o seu id.
     * @param list Lista a ser adicionada
     */
    public async createList(list: IList): Promise<IList> {
        let query = `INSERT INTO Lists(title, description, categoryID, userID)
                     VALUES (?, ?, ?, ?);`
        let params = [list.title, list.description, list.categoryID, list.userID]
        return new Promise((resolve, reject) => {
            db.run(query, params, function (err: Error | null) {
                if (err) reject(err);
            })
            resolve(this.getLastList())

        })
    }

    /**
     * Elimina uma entrada de lista.
     * @param id ID da lista.
     */
    public async deleteList(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM Lists WHERE id = ?", [id], function (err: Error | null) {
                if (err) reject(err);
            })
            resolve()
        })
    }

    /**
     * Elimina listas de uma categoria.
     * @param id ID da categoria.
     */
    public async deleteListsFromCat(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM Lists WHERE categoryID = ?", [id], function (err: Error | null) {
                if (err) reject(err)
            })
            resolve()
        })
    }

    /**
     * Atualiza uma lista.
     * @param list lista com os dados atualizados.
     */
    public async editList(list: IList): Promise<IList> {
        let query = `UPDATE Lists
                     SET title       = ?,
                         description = ?,
                         categoryID  = ?,
                         userID      = ?
                     WHERE id = ?;`
        let params = [list.title, list.description, list.categoryID, list.userID, list.id]

        return new Promise((resolve, reject) => {
            db.run(query, params, function (err: Error | null) {
                if (err) reject(err);
            })
            if (list.id) resolve(this.getList(list.id.toString()))
            else resolve(this.getListByTitleAndUserID(list.title, list.userID.toString()))
        })
    }
}

