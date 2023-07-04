$(document).ready(function () { 
    document.getElementById("cerrar-sesion").onclick = function() {cerrar()};

    $.ajax({
        url: 'PHP/select.php',
        type: 'GET',  
        success: function(response) { 
            let data = JSON.parse(response);
            if(data.id == null){
                window.location = 'index.html';
            }
            
            let template = `<img width="50" height="50" style="border-radius: 25px" src="Images/Users/${data.picture}">`;
            let template2 = `<div class="texto_login">${data.user}</div>`;
            $('#foto').html(template);
            $('#user').html(template2);
        },
        error: function (jqXHR, exception) {
            console.log(jqXHR);
        }                   
    });
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
    
});