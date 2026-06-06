class Win {
    static window = null;
    static title = "";
    static w = 0;
    static h = 0;

    static GAFICS = {
        CAP: [],
        ASS: {
            MOD: {},
            IMG: {}
        },
        CAM: {}
    };
}

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
}