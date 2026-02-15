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
 * Interface que descreve uma tarefa
 */
export interface ITask {
    id?: number,
    title: string,
    description: string,
    state: ETaskStates,
    listID: number
}

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
     * Executa uma query que obtem todas as tasks de uma lista e retorna um array tasks.
     * @param listID ID da lista
     */
    public async getTasks(listID: string): Promise<ITask[]> {
        let query = `SELECT *
                     FROM Tasks
                     WHERE listID = ?`

        return new Promise((resolve, reject) => {
            db.all(query, [listID], function (err: Error | null, rows: ITask[]) {
                if (err) reject(err);
                else resolve(rows)
            })
        })
    }

    /**
     * Executa uma query que obtem uma task e retorna-a.
     * @param id ID da task
     */
    public async getTask(taskID: string): Promise<ITask> {
        let query = `SELECT *
                     FROM Tasks
                     WHERE id = ?`
        return new Promise((resolve, reject) => {
            db.get(query, [taskID], function (err: Error | null, row: ITask) {
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
     * Obtem a ultima task na tabela
     */
    private async getLastTask(): Promise<ITask> {
        let query = `SELECT *
                     FROM Tasks
                     ORDER BY id DESC
                     LIMIT 1`
        return new Promise((resolve, reject) => {
            db.get(query, function (err: Error | null, row: ITask) {
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
     * Cria uma nova entrada da task na tabela.
     * Recebe um objeto ITask e retorna o objeto criado com o seu id.
     * @param task Task a ser adicionada
     */
    public async createTask(task: ITask): Promise<ITask> {
        let query = `INSERT INTO Tasks(title, description, state, listID)
                     VALUES (?, ?, ?, ?)`
        return new Promise((resolve, reject) => {
            let createdTaskID: string = "-1";
            db.run(query, [task.title, task.description, task.state, task.listID], function (err: Error | null) {
                if (err) reject(err);
                else { // @ts-ignore
                    createdTaskID = this.lastID.toString()
                }
            })
            resolve(this.getLastTask())
        })
    }

    /**
     * Atualiza o estado de uma task.
     * @param taskID ID de uma task.
     * @param newState Novo estado
     */
    public async updateTaskState(taskID: string, newState: string): Promise<ITask> {
        let query = `UPDATE Tasks
                     SET state = ?
                     WHERE id = ?`;
        return new Promise((resolve, reject) => {
                db.run(query, [newState, taskID], function (err: Error | null) {
                    if (err) reject(err);
                })
                resolve(this.getTask(taskID))
            }
        )
    }

    /**
     * Atualiza o titulo e descricao de uma task.
     * @param task Task com dados atualizados.
     */
    public async updateTask(task: ITask): Promise<ITask> {
        let query = `UPDATE Tasks
                     SET title = ?,
                         description = ?,
                         state = ?,
                         listID = ?
                     WHERE id = ?`;
        let params = [task.title, task.description, task.state, task.listID, task.id];
        return new Promise((resolve, reject) => {
            db.run(query, params, function (err: Error | null) {
                if (err) reject(err);
            })
            if (task.id) resolve(this.getTask(task.id.toString()))
            else reject("missing id");
        })
    }

    /**
     * Elimina uma entrada de tasks.
     * @param id ID da task.
     */
    public async deleteTask(taskID: string): Promise<void> {
        const query = `DELETE
                       FROM Tasks
                       WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.run(query, [taskID], function (err: Error | null) {
                if (err) reject(err);
            })
            resolve();
        })
    }
}

