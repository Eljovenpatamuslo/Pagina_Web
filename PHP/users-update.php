<?php
    session_start();
    include('database.php');
    include('cookie-check.php');

    $target_dir = "/home/dos/public_html/Images/Users/";

    $target_file = $target_dir . basename($_FILES["file"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    $target_id = $target_dir.$ids.".".$imageFileType;
    // Check if image file is a actual image or fake image
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
    
    // Check file size
    if ($_FILES["file"]["size"] > 700000) {
      echo "La foto debe pesar menos de 700kb";
      $uploadOk = 0;
    }
    
    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
      echo "La foto debe ser .jpg .png .jpeg o .gif";
      $uploadOk = 0;
    }
    
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
    // if everything is ok, try to upload file
    } else {
      if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {

        if($pictures != "default.jpg"){
          unlink($target_dir.$pictures);
        }

        rename($target_file,$target_id);
        $name = $ids.".".$imageFileType;
        $query = "UPDATE users SET picture = '$name' WHERE id='$ids'";
        $result = mysqli_query($connection, $query);
        $_SESSION["picture"] = $name;

        if (!$result) {
          //die('Query Error'. msqli_error($connection));    
        }
        echo "La foto ". htmlspecialchars( basename( $_FILES["file"]["name"])). " fue subida";
      } else {
        echo "Hubo un error subiendo la foto";
      }
    }
    echo $jsonstring; 
?>
    