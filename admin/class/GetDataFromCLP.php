<?php

class GetDataFromCLP extends Basic {

    public function __construct($sql) {
        parent::__construct($sql);
    }

    public function clearData() {
        $this->sql->query("ALTER TABLE station auto_increment = 1;");
        $this->sql->query("TRUNCATE TABLE `station`;");
    }

    public function getData() {

        $urls = array('https://opendata.clp.com.hk/GetChargingSectionXML.aspx?lang=EN', 'https://opendata.clp.com.hk/GetChargingSectionXML.aspx?lang=TC');
        for ($i = 0; $i < count($urls); $i++) {

            $xml = simplexml_load_string(file_get_contents($urls[$i]));
            $lang = $xml->Language;
            $stations = $xml->stationList;

            foreach ($stations->station as $station) {
                $no = $station->no;
                $location = $station->location;
                $lat = $station->lat;
                $lng = $station->lng;
                $type = $station->type;
                $districtL = $station->districtL;
                $districtS = $station->districtS;
                $address = $station->address;
                $provider = $station->provider;
                $parkingNo = $station->parkingNo;
                $img = $station->img;

                $query = "INSERT INTO station " .
                        "(no,location,lat,lng,type,districtL,districtS,address,provider,parkingNo,img,lang) VALUES " .
                        "('{$no}', '{$location}','{$lat}','{$lng}','{$type}','{$districtL}','{$districtS}','{$address}','{$provider}','{$parkingNo}','{$img}', '{$lang}');";
//            echo $query;
                $result = $this->sql->query($query);
            }
        }
    }

}
