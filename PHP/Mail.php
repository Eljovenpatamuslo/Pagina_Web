
<?php
// Varios destinatarios
$para  = 'koger38111@pyadu.com';

// titulo
$titulo = 'Recordatorio de cumpleanos para Agosto';

// mensaje
$mensaje = '
<html>
<head>
  <title>Recordatorio de cumpleanos para Agosto</title>
</head>
<body>
  este es el link: (link)
</body>
</html>
';

// Para enviar un correo HTML, debe establecerse la cabecera Content-type
$cabeceras  = 'MIME-Version: 1.0' . "\r\n";
$cabeceras .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Cabeceras adicionales
$cabeceras .= 'To: Mary <mary@example.com>, Kelly <kelly@example.com>' . "\r\n";
$cabeceras .= 'From: Recordatorio <cumples@example.com>' . "\r\n";
$cabeceras .= 'Cc: birthdayarchive@example.com' . "\r\n";
$cabeceras .= 'Bcc: birthdaycheck@example.com' . "\r\n";

// Enviarlo
mail($para, $titulo, $mensaje, $cabeceras);
?>
