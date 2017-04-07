<?php

require_once './class/Generate.php';

class Station extends Generate {

    private $no, $address;
    private $searchMapKeyword;
    private $searchMapDetailByPlaceId;
    private $searchMapDetailByLatLng;

    public function __construct($sql) {
      parent::__construct($sql);
    }

    public function inputClientAddMarkers($data, $provider) {

      try {
        $data_array = json_decode(urldecode($data));
        $provider = urldecode($provider);

        foreach($data_array as $item){
          $address = $item->address;
          $location = $item->location;
          $districtL = $item->districtL;
          $districtS = $item->districtS;
          $img = $item->img;
          $lat = $item->lat;
          $lng = $item->lng;
          $parkingNo = $item->parkingNo;
          $type = $item->type;
          $lang = strtoupper($_GET['lang']);

          $query = "INSERT INTO station " .
          "(address, location, districtL, lat, lng, districtS, provider, type, parkingNo, img, lang) VALUES (" .
          "'{$address}', '{$location}', '{$districtL}', '{$lat}', '{$lng}', '{$districtS}', '{$provider}', '{$type}', '{$parkingNo}', '{$img}', '{$lang}'" .
          ");";

          //echo $query;

          $this->sql->query($query);
        }

        Header('Content-type: text/json');
        $result = array("error"=>"", "result"=>"true");
        echo json_encode($result);

      } catch (Exception $e){
        Header('Content-type: text/json');
        echo json_encode(array("code" => '1300', "msg" => "Error in service"));
      }
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
        Header('Content-type: text/json');
        echo json_encode(array("code" => '1300', "msg" => "Error in service"));
      }
    }

    private function setSearchMapDetailByLatLng($LatLng){
      $this->searchMapDetailByLatLng = $LatLng;
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

    public function get(){

      if (isset($this->no) && $this->no != ''){
        return $this->getStation(" no=" . $this->no);
      } else {
        if (isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] == 'http://localhost:81/coursework/client/admin.html')
          return $this->getAllStations_Admin();
        else
          return $this->getAllStations_Client();
      }
    }

    public function getAllStations($cond=null) {
      if ($this->searchMapDetailByLatLng){
        return $this->searchMapDetailByLatLng();
      } else if ($this->searchMapKeyword){
        return $this->searchMapKeyword();
      } else if ($this->searchMapKeyword){
        return $this->searchMapKeyword();
      } else {
        $query = "SELECT * FROM station";
        $query .= " WHERE lang='" . $this->lang . "' AND deleted=0 ";

        if ($cond){
          $query .= $cond;
        }
//echo $query;
        if ($result = $this->sql->query($query)) {
          //print_r($result);
          return $result->fetch_all(MYSQLI_ASSOC);
        } else {
          return array("code" => '1300', "msg" => "Error in service");
        }
      }
    }

    public function getAllStations_Client() {
      return $this->getAllStations(" AND is_approved = 1");
    }

    public function getAllStations_Admin() {
      return $this->getAllStations();
    }

    public function getStation($conditions) {
      $query = "SELECT * FROM station";
      $query .= " WHERE lang='" . $this->lang . "' AND deleted=0";
      //echo $query;
      if ($conditions)
          $query .= " AND " . $conditions;
      if ($result = $this->sql->query($query)){
        return $result->fetch_array(MYSQLI_ASSOC);
      } else {
        return array("code" => '1300', "msg" => "Error in service");
      }

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
      if (isset($_gets['searchMapDetailByLatLng']) && $_gets['searchMapDetailByLatLng'] != ""){
        $this->setSearchMapDetailByLatLng($_gets['searchMapDetailByLatLng']);
      }

      foreach ($_gets as $key => $value) {
        if ($key != "no" && $key != "address" && $key != "format" && $key != "lang" &&
         $key != "searchMapKeyword" && $key != "searchMapDetailByLatLng" && $key != "searchMapDetailByPlaceId" && $key != "action") {
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
