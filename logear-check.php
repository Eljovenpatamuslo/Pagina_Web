<?php
include('database.php');

$username = $_POST['username'];
$pass = $_POST['pass'];

if (isset($username) && isset($pass)) {
$query = "SELECT * from users WHERE username = '$username'";
$encrypted = "SELECT password from users WHERE pass = '$pass' ";
$result = mysqli_query($connection, $query);
$result1 = mysqli_query($connection, $encrypted);

if (!$result && !$result1) {
      die('Query Error'. msqli_error($connection));    
}

$verify = password_verify($pass, $encrypted);

if ($verify && $result == 1){
      $json = mysqli_num_rows($result);
}
}
$json = mysqli_num_rows($result);
$jsonstring = json_encode($json);
echo $jsonstring; 
?>

