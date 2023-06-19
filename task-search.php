<?php
    include('database.php');
    include('cookie-check.php');
    $search = $_POST['search'];

    if (isset($search)) {
        $search = $connection->real_escape_string($search);
        if (!empty($search)) {
            $query = "SELECT * FROM task WHERE username LIKE '$search%' AND user_id = '$ids'";
            $result = mysqli_query($connection, $query);
        
            if (!$result) {
                die('Query Error'. msqli_error($connection));    
            }

            $json = array();
            while ($row = mysqli_fetch_array($result)) {
                $json[] = array(
                    'id' => $row['id'],
                    'username' => $row['username'],
                    'age' => $row['age'],
                    'mail' => $row['mail'],
                    'dni' => $row['dni']  
                );
            }

            $jsonstring = json_encode($json);
            echo $jsonstring; 
        }
    } 
?>