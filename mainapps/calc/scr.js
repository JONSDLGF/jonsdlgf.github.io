{
    // 1. Encontrar la ventana actual de forma relativa
    const miApi = new Api();
    const miVentana = miApi.getVentanaActual().elemento;

    // 2. Localizar elementos SOLO dentro de esta ventana
    const display = miVentana.querySelector('.calc-display');
    const botones = miVentana.querySelectorAll('button');

    const calcInput = (val) => {
        if (display.value === "0") display.value = val;
        else display.value += val;
    };

    const calcClear = () => { display.value = "0"; };

    const calcResult = () => {
        try {
            // Evaluamos la expresión de forma segura
            display.value = new Function('return ' + display.value)();
        } catch (e) {
            display.value = "Error";
            setTimeout(calcClear, 1000);
        }
    };

    // 3. Asignar los eventos a los botones de ESTA instancia
    botones.forEach(btn => {
        btn.onclick = () => {
            const action = btn.getAttribute('data-action');
            const val = btn.getAttribute('data-val');

            if (action === 'clear') calcClear();
            else if (action === 'result') calcResult();
            else if (val) calcInput(val);
        };
    });
}