<?php

require_once '../config.php';

require_once './class/Station.php';
$station = new Station($SQL);

if ($error = $station->importURLRequest($_GET)) {
    $station->outputError($error['code'], $error['msg']);
} else if (isset($_GET['action'])) {
    switch($_GET['action']){
      case 'addMapDetail':
        return $station->inputMapDetail($_POST['data']);
      break;
    }
} else {
    $station->output($station->getAll());
}



?>
