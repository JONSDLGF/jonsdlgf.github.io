var nd=false;
var rule=0;
var http="http";
var youtube="www.youtube.com";
var watch=[
    "dQw4w9WgXcQ",  // Domingo (0)
    "qEGRUZ1IYnU",  // Lunes (1)
    "gUqH6Weyr2M",  // Martes (2)
    "2yJgwwDcgV8",  // Miércoles (3)
    "Zx8UqdI91z8",  // Jueves (4)
    "PfYnvDL0Qcw&t=28s",  // Viernes (5)
    "b-9n6GWHZQg"   // Sábado (6)
];
var date=new Date();
var day=date.getDay();
var dayOfMonth=date.getDate();
var month=date.getMonth();

if (dayOfMonth == 28 && month == 11 && day == 0) {
    window.location.href = http + "://" + youtube + "/watch?v=" + watch;
}
function ND(){
    nd = !nd;
    rule++;
    if(rule>=5){
        document.getElementsByClassName("b1")[0].textContent="not press me pleas";
    }
    if(rule>=10){
        document.getElementsByClassName("b1")[0].textContent="PLEAS DONT PRESS ME";
    }
    if(rule>=15){
        try{
            window.location.href=http+"://"+youtube+"/"+"watch?v="+watch[day-1];
        }catch{
            window.location.href=http+"://"+youtube+"/"+"watch?v="+watch[0];
        }
    }
    if(nd){
        document.getElementById("body").style.backgroundColor="#FFF";
        document.getElementsByClassName("b1")[0].style.color="#FFF";
    }else{
        document.getElementById("body").style.backgroundColor="#000";
        document.getElementsByClassName("b1")[0].style.color="#000";
    }
}