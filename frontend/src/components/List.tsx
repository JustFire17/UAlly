// React imports.
import React from "react";
import "../assets/styles/App.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { ITask } from "../Task";

import {
  MDBBadge,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCol,
  MDBContainer,
  MDBListGroup,
  MDBRow,
} from "mdb-react-ui-kit";
import { Task } from "./Task";
import Header from "./Header";
import Modal from "./ModalPop";
/**
 * Função que recebe como argumento um state e retorna um bloco de codigo HTML que repesenta uma seccao dentro do layout da app.
 *  mais especificamente a seccao da app que contem a lista de tarefas selecionadas pelo utilizador
 * Esta seccao e composta por um "outer card" representando a lista na sua totalidade e um "inner card" que representa as tarefas pretencentes a lista
 * **/
//@ts-ignore
const List = ({ state }) => {
  return (
    <>
      <Header state={state} />
      <Modal state={state} />
      <section className="list-color">
        <MDBContainer
          className="h-100"
          style={{ overflow: "auto", scrollbarWidth: "thin" }}
        >
          <MDBRow className="d-flex justify-content-center align-items-center pb-3">
            <MDBCol lg="8" xl="6">
              <MDBCard
                className="mt-4 round-corners"
                style={{ background: "#cc00ff" }}
              >
                <MDBCardBody
                  className="p-4 round-corners"
                  style={{ background: "#cc00ff" }}
                >
                  {state.currentList.categoryID !== null && (
                    <h5>
                      <span className="fw-bold h2 me-2 text-white">
                        {" "}
                        {state.currentList.title}{" "}
                      </span>
                    </h5>
                  )}
                  <p className="text-white pb-2">
                    {state.currentList.description}
                  </p>
                  <MDBListGroup className="rounded-0">
                    {state.currentList.categoryID !== null &&
                      state.tasks.length == 0 && (
                        <>
                          <span className={"text-white fw-bold"}>
                            Sem tarefas.
                          </span>
                          <p className={"small"}>Cria a tua primeira tarefa</p>
                        </>
                      )}
                    {state.tasks.map((task: ITask) => {
                      return <Task task={task} state={state} />;
                    })}
                  </MDBListGroup>
                  {state.currentList.categoryID !== null && (
                    <MDBListGroup
                      horizontal
                      className="rounded-0 justify-content-center pb-2 mt-4"
                    >
                      <MDBBtn
                        className={"btn-info me-2 btn-noglow"}
                        style={{
                          backgroundColor: "#EEA1EB",
                          borderColor: "purple",
                        }}
                        onClick={() => {
                          state.showModalView("createTask");
                        }}
                      >
                        Nova tarefa
                      </MDBBtn>
                      <MDBBtn
                        className={"btn-danger btn-noglow"}
                        onClick={() => {
                          state.deleteList(state.currentList.id);
                          state.showView("logged");
                        }}
                      >
                        Eliminar Trabalho
                      </MDBBtn>
                    </MDBListGroup>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
};

export default List;
