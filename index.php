<?php
error_reporting(0);
session_start();

$targets = array(
 "1"  => "facóquero",
 "2"  => "expuma",
 "3"  => "antílope",
 "4"  => "cabra",
 "5"  => "ganso",
 "6"  => "pingüinos",
 "7"  => "ónix",
 "8"  => "cerdo hormiguero",
 "9"  => "cervatillo",
 "10" => "oso negro",
 "11" => "zorro",
 "12" => "dos ciervos",
 "13" => "exciervo zebrutante (shiny)",
 "14" => "pantera shiny zombie",
 "15" => "cocodrilo",
 "16" => "cabrón ",
 "17" => "exciervo verde",
 "18" => "oso radiactivo",
 "19" => "antílope gris",
 "20" => "ciervo macho tumbado",
 "21" => "babuino",
 "22" => "hiena de Helm",
 "23" => "tejones",
 "24" => "oso negro de lejos");

if ($_GET['archers']) {

 if (!$_SESSION['archers']) {
  $archers_array = [];

  foreach ($_GET['archers'] as $value) {
   array_push($archers_array, array("name" => $value, "points" => 0));
  }

  $_SESSION['archers'] = $archers_array;
 }
 require "target.html";

} else {
 require "index.html";
}
