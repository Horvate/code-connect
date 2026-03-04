import { mainImage, imageName, uploadBtn, inputUpload } from "../dom/elements.js";

export function registerUploadEvents() {
    uploadBtn.addEventListener("click", handleUploadClick);
    inputUpload.addEventListener("change", handleFileChange);
}

function readFileContents(file) {
    return new Promise((resolve, reject) => {
        const read = new FileReader();
        read.onload = () => {
            resolve({ URL: read.result, name: file.name });
        }
        read.onerror = () => {
            reject(`Erro ao ler o arquivo. ${file.name}`);
        }
        read.readAsDataURL(file);
    });
}

async function processUpload(file) {
    try {
        const fileContet = await readFileContents(file);
        mainImage.src = fileContet.URL;
        imageName.textContent = fileContet.name;
    } catch (error) {
        alert(error)
    }
}

function handleUploadClick() {
    inputUpload.click();
}

function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    processUpload(file);
}