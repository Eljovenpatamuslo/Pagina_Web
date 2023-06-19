<?php
session_start();
$json = $_SESSION["user"];
     $jsonstring = json_encode($json);
     echo $jsonstring; 

?>