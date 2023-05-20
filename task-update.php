<?php
    include('database.php');

    $id = $_POST['id'];
    $username = $_POST['username'];
    $mail = $_POST['mail'];
    $dni = $_POST['dni'];
    $age = $_POST['age'];

    if (isset($id) && isset($username) && isset($age) && isset($mail) && isset($dni)) {
        $query = "UPDATE task SET username = '$username', age = '$age', mail = '$mail', dni = '$dni' WHERE id = '$id'";
        $result = mysqli_query($connection, $query);
        
        if (!$result) {
            die('Query Error'. msqli_error($connection));    
        }
 
        echo "Task has been updated"; 
    }
?>