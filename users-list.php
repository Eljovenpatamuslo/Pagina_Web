<?php

    //En este archivo php haremos una consulta a la base de datos,
    //la cual nos traerá todas las tareas para que posteriormente,
    //mediante js, las mostremos en el frontend.

    include('database.php');

    $query = "SELECT * from users";
    $result = mysqli_query($connection, $query);

    if (!$result) {
  //      die('Query Error'. msqli_error($connection));    
    }

    $json = array();
    while ($row = mysqli_fetch_array($result,1)) {
        $json[] = array(
            'username' => $row['username'],
            'age' => $row['age'],
            'mail' => $row['mail'],
            'dni' => $row['dni']  
        );
    }
           
    $jsonstring = json_encode($json);
    echo $jsonstring; 
?>
