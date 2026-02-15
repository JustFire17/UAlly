import { Button } from "react-bootstrap";
import { ICategory } from "../Categories";
import Category from "./Category";
const uniIcon = require("../assets/images/uni-symbol.png");
const personalIcon = require("../assets/images/personal-symbol.png");

const getArray = (categories: ICategory[], type: string) => {
  return categories.filter((category) => category.type === type);
};

const Side = ({ state }: { state: any }) => {
  const addProject = (category: ICategory) => {
    state.showModalView("createList", category.id);
  };

  return (
    <div className="sidebar-color">
      <Button
        className="btn btn-block btn-sm btn-light btn-noglow mb-3"
        style={{ width: "100%", textTransform: "lowercase", marginTop: "20px" }}
        onClick={() => state.showView("profile")}
      >
        {state.user.email}
      </Button>
      <ul
        className="list-unstyled components sidebar-list"
        style={{ height: "450px", overflow: "auto", scrollbarWidth: "thin" }}
      >
        <li>
          {state.types.map((type: string) => {
            const icon = type === "Universidade" ? uniIcon : personalIcon;
            return (
              <>
                <a
                  key={type}
                  href={`#${type}`}
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle text-white fw-bold"
                >
                  <img
                    src={icon}
                    style={{ width: "20px", marginRight: "10px" }}
                  />
                  {type}{" "}
                </a>
                <ul
                  key={`#${type}`}
                  className="collapse list-unstyled mx-1 text-white mb-2"
                  id={type}
                >
                  <hr className={"divider-sidebar"} />
                  <li key="li">
                    {state.categories.map((category: ICategory) => {
                      return (
                        <>
                          {category.type == type &&
                            state.categories.length != 0 && (
                              <div key={category.id}>
                                <Category category={category} state={state} />
                                <ul
                                  className="collapse list-unstyled mx-4 text-white"
                                  id={category.id}
                                >
                                  <Button
                                    className="btn btn-sm btn-light btn-block btn-noglow mt-2"
                                    onClick={() => addProject(category)}
                                  >
                                    Adicionar Trabalho
                                  </Button>
                                </ul>
                              </div>
                            )}
                        </>
                      );
                    })}
                    {getArray(state.categories, type).length == 0 && (
                      <p className={"text-white small"}> Vazio </p>
                    )}
                  </li>
                </ul>
                <div className={"my-2"}></div>
              </>
            );
          })}
        </li>
      </ul>
      <Button
        className="btn btn-block btn-sm btn-light btn-noglow"
        style={{ width: "100%" }}
        onClick={() => state.showModalView("createCategory")}
      >
        Adicionar Disciplina/Projeto
      </Button>
    </div>
  );
};

export default Side;
