<?php
    include('database.php');
    include('cookie-check.php');
    $search = $_POST['search'];
    $filtro = $_POST['filtro'];
    $search = $connection->real_escape_string($search);
    $filtro = $connection->real_escape_string($filtro);

    if($filtro == "username"){
        $filtro = "users.".$filtro;
    }else{
        $filtro = "task.".$filtro;
    }

    $query = "SELECT task.id,users.username,task.name,task.description FROM task INNER JOIN users 
    ON task.user_id = users.id WHERE $filtro LIKE '" . $search . "%' AND (task.user_id = '$ids' OR $admins = 1)";

    $result = mysqli_query($connection, $query);
    if (!$result) {
        die('Query Error'. msqli_error($connection));    
    }

    $json = array();
    while ($row = mysqli_fetch_array($result,1)) {
        $json[] = array(
            'id' => $row['id'],
            'username' => $row['username'],
            'name' => $row['name'],
            'desc' => $row['description']  
        );
    }
           
    $jsonstring = json_encode($json);
    echo $jsonstring;
?>
