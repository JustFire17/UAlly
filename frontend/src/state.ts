/**
 * Importa  o componente BaseLayout
 */
import BaseLayout from "./components/BaseLayout";
/**
 * Importa a classe Users.
 */
import * as Users from "./Users";
/**
 * Import a interface IUser
 */
import { IUser } from "./Users";
/**
 * Importa a classe Lists.
 */
import * as Lists from "./List";
/**
 * Import a interface IList
 */
import { IList } from "./List";
/**
 * Importa a classe Categories.
 */
import * as Categories from "./Categories";
/**
 * Import a interface ICategory
 */
import { ICategory } from "./Categories";
/**
 * Importa a classe Task.
 */
import * as Tasks from "./Task";
/**
 * Import a interface ITask
 */
import { ITask } from "./Task";

/**
 * Funcao que retorna um objeto que vai guardar todas as informacoes de um state aka representa um state.
 * Esta funcao so deve ser chamada uma vez pois representa o state "principal" da aplicacao.
 * @param inParentComponent Objeto que vai guardar o state.
 */
export default function createState(inParentComponent: BaseLayout) {
  return {
    /**
     * The view that is currently showing ("welcome", "login", "register", "logged").
     */
    currentView: "welcome",

    /**
     * Tipo de erro a acontecer.
     */
    error: "", // "notEqualPassword", "emptyPassword", "incorrectEmail", "missingData", "userDoesntExist", "userExists", "noMatchPassword", "noName"

    /**
     * Variavel boleana que representa se o utilizador esta logged-in.
     */
    isLoggedIn: false,

    /**
     * Variavel boleana que indica se um modal deve ser mostrado.
     */
    showModal: false,

    /**
     * Variavel que indica qual modal deve ser mostrado
     */
    modalView: "createTask", // "createTask", "createCategory", "createList"

    /**
     * Array contendo o tipo de categorias
     */
    types: ["Universidade", "Pessoal"],

    /**
     * Objeto representando a tarefa atualmente selecionada.
     */
    currentTask: null,

    /**
     * Objeto representando a lista atualmente selecionada.
     */
    currentList: {
      id: null, // id da lista
      title: null, // titulo da lista
      description: null, // descricao da lista
      userID: null, // id do utilizador dono da lista
      categoryID: null, // categoria da lista
    },

    /**
     * ID da ultima categoria aberta, no entanto, caso o utilizador clique no botao para adicionar uma tarefa
     * noutra lista aberta este valor ira atualizar para a categoria correta.
     */
    currentCatID: null,

    /**
     * Array de tarefas do utilizador.
     */
    tasks: [],

    /**
     * Array de categorias do utilizador
     */
    categories: [],

    /**
     * Array de todas as listas do utilizador
     */
    all_lists: [],

    // Objeto que representa todos os dados do utilizador
    user: {
      id: null,
      name: null,
      email: null,
      password: null,
    },

    changeCurrentProjectId: function (id: number) {
      this.setState({ currentProjectId: id });
    }.bind(inParentComponent),

    /**
     * Funcao chamada para registar um utilizador na base de dados.
     * Aceita um objeto IUser e verifica se um utilizador existe e se existir emite um error.
     * Caso contrario, encripta a password e chama a funcao registerUser da classe Users.
     */
    registerUser: async function (iUser: IUser): Promise<void> {
      const usersWorker: Users.Worker = new Users.Worker();
      const rawPassword = iUser.password;
      let isFound: boolean = await usersWorker.findUser(iUser.email);
      if (isFound) {
        this.setState({ error: "userExists" });
        return;
      }

      iUser.password = rawPassword;
      let regUser: IUser = await usersWorker.registerUser(iUser);

      if (regUser && regUser.id) {
        const cats = (await getCategories(regUser.id)) || [];
        const lists = (await getLists(regUser.id)) || [];
        this.setState({
          isLoggedIn: true,
          categories: cats,
          all_lists: lists,
          user: regUser,
          currentView: "logged",
          error: "",
        });
      } else this.setState({ error: "register" });
    }.bind(inParentComponent),

    /**
     * Autentica o utilizador.
     * Aceita um email e password e verifica se o utilizador existe e emite um error caso contrario.
     * Vai buscar as categorias do utilizador e as suas listas.
     */
    loginUser: async function (email: string, password: string): Promise<void> {
      const usersWorker: Users.Worker = new Users.Worker();
      let isFound: boolean = await usersWorker.findUser(email);
      if (!isFound) {
        this.setState({ error: "userDoesntExist" });
        return;
      }

      let logUser: IUser = await usersWorker.loginUser(email, password);
      if (logUser.id) {
        let cats = await getCategories(logUser.id);
        let lists = await getLists(logUser.id);
        this.setState({
          isLoggedIn: true,
          categories: cats,
          all_lists: lists,
          user: logUser,
          currentView: "logged",
          error: "",
        });
      } else this.setState({ error: "noMatchPassword" });
    }.bind(inParentComponent),

    /**
     * Adiciona uma tarefa.
     * Aceita um objeto ITask e chama a funcao getTasks da classe Tasks.
     */
    addTask: async function (task: ITask): Promise<void> {
      const taskWorker: Tasks.Worker = new Tasks.Worker();
      let newTask: ITask = await taskWorker.addNewTask(task);
      if (newTask) {
        let tasks: ITask[] = await taskWorker.getTasks(
          this.state.currentList.id
        );
        this.setState({ tasks: tasks, error: "" });
      } else this.setState({ error: "task" });
    }.bind(inParentComponent),

    /**
     * Adiciona uma categoria.
     * Aceita um objeto ICategory e chama a funcao addNewCategory da classe Categories.
     */
    addCategory: async function (cat: ICategory): Promise<void> {
      const CategoryWorker: Categories.Worker = new Categories.Worker();
      let newCat: ICategory = await CategoryWorker.addNewCategory(cat);
      if (newCat) {
        let cats = await getCategories(this.state.user.id);
        this.setState({ categories: cats, error: "" });
      } else this.setState({ error: "task" });
    }.bind(inParentComponent),

    /**
     * Adiciona uma lista.
     * Aceita um objeto IList e chama a funcao addList da classe Lists.
     */
    addList: async function (list: IList): Promise<void> {
      const listWorker: Lists.Worker = new Lists.Worker();
      let newList: IList = await listWorker.addList(list);
      if (newList) {
        let lists = await getLists(this.state.user.id);
        this.setState({ all_lists: lists, error: "" });
      } else this.setState({ error: "list" });
    }.bind(inParentComponent),

    /**
     * Atualiza o array das listas e tarefas.
     * Aceita o id de uma lista e chama a funcao getTasks da classe Tasks e getList da casse .
     */
    updateListView: async function (listID: number) {
      const taskWorker: Tasks.Worker = new Tasks.Worker();
      const listWorker: Lists.Worker = new Lists.Worker();
      let tasks: ITask[] = await taskWorker.getTasks(listID);
      let list: IList = await listWorker.getList(listID);
      if (tasks && list) this.setState({ currentList: list, tasks: tasks });
      else this.setState({ error: "task" });
    }.bind(inParentComponent),

    selectTask: function (taskID: number) {
      const task = this.state.tasks.find((task: ITask) => task.id === taskID);
      this.setState({ currentTask: task });
      this.showView("taskDetail");
    }.bind(inParentComponent),

    /**
     * Remove uma task.
     * Aceita um id de uma task e remove essa task da bd através da funcao deleteTask da classe Tasks
     */
    deleteTask: async function (taskID: number) {
      const taskWorker: Tasks.Worker = new Tasks.Worker();
      let task: boolean = await taskWorker.deleteTask(taskID);
      if (task) {
        let tasks: ITask[] = await taskWorker.getTasks(
          this.state.currentList.id
        );
        this.setState({ tasks: tasks });
      } else this.setState({ error: "delete" });
    }.bind(inParentComponent),

    /**
     * Atualiza o estado de uma tarefa.
     * Aceita o id da tarefa e o seu novo estado.
     * Chama a funcao updateTaskState da classe Tasks.
     */
    updateTaskState: async function (taskID: string, newState: string) {
      const taskWorker: Tasks.Worker = new Tasks.Worker();
      let task: ITask = await taskWorker.updateTaskState(taskID, newState);
      if (task) {
        let tasks: ITask[] = await taskWorker.getTasks(
          this.state.currentList.id
        );
        this.setState({ tasks: tasks });
      } else this.setState({ error: "updateTask" });
    }.bind(inParentComponent),

    /**
     * Marca uma tarefa como concluida.
     * Aceita o id da tarefa e atualiza o estado para "Acabada".
     */
    completeTask: async function (taskID: number) {
      const taskWorker: Tasks.Worker = new Tasks.Worker();
      let task: ITask = await taskWorker.updateTaskState(
        taskID.toString(),
        "Acabada"
      );
      if (task) {
        let tasks: ITask[] = await taskWorker.getTasks(
          this.state.currentList.id
        );
        this.setState({ tasks: tasks });
      } else this.setState({ error: "updateTask" });
    }.bind(inParentComponent),

    /**
     * Abre o modal de edicao e define a tarefa atual.
     */
    startEditTask: function (task: ITask) {
      this.setState({
        currentTask: task,
        showModal: true,
        modalView: "editTask",
      });
    }.bind(inParentComponent),

    /**
     * Atualiza os dados de uma tarefa.
     * Aceita um objeto ITask com os dados atualizados.
     */
    updateTaskDetails: async function (task: ITask) {
      const taskWorker: Tasks.Worker = new Tasks.Worker();
      let updatedTask: ITask = await taskWorker.updateTask(task);
      if (updatedTask) {
        let tasks: ITask[] = await taskWorker.getTasks(
          this.state.currentList.id
        );
        this.setState({ tasks: tasks, error: "" });
      } else this.setState({ error: "updateTask" });
    }.bind(inParentComponent),

    /**
     * Remove uma lista.
     * Aceita o id da lista e chama a funcao deleteList da classe Lists.
     */
    deleteList: async function (listID: number) {
      const listWorker: Lists.Worker = new Lists.Worker();
      let list: boolean = await listWorker.deleteList(listID);
      if (list) {
        let lists = await getLists(this.state.user.id);

        let original = {
          id: null,
          title: null,
          description: null,
          userID: null,
          categoryID: null,
        };

        this.setState({ all_lists: lists, tasks: [], currentList: original });
      } else this.setState({ error: "delete" });
    }.bind(inParentComponent),

    /**
     * Remove uma categoria.
     * Aceita o id de uma categoria e chama a funcao deleteCategory da classe Categories.
     * Atualiza o array de categorias e listas.
     */
    deleteCategory: async function (categoryID: number) {
      const categoryWorker: Categories.Worker = new Categories.Worker();
      let cat: boolean = await categoryWorker.deleteCategory(categoryID);
      let original = {
        id: null,
        title: null,
        description: null,
        userID: null,
        categoryID: null,
      };

      if (cat) {
        let categories = await getCategories(this.state.user.id);
        let lists = await getLists(this.state.user.id);
        let tasks: ITask[] = [];
        this.setState({
          tasks: tasks,
          categories: categories,
          all_lists: lists,
          currentList: original,
          error: "",
        });
      } else this.setState({ error: "delete" });
    }.bind(inParentComponent),

    /**
     * Remove um utilizador.
     * Chama a funcao deleteAccount da classe Users.
     * Obtem o id do utilizador atraves do objeto user do state.
     */
    deleteAccount: async function () {
      const usersWorker: Users.Worker = new Users.Worker();
      await usersWorker.deleteAccount(this.state.user.id);
      let user = {
        id: null,
        name: null,
        email: null,
        password: null,
      };

      this.setState({ user: user, currentView: "welcome", isLoggedIn: false });
    }.bind(inParentComponent),

    /**
     * Faz logout do utilizador settando a variavel isLoggedIn para falso e tornando as propriedades do objeto user nulo.
     */
    logoutUser: function () {
      this.setState({
        isLoggedIn: false,
        user: {
          id: null,
          name: null,
          email: null,
          password: null,
        },
        currentView: "welcome",
      });
    }.bind(inParentComponent),

    /**
     * Funcao para alterar a view a ser mostrada.
     * Aceita uma string representando um view.
     */
    showView: function (view: String) {
      this.setState({ currentView: view, error: "" });
    }.bind(inParentComponent),

    /**
     * Atualiza a variavel currentCatId.
     * Aceita o id da categoria.
     */
    updateCat: function (id: number) {
      this.setState({ currentCatID: id });
    }.bind(inParentComponent),

    /**
     * Inverte o estado do showModal e setta a variavel modalView e currentCatID.
     * Aceita uma string representando uma view e um numero representando o id da categoria.
     */
    showModalView: function (view: String, catID?: number) {
      this.setState((prevState: any) => ({
        showModal: view !== "",
        modalView: view,
        currentCatID:
          typeof catID === "number" ? catID : prevState.currentCatID,
        currentTask: view === "createTask" ? null : prevState.currentTask,
      }));
    }.bind(inParentComponent),

    /**
     * Funcao que atualiza os dados do utilizador
     * Aceita um objeto IUser com os dados atualizados.
     * Encripta a password e chama a funcao updateUserInfo da classe Users.
     */
    updateUserInfo: async function (user: IUser) {
      const payload: IUser = { ...user };
      const usersWorker: Users.Worker = new Users.Worker();
      const result = await usersWorker.updateUserInfo(payload);
      if (typeof result === "string") {
        this.setState({ error: result });
        return result;
      }

      if (result && (result as IUser).id) {
        this.setState({ user: result });
        return result;
      }

      this.setState({ error: "updateUser" });
      return null;
    }.bind(inParentComponent),

    /**
     * Atualiza a variavel error com o erro passado.
     */
    updateError: function (error: string) {
      this.setState({ error: error });
    }.bind(inParentComponent),
  };
}

export function filterListsByCategoryID(lists: IList[], categoryID: number) {
  return lists.filter((list) => list.categoryID === categoryID);
}

/**
 * Obtem as categorias de um utilizador chamando a funcao getCategories da classe Categories.
 * @param userID ID do utilizador
 */
async function getCategories(userID: number) {
  try {
    const categoryWorker: Categories.Worker = new Categories.Worker();
    let cats: ICategory[] = await categoryWorker.getCategories(userID);
    return cats;
  } catch (e) {
    console.log(e);
  }
}

/**
 * Obtem as listas de um utilizador chamando a funcao getLists da classe Lists.
 * @param userID ID do utilizador
 */
async function getLists(userID: number) {
  try {
    const listWorker: Lists.Worker = new Lists.Worker();
    let lists: IList[] = await listWorker.getLists(userID);
    return lists;
  } catch (e) {
    console.log(e);
  }
}

/**
 * Funcao para encriptar uma password.
 * @param str password a ser encriptada
 * @param seed seed usada para encriptar a password
 */
const cyrb53 = (str: string, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
