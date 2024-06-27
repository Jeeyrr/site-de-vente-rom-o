<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bmw";

// Connexion à la base de données
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM articles";
$result = $conn->query($sql);

$articles = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $articles[] = $row;
    }
}

echo json_encode($articles);

$conn->close();
?>
