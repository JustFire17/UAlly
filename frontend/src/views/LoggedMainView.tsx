// Importação dos componentes do React Bootstrap.
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Importação dos componentes personalizados.
import Side from "../components/SideBar";
import Modal from "../components/ModalPop";
import Header from "../components/Header";
import ProjectList from "../components/ProjectList";
import { filterListsByCategoryID } from "../state";

// Definição do componente funcional LoggedMainView.
const LoggedMainView = ({ state }: { state: any }) => {
  return (
    <>
      {/* Renderização do Header com o estado passado como prop */}
      <Header state={state} />
      {/* Renderização do Modal com o estado passado como prop */}
      <Modal state={state} />
      {/* Container principal com padding superior */}
      <Container fluid className="p-0" style={{ paddingTop: "70px" }}>
        <Row noGutters>
          {/* Coluna para a lista de projetos */}
          <Col sm={10} className="list-color p-0">
            <ProjectList
              projects={filterListsByCategoryID(
                state.all_lists,
                state.currentCatID
              )}
              state={state}
            />
          </Col>
          {/* Coluna para a barra lateral */}
          <Col sm={2} className="sidebar-color p-0">
            <Side state={state} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

// Exportação do componente LoggedMainView como o padrão.
export default LoggedMainView;