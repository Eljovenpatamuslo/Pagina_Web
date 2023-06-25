$(document).ready(function () {
    fetchTasks ();
    
    $.ajax({
        url: 'PHP/select.php',
        type: 'GET',  
        success: function(response) { 
            let data = JSON.parse(response);
            if(data.user == null){
                 window.location = 'menu.html';
            }
            document.getElementById('username').value = data.user ;
            document.getElementById('mail').value = data.mail;
        },
        error: function (jqXHR, exception) {
            console.log(jqXHR);
        }                   
    });
    
    function fetchTasks () {
    $.ajax({
        url: 'PHP/select.php',
        type: 'GET',  
        success: function(response) { 
            let data = JSON.parse(response);
            template =`<center><img src="Images/Users/${data.picture}"></center>`;
            $('#fotico').html(template);
        },
        error: function (jqXHR, exception) {
            console.log(jqXHR);
        }                   
    });
}
    $('#edit-form').submit(function (e) {
        e.preventDefault(); 
        var formf = document.getElementById("edit-form");
        var imagen = formf.querySelector('input[name="file"]');
        var formData = new FormData(formf);

        let postData = {
            username: $('#username').val(),
            mail: $('#mail').val(),
        };

        $.ajax({
            url: 'PHP/users-update.php', 
            type: 'POST', 
            data: formData,postData,
            processData: false,
            contentType: false,
            success: function(response) { 
                fetchTasks ();
                $('#task-form').trigger('reset');

                let template =`<div class="texto_cambio">${response}</div>`;
                $('#error').html(template);
                setTimeout(()=> {
                    template =``;
                $('#error').html(template);
                 }
                 ,3000); 
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }                   
        });                  

    });

});