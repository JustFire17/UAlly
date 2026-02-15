// Importações do React.
import React from "react";
import ReactDOM from "react-dom/client";

// Importação do ficheiro de estilos CSS.
import './assets/styles/index.css';

// Importação do componente BaseLayout.
import BaseLayout from './components/BaseLayout';

// Criação da raiz do React no elemento com o ID "root".
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Renderização do conteúdo na raiz.
root.render(
    <React.StrictMode>
        {/* Div principal da aplicação com um fundo de cor #FFF6F6 */}
        <div className={"App"} style={{backgroundColor: "#FFF6F6"}}>
            {/* Renderização do componente BaseLayout */}
            <BaseLayout/>
        </div>
    </React.StrictMode>
);
