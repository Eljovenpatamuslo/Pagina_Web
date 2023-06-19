$(document).ready(function () {
    fetchTasks();

    $('#users-form').submit(function (e) {
        e.preventDefault(); //Hacemos que no se refresque la página por defecto.

        let postData = { //Lo que le enviaremos al servidor.
            id: $('#usersId').val(),
            username: $('#username').val(),
            pass: $('#pass').val(),
            mail: $('#mail').val(),
        };

        $.ajax({//si es repetido es verdadero de lo contario es falso
            url: 'PHP/users-registrar.php',
            type: 'POST', 
            data: postData, 
            success: function(response) {
                console.log(response);
                if (response == 0){
                    $.ajax({
                        url: 'PHP/users-add.php',
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
            url: 'PHP/users-list.php',
            type: 'GET',
            success: function (response) {
                let users = JSON.parse(response);
                let template = '';
                users.forEach(users => {
                    template += `
                        <tr usersId="${users.id}">
                            <td>${users.username}</td>
                            <td>${users.mail}</td>
                            <td class="align-middle">
                                    Tenes que ser admin
                            </td>
                        </tr>`;
                });
                
                $('#all-users').html(template);
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }
        })    
    }

    $(document).on('click', '.users-delete', function (e) {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('usersId');
        $.ajax({
            url: 'PHP/users-delete.php',
            type: 'POST',
            data: {id: id},
            success: function (response) {
                fetchTasks();       
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }
        });      

    });

});
