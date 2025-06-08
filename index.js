var nd=false;
function ND(){
    nd = !nd;
    if(nd){
        document.getElementById("body").style.backgroundColor="#FFF";
        document.getElementsByClassName("b1")[0].style.color="#FFF";
    }else{
        document.getElementById("body").style.backgroundColor="#000";
        document.getElementsByClassName("b1")[0].style.color="#000";
    }
}