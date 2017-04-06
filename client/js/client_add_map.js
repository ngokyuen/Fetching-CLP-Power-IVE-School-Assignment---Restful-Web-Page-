
const {connect} = ReactRedux;

class ClientAddMapComponent extends React.Component {

  componentWillUpdate(nextProps, nextState){
    const {type} = nextProps.Map;
    if (type == 'deleteClientAddMarkerSuccess'){
      this.closeMarkerDetailDialog();
      this.props.dispatch({type:'deleteClientAddMarkerCompleted'})
    } else if (type == 'closeMarkerDetailDialog') {
      this.closeMarkerDetailDialog();
    } else if (type == 'addClientMarkersSuccess'){
      //get map detail by lat lng through google geo
      this.searchMapDetailByLatLng(nextProps, nextState);
    }
  }

  searchMapDetailByLatLng(nextProps, nextState){
    const {clientAddMarkers} = nextProps.Map;
    this.state.clientAddMarkersDetail = [];
    clientAddMarkers.map((clientAddMarker, index)=>{
      const {position} = clientAddMarker;
      const lat = position.lat();
      const lng = position.lng();
      fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng +  "&key=AIzaSyC_uk7pUPriJEafftHHGKp4pozIieTegdA").then((response)=>{
        return response.json();
      }).then((json)=>{
        console.log(json);
        this.state.clientAddMarkersDetail.push({result: json, index: index, lat:lat, lng:lng});
      }).then(()=>{
        nextProps.dispatch({type: 'updateClientAddMarkersDetail'});
      })
    });

  }

  constructor(props){
    super(props);
    this.state = {
      provider: '',
      clientAddMarkersDetail: [],
      showMarkerDetailDialog: false,
      tempMarkerDetail: {
        index: 0,
        lat: 0,
        lng: 0,
        districtL: '',
        districtS: '',
        location: '',
        address: '',
        type: '',
        img: '',
        parkingNo: '',
        lang: 'EN',
      }
    }
  }

//update detail for client added map
  updateClientAddMapDetail(){

  }

//send request for delete client added map
  deleteClientAddMap(){
    this.props.dispatch({type:'deleteClientAddMarker', payload:this.state.tempMarkerDetail.index});
  }

