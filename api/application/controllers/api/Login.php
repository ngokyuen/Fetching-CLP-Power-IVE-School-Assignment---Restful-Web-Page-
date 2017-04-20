<?php

if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';


class Login extends REST_Controller {


      public function index_get()
      {


      }

    public function index_post()
      {
        try {
        $this->load->database();
        $username = $this->post('username');
        $password = $this->post('password');

        $query = "SELECT _id,username,type,token FROM user";
        $query .= " WHERE username='" . urldecode($username) .
        "' AND password='" . urldecode($password) . "' AND type='admin'";
        //echo $query;
        $response = $this->db->query($query);

          if ($result = $response->result()){
              $this->response( array("data"=>$result, "result"=>true), 200);
          } else {
              $this->response( array("result"=>false, "error_msg"=>"error login username/password"), 200);
          }
        } catch (Exception $e){
          $this->response(array("code" => '1300', "msg" => "Error in service"), 200);
        }
      }



}
