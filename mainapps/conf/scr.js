function bgimg() {
    // Recogemos el valor del input del fondo
    const inputFondo = document.getElementById("confInputbg").value;
    const pantalla = document.getElementById("mainscreen");
    
    if (pantalla) {
        // Aplicamos la imagen de fondo
        pantalla.style.backgroundImage = `url('${inputFondo}')`;
        pantalla.style.backgroundSize = "cover";       // Para que cubra toda la pantalla
        pantalla.style.backgroundPosition = "center"; // Para que quede centrada
    }
}

function setIcon() {
    // Recogemos el valor del input del color de la barra
    const inputFondo = document.getElementById("confInputIcon").value;
    const barrai = document.getElementById("start-img");
    
    if (barrai) {
        barrai.src = `${inputFondo}`;
    }
}

function bgbarr() {
    // Recogemos el valor del input del color de la barra
    const colorBarra = document.getElementById("confInputbarr").value;
    const barra = document.getElementById("osbarr");
    
    if (barra) {
        // Aplicamos el color (o degradado) a la barra
        barra.style.backgroundColor = colorBarra;
        // Quitamos el degradado de XP si estaba puesto para que se vea el nuevo color
        barra.style.background = colorBarra; 
    }
}

// Cambiar el nombre del sistema (por ejemplo, en el botón de inicio)
function setName() {
    const nuevoNombre = document.getElementById("confInputName").value;
    const btnInicio = document.querySelector(".start-btn");
    if (btnInicio) {
        // Mantenemos la imagen y cambiamos solo el texto
        const img = btnInicio.querySelector("img").outerHTML;
        btnInicio.innerHTML = img + " " + nuevoNombre;
    }
}

// Cambiar el color de las letras del menú de inicio
function setTextColor() {
    const color = document.getElementById("confInputTextColor").value;
    const items = document.querySelectorAll(".menu-item");
    items.forEach(item => {
        item.style.color = color;
    });
}

// Prefab Moderno (Modo Oscuro)
function PreModern() {
    document.getElementById("mainscreen").style.backgroundImage = "none";
    document.getElementById("mainscreen").style.backgroundColor = "#121212";
    document.getElementById("osbarr").style.background = "#1f1f1f";
    document.getElementById("osbarr").style.borderTop = "1px solid #333";
    
    const startBtn = document.querySelector(".start-btn");
    if (startBtn) {
        startBtn.style.background = "#333";
        startBtn.style.borderRadius = "5px";
    }
}

function PreWxp() {
    // 1. Cambiar el fondo de pantalla al clásico "Bliss"
    const screen = document.getElementById("mainscreen");
    if (screen) {
        screen.style.backgroundImage = "url('osset/windowsxp.jpg')";
        screen.style.backgroundSize = "cover";
        screen.style.backgroundPosition = "center";
        screen.style.height = "calc(100vh - 50px)";
    }

    // 2. Estilo de la barra de tareas (Azul Luna)
    const bar = document.getElementById("osbarr");
    if (bar) {
        bar.style.background = "linear-gradient(to bottom, #245edb 0%, #3f8cf3 9%, #245edb 18%, #245edb 92%, #1941a5 100%)";
        bar.style.borderTop = "1px solid #1a3c7a";
        bar.style.boxShadow = "inset 0 1px 1px rgba(255,255,255,0.3)";
        bar.style.padding = "0"; 
        bar.style.display = "flex";
        bar.style.alignItems = "stretch"; // Estira a los hijos
        bar.style.height = "50px"; // Puedes subirlo a 50px o 60px para que sea más grande
    }

    
    // También asegúrate de que el contenedor de inicio no tenga padding
    const inicioCont = document.querySelector(".inicio-contenedor");
    if (inicioCont) {
        inicioCont.style.height = "100%";
        inicioCont.style.display = "flex";
    }
    
    // 3. Hacer que el BOTÓN sea grande
    const startBtn = document.querySelector(".start-btn");
    if (startBtn) {
        startBtn.style.height = "100%"; // Ocupa todo el alto de la barra
        startBtn.style.padding = "0 20px"; // Le damos más ancho para que se vea imponente
        startBtn.style.fontSize = "18px"; // Letra un poco más grande
        startBtn.style.display = "flex";
        startBtn.style.alignItems = "center";
        // Estilo XP que ya teníamos
        startBtn.style.background = "linear-gradient(to bottom, #388e3c 0%, #4caf50 10%, #388e3c 45%, #2e7d32 55%, #1b5e20 100%)";
        startBtn.style.border = "none";
        startBtn.style.borderRadius = "0 15px 15px 0";
    }


    // 4. Cambiar el icono del botón de inicio
    const startImg = document.getElementById("start-img");
    if (startImg) {
        startImg.src = "osset/windowsicon.png"; // Asegúrate de tener esta imagen
        startImg.style.width="100%";
    }

    // 5. Estilo del Menú de Inicio
    const menu = document.getElementById("menu-inicio");
    if (menu) {
        menu.style.background = "linear-gradient(to right, #1043ac 0%, #1043ac 25%, #fff 25%, #fff 100%)";
        menu.style.border = "2px solid #1043ac";
        menu.style.borderRadius = "5px 5px 0 0";
    }

    console.log("Sistema transformado a Windows XP con éxito.");
}