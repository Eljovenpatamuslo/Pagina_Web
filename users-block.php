<?php
    include('database.php');

    $id = $_POST['id'];
    $razon = $_POST['razon'];
    if (isset($id)) {
        $query = "UPDATE users SET block = NOT block,razon_block = '$razon' WHERE id= '$id'";

        $result = mysqli_query($connection, $query);
        if (!$result) {
            die('Query Error'. msqli_error($connection));    
        }
        echo "Task Deleted Successfully";
    }
?>