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
                let users = JSON.parse(response);
                if (users > 0){
                    document.cookie = "isadmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    $.ajax({//si es repetido es verdadero de lo contario es falso
                        url: 'users-admin.php',
                        type: 'POST', 
                        data: postData, 
                        success: function(response) { 
                            let isadmin=JSON.parse(response);
                            document.cookie = "isadmin="+isadmin+";expires=Wed, 18 Dec 2026 12:00:00 GMT";
                            console.log("Sos admin");
                            location.replace("http://200.3.127.46:8002/~dos/");
                        },
                        error: function (jqXHR, exception) {
                            console.log(jqXHR);
                        }                   
                    });
                    console.log("usuario encontrado");
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