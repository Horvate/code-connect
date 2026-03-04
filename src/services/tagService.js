const tagAvailable = [
    "front-end",
    "javascript",
    "full-stack",
    "programacao",
    "css",
    "html",
    "data science"
];

export async function checkAvailableTag(textTag) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const exists = tagAvailable.includes(textTag);
            resolve(exists)
        }, 1000);
    });
}