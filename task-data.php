<?php
    include('database.php');

    $id = $_POST['id'];

    if (isset($id)) {
        $query = "SELECT * FROM task WHERE id = $id";
        $result = mysqli_query($connection, $query);
        
        if (!$result) {
            die('Query Error'. msqli_error($connection));    
        }

        $json = array();
        while ($row = mysqli_fetch_array($result)) {
            $json[] = array(
                'id' => $row['id'],
                'name' => $row['name'],
                'date' => $row['date'],
                'desc' => $row['description']  
            );
        }
           
        $jsonstring = json_encode($json[0]);
        
        echo $jsonstring; 
    }
?>