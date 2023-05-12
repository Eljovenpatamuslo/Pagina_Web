<?php

    //En este archivo php nos encargaremos de la eliminación de tareas.

    include('database.php');

    $username = $_POST['username'];
    $mail = $_POST['mail'];
    $dni = $_POST['dni'];

    if (isset($username) && isset($mail) && isset($dni)) {
        $query = "SELECT * FROM users WHERE username = $username OR mail = $mail OR dni = $dni";
        $result = mysqli_query($connection, $query);
        
        if (!$result && !$connection) {
            die('Query Error'. msqli_error($connection));    
        }

       echo "buenas" . mysqli_num_rows($result);
	/*$jsonstring = json_encode($json);
	echo $jsonstring;*/
    }
?>