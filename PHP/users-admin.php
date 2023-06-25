<?php
    include('database.php');

    $id = $_POST['id'];

    if (isset($id)) {
        $query = "UPDATE users SET admin = NOT admin WHERE id= '$id'";
        $result = mysqli_query($connection, $query);
        
        if (!$result) {
            die('Query Error'. msqli_error($connection));    
        }

        echo "Task Deleted Successfully";
    }
?>