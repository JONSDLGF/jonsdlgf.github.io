{ // <-- Abrimos bloque
    const miApi = api;
    const miIdVentana = miApi.getVentanaActual().id;

    // Buscamos la barra de la ventana (asegúrate de que el ID coincida con tu HTML)
    const barr = document.getElementById(`${miIdVentana}Barr`);
    
    if (barr) {
        barr.innerHTML = `
            <div class="window-toolbar">
                <button onclick="window['func_${miIdVentana}'].nuevo()" title="Nuevo">📄</button>
                <button onclick="window['func_${miIdVentana}'].abrir()" title="Abrir">📂</button>
                <button onclick="window['func_${miIdVentana}'].guardar()" title="Guardar">💾</button>
                
                <div class="separator"></div>
                
                <button onclick="window['func_${miIdVentana}'].abrirConfig()" title="Configurar">⚙️</button>
                <button onclick="alert('Bloc de Notas v1.0')" style="margin-left: auto;">❓</button>
            </div>
        `;
    }
    // Un poco de estilo rápido para que el menú no se vea "suelto"
    const style = document.createElement('style');
    style.textContent = `
        .window-toolbar {
            display: flex;
            gap: 5px;
            padding: 4px;
            background: #e1e1e1;
            border-bottom: 1px solid #999;
            align-items: center;
        }
        .window-toolbar button {
            padding: 2px 8px;
            cursor: pointer;
            border: 1px solid transparent;
            background: transparent;
            font-size: 14px;
        }
        .window-toolbar button:hover {
            background: #fff;
            border-color: #ccc;
        }
        .separator {
            width: 1px;
            height: 20px;
            background: #999;
            margin: 0 5px;
        }
    `;
    document.head.appendChild(style);

    // Referencia al textarea de ESTA ventana
    const miVentana = document.getElementById(miIdVentana);
    const elAreaTexto = miVentana.querySelector('#Dtext');

    // Creamos las funciones dentro de un objeto único para esta ventana
    window[`func_${miIdVentana}`] = {
        nuevo: () => {
            if (confirm("¿Seguro que quieres borrar todo?")) {
                elAreaTexto.value = "";
            }
        },
        abrir: () => {
            // Creamos un selector de archivos invisible
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.txt, .js, .html, .css'; // Tipos de archivos permitidos

            input.onchange = e => {
                const archivo = e.target.files[0];
                const lector = new FileReader();

                lector.onload = eventoLectura => {
                    // Ponemos el contenido del archivo en el textarea
                    elAreaTexto.value = eventoLectura.target.result;
                };

                lector.readAsText(archivo);
            };

            input.click(); // Forzamos el clic para que se abra la ventana de Windows/Mac
        },
        guardar: () => {
            const texto = elAreaTexto.value;
            const blob = new Blob([texto], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "nota.txt";
            a.click();
            URL.revokeObjectURL(url);
        },
        abrirConfig: () => {
            // Aquí puedes llamar a tu función global de crearVentana
            if (typeof crearVentana === 'function') {
                crearVentana('settings'); 
            } else {
                alert("Abriendo configuración del sistema...");
            }
        }
    };

    if (barr) {
        // Ahora llamamos a las funciones usando el objeto único
        barr.innerHTML = `
            <div class="window-toolbar">
                <button onclick="window['func_${miIdVentana}'].nuevo()" title="Nuevo">📄</button>
                <button onclick="alert('Función abrir pendiente')" title="Abrir">📂</button>
                <button onclick="window['func_${miIdVentana}'].guardar()" title="Guardar">💾</button>
                <div class="separator"></div>
                <button onclick="window['func_${miIdVentana}'].abrirConfig()" title="Configurar">⚙️</button>
                <button onclick="alert('Bloc de Notas v1.0')" style="margin-left: auto;">❓</button>
            </div>
        `;
    }

    // Estilos (se mantienen igual, pero añadimos una limpieza al textarea)
    elAreaTexto.style.border = "none";
    elAreaTexto.style.outline = "none";
    elAreaTexto.style.padding = "10px";
    elAreaTexto.style.resize = "none";
} // <-- Cerramos bloque