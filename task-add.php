<?php

    //En este archivo php nos encargaremos de añadir un nueva tarea
    //en nuestra base de datos.

    include('database.php');

    $name = $_POST['name'];
    $description = $_POST['description'];

    //isset: determina si una variable está definida y no es null.
    if (isset($name) && isset($description)) {
        //Con real_escape_string evitamos inyección SQL.
        $name = $connection->real_escape_string($name);
        $description = $connection->real_escape_string($description);
        if (!empty($name) && !empty($description)) {
            $query = "INSERT into task(name, description) VALUES ('$name', '$description')";
            $result = mysqli_query($connection, $query);

            if(!$result) {
                die('Query Error'. msqli_error($connection));    
            }

            echo "Task Added Successfully";
        }      
    }
?>