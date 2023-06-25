<?php
    include('database.php');
    include('cookie-check.php');

    $name = $_POST['name'];
    $desc = $_POST['desc'];

    if (isset($name) && isset($desc)) {
        $name = $connection->real_escape_string($name);
        $desc = $connection->real_escape_string($desc);

        if (!empty($name) && !empty($desc)) {
            $query = "INSERT into task(name, description, user_id) VALUES ('$name', '$desc','$ids')";
            $result = mysqli_query($connection, $query);

            if(!$result) {
                die('Query Error'. msqli_error($connection));    
            }

            echo "Task Added Successfully";
        }      
    }
?>