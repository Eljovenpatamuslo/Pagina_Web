<?php
include('database.php');

$username = $_POST['username'];
$pass = $_POST['pass'];

$query = "SELECT * from users WHERE username = '$username' AND pass = '$pass'";
$result = mysqli_query($connection, $query);

if (!$result) {
      die('Query Error'. msqli_error($connection));    
}

$json = mysqli_num_rows($result);

$jsonstring = json_encode($json);
echo $jsonstring; 
?>