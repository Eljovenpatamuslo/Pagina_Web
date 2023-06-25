<?php
    include('database.php');

    $username = $_POST['username'];
    $mail = $_POST['mail'];

    if (isset($username) && isset($mail)) {
        $query = "SELECT * FROM users WHERE username = '$username'";
        $result = mysqli_query($connection, $query);
        if (mysqli_num_rows($result) == 0){
            $query2 = "SELECT * FROM users WHERE mail = '$mail'";
            $result2 = mysqli_query($connection, $query2);
            if(mysqli_num_rows($result2) == 0){
                $json = 0; 
            }else{
                $json = 2;
            }
        }else{
            $json = 1;
        }

        if (!$result && !$result2) {
            die('Query Error'. msqli_error($connection));    
        }

    $jsonstring = json_encode($json);
    echo $jsonstring; 

}
?>