/*
Asta un futuro esto NO se cambia como una funcion si no como un contenedor de datos.
Pero para acceder a ello se hace por funciones que no estan relacionadas.
En este caso si se cambia alguna funcionalidad de la api no se toca el contenedor, solo -
la funcion que accede a ella.
*/
class Win {
    static window = null;
    static ctx = null;
    
    static init = false;
    static title = "";
    static w = 0;
    static h = 0;

    static GAFICS = {
        CAP: [],
        ASS: {
            MOD: {},
            IMG: {},
            CAM: {}
        }
    };
}

/*se encargara de poner los argumentos necesarios para la libreria*/
function Win_new(title, w, h) {
    Win.title = title;
    Win.w = w;
    Win.h = h;
}

function Win_start() {
    const canvas = document.createElement("canvas");

    canvas.width = Win.w;
    canvas.height = Win.h;

    document.title = Win.title;
    document.body.appendChild(canvas);

    Win.window = canvas;
    Win.ctx = canvas.getContext("2d");
    Win.init = true;
    console.log("[ OK ] Gin it's ready");
}

function Win_clear() {
    if (!Win.init) return;
    Win.ctx.clearRect(
        0,
        0,
        Win.window.width,
        Win.window.height
    );
}

function Win_render() {
    if (!Win.init) return;
}

/* La api principal */
class GApi {

}

export {
    Win_new,
    Win_start,
    Win_clear,
    Win_render,
    GApi
};