<?php

//config
require_once '../config.php';

//get data from clp
require_once './class/GetDataFromCLP.php';
$clp = new GetDataFromCLP($SQL);
//$clp->clearData();
//$clp->getData();

if (isset($_GET["get_data_from_clp"]) && $_GET["get_data_from_clp"] == 1){
    $clp->getData();
} else if (isset($_GET["clear_data_from_clp"]) && $_GET["clear_data_from_clp"] == 1){
    $clp->clearData();
}


?>

<form method="GET">
    <button name="get_data_from_clp" value="1">GET STATION DATA FROM CLP</button>
    <button name="clear_data_from_clp" value="1">CLEAR STATION DATA</button>
</form>



