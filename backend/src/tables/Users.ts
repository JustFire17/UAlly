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
 * Interface que descreve um user
 */
export interface IUser {
    id?: number,
    name: string,
    email: string,
    password: string
}

/**
 * Funcao de encriptacao de passwords
 * @param str password
 * @param seed seed de encriptacao
 */
const cyrb53 = (str: string, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }

    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

/**
 * Classe com todas as funcionalidades de um user.
 */
export class Worker {
    /**
     * Verifica se existe outro utilizador com o mesmo email.
     * @param email email a verificar
     * @param userID id do utilizador atual
     */
    private emailExistsForOtherUser(email: string, userID: string): Promise<boolean> {
        let query = `SELECT id
                     FROM users
                     WHERE email = ?
                       AND id != ?
                     LIMIT 1`;
        return new Promise((resolve, reject) => {
            db.get(query, [email, userID], function (err: Error | null, row: IUser) {
                if (err) reject(err);
                else resolve(!!row);
            })
        })
    }

    /**
     * Elimina uma entrada de user.
     * @param id ID do user.
     */
    public deleteUser(userID: string): Promise<void> {
        let query = `DELETE FROM users
                     WHERE id = ?`
        return new Promise((resolve, reject) => {
            db.run(query, [userID], function (err: Error | null) {
                if (err) reject(err);
                else resolve()
            })
        })
    }

    /**
     * Retorna a ultima entrada da tabela users
     */
    private getLastUser(): Promise<IUser> {
        let query = `SELECT *
                     FROM users
                     ORDER BY id DESC
                     LIMIT 1`
        return new Promise((resolve, reject) => {
            db.get(query, function (err: Error | null, row: IUser) {
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
     * Retorna a entrada na tabela users com o email e password fornecidos.
     * @param data email e password separados por um '_'
     */
    public loginUser(data: string): Promise<IUser> {

        let separator = data.indexOf('_');
        let email = data.substring(0, separator);
        let password = data.substring(separator + 1)
        const encryptPass = cyrb53(password);

        let query = `SELECT *
                     FROM users
                     WHERE users.email = "${email}"
                       and users.password = "${encryptPass}"`
        return new Promise((inResolve, inReject) => {
            db.get(query, function (err: Error | null, row: IUser) {
                if (err) inReject(err)
                else {
                    inResolve(row)
                }
            })
        })
    }

    /**
     * Cria uma nova entrada de um user na tabela users
     * @param user Um objeto IUser
     */
    public registerUser(user: IUser): Promise<IUser> {
        console.log("--Registering user")

        const encryptPass = cyrb53(user.password);
        console.log(encryptPass)
        let query = `INSERT INTO users (name, email, password)
                     VALUES (?, ?, ?)`
        return new Promise((inResolve, inReject) => {
            db.run(query, [user.name, user.email, encryptPass.toString()], function (err: Error | null) {
                if (err) {
                    inReject(err)
                    return
                }

                // @ts-ignore
                const createdId = this.lastID
                db.get("SELECT * FROM users WHERE id = ?", [createdId], function (selectErr: Error | null, row: IUser) {
                    if (selectErr) inReject(selectErr)
                    else inResolve(row)
                })
            })
        })
    }

    /**
     * Obtem um user da tabela users pelo seu id.
     * @param id id do user
     */
    public getUserById(id: string): Promise<IUser> {
        let query = `SELECT *
                     FROM users
                     WHERE users.id = "${id}"`
        return new Promise((inResolve, inReject) => {
            db.get(query, function (err: Error, row: IUser) {
                if (err) inReject(err);
                else {
                    inResolve(row)
                }
            })
        })
    }

    /**
     * Obtem os users com o mesmo nome.
     * @param name nome
     */
    public getUserByName(name: string): Promise<IUser[]> {
        let query = `SELECT *
                     FROM users
                     WHERE users.name = "${name}"`
        return new Promise((inResolve, inReject) => {
            db.all(query, function (err: Error, result: IUser[]) {
                if (err) inReject(err);
                else {
                    inResolve(result)
                }
            })
        })
    }

    /**
     * Obtem o user com o email fornecido.
     * @param email email
     */
    public getUserByEmail(email: string): Promise<IUser> {
        let query = `SELECT *
                     FROM users
                     WHERE users.email = "${email}"`
        return new Promise((inResolve, inReject) => {
            db.get(query, function (err: Error, result: IUser) {
                if (err) inReject(err);
                else {
                    inResolve(result)
                }
            })
        })
    }

    /**
     * Atualiza os dados de um user.
     * @param user Objeto IUser com os dados atualizados
     */
    public updateUserData(user: IUser): Promise<IUser> {
        let query = `UPDATE users
                     SET name     =?,
                         email    = ?,
                         password = ?
                     WHERE id = ?`
        let params = [user.name, user.email, cyrb53(user.password).toString(), user.id];

        if (user.password == "null") {
            query = `UPDATE users
                     SET name  =?,
                         email = ?
                     WHERE id = ?`
            params = [user.name, user.email, user.id]
        }
        return new Promise(async (resolve, reject) => {
            if (user.id) {
                try {
                    const exists = await this.emailExistsForOtherUser(user.email, user.id.toString());
                    if (exists) {
                        reject("emailExists");
                        return;
                    }
                } catch (err) {
                    reject(err);
                    return;
                }
            }

            db.run(query, params, function (err: Error) {
                if (err) {
                    reject(err);
                    return
                }
                if (user.id) {
                    db.get("SELECT * FROM users WHERE id = ?", [user.id], function (selectErr: Error | null, row: IUser) {
                        if (selectErr) reject(selectErr)
                        else resolve(row)
                    })
                }
            })
        })
    }
}