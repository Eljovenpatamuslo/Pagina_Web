<?php
    include('database.php');

    $username = $_POST['username'];
    $age = $_POST['age'];
    $mail = $_POST['mail'];
    $dni = $_POST['dni'];



    if (isset($username) && isset($mail) && isset($dni) && isset($age)) {
        $username = $connection->real_escape_string($username);
        $mail = $connection->real_escape_string($mail);
        $dni = $connection->real_escape_string($dni);
        $age = $connection->real_escape_string($age);
        if (!empty($username) && !empty($mail) && !empty($dni) && !empty($age)) {
            $query = "INSERT into task(username, age, mail, dni) VALUES ('$username', '$age', '$mail', '$dni')";
            $result = mysqli_query($connection, $query);

            if(!$result) {
                die('Query Error'. msqli_error($connection));    
            }

            echo "Task Added Successfully";
        }      
    }
?>