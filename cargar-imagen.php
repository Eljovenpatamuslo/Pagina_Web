<?php
include('database.php');
var_dump($_POST['imagen']);
if (isset($_FILES['imagen'])) {
    $name = $_FILES['imagen']['name'];
    $type = $_FILES['imagen']['type'];
    $size = $_FILES['imagen']['size'];
    $ruta = $_FILES['imagen']['tmp_name'];

    var_dump($name);
    $file = file_get_contents($ruta);

    $file = mysqli_real_escape_string($connection, $file);

    $query = "UPDATE users SET imagen='$file' WHERE id = '1'";

    $result = mysqli_query($connection, $query);

    if (!$result) {
              die('Query Error'. msqli_error($connection));    
    }
} else {
    echo "No se ha seleccionado un archivo.";
}
?>