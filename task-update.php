<?php
    include('database.php');

    $id = $_POST['id'];
    $name = $_POST['name'];
    $desc = $_POST['desc'];
    $date = $_POST['date'];

    if (isset($id) && isset($name) && isset($desc) && isset($date)) {
        $query = "UPDATE task SET name = '$name', description = '$desc', date = '$date' WHERE id = '$id'";
        $result = mysqli_query($connection, $query);
        
        if (!$result) {
            die('Query Error'. msqli_error($connection));    
        }
 
        echo "Task has been updated"; 
    }
?>