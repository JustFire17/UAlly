import path from "path";
import express, {Express, NextFunction, Request, Response} from "express";

import * as Users from "./tables/Users";
import {IUser} from "./tables/Users";
import * as Tasks from "./tables/Tasks";
import {ITask} from "./tables/Tasks"
import * as Categories from "./tables/Categories"
import {ICategory} from "./tables/Categories";
import * as Lists from "./tables/Lists"
import {IList} from "./tables/Lists";

const app: Express = express();
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../../client/dist")));

/**
 * Cross-Origin Resource Sharing (CORS)\n
 * Access-Control-Allow-Origin: domains that can call the server. (e.g., your clients and not anyone in the world).
 * Access-Control-Allow-Methods: HTTP methods the server allows.
 * Access-Control-Allow-Headers: additional headers the server accepts (needed for services provided).
 */
app.use(function (inRequest: Request, inResponse: Response, inNext: NextFunction) {
    inResponse.header("Access-Control-Allow-Origin", "*"); // unsecure, full access from other domains.
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    inNext();
});


/**
 * Below are all the functions that define the available endpoints and their respective actions.
 * User requests call functions from the Users class.
 * Task requests call functions from the Tasks class.
 * List requests call functions from the Lists class.
 * Category requests call functions from the Categories class.
 * Each endpoint has a function with the same name that directly describes its action.
 * All functions follow the same try-catch structure.
 * All GET and DELETE request endpoints pass information through a parameter, while POST request endpoints 
*/

/**
 * ////////// USER REQUESTS //////////////
 */

/**
 * Calling a post-type request on the /registerUser endpoint will add a user to the database.
 * Body request must be a {@code IUser} object.
 */
app.post("/registerUser",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const usersWorker: Users.Worker = new Users.Worker();
            const user: IUser = await usersWorker.registerUser(inRequest.body)
            inResponse.send(user)
        } catch (inError) {
            console.log(inError)
            inResponse.send("Error");
        }
    });

app.post("/updateUserData",
    async (inRequest: Request, inResponse: Response) => {
        try {
            const usersWorker: Users.Worker = new Users.Worker();
            let user = await usersWorker.updateUserData(inRequest.body)
            inResponse.send(user);
        } catch (inError) {
            console.log(inError)
            inResponse.send("Error");
        }
    });

app.get("/loginUser/:data",
    async (req: Request, res: Response) => {
        try {
            const usersWorker: Users.Worker = new Users.Worker();
            const user: IUser | null = await usersWorker.loginUser(req.params.data)
            res.send(user)
        } catch (inError) {
            res.send("Error");
        }
    });

app.get("/getUserById/:id",
    async (req, res) => {
        try {
            const usersWorker: Users.Worker = new Users.Worker();
            const user: IUser = await usersWorker.getUserById(req.params.id)
            res.send(user)
        } catch (inError) {
            res.send("Error");
        }
    }
)

app.get("/getUserByName/:name",
    async (req, res) => {
        try {
            const usersWorker: Users.Worker = new Users.Worker();
            const users: IUser[] = await usersWorker.getUserByName(req.params.name)
            res.send(users)
        } catch (inError) {
            res.send("Error");
        }
    }
)

app.get("/getUserByEmail/:email",
    async (req, res) => {
        try {
            const usersWorker: Users.Worker = new Users.Worker();
            const users: IUser = await usersWorker.getUserByEmail(req.params.email)
            res.send(users)
        } catch (inError) {
            res.send("Error");
        }
    }
)

app.delete("/deleteAccount/:id", async (req, res) => {
    try {
        const usersWorker: Users.Worker = new Users.Worker();
        await usersWorker.deleteUser(req.params.id);
        res.send()
    } catch (inError) {
        res.send("Error");
    }
})

/**
 * ////////// TASK REQUESTS //////////////
 */

app.get("/getTask/:taskID",
    async (req, res) => {
        try {
            const tasksWorker: Tasks.Worker = new Tasks.Worker()
            const userTasks: ITask = await tasksWorker.getTask(req.params.taskID);
            res.send(userTasks);
        } catch (err) {
            console.log(err)
            res.send("No task found with id: " + req.params.taskID)
        }
    }
)

app.get("/getTasks/:listID",
    async (req, res) => {
        try {
            const tasksWorker: Tasks.Worker = new Tasks.Worker()
            const userTasks: ITask[] = await tasksWorker.getTasks(req.params.listID);
            res.send(userTasks);
        } catch (err) {
            console.log(err)
            res.send("Error")
        }
    }
)

