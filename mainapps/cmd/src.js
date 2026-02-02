{
    const miApi = new Api();
    const miVentana = miApi.getVentanaActual().elemento;

    const input = document.getElementById('command-input');
    const output = document.getElementById('output');

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = input.value;
            processCommand(command);
            input.value = ''; // Limpiar el input
        }
    });

    function processCommand(cmd) {
        // 1. Mostrar lo que el usuario escribió
        const p = document.createElement('div');
        p.classList.add('history-item');
        p.textContent = `user@gemini:~$ ${cmd}`;
        output.appendChild(p);

        // 2. Lógica de comandos (El Procesador)
        let responseText = '';
        const cleanCmd = cmd.toLowerCase().trim();

        if (cleanCmd === 'help') {
            responseText = 'Comandos disponibles: help, clear, hello, date, whoami';
        } else if (cleanCmd === 'hello') {
            responseText = '¡Hola! Soy tu consola interactiva personalizada.';
        } else if (cleanCmd === 'clear') {
            output.innerHTML = '';
            return;
        } else if (cleanCmd === 'date') {
            responseText = new Date().toLocaleString();
        } else if (cleanCmd === 'whoami') {
            responseText = 'Eres un desarrollador rompiendo la Matrix.';
        } else {
            responseText = `Comando no encontrado: ${cmd}. Escribe 'help' para ayuda.`;
        }

        // 3. Mostrar la respuesta
        const res = document.createElement('div');
        res.classList.add('response');
        res.textContent = responseText;
        output.appendChild(res);

        // Hacer scroll automático hacia abajo
        window.scrollTo(0, document.body.scrollHeight);
    }
}