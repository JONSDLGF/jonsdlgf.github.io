class OS {
    constructor() {
        // Estado del Sistema
        this.listaApps = [];
        this.maxZ = 1000;
        this.offsetV = 50;
        this.ventanas = {}; // Referencias internas

        // Inicializar eventos globales
        this.initGlobalEvents();
    }

    // --- GESTIÓN DE VENTANAS ---

    async crearVentana(rutaJson) {
        try {
            const respuesta = await fetch(rutaJson);
            const config = await respuesta.json();
            const respuestaHtml = await fetch(config.HTML);
            const contenidoHTML = await respuestaHtml.text();

            const id = "win_" + Date.now();
            
            this.addApp(config.ICON,config.TITLE,id);

            const ventanaHTML = `
              <div id="${id}" class="ventana" 
               style="top: ${this.offsetV}px; left: ${this.offsetV}px; z-index: ${++this.maxZ};"
               onmousedown="api.enfocarVentana('${id}')">
                <div id="${id}Header" class="tab-control">
                  <img src="${config.ICON}" alt="icon" style="width:16px; height:16px;">
                  <span>${config.TITLE}</span>
                  <span class="boton-cerrar" onclick="api.cerrarVentana('${id}')">×</span>
                </div>
                <div id="${id}Barr"></div>
                <div class="contenido">
                  ${contenidoHTML}
                </div>
              </div>
            `;

            document.getElementById("mainscreen").insertAdjacentHTML('beforeend', ventanaHTML);

            if (config.SCR) {
                const script = document.createElement("script");
                script.src = config.SCR;
                script.id = "script_" + id;
                document.body.appendChild(script);
            }

            this.registrarVentana(id);
            this.offsetV = (this.offsetV > 200) ? 50 : this.offsetV + 20;

        } catch (error) {
            console.error("Error en la API al iniciar app:", error);
        }
    }

    registrarVentana(id) {
        const ventana = document.getElementById(id);
        if (ventana && !this.listaApps.includes(id)) {
            this.listaApps.push(id);
            this.dragElement(ventana);
            console.log("Proceso registrado:", id);
        }
    }

    cerrarVentana(id) {
        const ventana = document.getElementById(id);
        const link = document.getElementById(`${id}LINK`);
        if (ventana || link) {
            ventana.remove();
            link.remove();
            this.listaApps = this.listaApps.filter(app => app !== id);
            const script = document.getElementById("script_" + id);
            if (script) script.remove();
            console.log("Proceso terminado:", id);
        }
    }

    enfocarVentana(id) {
        const ventana = document.getElementById(id);
        if (ventana) {
            this.maxZ++;
            ventana.style.zIndex = this.maxZ;
        }
    }

    // --- LÓGICA DE INTERFAZ (MENÚ Y BARRA) ---

    toggleMenu() {
        const menu = document.getElementById("menu-inicio");
        if (menu) menu.classList.toggle("show");
    }

    addApp(icon, name, id){
        const ventanaHTML = `
        <div id="${id}LINK" class="icons" onmousedown="api.enfocarVentana('${id}')">
            <img src="${icon}" alt="icon" style="width:32px; height:32px;">
            <span>${name}</span>
        <div>
        `;
        document.getElementById("taskbar-items").insertAdjacentHTML('beforeend', ventanaHTML);
    }

    addItem(logo, name, action) {
        const contenedor = document.getElementById("menu-inicio");
        if (!contenedor) return;

        const item = document.createElement('div');
        item.className = 'menu-item';
        item.onclick = () => {
            if (typeof action === 'function') action();
            else this.crearVentana(action);
            this.toggleMenu();
        };

        item.innerHTML = `<span class="icon">${logo}</span><p>${name}</p>`;
        const hr = contenedor.querySelector('hr');
        if (hr) contenedor.insertBefore(item, hr);
        else contenedor.appendChild(item);
    }

    addItemBar(logo, action) {
        const bar = document.getElementById("taskbar-items");
        if (!bar) return;

        const btn = document.createElement('div');
        btn.className = 'taskbar-item';
        btn.onclick = () => {
            if (typeof action === 'function') action();
            else this.crearVentana(action);
        };

        btn.innerHTML = `<span class="icon" style="font-size: 20px; padding: 5px;">${logo}</span>`;
        bar.appendChild(btn);
    }

    // --- UTILIDADES ---

    dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = document.getElementById(elmnt.id + "Header");

        if (header) {
            header.onmousedown = (e) => {
                if (e.target.className === "boton-cerrar") return;
                this.enfocarVentana(elmnt.id);
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = () => {
                    document.onmouseup = null;
                    document.onmousemove = null;
                };
                document.onmousemove = (e) => {
                    e.preventDefault();
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                };
            };
        }
    }

    getVentanaActual() {
        const scriptActual = document.currentScript;
        if (!scriptActual) return null;
        const idVentana = scriptActual.id.replace("script_", "");
        const contenedor = document.getElementById(idVentana);
        return {
            id: idVentana,
            elemento: contenedor,
            limpiar: () => { if(contenedor) contenedor.innerHTML = ''; }
        };
    }

    initGlobalEvents() {
        window.onclick = (event) => {
            if (!event.target.closest('.inicio-contenedor')) {
                const menu = document.getElementById("menu-inicio");
                if (menu) menu.classList.remove('show');
            }
        };
    }
}

// --- INSTANCIACIÓN ÚNICA ---
// Usamos "api" en minúsculas para que tus onclics de los HTML funcionen
const api = new OS();

api.addItem("📟", "Calculadora", "./mainapps/calc/index.json")
api.addItem("⚙️", "config",      "./mainapps/conf/index.json")
api.addItem("ℹ️", "info",        "./mainapps/info/index.json")
api.addItem("📄", "docs",        "./mainapps/docs/index.json")
api.addItem("📁", "folder",      "./mainapps/folder/index.json")
api.addItem("💻", "cmd",         "./mainapps/cmd/index.json")

const ti = document.getElementById("task-time-ti");
const da = document.getElementById("task-time-da");
setInterval(() => {
  const ahora = new Date();

  const dia = String(ahora.getDate()).padStart(2, '0');
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const año = ahora.getFullYear();

  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  const segundos = String(ahora.getSeconds()).padStart(2, '0');

  const fecha = `${dia}/${mes}/${año}`;
  const hora = `${horas}:${minutos}:${segundos}`;

  ti.innerText = `${hora}`;
  da.innerText = `${fecha}`;

}, 1000);
