// Importação do componente Button do React Bootstrap.
import Button from 'react-bootstrap/Button';

// Definição do componente funcional AboutView.
const AboutView = ({ state }: { state: any }) => {
    return (
        // Div principal com a classe "about-container".
        <div className="about-container">
            {/* Botão para voltar à vista de boas-vindas */}
            <Button 
                style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: "purple", borderColor: "purple" }} 
                onClick={() => state.showView("welcome")}
            >
                Voltar
            </Button>
            {/* Título principal */}
            <h1>Sobre Nós</h1>
            {/* Parágrafo com informações sobre a equipa e o projeto */}
            <p className="about-text">
                Somos três colegas apaixonados por tecnologia!<br />
                Este website foi criado no âmbito da cadeira de Desenvolvimento de Aplicações para a Web e reflete o nosso empenho em aplicar<br /> o que aprendemos em sala de aula para resolver desafios reais.<br />
                Sabemos como pode ser difícil equilibrar os estudos, atividades extracurriculares e a vida pessoal.<br /> Por isso, decidimos criar esta plataforma dedicada a ajudar estudantes a organizarem a sua vida académica de forma prática e eficiente.<br />
                O nosso objetivo é oferecer ferramentas simples e úteis que ajudem outros estudantes a gerir melhor o seu tempo.<br />
                <br />
                <span>Trabalho realizado por: <br />
                    Helena Vassal Nº:75525 <br />
                    Rui Saraiva Nº:79890 <br />
                    Vasco Evaristo Nº:79806</span>
            </p>
        </div>
    );
}

// Exportação do componente AboutView como o padrão.
export default AboutView;