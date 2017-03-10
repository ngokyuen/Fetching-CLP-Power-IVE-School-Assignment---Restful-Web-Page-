<?php

require_once './class/Generate.php';

class Station extends Generate {

    private $no, $address;

    public function __construct($sql) {
        parent::__construct($sql);
    }

    public function add() {
        
    }

    private function setAddress($address) {
        $this->address = $address;
    }

    private function setNo($no) {
        $this->no = $no;
    }

    public function getAll() {
        $query = "SELECT * FROM station";
        $query .= " WHERE lang='" . $this->lang . "'";
        $result = $this->sql->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function get($conditions) {
        $query = "SELECT * FROM station";
        $query .= " WHERE lang='" . $this->lang . "'";
        if ($conditions)
            $query .= " AND " . $conditions;
        $result = $this->sql->query($query);
        return $result->fetch_array(MYSQLI_ASSOC);
    }

    public function importURLRequest($_gets) {

        if (isset($_gets['format']) && $_gets['format'] != "") {
            $this->setFormat($_gets['format']);
        }
        if (isset($_gets['lang']) && $_gets['lang'] != "") {
            $this->setLanguage($_gets['lang']);
        }
        if (isset($_gets['no']) && $_gets['no'] != "") {
            $this->setNo($_gets['no']);
        }
        if (isset($_gets['address']) && $_gets['address'] != "") {
            $this->setAddress($_gets['address']);
        }

        foreach ($_gets as $key => $value) {
            if ($key != "no" && $key != "address" && $key != "format" && $key != "lang") {
                return array("code" => '1200', "msg" => "Parameter not recognized");
            }
        }

        if (!$this->format || !$this->lang) {
            return array("code" => "1100", "msg" => "Required parameter is missing");
        }
        
        return null;
    }

}

?>