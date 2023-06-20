<?php
    include('cookie-check.php');
    $json = array();
        $json = array(
            'id' => $ids,
            'user' => $users,
            'mail' => $mails,
            'admin' => $admins,
 	        'block' => $blocks
        );
           
    $jsonstring = json_encode($json);
    echo $jsonstring;
?>