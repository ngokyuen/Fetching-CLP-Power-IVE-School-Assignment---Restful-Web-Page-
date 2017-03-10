<?php

require_once '../config.php';

require_once './class/Station.php';
$station = new Station($SQL);

if ($error = $station->importURLRequest($_GET)) {
    echo $station->outputError($error['code'], $error['msg']);
} else {

    $station->output($station->getAll());
}
?>



