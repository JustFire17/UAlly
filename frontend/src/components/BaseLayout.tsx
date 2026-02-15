// Importação das bibliotecas necessárias do React.
import React from "react";
// Importação da função createState para criar o estado da aplicação.
import createState from "../state";
// Importação dos componentes.
import Header from "./Header";
import WelcomeView from "../views/WelcomeView";
import LoginView from "../views/LoginView";
import LoggedMainView from "../views/LoggedMainView";
import RegisterView from "../views/RegisterView";
import ProfileView from "../views/ProfileView";
import AboutView from "../views/AboutView";
import HelpView from "../views/HelpView";
import ProjectView from "../views/ProjectView";
import List from "./List";
// Importação dos estilos.
import "../assets/styles/App.css";

// Definição da classe BaseLayout que estende React.Component.
class BaseLayout extends React.Component {
  // Criação do estado inicial da aplicação utilizando a função createState.
  state = createState(this);

  // Função de renderização do componente.
  render() {
    // Desestruturação do estado para obter a vista atual.
    const { currentView } = this.state;
    return (
      <>
        {/* Div principal com classes e estilo personalizado */}
        <div
          className="mt-3 container-fluid container-top"
          style={{ backgroundColor: "#FFF6F6" }}
        >
          {/* Renderização condicional das vistas com base na vista atual */}
          {currentView === "welcome" && <WelcomeView state={this.state} />}
          {currentView === "login" && <LoginView state={this.state} />}
          {currentView === "logged" && <LoggedMainView state={this.state} />}
          {currentView === "project" && <List state={this.state} />}
          {currentView === "register" && <RegisterView state={this.state} />}
          {currentView === "profile" && <ProfileView state={this.state} />}
          {currentView === "about" && <AboutView state={this.state} />}
          {currentView === "help" && (
            <HelpView
              show={true}
              handleClose={() => this.state.showView("welcome")}
            />
          )}
        </div>
      </>
    );
  }
}

// Exportação do componente BaseLayout como o padrão.
export default BaseLayout;