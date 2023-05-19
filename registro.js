$(document).ready(function () {
    fetchTasks();
    $('#users-form').submit(function (e) {
        e.preventDefault(); //Hacemos que no se refresque la página por defecto.

        let postData = { //Lo que le enviaremos al servidor.
            id: $('#taskId').val(),
            username: $('#username').val(),
            pass: $('#pass').val(),
            age: $('#age').val(),
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
                console.log(response);
                if (response == 0){
                    console.log("bien");
                    $.ajax({
                        url: 'users-add.php',
                        type: 'POST', 
                        data: postData, 
                        success: function(response) { 
                        location.replace("http://200.3.127.46:8002/~dos/");
                    },
                    error: function (jqXHR, exception) {
                        console.log(jqXHR);
                    }                   
                });
                } else {
                    $('#users-form').trigger('reset');
                    console.log("nombre,dni o mail repetido");
                }
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }                   
        });    
    });

    function fetchTasks () {
        $.ajax({
            url: 'users-list.php',
            type: 'GET',
            success: function (response) {
                let users = JSON.parse(response);
                let template = '';
                users.forEach(users => {
                    template += `
                        <tr>
                            <td>${users.username}</td>
                            <td>${users.age}</td>
                            <td>${users.mail}</td>
                            <td>${users.dni}</td>
                        </tr>`;
                });
                    
                $('#all-users').html(template);
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }
        })
    }
});
