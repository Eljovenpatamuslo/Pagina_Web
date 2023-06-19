<?php
    include('database.php');

    $username = $_POST['username'];
    $mail = $_POST['mail'];

    if (isset($username) && isset($mail) && isset($dni)) {
        $query = "SELECT * FROM users WHERE username = '$username' OR mail = '$mail'";
        $result = mysqli_query($connection, $query);

        if (!$result) {
            die('Query Error'. msqli_error($connection));    
        }
$json = mysqli_num_rows($result);

    $jsonstring = json_encode($json);
    echo $jsonstring; 

}
?>