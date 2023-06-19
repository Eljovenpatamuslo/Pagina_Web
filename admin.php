<?php
    include('cookie-check.php');
    $json = $admins;
    $jsonstring = json_encode($json);
    echo $jsonstring;
?>