<?php
    $ADMIN = include 'database.php';
    $PASS = include 'Privado.php';

    $username = $_POST['username'];
    $pass = $_POST['pass'];
    $json = 0;
    if (isset($username) && isset($pass)) {
        if ($username == $ADMIN && $pass == $PASS){
            $json = 1;
        }
        $jsonstring = json_encode($json);
            echo $jsonstring; 
}
?>