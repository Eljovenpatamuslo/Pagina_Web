$.ajax({
    url: 'PHP/select.php',
    type: 'GET',
    success: function(response) { 
        let data = JSON.parse(response);
        if(data.block == 1){
            alert("Estas blockeado. Razón: "+ data.razon);
            window.location = 'menu.html';
        }else if (data.block == null){
            window.location = 'menu.html';
        }
    },
    error: function (jqXHR, exception) {
        console.log(jqXHR);
    }                   
});

$(document).ready(function () {

    let edit = false;
    fetchTasks ();
    
    $('#search').keyup(function (e) {
        
        let search = $('#search').val();

        if (search) {
            $.ajax({
                url: 'PHP/task-search.php',
                type: 'POST',
                data: {search: search}, 
                success: function(response) { 
                    let tasks = JSON.parse(response);
                    let template = '';
                    if (response){
                    tasks.forEach(task => {
                        template += `<li class="cajaLista" style="width: 99.9%"><a href="#" class="task-item" taskId="${task.id}">${task.name}</a></li>`;
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
            name: $('#name').val(),
            desc: $('#desc').val(),
        };
        let url = edit === false ? 'PHP/task-add.php' : 'PHP/task-update.php';

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
            url: 'PHP/task-list.php',
            type: 'GET',
            success: function (response) {
                let tasks = JSON.parse(response);
                let template = '';
                tasks.forEach(task => {
                    template += `
                        <tr taskId="${task.id}">
                            <td>${task.id}</td>
                            <td>${task.name}</td>
                            <td>${task.desc}</td>
                            <td class="align-middle">
                                <button class="task-delete btn btn-danger">
                                    Eliminar
                                </button>
				                <button class="task-item btn btn-danger">
                                    Editar
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
                url: 'PHP/task-delete.php',
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
        if(id == null){
            id = $($(this)[0]).attr('taskId');
        }
        $.ajax({
            url: 'PHP/task-data.php',
            type: 'POST',
            data: {id: id},
            success: function (response) {
                let task = JSON.parse(response);
                $('#taskId').val(task.id); 
                $('#name').val(task.name);
                $('#desc').val(task.desc);   
                edit = true;    
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }
        });      
    });
});
