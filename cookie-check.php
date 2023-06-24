<?php
session_start();
include('database.php');
$Token = $_SESSION["Token"];
if (isset($Token)) {
    $queryid = "SELECT * from users WHERE pass = '$Token'";
    $resultid =  mysqli_query($connection, $queryid);

    if(!$resultid) {
        die('Query Error'. msqli_error($connection));    
    }

    $rows = mysqli_fetch_array($resultid,1);
    $_SESSION["id"] = $rows['id'];
    $_SESSION["mail"] = $rows['mail'];
    $_SESSION["admin"] = $rows['admin'];
    $_SESSION["block"] = $rows['block'];
    $_SESSION["user"] = $rows['username'];
    $_SESSION["razon"] = $rows['razon_block'];
    $_SESSION["picture"] = $rows['picture'];


    $ids = $_SESSION["id"];
    $users = $_SESSION["user"];
    $mails = $_SESSION["mail"];
    $admins = $_SESSION["admin"];
    $blocks = $_SESSION["block"];
    $razones = $_SESSION["razon"];
    $pictures = $_SESSION["picture"];
}

?>