<?php
    session_start();
    include('database.php');
    include('cookie-check.php');

   $target_dir = "/home/dos/public_html/Images/Users/";

    $name = $_FILES["file"]["name"];
    $target_file = $target_dir . basename($_FILES["file"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    $target_id = $target_dir.$ids.".".$imageFileType;

    if(isset($_POST["submit"])) {
      $check = getimagesize($_FILES["file"]["tmp_name"]);
      if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
      } else {
        echo "File is not an image.";
        $uploadOk = 0;
      }
    }
    

    if ($_FILES["file"]["size"] > 700000) {
      echo "La foto debe pesar menos de 700kb";
      $uploadOk = 0;
    }

    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
      echo "La foto debe ser .jpg .png .jpeg o .gif";
      $uploadOk = 0;
    }
    

    if (!($uploadOk == 0)) {
      if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        if($pictures != "default.jpg" && $pictures != $name){
          unlink($target_dir.$pictures);
        }

        $query = "UPDATE users SET picture = '$name' WHERE id='$ids'";
        $result = mysqli_query($connection, $query);
        $_SESSION["picture"] = $name;
        if (!$result) {
          die('Query Error'. msqli_error($connection));    
        }
        echo "La foto de perfil fue subida exitosamente";
      } else {
        echo "Hubo un error subiendo la foto";
      }
    }
    echo $jsonstring;
?>
    