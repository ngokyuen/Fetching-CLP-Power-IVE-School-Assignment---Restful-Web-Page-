<?php

require_once './class/Generate.php';

class Station extends Generate {

    private $no, $address;
    private $searchMapKeyword;
    private $searchMapDetailByPlaceId;

    public function __construct($sql) {
      parent::__construct($sql);
    }

    public function inputMapDetail($mapdetails, $provider) {

      try {
        $map_detail_array = json_decode(urldecode($mapdetails));
         //print_r($json_array);
        $provider = urldecode($provider);
        //print_r($json_array[0]->html_attributions);
        foreach($map_detail_array as $item){
          $result = $item->result;
          $address_components = $result->address_components;
          $location = $result->geometry->location;

          $name = $result->name;
          $short_name = $address_components[0]->short_name;
          $long_name = $address_components[0]->long_name;
          $lat = $location->lat;
          $lng = $location->lng;
          $formatted_address = $result->formatted_address;

          $query = "INSERT INTO user_station " .
          "(name, short_name, long_name, lat, lng, formatted_address, provider) VALUES (" .
          "'{$name}', '{$short_name}', '{$long_name}', '{$lat}', '{$lng}', '{$formatted_address}', '{$provider}'" .
          ");";

          $this->sql->query($query);
        }

        Header('Content-type: text/json');
        $result = array("error"=>"", "result"=>"true");
        echo json_encode($result);

      } catch (Exception $e){
        echo $e->getMessage();
      }
    }

    private function setSearchMapDetailByPlaceId($place_id){
      $this->searchMapDetailByPlaceId = $place_id;
    }

    private function setAddress($address) {
      $this->address = $address;
    }

    private function setNo($no) {
      $this->no = $no;
    }

    private function setSearchMapKeyword($keyword){
      $this->searchMapKeyword = $keyword;
    }

    public function getAll() {
      if ($this->searchMapDetailByPlaceId){
        return $this->getMapDetailByPlaceId();
      }
      else if ($this->searchMapKeyword){
        return $this->searchMapKeyword();
      } else {
        $query = "SELECT * FROM station";
        $query .= " WHERE lang='" . $this->lang . "'";
        $result = $this->sql->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
      }
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
      if (isset($_gets['searchMapKeyword']) && $_gets['searchMapKeyword'] != ""){
        $this->setSearchMapKeyword($_gets['searchMapKeyword']);
      }
      if (isset($_gets['searchMapDetailByPlaceId']) && $_gets['searchMapDetailByPlaceId'] != ""){
        $this->setSearchMapDetailByPlaceId($_gets['searchMapDetailByPlaceId']);
      }

      foreach ($_gets as $key => $value) {
        if ($key != "no" && $key != "address" && $key != "format" && $key != "lang" &&
         $key != "searchMapKeyword" && $key != "searchMapDetailByPlaceId" && $key != "action") {
          return array("code" => '1200', "msg" => "Parameter not recognized");
        }
      }

      if (!$this->format || !$this->lang) {
        return array("code" => "1100", "msg" => "Required parameter is missing");
      }

      return null;
    }

    public function searchMapKeyword(){

      $query = "https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=" . urlencode($this->searchMapKeyword) . "&types=geocode&key=AIzaSyC_uk7pUPriJEafftHHGKp4pozIieTegdA";
      $json = file_get_contents($query);
      $json_obj =  json_decode($json, true);

      return $json_obj;
    }

    public function getMapDetailByPlaceId(){

      $query = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" . $this->searchMapDetailByPlaceId . "&key=AIzaSyC_uk7pUPriJEafftHHGKp4pozIieTegdA";
      $json = file_get_contents($query);
      $json_obj = json_decode($json, true);

      return $json_obj;
    }

}

?>
