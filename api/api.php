

<?php

require_once '../config.php';
require_once './class/Admin.php';
require_once './class/Station.php';
$station = new Station($SQL);
$admin = new Admin($SQL);

if (isset($_GET['action']) && $_GET['action'] == 'login') {
  switch($_GET['action']){
    case 'login':
      echo $admin->login($_POST['username'], $_POST['password']);
    break;
    case 'delete_station':
      echo $admin->delete_station($_GET['id']);
    break;
  }

} else {

  if ($error = $station->importURLRequest($_GET)) {
      $station->outputError($error['code'], $error['msg']);
  } else if (isset($_GET['action']) && $_GET['action'] == 'addMapDetail') {
      switch($_GET['action']){
        case 'addMapDetail':
          return $station->inputMapDetail($_POST['mapdetails'], $_POST['provider']);
        break;
      }
  } else {
      $station->output($station->get());
  }

}






?>
