// Importação dos componentes necessários da biblioteca mdb-react-ui-kit.
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardSubTitle,
} from "mdb-react-ui-kit";
// Importação da interface IList.
import { IList } from "../List";

// Definição das props para o componente ProjectList.
interface ProjectListProps {
  projects: IList[];
  state: any;
}

// Definição do componente funcional ProjectCard.
const ProjectCard = ({ project, state }: { project: IList; state: any }) => {
  return (
    <>
      {/* Div que envolve o cartão do projeto e define o comportamento ao clicar */}
      <div
        onClick={() => {
          state.changeCurrentProjectId(project.id);
          state.updateListView(project.id);
          state.showView("project");
        }}
      >
        {/* Cartão do projeto com estilo personalizado */}
        <MDBCard
          className="mt-4 round-corners align-left"
          style={{ background: "#cc00ff", textAlign: "left" }}
        >
          <MDBCardBody>
            {/* Título do cartão do projeto */}
            <MDBCardTitle className={"text-white"}>
              {project.title}
            </MDBCardTitle>
            {/* Subtítulo do cartão do projeto */}
            <MDBCardSubTitle>{project.description}</MDBCardSubTitle>
          </MDBCardBody>
        </MDBCard>
      </div>
    </>
  );
};

// Definição do componente funcional ProjectList.
export default function ProjectList({ projects, state }: ProjectListProps) {
  return (
    // Secção principal com a classe "list-color".
    <section className="list-color">
      {/* Container principal com altura 100% e estilo para overflow e largura da barra de rolagem */}
      <MDBContainer
        className="h-100"
        style={{ overflow: "auto", scrollbarWidth: "thin" }}
      >
        {/* Linha com classes para centralização e alinhamento dos itens */}
        <MDBRow className="d-flex justify-content-center align-items-center pb-3">
          <MDBCol lg="8" xl="6">
            {/* Mensagem quando não existem projetos */}
            {projects.length === 0 && (
              <div className="text-center" style={{ color: "white" }}>
                <h2>Não existem novos trabalhos.</h2>
              </div>
            )}
            {/* Iteração sobre a lista de projetos e renderização do componente ProjectCard */}
            {projects.map((project) => (
              <ProjectCard project={project} state={state} />
            ))}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}