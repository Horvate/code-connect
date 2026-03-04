const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");
const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");
const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");
const botaoPublicar = document.querySelector(".botao-publicar");
const botaoDescartar = document.querySelector(".botao-descartar");



const tagDisponiveis = ["front-end", "javascript", "full-stack", "programção", "css", "html", "data science"];

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ URL: leitor.result, nome: arquivo.name });
        }
        leitor.onerror = () => {
           reject(`Erro na leitura do arquivo ${arquivo.name}`);
       }
        leitor.readAsDataURL(arquivo);
    });
}

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];
    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.URL;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
           console.error("Erro na leitura do arquivo");
        }
    }
});

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
       const tagQueQueremosRemover = evento.target.parentElement;
       listaTags.removeChild(tagQueQueremosRemover);
   }
});

async function verificaTagDisponiveis(tagTexto) {

    return new Promise((resolve) => {

        setTimeout(() => {
           const existe = tagDisponiveis.includes(tagTexto);
            resolve(existe)
        }, 1000);
    });
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
                const tagExiste = await verificaTagDisponiveis(tagTexto);
                if (tagExiste) {
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
                    listaTags.appendChild(tagNova); 
                } else {
                    alert("Tag não foi encontrada");
                }
            } catch (error) {
                console.error("Erro ao verificar a existência da tag");
                alert("Erro ao verificar a existência da tag. Verifique o console.");
            }
            inputTags.value = "";
        }
    }
   });

async function publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto) {
   return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;
            if(deuCerto) {
               resolve("Projeto publicado com sucesso");
            } else {
               reject("Erro ao publicar o projeto.");
           }
       }, 2000);
    });
}

botaoPublicar.addEventListener("click", async (event) => {
    event.preventDefault();
    const nomeProjeto = document.querySelector("#nome").value;
    const descricaoProjeto = document.querySelector("#descricao").value;
   const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);
    try {
        const resultado = await publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto);
        console.log(resultado);
        alert("Publicado com sucesso.");
    } catch (error) {
        console.log("Erro ao publicar projeto.", error);
        alert("Erro ao publicar projeto.");
    }
});

botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();
    const formulario = document.querySelector("form");
    formulario.reset();
    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "imagem_projeto.png";
    listaTags.innerHTML = "";
});