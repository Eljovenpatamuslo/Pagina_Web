$(document).ready(function () {


    $('#users-form').submit(function (e) {
        e.preventDefault();

        let postData = {
            id: $('#usersId').val(),
            username: $('#username').val(),
            pass: $('#pass').val(),
            mail: $('#mail').val(),
        };

        $.ajax({
            url: 'PHP/users-registrar.php',
            type: 'POST', 
            data: postData, 
            success: function(response) {
                if (response == 0){
                    $.ajax({
                        url: 'PHP/users-add.php',
                        type: 'POST', 
                        data: postData, 
                        success: function(response) { 
                        window.location = 'index.html';

                    },
                    error: function (jqXHR, exception) {
                        console.log(jqXHR);
                    }                   
                    });
                }else{
                    let template = '';
                    $('#users-form').trigger('reset');
                    if(response == 1){
                        template += `<div class="texto_cambio">Nombre repetido</div>`; 
                    }else{
                        template += `<div class="texto_cambio">Mail repetido</div>`;
                    }
                    $('#error').html(template);
                    setTimeout(()=> {
                        template =``;
                    $('#error').html(template);
                     }
                     ,3000);
                }
            },
            error: function (jqXHR, exception) {
                console.log(jqXHR);
            }                   
        });    
    });

});
