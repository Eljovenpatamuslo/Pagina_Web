<?php
    include('database.php');
    include('cookie-check.php');

    $name = $_POST['name'];
    $desc = $_POST['desc'];
    $date = $_POST['date'];

    if (isset($name) && isset($desc) && isset($date)) {
        $name = $connection->real_escape_string($name);
        $desc = $connection->real_escape_string($desc);
        $date = $connection->real_escape_string($date);

        if (!empty($name) && !empty($desc) && !empty($date)) {
            $query = "INSERT into task(name, description, date, user_id, test) VALUES ('$name', '$desc', '$date','$ids','$date')";
            $result = mysqli_query($connection, $query);

            if(!$result) {
                die('Query Error'. msqli_error($connection));    
            }

            echo "Task Added Successfully";
        }      
    }
?>