$(document).ready(function () {

    $('#users-form').submit(function (e) {
        e.preventDefault(); //Hacemos que no se refresque la página por defecto.

        let postData = { //Lo que le enviaremos al servidor.
            id: $('#taskId').val(),
            username: $('#username').val(),
            pass: $('#pass').val()
        };

        $.ajax({//si es repetido es verdadero de lo contario es falso
            url: 'PHP/logear-check.php',
            type: 'POST', 
            data: postData, 
            success: function(response) { 
                let users = JSON.parse(response);
                if (users > 0){
                    document.cookie = "User="+postData.username+"; SameSite=None;";
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