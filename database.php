<?php

    $HOST = "localhost";
    $USER = "pepito";
    $PASS = "usuario";
    $DB = "Ejemplo";

    $connection =  mysqli_connect  ($HOST ,$USER , $PASS, $DB);

    if (!$connection) {
        die ('Error de Conexión:' . mysqli_connect_error());
    }

    //if ($connection) {
    //    echo "Database is connected.";
    //}
//NO PONER EL DATABASE.PHP NUESTRO NO SEAN BOLUDOS
?>
