<?php
$Token = $_COOKIE['Token'];

if (isset($Token)) {
    $queryid = "SELECT id from users WHERE pass = '$Token'";
    $resultid =  mysqli_query($connection, $queryid);

    if(!$resultid) {
        die('Query Error'. msqli_error($connection));    
    }

    $ids = mysqli_fetch_array($resultid,1);
    $id = $ids['id'];
}
?>