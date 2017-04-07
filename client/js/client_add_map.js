
const {connect} = ReactRedux;

class ClientAddMapComponent extends React.Component {

  //init state
  constructor(props){
    super(props);
    this.state = {
      provider: '',
      verifyProvider: null,
      clientAddMarkersDetail: [],
      //for marker detail dialog
      showMarkerDetailDialog: false,
      markerDetailDialogIndex: null,
      tempMarkerDetail: {
        districtL: '', districtS: '', location: '',
        address: '', type: '', img: '',
        parkingNo: ''
      }
    }
  }

  componentWillUpdate(nextProps, nextState){
    const {type} = nextProps.Map;
    if (type == 'deleteClientAddMarkerSuccess'){
      this.state.markerDetailDialogIndex = null;
      this.closeMarkerDetailDialog();
      this.clearStateClientAddMarkersDetail();
      this.props.dispatch({type:'deleteClientAddMarkerCompleted'})
    } else if (type == 'closeMarkerDetailDialog') {
      this.closeMarkerDetailDialog();
    } else if (type == 'addClientMarkersSuccess'){
      //get map detail by lat lng through google geo
      this.searchMapDetailByLatLng(nextProps, nextState);
    } else if (type == 'uploadClientAddMarkersCompleted'){
      nextState.clientAddMarkersDetail = [];
      nextState.markerDetailDialogIndex = null;
    }

    //to input values to marker detail dialog
    if (nextState.showMarkerDetailDialog && this.state.markerDetailDialogIndex != nextState.markerDetailDialogIndex){

      this.importValuesToMarkerDetailDialog(nextProps, nextState);

    }
  }

// input value to dialog
  importValuesToMarkerDetailDialog(nextProps, nextState){
    const {tempMarkerDetail, clientAddMarkersDetail, markerDetailDialogIndex} = nextState;
    const clientAddMarkerDetail = clientAddMarkersDetail[markerDetailDialogIndex];
    // console.log(clientAddMarkerDetail);
    // console.log(tempMarkerDetail);
    const {results, status} = clientAddMarkerDetail.result;

    if (status == 'OK'){
      const {address_components, formatted_address} = results[0];
      //console.log(address_components + " , " + formatted_address);
      if (!clientAddMarkerDetail.address)
        clientAddMarkerDetail.address = formatted_address;

      let location = "";
      let districtL = "";
      let districtS = "";
      address_components.map((address_component, index, array)=>{

          //location case
          if (index == 1 && location.length <= 5){
            location += " " + address_components[index]['long_name'];
          } else if (index == 0){
            location += address_components[index]['long_name'];
          }

          //districtL case
          if (index == array.length - 2 && array.length - 2 > 1){
            districtL = address_component.long_name;
          }

          //districtS case
          if (index == array.length - 3 && array.length - 2 > 1){
            districtS = address_component.long_name;
          }
      })

      if (!clientAddMarkerDetail.districtS)
        clientAddMarkerDetail.districtS = districtS;
      if (!clientAddMarkerDetail.districtL)
        clientAddMarkerDetail.districtL = districtL;
      if (!clientAddMarkerDetail.location)
      clientAddMarkerDetail.location = location;
    }

    //import data from clientAddMarkersDetail to tempMarkerDetail
     let {address, location, districtL, districtS, type, parkingNo, img} = clientAddMarkerDetail;
     nextState.tempMarkerDetail.address=address;
     nextState.tempMarkerDetail.location=location;
     nextState.tempMarkerDetail.districtL=districtL;
     nextState.tempMarkerDetail.districtS=districtS;
     nextState.tempMarkerDetail.type=type;
     nextState.tempMarkerDetail.parkingNo=parkingNo;
     nextState.tempMarkerDetail.img=img;
  }

  clearStateClientAddMarkersDetail(){
    const {clientAddMarkers} = this.props.Map;
    let temp_index = 0;
    this.state.clientAddMarkersDetail = this.state.clientAddMarkersDetail.filter((clientAddMarkerDetail, index)=>{
      const {lat, lng} = clientAddMarkerDetail;
      const clientAddMarker = clientAddMarkers.find((clientAddMarker)=>{
        if (lat === clientAddMarker.position.lat() && lng === clientAddMarker.position.lng()){
          return true;
        }
      });

      if (clientAddMarker != null){
        clientAddMarkerDetail.index=temp_index;
        temp_index += 1;
        return true;
      } else {
        return false;
      }
    });
  }

