<?php
    include('database.php');
    include('cookie-check.php');
    $search = $_POST['search'];

    if (isset($search)) {
        $search = $connection->real_escape_string($search);
        if (!empty($search)) {
            $query = "SELECT * FROM task WHERE name LIKE '$search%' AND (user_id = '$ids' OR $admins = '1')";
            $result = mysqli_query($connection, $query);
        
            if (!$result) {
                die('Query Error'. msqli_error($connection));    
            }

            $json = array();
            while ($row = mysqli_fetch_array($result)) {
                $json[] = array(
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'desc' => $row['desc']  
                );
            }

            $jsonstring = json_encode($json);
            echo $jsonstring; 
        }
    } 
?>