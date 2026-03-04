import { buttonPublish, buttonDiscard, mainImage, imageName, tagList } from "../dom/elements.js";
import { publishProject } from "../services/publishService.js"
import { getTag } from "../modules/tags.js";

export function registerFormActions() {   
    buttonPublish.addEventListener("click", handlePublish);
    buttonDiscard.addEventListener("click", handleDiscard);
}

async function handlePublish(e) {
    e.preventDefault();
    try {
        const name = document.querySelector("#nome").value;
        const description = document.querySelector("#description").value;
        const tag = getTag();
        await publishProject(name, description, tag);
        alert("Publicado com sucesso.")
    } catch {
        alert("Erro ao publicar o projeto.");
    }
}

function handleDiscard(e) {
    e.preventDefault();
    document.querySelector("form").reset();
    tagList.innerHTML = "";
    mainImage.src = "../img/imagem1.png";
    imageName.textContent = "image_projeto.png";
}