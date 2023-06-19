<?php
    include('database.php');

    $id = $_POST['id'];

    if (isset($id)) {
        $query = "UPDATE users SET block = NOT block WHERE id= '$id'";
        $result = mysqli_query($connection, $query);
        
        if (!$result) {
            die('Query Error'. msqli_error($connection));    
        }

        echo "Task Deleted Successfully";
    }
?>