<?php

    //En este archivo php nos encargaremos de la eliminación de tareas.

    include('database.php');

    $id = $_POST['id'];

    if (isset($id)) {
        $query = "DELETE FROM task WHERE id = $id";
        $result = mysqli_query($connection, $query);
        
        if (!$result) {
            die('Query Error'. msqli_error($connection));    
        }

        echo "Task Deleted Successfully";
    }
?>