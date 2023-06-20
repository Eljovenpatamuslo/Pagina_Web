$.ajax({
    url: 'PHP/admin.php',
    type: 'GET',  
    success: function(response) { 
        let admin = JSON.parse(response);
        if(!(admin == true)){
             window.location = 'index.html';
        }
    },
    error: function (jqXHR, exception) {
        console.log(jqXHR);
    }                   
});
$(document).ready(function () {
    fetchTasks(); 
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
                            <td class="align-middle">`
                        if(!(users.username == "admin")){    
                        template += `<button class="give-block btn btn-danger" id="block">`
                            if(users.block == 1 ){
                                template += `Desbloquear`
                            }else{
                                template += `Bloquear`
                            }
                        template += 
                                `</button>
                                <button class="give-admin btn btn-danger">`
                        if(users.admin == 1){
                            template += `Quitar Admin`
                        }else{
                            template += `Agregar Admin`
                        }
                    }
                        template +=`</button>
                    
                                </td>
                            </td>
                        </tr>`;
                });
                
                $('#all-users').html(template);
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }
        });
    }

    $(document).on('click', '.give-block', function (e) {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('usersId');
        $.ajax({
            url: 'PHP/users-block.php',
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

    $(document).on('click', '.give-admin', function (e) {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('usersId');
        $.ajax({
            url: 'PHP/users-admin.php',
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