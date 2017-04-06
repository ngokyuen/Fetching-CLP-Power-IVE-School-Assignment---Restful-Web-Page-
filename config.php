<?php

$SQL_HOST='localhost';
$SQL_USER="root";
$SQL_PASSWORD="";
$SQL_DATABASE="coursework";

require_once '../class/Basic.php';

//sql
$SQL = new mysqli($SQL_HOST,$SQL_USER,$SQL_PASSWORD,$SQL_DATABASE);
//$SQL->set_charset("utf8");
