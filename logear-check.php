<?php
session_start();
include('database.php');
$username = $_POST['username'];
$pass = $_POST['pass'];

if (isset($username) && isset($pass)) {
$query = "SELECT id,pass FROM users WHERE username = '$username' OR mail = '$username'";
$result = mysqli_query($connection, $query);

$row = mysqli_fetch_array($result,1);
$encrypted_pass = $row['pass'];
$id = $row['id'];

if (!$result) {
      die('Query Error'. msqli_error($connection));    
}

$verify = password_verify($pass, $encrypted_pass);

if ($verify && $result){
     $fecha = date('jS \of F Y h:i:s A');
     $query2 = "UPDATE data SET last_login = '$fecha', login_count = login_count + 1 WHERE user_id = '$id'";
     $result2 = mysqli_query($connection, $query2);
     session_unset(); 
     $_SESSION["Token"] = $encrypted_pass;
     $json = mysqli_num_rows($result);
     $jsonstring = json_encode($json);
}
}
echo $jsonstring; 
?>