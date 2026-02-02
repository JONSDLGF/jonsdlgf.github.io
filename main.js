// Lista de IDs de ventanas abiertas (el "Tasklist")
var listaApps = [];

// Función para registrar y activar el arrastre de una ventana
function registrarVentana(id) {
    const ventana = document.getElementById(id);
    if (ventana && !listaApps.includes(id)) {
        listaApps.push(id);
        dragElement(ventana);
        console.log("App iniciada: " + id);
    }
}

// Cerrar ventana y limpiar la lista
function cerrarVentana(id) {
    const ventana = document.getElementById(id);
    if (ventana) {
        ventana.remove();
        // Quitamos el ID de nuestra lista de procesos activos
        listaApps = listaApps.filter(app => app !== id);
        console.log("Proceso terminado: " + id);
    }
}

// Función de arrastre (se mantiene igual, pero la llamamos desde el registro)
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = document.getElementById(elmnt.id + "Header");

    if (header) {
        header.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        if (e.target.className === "boton-cerrar") return;
        
        enfocarVentana(elmnt.id);
        
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

let maxZ = 1000; // Empezamos en un número alto para estar sobre el escritorio

function enfocarVentana(id) {
    const ventana = document.getElementById(id);
    if (ventana) {
        maxZ++; // Incrementamos el contador
        ventana.style.zIndex = maxZ; // Aplicamos el nuevo nivel más alto
    }
}

// Variable para controlar la posición inicial de las ventanas nuevas (cascada)
// Variable para el control de capas
let offsetV = 50;

async function crearVentana(rutaJson) {
    try {
        // 1. Cargar el archivo JSON
        const respuesta = await fetch(rutaJson);
        const config = await respuesta.json();

        // 2. Cargar el contenido HTML
        const respuestaHtml = await fetch(config.HTML);
        const contenidoHTML = await respuestaHtml.text();

        // 3. Generar ID único
        const id = "win_" + Date.now();

        // 4. Definir la estructura
        const ventanaHTML = `
          <div id="${id}" class="ventana" 
           style="top: ${offsetV}px; left: ${offsetV}px; z-index: ${++maxZ};"
           onmousedown="enfocarVentana('${id}')">
            <div id="${id}Header" class="tab-control">
              <img src="${config.ICON}" alt="icon" style="width:16px; height:16px;">
              <span>${config.TITLE}</span>
              <span class="boton-cerrar" onclick="cerrarVentana('${id}')">×</span>
            </div>
            <div id="${id}Barr"></div>
            <div class="contenido">
              ${contenidoHTML}
            </div>
          </div>
        `;

        // 5. Insertar en el DOM
        document.getElementById("mainscreen").insertAdjacentHTML('beforeend', ventanaHTML);

        // --- NUEVO: CARGADOR DE SCRIPT (SCR) ---
        if (config.SCR) {
            const script = document.createElement("script");
            script.src = config.SCR;
            script.id = "script_" + id; // Le ponemos un ID para borrarlo si cerramos la app
            document.body.appendChild(script);
        }

        // 6. Registrar y activar arrastre
        registrarVentana(id);

        // 7. Ajustar posición
        offsetV = (offsetV > 200) ? 50 : offsetV + 20;

    } catch (error) {
        console.error("No se pudo iniciar la app:", error);
    }
}

class Api {
    constructor() {
        this.ventanas = {}; // Para guardar referencias y no buscarlas cada vez
    }

    getVentanaActual() {
        // Obtenemos el script que se está ejecutando en este preciso momento
        const scriptActual = document.currentScript; 
        
        if (!scriptActual) {
            console.error("No se pudo detectar el script actual. ¿Es un módulo asíncrono?");
            return null;
        }

        const idVentana = scriptActual.id.replace("script_", "");
        const contenedor = document.getElementById(idVentana);

        return {
            id: idVentana,
            elemento: contenedor,
            // Aquí podrías añadir métodos para esta ventana específica
            limpiar: () => { if(contenedor) contenedor.innerHTML = ''; }
        };
    }
}

// --- Interfaz de Usuario ---

function toggleMenu() {
    const menu = document.getElementById("menu-inicio");
    menu.classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.closest('.inicio-contenedor')) {
        const menu = document.getElementById("menu-inicio");
        if (menu && menu.classList.contains('show')) {
            menu.classList.remove('show');
        }
    }
}