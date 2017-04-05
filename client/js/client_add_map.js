
const {connect} = ReactRedux;

class ClientAddMapComponent extends React.Component {

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

  }

//send request for upload client added map to server
  submitClientAddMap(){

  }

  changeProvider(e){
    this.setState({provider: e.target.value});
  }

  openMarkerDetailDialog(){
    this.setState({showMarkerDetailDialog: true});
    //this.renderMarkerDetailDialog(index);
  }

  closeMarkerDetailDialog(){
    this.setState({showMarkerDetailDialog: false});
  }

  changeLocation(e){
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
                  <div className="column"><input value={this.state.tempMarkerDetail.address} /></div>
                </div>
                <div className="row">
                  <div className="column">District:</div>
                  <div className="column"><input value={this.state.tempMarkerDetail.districtL} /></div>
                </div>
                <div className="row">
                  <div className="column">District2:</div>
                  <div className="column"><input value={this.state.tempMarkerDetail.districtS} /></div>
                </div>
                <div className="row">
                  <div className="column">Type:</div>
                  <div className="column"><input value={this.state.tempMarkerDetail.type} /></div>
                </div>
                <div className="row">
                  <div className="column">Image:</div>
                  <div className="column"><input value={this.state.tempMarkerDetail.img} /></div>
                </div>
                <div className="row">
                  <div className="column">Parking No:</div>
                  <div className="column"><input value={this.state.tempMarkerDetail.parkingNo} /></div>
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
            <div key={index} className="clientAddMarker" onClick={this.openMarkerDetailDialog.bind(this)}>
                <div><img src="./img/flag3_565_720.png" /></div>
                <div>{index+1}</div>
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

}

const ClientAddMap = connect(state=>state, null)(ClientAddMapComponent);