  //get map detail by lat lng through google geo
  searchMapDetailByLatLng(nextProps, nextState){
    const {clientAddMarkers} = nextProps.Map;
    const {clientAddMarkersDetail} = this.state;

    //check the orginial state data(clientAddMarkersDetail) whether not match props data(clientAddMarkers)
    clientAddMarkers.map((clientAddMarker, propsIndex)=>{
      const {position} = clientAddMarker;
      const propsLat = position.lat();
      const propsLng = position.lng();
      const clientAddMarkerDetail = clientAddMarkersDetail.find((clientAddMarkerDetail, stateIndex)=>{
        const {lng, lat} = clientAddMarkerDetail;
        if (lat == propsLat && lng == propsLng && stateIndex == propsIndex){
          return true;
        } else {
          return false;
        }
      });

      if (!clientAddMarkerDetail || clientAddMarkerDetail.result.status !== 'OK'){
        //CLEAR sTATE DATA
        this.state.clientAddMarkersDetail[propsIndex] = '';

        fetch("https://maps.googleapis.com/maps/api/geocode/json?lang=en&latlng=" + propsLat + "," + propsLng +  "&key=AIzaSyC_uk7pUPriJEafftHHGKp4pozIieTegdA").then((response)=>{
          return response.json();
        }).then((json)=>{
          console.log(json);
          this.state.clientAddMarkersDetail[propsIndex] = {result: json, index: propsIndex, lat: propsLat, lng:propsLng, address: '', location: '', districtL:'',districtS:'', type:'', img:'', parkingNo:''};
        }).then(()=>{
          nextProps.dispatch({type: 'updateClientAddMarkersDetail'});
        })
      }
    })
  }

//update detail for client added map
  updateClientAddMapDetail(){
    const {markerDetailDialogIndex, tempMarkerDetail, clientAddMarkersDetail} = this.state;
    const clientAddMarkerDetail = clientAddMarkersDetail[markerDetailDialogIndex];
    clientAddMarkerDetail.address = tempMarkerDetail.address;
    clientAddMarkerDetail.location = tempMarkerDetail.location;
    clientAddMarkerDetail.districtL = tempMarkerDetail.districtL;
    clientAddMarkerDetail.districtS = tempMarkerDetail.districtS;
    clientAddMarkerDetail.img = tempMarkerDetail.img;
    clientAddMarkerDetail.parkingNo = tempMarkerDetail.parkingNo;
    clientAddMarkerDetail.type = tempMarkerDetail.type;
    this.closeMarkerDetailDialog();
  }

  verifyClientAddMapDetail(index){
    try {
      const {clientAddMarkersDetail} = this.state;
      if (clientAddMarkersDetail && clientAddMarkersDetail.length > 0) {
        const clientAddMarkerDetail = clientAddMarkersDetail[index];
        const {address, districtL, districtS, location, type} = clientAddMarkerDetail;
        if (address !== "" && districtL  !== "" && districtS  !== "" && location  !== "" && type  !== ""){
          return true;
        } else {
          return false;
        }
      }
    } catch (e){
      console.log(e);
    }
  }

  verifyProvider(value=this.state.provider){
    const reg = /\w{5,}/;
    if (value.match(reg)){
      this.setState({verifyProvider: true});
      return true;
    } else {
      this.setState({verifyProvider: false});
      return false;
    }
  }

//send request for delete client added map
  deleteClientAddMap(){
    this.props.dispatch({type:'deleteClientAddMarker', payload:this.state.markerDetailDialogIndex});
  }

//send request for upload client added map to server
  submitClientAddMap(){
    const {clientAddMarkersDetail} = this.state;
    let verifyAllCase = true;

    //start to verify all map detail
    clientAddMarkersDetail.map((clientAddMarkerDetail, index)=>{
      verifyAllCase = this.verifyClientAddMapDetail(index) && verifyAllCase;
    });

    if (!verifyAllCase){
     alert('Please check all Map Markers');
    }

    //start to verify provider
    verifyAllCase = this.verifyProvider() && verifyAllCase;
    console.log(verifyAllCase);

    if (verifyAllCase){
      this.props.dispatch({type:'uploadClientAddMarkers', provider: this.state.provider, clientAddMarkersDetail: this.state.clientAddMarkersDetail, dispatch: this.props.dispatch});
    }
  }

