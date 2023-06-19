<?php
include('database.php');

$username = $_POST['username'];
$pass = $_POST['pass'];

if (isset($username) && isset($pass)) {
$query = "SELECT pass FROM users WHERE username = '$username'";
$result = mysqli_query($connection, $query);

$encrypted = mysqli_fetch_array($result,1);

if (!$result && !$result1) {
      die('Query Error'. msqli_error($connection));    
}

$verify = password_verify($pass, $encrypted['pass']);

if ($verify && $result){
     $json = array(mysqli_num_rows($result),$encrypted);
     $jsonstring = json_encode($json);
}
echo $jsonstring;
} 
?>