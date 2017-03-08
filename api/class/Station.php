<?php

class Station extends Basic {

    public function __construct($sql) {
        parent::__construct($sql);
    }

    public function add(){

    }

    public function getAll(){
        $query = "SELECT * FROM station;";
        $result = $this->sql->query($query);
        return $result;
    }

    public function get($conditions){
        $query = "SELECT * FROM station";
        $query .= " WHERE " . $conditions;
        $result = $this->sql->query($query);
        return $result;
    }
}


?>