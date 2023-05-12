$(document).ready(function () {


    $('#users-form').submit(function (e) {
        e.preventDefault(); //Hacemos que no se refresque la página por defecto.

        let postData = { //Lo que le enviaremos al servidor.
            id: $('#taskId').val(),
            username: $('#username').val(),
            pass: $('#pass').val(),
            mail: $('#mail').val(),
            dni: $('#dni').val()
        };



        let comprobar = { //lo que mandamos para saber si es repetido.
            username: $('#username').val(),
            mail: $('#mail').val(),
            dni: $('#dni').val()
        };

        $.ajax({//si es repetido es verdadero de lo contario es falso
            url: 'users-registrar.php',
            type: 'POST', 
            data: comprobar, 
            success: function(response) { 
               // let url = edit === s ? 1 : 0;
                $('#users-form').trigger('reset');
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }                   
        });

        /*let algo = algo === false ? 'users-add.php' : 'task-update.php';

        $.ajax({
            url: 'users-add.php',
            type: 'POST', 
            data: postData, 
            success: function(response) { 
                $('#users-form').trigger('reset'); 
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }                   
        });*/

    });
});
