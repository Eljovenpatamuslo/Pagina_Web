$(document).ready(function () {

    let edit = false;
    fetchTasks ();

    $('#search').keyup(function (e) {
        
        let search = $('#search').val();

        if (search) {
            $.ajax({
                url: 'task-search.php',
                type: 'POST',
                data: {search: search}, 
                success: function(response) { 
                    let tasks = JSON.parse(response);
                    let template = '';
                    if (response){
                    tasks.forEach(task => {
                        template += `<li class="cajaLista" style="width: 99.9%">${task.username}</li>`;
                    });
                }
		    if(template == '')	{
                    template += `<li style="list-style-type: none">No se ha encontrado ningun usuario</li>`;
                }
                    $('#task-result ul').html(template);
                },
                error: function (jqXHR, exception) {
                    console.log(jqXHR);

                    let template = '';
                    
                    template += `<li style="list-style-type: none">No se ha encontrado ningun usuario</li>`; //Gracias quienseas por solucionar esto
                    
                    $('#task-result ul').html(template);
                    
                }                                     
            });
        }
        else {
            $('#task-result ul').html('');
        }
    });

    $('#task-form').submit(function (e) {
        e.preventDefault(); 

        let postData = { 
            id: $('#taskId').val(),
            username: $('#username').val(),
            age: $('#age').val(),
            mail: $('#mail').val(),
            dni: $('#dni').val()
        };

        let url = edit === false ? 'task-add.php' : 'task-update.php';

        $.ajax({
            url: url, 
            type: 'POST', 
            data: postData, 
            success: function(response) { 
                edit = false; 
                fetchTasks ();
                $('#task-form').trigger('reset'); 
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }                   
        });

    });

    function fetchTasks () {
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function (response) {
                let tasks = JSON.parse(response);
                let template = '';
                tasks.forEach(task => {
                    template += `
                        <tr taskId="${task.id}">
                            <td>${task.id}</td>
                            <td>${task.username}</td>
                            <td>${task.age}</td>
                            <td>${task.mail}</td>
                            <td>${task.dni}</td>
                            <td class="align-middle">
                                <button class="task-delete btn btn-danger">
                                    Delete
                                </button>
				                <button class="task-item btn btn-danger">
                                    Edit
                                </button>

                            </td>
                        </tr>`;
                });
                
                $('#all-tasks').html(template);
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }
        })    
    }

    $(document).on('click', '.task-delete', function (e) {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskId');

            $.ajax({
                url: 'task-delete.php',
                type: 'POST',
                data: {id: id},
                success: function (response) {
                    fetchTasks();     
                    console.log(response);   
                },
                error: function (jqXHR, exception) {
                    console.log(jqXHR);
                }
            });      
    });

    $(document).on('click', '.task-item', function () {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');

        $.ajax({
            url: 'task-data.php',
            type: 'POST',
            data: {id: id},
            success: function (response) {
                let task = JSON.parse(response);
                $('#taskId').val(task.id); 
                $('#username').val(task.username);
                $('#age').val(task.age);
                $('#mail').val(task.mail);  
                $('#dni').val(task.dni);    
                edit = true;    
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }
        });      
    });
});
