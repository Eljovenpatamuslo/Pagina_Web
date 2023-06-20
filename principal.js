$.ajax({
    url: 'PHP/admin.php',
    type: 'GET',  
    success: function(response) { 
        let admin = JSON.parse(response);
        if(admin == null){
             window.location = 'logearse.html';
        }
    },
    error: function (jqXHR, exception) {
        console.log(jqXHR);
    }                   
});

$(document).ready(function () { 
    document.getElementById("cerrar-sesion").onclick = function() {cerrar()};

    function cerrar() {
        $.ajax({
            url: 'PHP/cerrar_sesion.php',
            type: 'GET',  
            success: function(response) { 
                location.reload();
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }                   
        });
        return null;
    }
    
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