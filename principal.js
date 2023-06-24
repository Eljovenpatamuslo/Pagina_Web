$.ajax({
    url: 'PHP/select.php',
    type: 'GET',
    success: function(response) { 
        let data = JSON.parse(response);
        if(data.id == null){
            window.location = 'logearse.html';
        }else if (data.admin == 1){
            let template = '';
            template += `<a href="usuarios.html" style="text-decoration:none;" class="texto_login">lista de usuarios </a>`;
            $('#admin').html(template);
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
        url: 'PHP/select.php',
        type: 'GET',  
        success: function(response) { 
            let data = JSON.parse(response);
            let template = '';
            let template1 = '';
            template += `<img width="50" height="50" style="border-radius: 25px" src="Images/Users/${data.picture}">`;
            template1 += `<div class="texto_login">${data.user}</div>`;
            $('#foto').html(template);
            $('#user').html(template1);
        },
        error: function (jqXHR, exception) {
            console.log(jqXHR);
        }                   
    });
});