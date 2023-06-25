$(document).ready(function () {

    $('#users-form').submit(function (e) {
        e.preventDefault(); //Hacemos que no se refresque la página por defecto.

        let postData = { //Lo que le enviaremos al servidor.
            username: $('#username').val(),
            pass: $('#pass').val()
        };

        $.ajax({//si es repetido es verdadero de lo contario es falso
            url: 'PHP/logear-check.php',
            type: 'POST', 
            data: postData, 
            success: function(response) { 
                let rows = JSON.parse(response);
                if (rows == 1){
                    window.location = 'menu.html';
                } else {
                    template = `<div class="texto_cambio">No se encontro el usuario</div>`;
                    $('#error').html(template);
                    setTimeout(()=> {
                        template =``;
                    $('#error').html(template);
                     }
                     ,3000);
                    $('#users-form').trigger('reset');
                }
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }                   
        });

    });
});