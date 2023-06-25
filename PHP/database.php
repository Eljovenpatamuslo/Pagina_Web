<?php
	include("Privado.php");	

    $HOST = "localhost";
    $USER = "dos";
//pass en privado
    $DB = "dos";

    $connection = mysqli_connect  ($HOST ,$USER , $PASS, $DB);

    if (!$connection) {
        die ('Error de Conexión:' . mysqli_connect_error());
    }

    //if ($connection) {
    //    echo "Database is connected.";
    //}
//NO PONER EL DATABASE.PHP NUESTRO NO SEAN BOLUDOS
return $ADMIN;
?>
