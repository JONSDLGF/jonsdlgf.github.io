function cerrarVentana() {
    const ventana = document.getElementById("miDiv");
    if (ventana) {
        ventana.remove(); // Esto elimina el elemento del HTML por completo
    }
}

// Lógica de arrastre
dragElement(document.getElementById("miDiv"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = document.getElementById(elmnt.id + "Header");

    if (header) {
        header.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        if (e.target.className === "boton-cerrar") return;
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

function toggleMenu() {
    const menu = document.getElementById("menu-inicio");
    menu.classList.toggle("show");
}

// Cerrar el menú si haces clic en el escritorio
window.onclick = function(event) {
    if (!event.target.closest('.inicio-contenedor')) {
        const menu = document.getElementById("menu-inicio");
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
        }
    }
}