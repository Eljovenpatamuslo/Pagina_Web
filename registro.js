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
        //console.log(postData);

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
        });

    });
});
