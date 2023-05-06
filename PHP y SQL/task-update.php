<?php

    //En este archivo php nos encargaremos de actualizar
    //la información de una tarea.

    include('database.php');

    $id = $_POST['id'];
    $name = $_POST['name'];
    $description = $_POST['description'];

    if (isset($id) && isset($name) && isset($description)) {
        $query = "UPDATE task SET name = '$name', description = '$description' WHERE id = '$id'";
        $result = mysqli_query($connection, $query);
        
        if (!$result) {
            die('Query Error'. msqli_error($connection));    
        }
 
        echo "Task has been updated"; 
    }
?>