<?php
    include('database.php');

    $username = $_POST['username'];
    $pass = $_POST['pass'];
    $mail = $_POST['mail'];

    if (isset($username) && isset($pass) && isset($mail)) {
        $username = $connection->real_escape_string($username);
        $pass = $connection->real_escape_string($pass);
        $mail = $connection->real_escape_string($mail);

        if (!empty($username) && !empty($pass) && !empty($mail)) {
            $hash = password_hash($pass,PASSWORD_DEFAULT);
            $query = "INSERT into users(username, pass, mail) VALUES ('$username', '$hash', '$mail')";
            $result = mysqli_query($connection, $query);

            if(!$result) {
                die('Query Error'. msqli_error($connection));    
            }

            echo "Task Added Successfully";
        }      
    }
?>