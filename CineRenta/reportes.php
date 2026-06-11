<?php
$servidor   = "localhost";
$usuario    = "root";
$contrasena = "";
$base_datos = "cinerenta";

$conexion = new mysqli($servidor, $usuario, $contrasena, $base_datos);

if ($conexion->connect_error) {
    echo json_encode(["total" => 0, "solicitudes" => [], "error" => "Error de conexión"]);
    exit;
}

// Contar total
$res_total = $conexion->query("SELECT COUNT(*) AS total FROM solicitudes");
$fila_total = $res_total->fetch_assoc();
$total = $fila_total['total'];

// Traer todos los registros
$solicitudes = [];
$res_datos = $conexion->query("SELECT nombre, edad, sexo, peliculas, DATE_FORMAT(fecha, '%d/%m/%Y %H:%i') AS fecha FROM solicitudes ORDER BY fecha DESC");

while ($fila = $res_datos->fetch_assoc()) {
    $solicitudes[] = $fila;
}

echo json_encode(["total" => $total, "solicitudes" => $solicitudes]);

$conexion->close();
?>
