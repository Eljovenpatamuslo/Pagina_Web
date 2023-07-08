$(document).ready(function () { 
    fetchTasks ('');
    
    $('#search').keyup(function (e) {
        let search = $(this).val();
        fetchTasks(search);
    });
    
    function fetchTasks (search) {
    $.ajax({
        url: 'PHP/select.php',
        type: 'GET',  
         success: function(response) { 
            let data = JSON.parse(response);
            if(data.block == 1){
                alert("Estas blockeado. Razón: "+ data.razon);
                window.location = 'menu.html';
            }else if(data.block == null){
                window.location = 'menu.html';
            }
        $.ajax({
            url: 'PHP/users-list.php',
            type: 'POST',
            data: {search: search},
            success: function (response) {
                let users = JSON.parse(response);
                let template = '';
                users.forEach(users => {
                    if(data.admin == 1){
                        template += `
                        <tr usersId="${users.id}">
                        <td><img class="funcionx2" src="Images/Users/${users.picture}" width="200" height="200"></td>
                        <td>`
                        
                        if(users.admin == 1){
                            template += `&#9733; ${users.username} &#9733;</td>`
                        }else{
                            template += `${users.username}</td>`
                        }

                        template += `<td>${users.mail}</td>    
                            <td class="align-middle">`

                        if(!(users.id == 1) && !(data.id == users.id)){  
                            if(users.block == 1){
                                template += `<p>Baneado por: ${users.blockedby}</p> 
                                             <p>Razon: ${users.razon}</p>
                                <button class="btn btn-danger give-block" id="${users.id}">
                                Desbloquear`
                            }else{
                                template += `<input class="cajaTaskName mb-3" style="height: 100%; padding: 10px;" type="text" id="${users.id}" placeholder="Razon" required>
                                        <button class="btn btn-danger give-block">`
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
                            template += `No puedes realizar ninguna acciÓn`;
                        }
                        template +=`</button>
                        <button class="give-info">info</button>
                                </td>
                            </td>
                        </tr>
                       <tr id="${-users.id}" style="display: none">
                       <td>Registrado el:
                       <p>${users.firstlogin}</p> 
                       </td>
                       <td>Ultima vez online:
                       <p>${users.lastlogin}</p>
                       </td>
                       <td>Veces logeadas:
                       <p>${users.logincount}</p>
                       </td>
                       <td>Ultima vez blockeado:
                       <p>${users.lastblocked}</p>
                       </td>`

                    }else{
                        template += `
                        <tr usersId="${users.id}">
                        <td><img class="funcionx2" src="Images/Users/${users.picture}" width="200" height="200"></td>`
                        if(users.admin == 1){
                            template += `<td>&#9733; ${users.username} &#9733;</td>`
                        }else{
                            template += `<td>${users.username}</td>`
                        }
                        template += `<td>${users.mail}</td>    
                                    <td class="align-middle">
                                    Tenes que ser admin
                                    </td>
                            </td>
                        </tr>`
                    }
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

    $(document).on('click', '.give-info', function (e) {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('usersId'); 
        if(document.getElementById(-id).style.display == "none"){
            document.getElementById(-id).style.display = "table-row";
        }else{
            document.getElementById(-id).style.display = "none";
        }
    });

});
