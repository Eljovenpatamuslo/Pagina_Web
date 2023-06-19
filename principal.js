$(document).ready(function () {

    $.ajax({
        url: 'PHP/nombre.php',
        type: 'GET',  
        success: function(response) { 
            let nombre = JSON.parse(response);
            var paragraph = document.getElementById("pepe");
            if (nombre != null){
                var text = document.createTextNode("Bienvenido "+nombre);
            }
        
            paragraph.appendChild(text);
        },
        error: function (jqXHR, exception) {
            console.log(jqXHR);
        }                   
    });

});