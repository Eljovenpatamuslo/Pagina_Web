$(document).ready(function () {
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    var cookie = readCookie("User");
    console.log(readCookie("Token"));
    var paragraph = document.getElementById("pepe");
    if (cookie != null){
        var text = document.createTextNode("Bienvenido "+readCookie("User"));
    }

    paragraph.appendChild(text);

});