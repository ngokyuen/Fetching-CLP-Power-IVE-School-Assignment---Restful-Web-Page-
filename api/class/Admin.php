<?php

require_once './class/Generate.php';

class Admin extends Generate {

    public function __construct($sql) {
      parent::__construct($sql);
    }

    public function login($username, $password){
      $query = "SELECT _id,username,type,token FROM user";
      $query .= " WHERE username='" . urldecode($username) .
      "' AND password='" . urldecode($password) . "' AND type='admin'";
      //echo $query;
      $response = $this->sql->query($query);
      Header('Content-type: text/json');
      if ($result = $response->fetch_all(MYSQLI_ASSOC)){
        return json_encode(array("result"=>true, "data"=>$result[0]));
      } else {
        return json_encode(array("result"=>false, "error_msg"=>"error login username/password"));
      }
    }

    public function delete_station($id){
      $query = "UPDATE station SET deleted = 1 WHERE _id=" . $id;
      $response = $this->sql->query($query);
      Header('Content-type: text/json');
      if ($response){
        return json_encode(array("result"=>true));
      } else {
        return json_encode(array("result"=>false));
      }
    }

    public function update_station($id, $editStation){
      $query = "UPDATE station SET " . urldecode($editStation) . " WHERE _id=" . $id;
      $response = $this->sql->query($query);
      Header('Content-type: text/json');
      if ($response){
        return json_encode(array("result"=>true));
      } else {
        return json_encode(array("result"=>false));
      }
    }
}
?>
