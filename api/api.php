<?php

require_once '../config.php';

require_once './class/Station.php';
$station = new Station($SQL);

if ($error = $station->importURLRequest($_GET)) {
    $station->outputError($error['code'], $error['msg']);
} else if (isset($_GET['action'])) {
    switch($_GET['action']){
      case 'addMapDetail':
        $station->inputMapDetail($_POST);
      break;
    }
} else {
    $station->output($station->getAll());
}



?>