  changeProvider(e){
    this.setState({provider: e.target.value});
    this.verifyProvider(e.target.value);
  }

  openMarkerDetailDialog(index){
    this.changeIndex(index);
    this.setState({showMarkerDetailDialog: true});
    //this.renderMarkerDetailDialog(index);
  }

  closeMarkerDetailDialog(){
    this.setState({showMarkerDetailDialog: false});
    this.props.dispatch({type:'closeMarkerDetailDialogSuccess'})
  }

  // marker detail dialog
  renderMarkerDetailDialog(){
    const {showMarkerDetailDialog, markerDetailDialogIndex, clientAddMarkersDetail} = this.state;
    if (showMarkerDetailDialog === true){

      return (
        <div className="alertContainer">
          <div className="background" onClick={this.closeMarkerDetailDialog.bind(this)}></div>
          <div className="alert">
            <div className="content">
              <div className="content_content table">
                <div className="row">
                  <div className="column">Location*:</div>
                  <div className="column"><input onChange={(e)=>this.changeLocation(e.target.value)} value={this.state.tempMarkerDetail.location} /></div>
                </div>
                <div className="row">
                  <div className="column">Address*:</div>
                  <div className="column"><input onChange={(e)=>this.changeAddress(e.target.value)} value={this.state.tempMarkerDetail.address} /></div>
                </div>
                <div className="row">
                  <div className="column">District*:</div>
                  <div className="column">
                    {this.renderDistrictL()}
                  </div>
                </div>
                <div className="row">
                  <div className="column">District2*:</div>
                  <div className="column">
                    {this.renderDistrictS()}
                  </div>
                </div>
                <div className="row">
                  <div className="column">Type*:</div>
                  <div className="column">
                    {this.renderType()}
                  </div>
                </div>
                <div className="row">
                  <div className="column">Image:</div>
                  <div className="column"><input onChange={(e)=>this.changeImg(e.target.value)} value={this.state.tempMarkerDetail.img} /></div>
                </div>
                <div className="row">
                  <div className="column">Parking No:</div>
                  <div className="column"><input onChange={(e)=>this.changeParkingNo(e.target.value)} value={this.state.tempMarkerDetail.parkingNo} /></div>
                </div>
              </div>
              <div className="bottom_buttons">
                <button onClick={this.updateClientAddMapDetail.bind(this)}>Update</button>
                <button onClick={this.deleteClientAddMap.bind(this)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

  //render client add markers page
  renderClientAddMarkers(){
    const {clientAddMarkers} = this.props.Map;
    return (
      <div className="clientAddMarkers">
        {this.renderMarkerDetailDialog()}
        <div className="title">Your Recommendation</div>
        {clientAddMarkers.map((clientAddMarker, index)=>{
          const {clientAddMarkersDetail} = this.state;
          const clientAddMarkerDetail = clientAddMarkersDetail.find((clientAddMarkerDetail)=> {
              return (clientAddMarkerDetail.index===index)
          } )

          let status = '';
          if (clientAddMarkerDetail) {
            status = clientAddMarkerDetail.result.status;
          }

          return (
            <div key={index} className="clientAddMarker" onClick={this.openMarkerDetailDialog.bind(this, index)}>
                <div><img src="./img/flag3_565_720.png" /></div>
                <div>{index+1}</div>
                <div>
                  { (clientAddMarkerDetail)?
                    (status === "OK") ? <img className="statusIcon" src="./img/tick.png" />:
                    <img className="statusIcon" src="./img/cross.png" />
                    :<img className="statusIcon" src="./img/loading.gif" />
                  }
                  {
                    (clientAddMarkerDetail && this.verifyClientAddMapDetail(index))?
                    <img className="statusIcon" src="./img/tick.png" />
                    : null
                  }
                </div>
            </div>
          )
        })}
      </div>
    )
  }

  render(){
    const {clientAddMarkers} = this.props.Map;
    if (clientAddMarkers && clientAddMarkers.length > 0) {
      return (
        <div className="clientAddMapComponent">
          {this.renderClientAddMarkers()}
          <div className="inputs">Provider*
            <input onChange={this.changeProvider.bind(this)} value={this.state.provider} placeholder="Enter Your Name" />
            {(!this.state.verifyProvider)? <div className="error">Please input more than 5 words</div>:null}
            <button onClick={this.submitClientAddMap.bind(this)}>Submit</button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderDistrictL(){
    return (
      <select onChange={(e)=>this.changeDistrictL(e.target.value)} value={this.state.tempMarkerDetail.districtL} >
        <option value=""></option>
        <option value="Hong Kong Island">Hong Kong Island</option>
        <option value="Kowloon">Kowloon</option>
        <option value="New Territories">New Territories</option>
        <option value="Outlying Islands">Outlying Islands</option>
      </select>
    )
  }

  renderType(){
    return (
      <select onChange={(e)=>this.changeType(e.target.value)} value={this.state.tempMarkerDetail.type} >
        <option value=""></option>
        <option value="Standard">Standard</option>
        <option value="Quick">Quick</option>
        <option value="SemiQuick">SemiQuick</option>
        <option value="Standard;Quick">Standard & Quick</option>
        <option value="Standard;SemiQuick">Standard & SemiQuick</option>
        <option value="Quick;SemiQuick">Quick & SemiQuick</option>
        <option value="Standard;Quick;SemiQuick">Standard & Quick & SemiQuick</option>
      </select>
    )
  }

  renderDistrictS() {
    return (
      <select onChange={(e)=>this.changeDistrictS(e.target.value)} value={this.state.tempMarkerDetail.districtS}  >
        <option value=""></option>
        <option value="Central and Western">Central and Western</option>
        <option value="Eastern">Eastern</option>
        <option value="Fo Tan">Fo Tan</option>
        <option value="Ho Man Tin">Ho Man Tin</option>
        <option value="Hong Lok Yuen">Hong Lok Yuen</option>
        <option value="Kowloon City">Kowloon City</option>
        <option value="Kwu Tung">Kwu Tung</option>
        <option value="Kwun Tong">Kwun Tong</option>
        <option value="Kwan Tei">Kwan Tei</option>
        <option value="Kwai Chung">Kwai Chung</option>
        <option value="Kwai Tsing">Kwai Tsing</option>
        <option value="Kam Shan">Kam Shan</option>
        <option value="Lam Tsuen">Lam Tsuen</option>
        <option value="Ma Liu Shui">Ma Liu Shui</option>
        <option value="Ma On Shan">Ma On Shan</option>
        <option value="Mid-level">Mid-level</option>
        <option value="North">North</option>
        <option value="Outlying Islands">Outlying Islands</option>
        <option value="Pak Shek Kok">Pak Shek Kok</option>
        <option value="Sai Kung">Sai Kung</option>
        <option value="Sham Shui Po">Sham Shui Po</option>
        <option value="Shatin">Shatin</option>
        <option value="Southern">Southern</option>
        <option value="Tai Po">Tai Po</option>
        <option value="Tai Wai">Tai Wai</option>
        <option value="Tai Mo Shan">Tai Mo Shan</option>
        <option value="The Peak">The Peak</option>
        <option value="Tuen Mun">Tuen Mun</option>
        <option value="Tsuen Wan">Tsuen Wan</option>
        <option value="Wan Chai">Wan Chai</option>
        <option value="Wong Tai Sin">Wong Tai Sin</option>
        <option value="Yau Tsim Mong">Yau Tsim Mong</option>
        <option value="Yuen Long">Yuen Long</option>
      </select>
    )
  }

  changeLocation(value){
    this.setState({tempMarkerDetail: {...this.state.tempMarkerDetail, location: value}});
  }

  changeAddress(value){
    this.setState({tempMarkerDetail: {...this.state.tempMarkerDetail, address: value}});
  }

  changeDistrictL(value){
    this.setState({tempMarkerDetail: {...this.state.tempMarkerDetail, districtL: value}});
  }

  changeDistrictS(value){
    this.setState({tempMarkerDetail: {...this.state.tempMarkerDetail, districtS: value}});
  }

  changeType(value){
    this.setState({tempMarkerDetail: {...this.state.tempMarkerDetail, type: value}});
  }

  changeImg(value){
    this.setState({tempMarkerDetail: {...this.state.tempMarkerDetail, img: value}});
  }

  changeParkingNo(value){
    this.setState({tempMarkerDetail: {...this.state.tempMarkerDetail, parkingNo: value}});
  }

  changeIndex(index){
    this.setState({markerDetailDialogIndex: index});
  }

}

const ClientAddMap = connect(state=>state, null)(ClientAddMapComponent);
