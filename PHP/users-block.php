<?php
    include('database.php');
    include('cookie-check.php');
    $id = $_POST['id'];
    $razon = $_POST['razon'];
    $fecha = date('jS \of F Y h:i:s A');
    if (isset($id)) {
        $query = "UPDATE data INNER JOIN users ON users.id = data.user_id 
        SET data.blocked_by = '$ids', users.block = NOT block, users.razon_block = '$razon', data.last_blocked = '$fecha'
        WHERE users.id = '$id' AND data.user_id = '$id'";

        $result = mysqli_query($connection, $query);
        if (!$result) {
            die('Query Error'. msqli_error($connection));    
        }
        echo "Usuario Bloqueado";
    }
?>