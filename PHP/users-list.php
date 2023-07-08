<?php
    include('database.php');
    include('cookie-check.php');
    $search = $_POST['search'];
    $search = $connection->real_escape_string($search);

    $query = "SELECT * FROM users INNER JOIN data ON users.id=data.user_id WHERE users.username LIKE '" . $search . "%'";
    $query2 = "SELECT users.username FROM users INNER JOIN data ON users.id = data.blocked_by";

$result = mysqli_query($connection, $query);
$result2 = mysqli_query($connection, $query2);
    if (!$result && !$result2) {
      die('Query Error'. msqli_error($connection));
    }

    $json = array();
    while ($row = mysqli_fetch_array($result,1)) {
      if($admins){
        $json[] = array(
          'id' => $row['id'],
          'username' => $row['username'],
          'mail' => $row['mail'],
          'admin' => $row['admin'],
          'block' => $row['block'],
          'razon' => $row['razon_block'],	
          'picture' => $row['picture'],
          'firstlogin' => $row['first_login'],
          'lastlogin' => $row['last_login'],
          'logincount' => $row['login_count'],	
          'lastblocked' => $row['last_blocked'],
          'blockedby' => $row['blocked_by'],			
          );
      }else{
        $json[] = array(
          'id' => $row['id'],
          'username' => $row['username'],
          'mail' => $row['mail'],
          'admin' => $row['admin'],
          'block' => $row['block'],
          'razon' => $row['razon_block'],	
          'picture' => $row['picture'],		
          );
      }
  
    }
           
    $jsonstring = json_encode($json);
    echo $jsonstring; 
?>
