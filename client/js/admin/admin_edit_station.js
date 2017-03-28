
const {connect} = ReactRedux;

class AdminEditStationComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      address: '', districtL: '',
      districtS: '', img: '',
      is_approved: '0', lang: '',
      lat: '', lng: '',
      location: '', no: '',
      parkingNo: '', provider: '',
      type: '',
    }
  }

  componentWillUpdate(nextProps, nextState){
    switch (nextProps.Admin.type){
      case 'load_stations':
      case 'delete_station_success':
        this.clearLoadStation();
        break;
    }
  }

  clickEditButton(id){
    const editStation = "address='" + this.state.address + "', districtL='" + this.state.districtL +
    "', districtS='" + this.state.districtS + "', img='" + this.state.img +
    "', is_approved='" + this.state.is_approved + "', lang='" + this.state.lang +
    "', lat='" + this.state.lat + "', lng='" + this.state.lng +
    "', location='" + this.state.location + "', no='" + this.state.no +
    "', parkingNo='" + this.state.parkingNo + "', provider='" + this.state.provider +
    "', type='" + this.state.type + "'";
    this.props.dispatch({type:'update_station', id:id, editStation: editStation, dispatch: this.props.dispatch})
  }

  clickDeleteButton(id){
    if (window.confirm("Do you confirm to delete?")){
      this.props.dispatch({type:'delete_station', id:id, dispatch: this.props.dispatch});
    }
  }

  clearLoadStation(){
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
                  <div onClick={this.clearLoadStation.bind(this)} className="alertBackground" style={style}>&nbsp;</div>
                  <div className="table">
                    <div className="row">
                      <div className="cell">Address</div>
                      <div className="cell"><input onChange={this.changeAddress.bind(this)} value={this.state.address || station.address} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">DistrictL</div>
                      <div className="cell"><input onChange={this.changeDistrictL.bind(this)} value={this.state.districtL || station.districtL} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">DistrictS</div>
                      <div className="cell"><input onChange={this.changeDistrictS.bind(this)} value={this.state.districtS || station.districtS} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Img</div>
                      <div className="cell"><input onChange={this.changeImg.bind(this)} value={this.state.img || station.img} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Approved</div>
                      <div className="cell"><input onChange={this.changeApproved.bind(this)} value={this.state.is_approved || station.is_approved} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Language</div>
                      <div className="cell"><input onChange={this.changeLang.bind(this)} value={this.state.lang || station.lang} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Latitude</div>
                      <div className="cell"><input onChange={this.changeLat.bind(this)} value={this.state.lat || station.lat} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Longitude</div>
                      <div className="cell"><input onChange={this.changeLng.bind(this)} value={this.state.lng || station.lng} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Location</div>
                      <div className="cell"><input onChange={this.changeLocation.bind(this)} value={this.state.location || station.location} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">No</div>
                      <div className="cell"><input onChange={this.changeNo.bind(this)} value={this.state.no || station.no} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Parking No</div>
                      <div className="cell"><input onChange={this.changeParkingNo.bind(this)} value={this.state.parkingNo || station.parkingNo} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Provider</div>
                      <div className="cell"><input onChange={this.changeProvider.bind(this)} value={this.state.provider || station.provider} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Type</div>
                      <div className="cell"><input onChange={this.changeType.bind(this)} value={this.state.type || station.type} /></div>
                    </div>
                    <div className="row">
                      <div className="cell"><button onClick={this.clickEditButton.bind(this, station._id)}  className="bottom_button">Submit</button></div>
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
