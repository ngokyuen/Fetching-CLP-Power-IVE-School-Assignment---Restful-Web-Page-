
const {connect} = ReactRedux;

class AdminEditStationComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      address: '', districtL: '',
      districtS: '', img: '',
      is_approved: '', lang: '',
      lat: '', lng: '',
      location: '', no: '',
      parkingNo: '', provider: '',
      type: '',
    }
  }

  clickDeleteButton(id){
    if (window.confirm("Do you confirm to delete?")){
      this.props.dispatch({type:'delete_station', id:id, dispatch: this.props.dispatch});
    }

  }

  clickAlertBackground(){
    this.props.dispatch({type:'clear_load_station'});
  }

  render(){
    try {
      const {load_station_result} = this.props.Admin;
      if (load_station_result != null){
        const {stationList} = load_station_result;
        if (stationList != null){
          const {station} = stationList;
          //get the largest element width & height
          const style = {width: document.getElementById('stationList').clientWidth,
           height: document.getElementById('container').clientHeight};
            return (
                <div className="alertContainer" >
                  <div onClick={this.clickAlertBackground.bind(this)} className="alertBackground" style={style}>&nbsp;</div>
                  <div className="table">
                    <div className="row">
                      <div className="cell">Address</div>
                      <div className="cell"><input onChange={this.changeAddress.bind(this)} value={station.address} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">DistrictL</div>
                      <div className="cell"><input onChange={this.changeDistrictL.bind(this)} value={station.districtL} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">DistrictS</div>
                      <div className="cell"><input onChange={this.changeDistrictS.bind(this)} value={station.districtS} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Img</div>
                      <div className="cell"><input onChange={this.changeImg.bind(this)} value={station.img} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Approved</div>
                      <div className="cell"><input onChange={this.changeApproved.bind(this)} value={station.is_approved} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Language</div>
                      <div className="cell"><input onChange={this.changeLang.bind(this)} value={station.lang} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Latitude</div>
                      <div className="cell"><input onChange={this.changeLat.bind(this)} value={station.lat} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Longitude</div>
                      <div className="cell"><input onChange={this.changeLng.bind(this)} value={station.lng} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Location</div>
                      <div className="cell"><input onChange={this.changeLocation.bind(this)} value={station.location} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">No</div>
                      <div className="cell"><input onChange={this.changeNo.bind(this)} value={station.no} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Parking No</div>
                      <div className="cell"><input onChange={this.changeParkingNo.bind(this)} value={station.parkingNo} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Provider</div>
                      <div className="cell"><input onChange={this.changeProvider.bind(this)} value={station.provider} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Type</div>
                      <div className="cell"><input onChange={this.changeType.bind(this)} value={station.type} /></div>
                    </div>
                    <div className="row">
                      <div className="cell"><button className="bottom_button">Submit</button></div>
                      <div className="cell"><button onClick={this.clickDeleteButton.bind(this, station._id)} className="bottom_button">Delete</button></div>
                    </div>
                  </div>
              </div>
            )
          } else {
            return null;
          }
      }  else {
        return null;
      }

    } catch (e) {
      console.log(e);
    }

  }

  changeAddress(e){
    this.setState({address: e.target.value});
  }
  changeDistrictL(e){
    this.setState({districtL: e.target.value});
  }
  changeDistrictS(e){
    this.setState({districtS: e.target.value});
  }
  changeImg(e){
    this.setState({img: e.target.value});
  }
  changeApproved(e){
    this.setState({is_approved: e.target.value});
  }
  changeLang(e){
    this.setState({lang: e.target.value});
  }
  changeLat(e){
    this.setState({lat: e.target.value});
  }
  changeLng(e){
    this.setState({lng: e.target.value});
  }

  changeLocation(e){
    this.setState({location: e.target.value});
  }

  changeNo(e){
    this.setState({no: e.target.value});
  }

  changeParkingNo(e){
    this.setState({parkingNo: e.target.value});
  }

  changeProvider(e){
    this.setState({provider: e.target.value});
  }

  changeType(e){
    this.setState({type: e.target.value});
  }
}

const AdminEditStation = connect(state=>state, null)(AdminEditStationComponent);
