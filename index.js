const select = document.getElementById("idioma");
const content = document.getElementById("content");

async function loadLang(lang) {
    try {
        const res = await fetch(`/lang/text-${lang}.md`);
        const text = await res.text();

        // convierte markdown a HTML
        content.innerHTML = marked.parse(text);

    } catch (err) {
        content.innerHTML = "<p>Error cargando el archivo</p>";
        console.error(err);
    }
}

// cambio de idioma
select.addEventListener("change", () => {
    loadLang(select.value);
});

// carga inicial
loadLang(select.value);

/* 🎯 CUSTOM HEADINGS */
const renderer = new marked.Renderer();


renderer.heading = function(token) {

    const text = token.text;   // 👈 aquí está el string real
    const level = token.depth; // 👈 nivel del heading (1,2,3...)

    const id = text
        //.toLowerCase()
        .replace(/\s+/g, "_");

    return `<h${level} id="${id}">${text}</h${level}>`;
};

marked.setOptions({
    renderer: renderer
});