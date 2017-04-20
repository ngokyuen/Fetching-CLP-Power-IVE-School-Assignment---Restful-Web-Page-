<?php

require_once '../config.php';
require_once './class/Admin.php';
require_once './class/Station.php';
$station = new Station($SQL);
$admin = new Admin($SQL);

//grant & prevent check
$access = false;
$grants = array(
  "::1", '172.16.0.211'
);


foreach($grants as $g){
  if ($g == $_SERVER['REMOTE_ADDR']){
    $access = true;
  }
}

if (!$access){
  $station->setFormat('xml');
  echo $station->outputError('1000', 'No not recognized');
} else {
  if (isset($_GET['action']) &&
    ($_GET['action'] == 'login' || $_GET['action'] == 'delete_station' ||
     $_GET['action'] == 'update_station' ||
     ($_GET['action'] == 'addClientAddMarkers' && $_GET['lang'] && $_GET['format']))) {
    switch($_GET['action']){
      case 'login':
        echo $admin->login($_POST['username'], $_POST['password']);
      break;
      case 'delete_station':
        echo $admin->delete_station($_GET['id']);
      break;
      case 'update_station':
        echo $admin->update_station($_POST['id'], $_POST['editStation']);
      break;
      case 'addClientAddMarkers':
        echo $station->inputClientAddMarkers($_POST['data'], $_POST['provider']);
        break;
    }

  } else {

    if ($error = $station->importURLRequest($_GET)) {
        $station->outputError($error['code'], $error['msg']);
    } else if (isset($_GET['action']) && $_GET['action'] == 'addMapDetail') {
        switch($_GET['action']){
          case 'addMapDetail':
            return $station->inputMapDetail($_POST['mapdetails'], $_POST['provider']);
        }
    } else {
        $station->output($station->get());
    }

  }

}








?>
