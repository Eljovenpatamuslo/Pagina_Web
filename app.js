$(document).ready(function () {

    let edit = false;
    fetchTasks ();

    $('#search').keyup(function (e) {
        //Busco el input que tiene como id 'search' y
        //obtengo su contenido.

        let search = $('#search').val();

        if (search) {
            console.log("hl");
            //Vamos a utilizar un m�todo JQuery llamado ajax.
            //Dicho m�todo nos permite hacer una petici�n a un servidor.   
            //Toma un objeto como par�metro.
            $.ajax({
                url: 'task-search.php', //Lugar donde hacer la petici�n.
                type: 'POST', //Tipo de petici�n.
                data: {search: search}, //La informaci�n que le envio al servidor.
                success: function(response) { 
                    let tasks = JSON.parse(response);   //Si el servidor respondi� correctamente
                    //console.log(tasks);               //tengo la informaci�n que me devolvi� el mismo.
                                                        //Ver que ya no tengo un string, sino que tengo un objeto JSON!
                    let template = '';

                    tasks.forEach(task => {
                        template += `<li class="list-group-item">${task.name}</li>`;
                    });

                    $('#task-result ul').html(template);
                },
                error: function (jqXHR, exception) {
                    console.log(jqXHR);
                }                                     
            });
        }
        else {
            $('#task-result ul').html('');
        }
    });

    //Por defecto, un formulario hace que la p�gina se refresque ya que
    //espera, por parte del servidor, que le llegue una p�gina nueva.
    //Para corroborar esto escribir: $('#task-form').submit(function (e) {
    //}); e ir a la p�gina y hacer click en el bot�n "Save Task".
    $('#task-form').submit(function (e) {
        e.preventDefault(); //Hacemos que no se refresque la p�gina por defecto.

        let postData = { //Lo que le enviaremos al servidor.
            id: $('#taskId').val(),
            name: $('#name').val(),
            description: $('#description').val()
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
                //Al agregar una nueva task y tocar el bot�n "Save Task",
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
                                <a href="#" class="task-item">${task.name}</a>
                            </td>
                            <td>${task.description}</td>
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
        if (confirm('Are you sure you want to delete it?')) {
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
                $('#name').val(task.name);
                $('#description').val(task.description);  
                edit = true;    
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }
        });      
    });
});