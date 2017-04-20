<?php

if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';


class Stations extends REST_Controller {

      public function admin_get($id = null){
        try {
          $this->load->database();
          if (isset($id)){
            $this->response( $this->db->get_where('station', array('_id'=>$id, 'deleted'=>0))->result());
          } else {
            $this->response( $this->db->get_where('station', array('lang'=>'EN', 'deleted'=>0))->result());
          }
        } catch (Exception $e){
          $this->response(array("code" => '1300', "msg" => "Error in service"), 200);
        }
      }

      public function index_get($id = null)
      {

        try {

          $this->load->database();
          if (isset($id)){
            $this->response( $this->db->get_where('station', array('_id'=> $id ,'lang'=>'EN', 'deleted'=>0, 'is_approved'=> 1))->result());
          } else {
            $this->response( $this->db->get_where('station', array('lang'=>'EN', 'deleted'=>0, 'is_approved'=> 1))->result());
          }
        } catch (Exception $e){
          $this->response(array("code" => '1300', "msg" => "Error in service"), 200);
        }


      }

    public function index_post()
      {
              try {

                $this->load->database();

                  $data = $this->post('data');
                  $provider = $this->post('provider');

                $data_array = json_decode(urldecode($data));
                $provider = urldecode($provider);

                foreach($data_array as $item){
                  $data = array(
                  'address' => $item->address,
                  'location' => $item->location,
                  'districtL' => $item->districtL,
                  'districtS' => $item->districtS,
                  'img' => $item->img,
                  'lat' => $item->lat,
                  'lng' => $item->lng,
                  'parkingNo' => $item->parkingNo,
                  'type' => $item->type,
                  'lang' => 'EN',
                  'provider'=> $provider
                );

                  $this->db->insert('station', $data);
                }

                $this->response( array("error"=>"", "result"=>"true"), 200);

              } catch (Exception $e){
                $this->response(array("code" => '1300', "msg" => "Error in service"), 200);
              }

      }

    public function index_put()
      {
        try {

          $this->load->database();

            $_id = $this->put('id');
            $editStation = $this->put('editStation');


            $query = "UPDATE station SET " . urldecode($editStation) . " WHERE _id=" . $_id;

            $this->db->query($query);

            $this->response( array('result' => true), 200);

          } catch (Exception $e){
            $this->response(array("code" => '1300', "msg" => "Error in service"), 200);
          }

      }

    public function admin_delete($id)
      {

        try {

          $this->load->database();
          if (isset($id)){
            $this->db->where('_id', $id);
            $this->db->update('station', array('deleted'=>1));
            $this->response( array('result' => true), 200);
          } else {
            $this->response(array("code" => '1300', "msg" => "Error in service"), 200);
          }

        } catch (Exception $e){
          $this->response(array("code" => '1300', "msg" => "Error in service"), 200);
        }



      }

}