//send request for upload client added map to server
  submitClientAddMap(){

  }

  changeProvider(e){
    this.setState({provider: e.target.value});
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

  renderMarkerDetailDialog(){
    if (this.state.showMarkerDetailDialog){
      return (
        <div className="alertContainer">
          <div className="background" onClick={this.closeMarkerDetailDialog.bind(this)}></div>
          <div className="alert">
            <div className="content">
              <div className="content_content table">
                <div className="row">
                  <div className="column">Location:</div>
                  <div className="column"><input onChange={this.changeLocation.bind(this)} value={this.state.tempMarkerDetail.location} /></div>
                </div>
                <div className="row">
                  <div className="column">Address:</div>
                  <div className="column"><input onChange={this.changeAddress.bind(this)} value={this.state.tempMarkerDetail.address} /></div>
                </div>
                <div className="row">
                  <div className="column">District(Long):</div>
                  <div className="column">
                    {this.renderDistrictL()}
                  </div>
                </div>
                <div className="row">
                  <div className="column">District(Short):</div>
                  <div className="column">
                    {this.renderDistrictS()}
                  </div>
                </div>
                <div className="row">
                  <div className="column">Type:</div>
                  <div className="column">
                    {this.renderType()}
                  </div>
                </div>
                <div className="row">
                  <div className="column">Image:</div>
                  <div className="column"><input onChange={this.changeImg.bind(this)} value={this.state.tempMarkerDetail.img} /></div>
                </div>
                <div className="row">
                  <div className="column">Parking No:</div>
                  <div className="column"><input onChange={this.changeParkingNo.bind(this)} value={this.state.tempMarkerDetail.parkingNo} /></div>
                </div>
              </div>
              <div className="bottom_buttons">
                <button onClick={this.updateClientAddMapDetail.bind(this)}>Submit</button>
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

  renderClientAddMarkers(){
    const {clientAddMarkers} = this.props.Map;
    return (
      <div className="clientAddMarkers">
        {this.renderMarkerDetailDialog()}
        <div className="title">Your Recommendation</div>
        {clientAddMarkers.map((clientAddMarker, index)=>{
          return (
            <div key={index} className="clientAddMarker" onClick={this.openMarkerDetailDialog.bind(this, index)}>
                <div><img src="./img/flag3_565_720.png" /></div>
                <div>{index+1}</div>
                <div>
                  <img className="statusIcon" src="./img/loading.gif" />
                  <img className="statusIcon" src="./img/cross.png" />
                  <img className="statusIcon" src="./img/tick.png" /></div>
            </div>
          )
        })}
      </div>
    )
  }

  render(){
    const {clientAddMarkers} = this.props.Map;
    if (clientAddMarkers != null) {
      return (
        <div className="clientAddMapComponent">
          {this.renderClientAddMarkers()}
          <div className="inputs">Provider <input onChange={this.changeProvider.bind(this)} value={this.state.provider} placeholder="Enter Your Name" /><button onClick={this.submitClientAddMap.bind(this)}>Submit</button></div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderDistrictL(){
    return (
      <select onChange={this.changeDistrictL.bind(this)} value={this.state.tempMarkerDetail.districtL} >
        <option value="Hong Kong Island">Hong Kong Island</option>
        <option value="Kowloon">Kowloon</option>
        <option value="New Territories">New Territories</option>
        <option value="Outlying Islands">Outlying Islands</option>
      </select>
    )
  }

  renderType(){
    return (
      <select onChange={this.changeType.bind(this)} value={this.state.tempMarkerDetail.type} >
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
      <select onChange={this.changeDistrictS.bind(this)} value={this.state.tempMarkerDetail.districtS}  >
        <option value="Wong Tai Sin">Wong Tai Sin</option>
        <option value="Yuen Long">Yuen Long</option>
        <option value="Kwun Tong">Kwun Tong</option>
        <option value="Sai Kung">Sai Kung</option>
        <option value="Kwai Tsing">Kwai Tsing</option>
        <option value="Outlying Islands">Outlying Islands</option>
        <option value="North">North</option>
        <option value="Yau Tsim Mong">Yau Tsim Mong</option>
        <option value="Tai Po">Tai Po</option>
        <option value="Sham Shui Po">Sham Shui Po</option>
        <option value="Tuen Mun">Tuen Mun</option>
        <option value="Tsuen Wan">Tsuen Wan</option>
        <option value="Shatin">Shatin</option>
        <option value="Central and Western">Central and Western</option>
        <option value="Eastern">Eastern</option>
        <option value="Southern">Southern</option>
        <option value="Wan Chai">Wan Chai</option>
        <option value="Kowloon City">Kowloon City</option>
      </select>
    )
  }

  changeLocation(e){
    this.setState({tempMarkerDetail: {...this.state.tempMarkerDetail, location: e.target.value}});
  }

  changeAddress(e){
    this.setState({tempMarkerDetail: {...this.state.tempMarkerDetail, address: e.target.value}});
  }

  changeDistrictL(e){
    this.setState({tempMarkerDetail: {...this.state.tempMarkerDetail, districtL: e.target.value}});
  }

  changeDistrictS(e){
    this.setState({tempMarkerDetail: {...this.state.tempMarkerDetail, districtS: e.target.value}});
  }

  changeType(e){
    this.setState({tempMarkerDetail: {...this.state.tempMarkerDetail, type: e.target.value}});
  }

  changeImg(e){
    this.setState({tempMarkerDetail: {...this.state.tempMarkerDetail, img: e.target.value}});
  }

  changeParkingNo(e){
    this.setState({tempMarkerDetail: {...this.state.tempMarkerDetail, parkingNo: e.target.value}});
  }

  changeIndex(index){
    this.setState({tempMarkerDetail: {...this.state.tempMarkerDetail, index: index}});
  }

}

const ClientAddMap = connect(state=>state, null)(ClientAddMapComponent);
