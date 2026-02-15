// Importação do componente CloseButton do React Bootstrap.
import CloseButton from "react-bootstrap/esm/CloseButton";
// Importação da interface ICategory.
import { ICategory } from "../Categories";

// Importação do ícone de pasta.
const folderIcon = require("../assets/images/folder-symbol.png");

// Definição do componente funcional Category.
export default function Category({
  category,
  state,
}: {
  category: ICategory;
  state: any;
}) {
  return (
    <a
      href={`#${category.id}`}
      data-toggle="collapse"
      aria-expanded="false"
      onClick={() => state.updateCat(category.id)}
    >
      {/* Ícone de pasta */}
      <img
        src={folderIcon}
        style={{
          width: "20px",
          marginRight: "10px",
        }}
      />
      {category.title}
      {/* Botão para apagar a categoria */}
      <CloseButton
        variant={"#FFF6F6"}
        style={{ float: "right" }}
        onClick={() => state.deleteCategory(category.id)}
      />
    </a>
  );
}