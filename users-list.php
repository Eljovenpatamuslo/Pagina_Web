<?php
    include('database.php');

    $query = "SELECT * FROM users";
    $result = mysqli_query($connection, $query);

    if (!$result) {
  //      die('Query Error'. msqli_error($connection));    
    }

    $json = array();
    while ($row = mysqli_fetch_array($result,1)) {
        $json[] = array(
	    'id' => $row['id'],
            'username' => $row['username'],
            'mail' => $row['mail'],
        );
    }
           
    $jsonstring = json_encode($json);
    echo $jsonstring; 
?>
