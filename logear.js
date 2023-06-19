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
                if (rows > 0){
                    location.replace("http://200.3.127.46:8002/~dos/");
                } else {
                    $('#users-form').trigger('reset');
                }
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }                   
        });

    });
});