$(document).ready(function () {


    $('#users-form').submit(function (e) {
        e.preventDefault(); //Hacemos que no se refresque la página por defecto.

        let postData = { //Lo que le enviaremos al servidor.
            id: $('#usersId').val(),
            username: $('#username').val(),
            pass: $('#pass').val(),
            mail: $('#mail').val(),
        };

        $.ajax({
            url: 'PHP/users-registrar.php',
            type: 'POST', 
            data: postData, 
            success: function(response) {
                if (response == 0){
                    $.ajax({
                        url: 'PHP/users-add.php',
                        type: 'POST', 
                        data: postData, 
                        success: function(response) { 
                        window.location = 'logearse.html';

                    },
                    error: function (jqXHR, exception) {
                        console.log(jqXHR);
                    }                   
                    });
                }else{
                    let template = 'nombre o mail repetido';
                    $('#incorrecto').html(template);
                    $('#users-form').trigger('reset');
                }
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }                   
        });    
    });

});
