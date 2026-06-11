<?php
$servidor   = "localhost";
$usuario    = "root";
$contrasena = "";
$base_datos = "cinerenta";

$conexion = new mysqli($servidor, $usuario, $contrasena, $base_datos);

if ($conexion->connect_error) {
    echo json_encode(["exito" => false, "mensaje" => "Error de conexión: " . $conexion->connect_error]);
    exit;
}

$nombre    = isset($_POST['nombre'])    ? trim($_POST['nombre'])    : '';
$edad      = isset($_POST['edad'])      ? intval($_POST['edad'])    : 0;
$direccion = isset($_POST['direccion']) ? trim($_POST['direccion']) : '';
$sexo      = isset($_POST['sexo'])      ? trim($_POST['sexo'])      : '';
$peliculas = isset($_POST['peliculas']) ? $_POST['peliculas']       : [];

$peliculas_texto = implode(", ", $peliculas);

$sql = "INSERT INTO solicitudes (nombre, edad, direccion, sexo, peliculas) VALUES (?, ?, ?, ?, ?)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("sisss", $nombre, $edad, $direccion, $sexo, $peliculas_texto);

if ($stmt->execute()) {
    echo json_encode(["exito" => true]);
} else {
    echo json_encode(["exito" => false, "mensaje" => "Error al guardar."]);
}

$stmt->close();
$conexion->close();
?>
