<?php
error_reporting(0);
session_start();

$index = intval($_POST['archer']);

$points = $_SESSION['archers'][$index]["points"];

$points -= intval($_POST["points"]);

$_SESSION['archers'][$index]["points"] = $points;

echo json_encode(array("totalPoints" => $points));
