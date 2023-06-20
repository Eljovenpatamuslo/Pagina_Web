<?php
include('cookie-check.php');
$json = $_SESSION["user"];
     $jsonstring = json_encode($json);
     echo $jsonstring; 

?>