$(document).ready(function () {
    fetchTasks();

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }

    $('#users-form').submit(function (e) {
        e.preventDefault(); //Hacemos que no se refresque la página por defecto.

        let postData = { //Lo que le enviaremos al servidor.
            id: $('#usersId').val(),
            username: $('#username').val(),
            pass: $('#pass').val(),
            age: $('#age').val(),
            mail: $('#mail').val(),
            dni: $('#dni').val()
        };

        $.ajax({//si es repetido es verdadero de lo contario es falso
            url: 'users-registrar.php',
            type: 'POST', 
            data: postData, 
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
                    if(getCookie("isadmin") == 1){
                        template += `
                        <tr usersId="${users.id}">
                            <td>${users.username}</td>
                            <td>${users.age}</td>
                            <td>${users.mail}</td>
                            <td>${users.dni}</td>
                            <td class="align-middle">
                            <button class="users-delete btn btn-danger">
                                Delete
                            </button>
                            </td>
                        </tr>`;
                    }else{
                    template += `
                        <tr usersId="${users.id}">
                            <td>${users.username}</td>
                            <td>${users.age}</td>
                            <td>${users.mail}</td>
                            <td>${users.dni}</td>
                            <td>Debes ser admin</td>
                        </tr>`;
                    }
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
        console.log(id);
        $.ajax({
            url: 'users-delete.php',
            type: 'POST',
            data: {id: id},
            success: function (response) {
                console.log("bien");
                fetchTasks();     
                console.log(response);   
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }
        });      

    });

});
