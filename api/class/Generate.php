<?php

class Generate extends Basic {

    protected $format = null;
    protected $lang = null;

    public function __construct($sql) {
        parent::__construct($sql);
    }

    protected function setLanguage($lang) {
        $this->lang = $lang;
    }

    protected function setFormat($format) {
        $this->format = $format;
    }

    public function output($result_array) {

        switch ($this->format) {
            case 'xml':
                return $this->outputXML($result_array);
            case 'json':
                return $this->outputJSON($result_array);
        }
    }

    private function outputXML($result_array) {
        $xml = new SimpleXMLElement("<?xml version='1.0'?><stationList />");
        //print_r($result_array);
        foreach ($result_array as $result_item) {
            $xml_station = $xml->addChild("station");
            $xml_station->addAttribute("no", $result_item["no"]);
            $xml_station->addChild("location", $result_item["location"]);
            $xml_station->addChild("lat", $result_item["lat"]);
            $xml_station->addChild("lng", $result_item["lng"]);
            $xml_station->addChild("type", $result_item["location"]);
            $xml_station->addChild("districtL", $result_item["districtL"]);
            $xml_station->addChild("districtS", $result_item["districtS"]);
            $xml_station->addChild("address", $result_item["address"]);
            $xml_station->addChild("provider", $result_item["provider"]);
            $xml_station->addChild("parkingNo", $result_item["parkingNo"]);
            $xml_station->addChild("img", $result_item["img"]);
        }
        Header('Content-type: text/xml');
        print_r($xml->asXML());
    }

    private function outputJSON($result_array) {
        Header('Content-type: text/json');
        $json = array("stationList" => array("station"=> $result_array));
        echo json_encode($json);
    }

    public function outputError($code, $msg) {
        if ($this->format == 'json')
            $this->outputErrorJSON($code, $msg);
        else
            $this->outputErrorXML($code, $msg);
    }

    private function outputErrorJSON($code, $msg) {
        Header('Content-type: text/json');
        $json = array("stationList"=> array("error"=> array("code"=>$code, "msg"=> $msg)));
        echo json_encode($json);
    }

    private function outputErrorXML($code, $msg) {
        $xml = new SimpleXMLElement("<?xml version='1.0'?><stationList/>");
        $xml_error = $xml->addChild("error");
        $xml_error->addChild("code", $code);
        $xml_error->addChild("msg", $msg);
        Header('Content-type: text/xml');
        print_r($xml->asXML());
    }

}
