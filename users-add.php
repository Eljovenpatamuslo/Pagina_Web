<?php
    include('database.php');

    $username = $_POST['username'];
    $pass = $_POST['pass'];
    $mail = $_POST['mail'];
    $dni = $_POST['dni'];
    $age = $_POST['age'];

    if (isset($username) && isset($pass) && isset($mail) && isset($dni) && isset($age)) {
        $username = $connection->real_escape_string($username);
        $pass = $connection->real_escape_string($pass);
        $mail = $connection->real_escape_string($mail);
        $dni = $connection->real_escape_string($dni);
        $age = $connection->real_escape_string($age);
        if (!empty($username) && !empty($pass) && !empty($mail) && !empty($dni) && !empty($age)) {
            $query = "INSERT into users(username, pass, mail, dni, age) VALUES ('$username', '$pass', '$mail', '$dni', '$age')";
            $result = mysqli_query($connection, $query);

            if(!$result) {
                die('Query Error'. msqli_error($connection));    
            }

            echo "Task Added Successfully";
        }      
    }
?>