app.post("/createTask", async (req, res) => {
    try {
        const taskWorker: Tasks.Worker = new Tasks.Worker();
        const taskID: ITask = await taskWorker.createTask(req.body)
        res.send(taskID)
    } catch (inError) {
        console.log(inError)
        res.send(inError);
    }
})

app.post("/updateTaskState", async (req, res) => {
    try {
        const taskWorker: Tasks.Worker = new Tasks.Worker();
        const task: ITask = await taskWorker.updateTaskState(req.body.taskID, req.body.newState)
        res.send(task)
    } catch (inError) {
        console.log(inError)
        res.send(inError);
    }
})

app.post("/updateTask", async (req, res) => {
    try {
        const taskWorker: Tasks.Worker = new Tasks.Worker();
        const task: ITask = await taskWorker.updateTask(req.body)
        res.send(task)
    } catch (inError) {
        console.log(inError)
        res.send(inError);
    }
})

app.delete("/deleteTask/:taskID", async (req, res) => {
    try {
        const taskWorker: Tasks.Worker = new Tasks.Worker();
        await taskWorker.deleteTask(req.params.taskID)
        res.send(true)
    } catch (inError) {
        console.log(inError)
        res.send(inError);
    }
})


/**
 * ////////// CATEGORY REQUESTS //////////////
 */

app.get("/getCategories/:userID", async (req, res) => {
    try {
        const categoryWorker: Categories.Worker = new Categories.Worker();
        const categories: ICategory[] = await categoryWorker.getCategories(req.params.userID);
        res.send(categories);
    } catch (e) {
        console.log(e)
        res.send(e);
    }
})

app.get("/getCategory/:id", async (req, res) => {
    try {
        const categoryWorker: Categories.Worker = new Categories.Worker();
        const category: ICategory = await categoryWorker.getCategory(req.params.id);
        res.send(category);
    } catch (e) {
        console.log(e)
        res.send(e);
    }
})

app.post("/createCategory", async (req, res) => {
    try {
        const categoryWorker: Categories.Worker = new Categories.Worker();
        const category: ICategory = await categoryWorker.createCategory(req.body);
        res.send(category);
    } catch (e) {
        console.log(e);
        res.send(e)
    }
})

app.delete("/deleteCategory/:categoryID", async (req, res) => {
    try {
        const categoryWorker: Categories.Worker = new Categories.Worker();
        await categoryWorker.deleteCategory(req.params.categoryID)
        res.send(true)
    } catch (inError) {
        console.log(inError)
        res.send(inError);
    }
})

app.post("/updateCategory", async (req, res) => {
    try {
        const categoryWorker: Categories.Worker = new Categories.Worker();
        let category: ICategory = await categoryWorker.editCategory(req.body)
        res.send()
    } catch (inError) {
        console.log(inError)
        res.send(inError);
    }
})


/**
 * ////////// LISTS REQUESTS //////////////
 */

app.post("/createList", async (req, res) => {
    try {
        const listWorker: Lists.Worker = new Lists.Worker();
        let list: IList = await listWorker.createList(req.body);
        res.send(list);
    } catch (e) {
        console.log(e);
        res.send("Error creating list.");
    }
})

app.post("/editList", async (req, res) => {
    try {
        const listWorker: Lists.Worker = new Lists.Worker();
        let list: IList = await listWorker.editList(req.body);
        res.send(list);
    } catch (e) {
        console.log(e);
        res.send("Error editing list.");
    }
})

app.delete("/deleteList/:listID", async (req, res) => {
    try {
        const listsWorker: Lists.Worker = new Lists.Worker();
        await listsWorker.deleteList(req.params.listID)
        res.send(true)
    } catch (inError) {
        console.log(inError)
        res.send(inError);
    }
})

app.delete("/deleteLists/:categoryID", async (req, res) => {
    try {
        const listsWorker: Lists.Worker = new Lists.Worker();
        await listsWorker.deleteListsFromCat(req.params.categoryID)
        res.send(true)
    } catch (inError) {
        console.log(inError)
        res.send(inError);
    }
})

app.get("/getLists/:userID", async (req, res) => {
    try {
        const listsWorker: Lists.Worker = new Lists.Worker();
        let lists: IList[] = await listsWorker.getLists(req.params.userID);
        res.send(lists);
    } catch (e) {
        console.log(e)
        res.send(e)
    }
})

app.get("/getList/:listID", async (req, res) => {
    try {
        const listsWorker: Lists.Worker = new Lists.Worker();
        let list: IList = await listsWorker.getList(req.params.listID);
        res.send(list);
    } catch (e) {
        console.log(e)
        res.send(e)
    }
})


// Set the port to 8080.
app.listen(8080);


console.log("Running...");