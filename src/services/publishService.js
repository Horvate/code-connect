export function publishProject(name, description, tag) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5
                ? resolve("Projeto publicado com sucesso.")
                : reject("Erro ao publicar o projeto.");
        }, 2000);
    });
}