<?php

require_once './class/Generate.php';

class Admin extends Generate {

    public function __construct($sql) {
      parent::__construct($sql);
    }

    public function login($username, $password){
      $query = "SELECT _id,username,type,token FROM user";
      $query .= " WHERE username='" . urldecode($username) . "' AND password='" . urldecode($password) . "' AND type='admin'";
      //echo $query;
      $response = $this->sql->query($query);
      Header('Content-type: text/json');
      if ($result = $response->fetch_all(MYSQLI_ASSOC)){
        return json_encode(array("result"=>true, "data"=>$result[0]));
      } else {
        return json_encode(array("result"=>false, "error_msg"=>"error login username/password"));
      }
    }
}
?>
