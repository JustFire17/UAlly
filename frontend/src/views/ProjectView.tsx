// Importação dos componentes MDBContainer, MDBRow e MDBCol da biblioteca mdb-react-ui-kit.
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
// Importação do componente Header.
import Header from "../components/Header";

// Definição do componente funcional ProjectView.
export default function ProjectView({ state }: { state: any }) {
  return (
    <>
      {/* Renderização do componente Header com o estado passado como prop */}
      <Header state={state} />
      {/* Secção principal com a classe "list-color" */}
      <section className="list-color">
        {/* Container principal com altura 100% e estilo para overflow e largura da barra de rolagem */}
        <MDBContainer
          className="h-100"
          style={{ overflow: "auto", scrollbarWidth: "thin" }}
        >
          {/* Linha com classes para centralização e alinhamento dos itens */}
          <MDBRow className="d-flex justify-content-center align-items-center pb-3">
            {/* Coluna com largura para dispositivos grandes (lg) e extra grandes (xl) */}
            <MDBCol lg="8" xl="6"></MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}