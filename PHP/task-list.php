<?php
    include('database.php');
    include('cookie-check.php');
    $query = "SELECT * FROM task WHERE (user_id = '$ids' OR $admins = 1)";
    $result = mysqli_query($connection, $query);

    if (!$result) {
  //      die('Query Error'. msqli_error($connection));    
    }

    $json = array();
    while ($row = mysqli_fetch_array($result,1)) {
        $json[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'desc' => $row['description']  
        );
    }
           
    $jsonstring = json_encode($json);
    echo $jsonstring;
?>
