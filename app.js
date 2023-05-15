$(document).ready(function () {

    let edit = false;
    fetchTasks ();

    $('#search').keyup(function (e) {
        //Busco el input que tiene como id 'search' y
        //obtengo su contenido.
        
        let search = $('#search').val();

        if (search) {
            console.log("hl");
            //Vamos a utilizar un método JQuery llamado ajax.
            //Dicho método nos permite hacer una petición a un servidor.   
            //Toma un objeto como parámetro.
            $.ajax({
                url: 'task-search.php', //Lugar donde hacer la petición.
                type: 'POST', //Tipo de petición.
                data: {search: search}, //La información que le envio al servidor.
                success: function(response) { 
                    let tasks = JSON.parse(response);   //Si el servidor respondió correctamente
                    //console.log(tasks);               //tengo la información que me devolvió el mismo.
                                                        //Ver que ya no tengo un string, sino que tengo un objeto JSON!
                    let template = '';
                    
                    tasks.forEach(task => {
                        template += `<li class="cajaLista" style="width: 99.9%">${task.username}</li>`;
                    });
            
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

    //Por defecto, un formulario hace que la página se refresque ya que
    //espera, por parte del servidor, que le llegue una página nueva.
    //Para corroborar esto escribir: $('#task-form').submit(function (e) {
    //}); e ir a la página y hacer click en el botón "Save Task".
    $('#task-form').submit(function (e) {
        e.preventDefault(); //Hacemos que no se refresque la página por defecto.

        let postData = { //Lo que le enviaremos al servidor.
            id: $('#taskId').val(),
            username: $('#username').val(),
            age: $('#age').val(),
            mail: $('#mail').val(),
            dni: $('#dni').val()
        };
        //console.log(postData);

        let url = edit === false ? 'task-add.php' : 'task-update.php';

        $.ajax({
            url: url, 
            type: 'POST', 
            data: postData, 
            success: function(response) { 
                edit = false; 
                fetchTasks ();
                //Al agregar una nueva task y tocar el botón "Save Task",
                //reseteo el formulario.
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
                            <td>
                                <a href="#" class="task-item">${task.username}</a>
                            </td>
                            <td>${task.age}</td>
                            <td>${task.mail}</td>
                            <td>${task.dni}</td>
                            <td class="align-middle">
                                <button class="task-delete btn btn-danger">
                                    Delete
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
        if (confirm('conga conga soy conga sanz')) {
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
        }
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
