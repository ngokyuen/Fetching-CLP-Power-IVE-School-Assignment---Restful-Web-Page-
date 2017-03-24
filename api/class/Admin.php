<?php

require_once './class/Generate.php';

class Admin extends Generate {

    public function __construct($sql) {
      parent::__construct($sql);
    }

    public function login($username, $password){
      $query = "SELECT * FROM user";
      $query .= " WHERE username='{$username}' AND password='{$password}'";

      $response = $this->sql->query($query);
      if ($result = $response->fetch_all(MYSQLI_ASSOC)){
        Header('Content-type: text/json');
        echo json_encode(array("result"=>true, "data"=>$result));
      }
    }
}
?>
