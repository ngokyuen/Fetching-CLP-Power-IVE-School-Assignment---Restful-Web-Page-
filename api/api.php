<?php

require_once '../config.php';

require_once './class/Station.php';
$station = new Station($SQL);

require_once './class/Generate.php';
$generate = new Generate($SQL);

//get method
$format = isset($_GET['format'])?$_GET['format']:null;
$lang = isset($_GET['lang'])?$_GET['lang']:null;
$no = isset($_GET['no'])?$_GET['no']:null;
$address = isset($_GET['address'])?$_GET['address']:null;

$generate->setFormat($format);


?>



