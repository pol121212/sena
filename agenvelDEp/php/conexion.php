<?php
$servidor = "localhost"; 
$usuario = "root";       
$password = "";          
$base_datos = "agenvel"; 

// 2. Crea la conexión a la base de datos
$conexion = new mysqli($servidor, $usuario, $password, $base_datos);

// 3. Verifica si la conexión fue exitosa
if ($conexion->connect_error) {
    // Si hay un error, muestra el mensaje y detiene la ejecución
    die("❌ Error de Conexión: " . $conexion->connect_error);
}

// 4. Establece el conjunto de caracteres a UTF8 para evitar problemas con acentos
$conexion->set_charset("utf8");

// La variable $conexion ahora contiene el objeto que representa la conexión exitosa.
// Puedes incluir este archivo en cualquier otra página PHP para usar la conexión.

?>