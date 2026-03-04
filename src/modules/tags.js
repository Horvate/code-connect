import { tagList, inputTags } from "../dom/elements.js";
import { checkAvailableTag } from "../services/tagService.js"

export function registerTagEvents() {
  tagList.addEventListener("click", removeTag);
  inputTags.addEventListener("keydown", createTag);
}

async function createTag(e) {
  if (e.key !== "Enter") return;
  const tagText = inputTags.value.trim();
  if (!tagText) return;
  try {
    const avaliable = await checkAvailableTag(tagText);
    if (!avaliable) {
      alert("A tag não foi encontrada.");
      return
    }
    addTagText(tagText);
    inputTags.value = "";
  } catch (error) {
    alert("Erro ao verificar a tag.")
  }
}

function addTagText(tagText) {
  const newTag = document.createElement("li");
  newTag.innerHTML = `<p>${tagText}</p> <img src="./img/close-black.svg" class="remove-tag">`;
  tagList.appendChild(newTag);
}

export function getTag() {
  const tagsProjects = Array.from(tagList.querySelectorAll("p")).map((tag) => tag.textContent);
}

function removeTag(event) {
  if (event.target.classList.contains("remove-tag")) {
    const tagToRemove = event.target.parentElement;
    tagList.removeChild(tagToRemove);
  }
}