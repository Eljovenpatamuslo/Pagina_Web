$(document).ready(function () { 
    fetchTasks();
    function fetchTasks () {
    $.ajax({
        url: 'PHP/select.php',
        type: 'GET',  
         success: function(response) { 
            let data = JSON.parse(response);
            if(data.admin == null){
                 window.location = 'menu.html';
            }
        $.ajax({
            url: 'PHP/users-list.php',
            type: 'GET',
            success: function (response) {
                let users = JSON.parse(response);
                let template = '';
                users.forEach(users => {
                        template += `
                        <tr usersId="${users.id}">
                        <td><img src="Images/Users/${users.picture}" width="200" height="200"></td>
                            <td>${users.username}</td>
                            <td>${users.mail}</td>    
                            <td class="align-middle">`
                        if(!(users.id == 1) && data.admin == 1 && !(data.id == users.id)){    
                        template += `<input class="cajaTaskName mb-3" style="height: 100%; padding: 10px;" type="text" id="${users.id}" placeholder="Razon" required>
                                        <button class="btn btn-danger give-block">`
                            if(users.block == 1 ){
                                template += `Desbloquear`
                            }else{
                                template += `Bloquear`
                            }
                        template +=`</button>
                            <button class="give-admin btn btn-danger">`
                            if(users.admin == 1){
                                template += `Quitar Admin`
                            }else{
                                template += `Agregar Admin`
                            }
                        }else{
                            template += `Tenes que ser admin`;
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
        },
        error: function (jqXHR, exception) {
            console.log(jqXHR);
        }                   
    }); 
}
    
    $(document).on('click', '.give-block', function (e) {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('usersId');
        let razon = document.getElementById(id).value;
        $.ajax({
            url: 'PHP/users-block.php',
            type: 'POST',
            data: {id: id,
                   razon: razon},
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