<?php
    include('database.php');

    $id = $_POST['id'];
    $razon = $_POST['razon'];
    $fecha = date('jS \of F Y h:i:s A');
    if (isset($id)) {
        $query = "UPDATE users SET block = NOT block,razon_block = '$razon' WHERE id= '$id'";
        $query1 = "UPDATE data SET last_blocked = '$fecha' WHERE user_id= '$id'";

        $result = mysqli_query($connection, $query);
        $result1 = mysqli_query($connection, $query1);
        if (!$result && !$result1) {
            die('Query Error'. msqli_error($connection));    
        }
        echo "Task Deleted Successfully";
    }
?>