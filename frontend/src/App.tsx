// Importação do ficheiro de estilos CSS específico para a aplicação.
import './assets/styles/App.css';

// Importação do componente BaseLayout.
import BaseLayout from './components/BaseLayout';

// Definição do componente funcional App.
function App() {
    return (
        // Renderização do componente BaseLayout.
        <BaseLayout/>
    );
}

// Exportação do componente App como o padrão.
export default App;
