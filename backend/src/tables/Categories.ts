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
 * Interface que descreve uma categoria
 */
export interface ICategory {
    id?: string,
    title: string,
    description: string,
    userID: number,
    type: ECategoryType
}

/**
 * Enumeracao que descreve os tipos de categoria
 */
export enum ECategoryType {
    Pessoais,
    Universidade
}

/**
 * Classe com todas as funcionalidades de uma categoria.
 */
export class Worker {
    /**
     * Executa uma query que obtem todas as categorias de um userID e retorna um array ICategory.
     * @param userID ID do utilizador
     */
    public async getCategories(userID: string): Promise<ICategory[]> {
        let query = `SELECT *
                     FROM Categories
                     WHERE userID = ?`

        return new Promise((resolve, reject) => {
            db.all(query, [userID], function (err: Error | null, rows: ICategory[]) {
                if (err) reject(err);
                resolve(rows)
            })
        })
    }

    /**
     * Executa uma query que obtem categoria e retorna-a.
     * @param id ID da categoria
     */
    public async getCategory(id: string): Promise<ICategory> {
        let query = `SELECT *
                     FROM Categories
                     WHERE id = ?`

        return new Promise((resolve, reject) => {
            db.get(query, [id], function (err: Error | null, row: ICategory) {
                if (err) reject(err);
                resolve(row)
            })
        })
    }

    /**
     * Encontra uma categoria por titulo e id de utilizador.
     * @param title titulo da categoria
     * @param userID ID do utilizador
     */
    public async getCategoryByTitleAndUser(title: string, userID: string): Promise<ICategory> {
        let query = `SELECT *
                     FROM Categories
                     WHERE title = ?
                       AND userID = ?`

        return new Promise((resolve, reject) => {
            db.get(query, [title, userID], function (err: Error | null, row: ICategory) {
                if (err) reject(err);
                resolve(row)
            })
        })
    }

    /**
     * Obtem a ultima categoria na tabela
     */
    private async getLastCategory(): Promise<ICategory> {
        let query = `SELECT *
                     FROM Categories
                     ORDER BY id DESC
                     LIMIT 1`
        return new Promise((resolve, reject) => {
            db.get(query, function (err: Error | null, row: ICategory) {
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
     * Cria uma nova entrade de categoria na tabela.
     * Recebe um objeto ICategory e retorna o objeto criado com o seu id.
     * @param category Categoria a ser adicionada
     */
    public async createCategory(category: ICategory): Promise<ICategory> {
        let query = `INSERT INTO Categories(title, description, userID, type)
                     VALUES (?, ?, ?, ?);`
        return new Promise((resolve, reject) => {
            db.run(query, [category.title, category.description, category.userID, category.type], function (err: Error | null) {
                if (err) reject(err);
            })
            resolve(this.getLastCategory())
        })
    }

    /**
     * Elimina uma entrada de categoria.
     * @param categoryID ID da categoria.
     */
    public async deleteCategory(categoryID: string): Promise<void> {
        let query = `DELETE
                     FROM Categories
                     WHERE id = ?;`
        return new Promise((resolve, reject) => {
            db.run(query, [categoryID], function (err: Error | null) {
                if (err) reject(err);
            })
            resolve()
        })
    }

    /**
     * Atualiza uma categoria.
     * @param category categoria com os dados atualizados.
     */
    public async editCategory(category: ICategory): Promise<ICategory> {
        let query = `UPDATE Categories
                     SET title       = ?,
                         description = ?,
                         type        = ?
                     WHERE id = ?;`
        return new Promise((resolve, reject) => {
            db.run(query, [category.title, category.description, category.type, category.userID], function (err: Error | null) {
                if (err) reject(err);
            })
            if (category.id) resolve(this.getCategory(category.id))
            else resolve(this.getCategoryByTitleAndUser(category.title, category.userID.toString()))
        })
    }
}
