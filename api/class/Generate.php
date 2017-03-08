<?php

class Generate extends Basic {

    private $request_format = 'xml';

    public function __construct($sql){
        parent::__construct($sql);
    }

    public function setFormat($format){
        $this->request_format = $format;
    }

    public function output($result_array){

        switch ($this->request_format){
            case 'xml':
                $this->outputXML($result_array);
                break;
            case 'json':
                $this->outputXML($result_array);
                break;
            default:
                $this->outputErrorFormat();
                break;
        }
    }

    private function outputXML($result_array){
        
    }

    private function outputJSON($result_array){
        
    }

    private function outputErrorFormat(){
        
    }
}