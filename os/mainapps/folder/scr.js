{ 
    const list = {
        "Sistema": "/",
        "Aplicaciones": "/mainapps"
    }; 
    
    var currentRoot = "/";

    // Simulación de datos del servidor
    async function gettree(path) {
        return [
            { name: "Windows", type: "folder", path: "/Windows" },
            { name: "Users", type: "folder", path: "/Users" },
            { name: "boot.ini", type: "file", path: "/boot.ini" },
            { name: "autoexec.bat", type: "file", path: "/autoexec.bat" }
        ];
    }

    // Dibujar el árbol lateral usando BUTTONS
    async function drawtree() {
        const sideBar = document.getElementById("roots");
        sideBar.innerHTML = "<div class='tree-title'>Favoritos</div>";

        // Favoritos
        for (let name in list) {
            const btn = document.createElement("button");
            btn.className = "tree-btn folder";
            btn.onclick = () => renderblock(list[name]);
            btn.innerHTML = `<span class="icon">⭐</span> <p>${name}</p>`;
            sideBar.appendChild(btn);
        }

        sideBar.appendChild(document.createElement("hr"));
        
        const diskTitle = document.createElement("div");
        diskTitle.className = "tree-title";
        diskTitle.innerText = "Disco Local (/)";
        sideBar.appendChild(diskTitle);

        const items = await gettree("/");
        
        items.forEach(item => {
            const btn = document.createElement("button");
            btn.className = item.type === "folder" ? "tree-btn folder" : "tree-btn file";
            
            // Lógica de los símbolos + / - para folders
            const more = item.type === "folder" ? '<span class="more">+</span>' : '';
            const icon = item.type === "folder" ? '📁' : '📄';

            btn.innerHTML = `
                ${more}
                <span class="icon">${icon}</span>
                <p>${item.name}</p>
            `;

            btn.onclick = () => {
                if (item.type === "folder") renderblock(item.path);
                else console.log("Abriendo archivo...");
            };

            sideBar.appendChild(btn);
        });
    }

    // Renderizar el grid de la derecha usando BUTTONS
    async function renderblock(path) {
        const grid = document.getElementById("files");
        grid.innerHTML = ""; 

        const items = await gettree(path);

        items.forEach(item => {
            const btn = document.createElement("button");
            btn.className = "file-card-btn";
            const icon = item.type === "folder" ? "📂" : "📄";

            btn.innerHTML = `
                <span class="icon">${icon}</span>
                <p>${item.name}</p>
            `;

            btn.onclick = () => {
                if (item.type === "folder") renderblock(item.path);
                else alert("Ejecutando: " + item.name);
            };

            grid.appendChild(btn);
        });
    }

    drawtree();
    renderblock("/");
}