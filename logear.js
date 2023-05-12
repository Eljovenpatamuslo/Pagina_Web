$(document).ready(function () {


    $('#users-form').submit(function (e) {
        e.preventDefault(); //Hacemos que no se refresque la página por defecto.

        let postData = { //Lo que le enviaremos al servidor.
            id: $('#taskId').val(),
            username: $('#username').val(),
            pass: $('#pass').val()
        };

        $.ajax({//si es repetido es verdadero de lo contario es falso
            url: 'logear-check.php',
            type: 'POST', 
            data: postData, 
            success: function(response) { 
                if (response > 0){
                    console.log("usuario encontrado");
                    //let galleta = document.cookie = "#username=jesus; #pass=jesus123"
                    console.log(galleta);
                    location.replace("http://200.3.127.46:8002/~dos/");
                } else {
                    console.log("usuario no encontrado");
                    $('#users-form').trigger('reset');
                }
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }                   
        });

    });
});