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
            $query = "INSERT into users(username, pass, mail, admin, block, razon_block, picture) VALUES ('$username', '$hash', '$mail','0','0','','default.jpg')";
            $query2 = "SELECT id FROM users WHERE pass = '$hash'";

            $result = mysqli_query($connection, $query);
            $result2 = mysqli_query($connection, $query2);

            $row = mysqli_fetch_array($result2,1);
	    $id = $row['id'];
            $fecha = date('jS \of F Y h:i:s A');
            $query3 = "INSERT into data(user_id, first_login, last_login, login_count, last_blocked) VALUES ('$id','$fecha','','0','never','0')";
            $result3 = mysqli_query($connection, $query3);

            if(!$result && !$result2 && !$result3) {
                die('Query Error'. msqli_error($connection));    
            }
            echo "Task Added Successfully";
        }      
    }
?>
