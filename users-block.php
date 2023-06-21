<?php
    include('database.php');

    $id = $_POST['id'];
    $razon = $_POST['razon'];
    var_dump($razon);
    if (isset($id)) {
        $query = "UPDATE users SET block = NOT block WHERE id= '$id'";
        $query2 = "SELECT user_id FROM blocked WHERE user_id = '$id'";
        $query3 = "INSERT into blocked(user_id,razon) VALUES ('$id','$razon')";
        $query4 = "DELETE FROM blocked WHERE user_id = '$id'";

        $result = mysqli_query($connection, $query);
        $result2 = mysqli_query($connection, $query2);

        if (!$result && !$result2) {
            die('Query Error'. msqli_error($connection));    
        }

        if(mysqli_num_rows($result2) > 0){
            $result4 = mysqli_query($connection, $query4);
        }else{
            $result3 = mysqli_query($connection, $query3);
        }

        if (!$result3 && !$result4) {
            die('Query Error'. msqli_error($connection));    
        }
        echo "Task Deleted Successfully";
    }
?>