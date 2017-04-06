
const {connect} = ReactRedux;

class AdminEditStationComponent extends React.Component {

  //init
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
      case 'load_stations_success':
      case 'delete_station_success':
        this.clearLoadStation();
        break;
      case 'load_station_success':
        this.importStation(nextProps);
        nextProps.dispatch({type:'load_station_completed'});
        break;
      case 'update_station_success':
        nextProps.dispatch({type:'update_station_completed'});
        break;
    }
  }

  //update to state
  importStation(nextProps){
    try {
      const {load_station_result} = nextProps.Admin;
      if (load_station_result != null){
        const {stationList} = load_station_result;
        if (stationList != null){
          const {station} = stationList;
            this.setState({address: station.address});
            this.setState({districtL: station.districtL});
            this.setState({districtS: station.districtS});
            this.setState({img: station.img});
            this.setState({is_approved: station.is_approved});
            this.setState({lang: station.lang});
            this.setState({lat: station.lat});
            this.setState({lng: station.lng});
            this.setState({location: station.location});
            this.setState({no: station.no});
            this.setState({parkingNo: station.parkingNo});
            this.setState({provider: station.provider});
            this.setState({type: station.type});
          }
        }
      } catch (e) {
      console.log(e);
    }
  }

  //encode uri & notify to update station
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
      //check the value of load_station_result
      const {load_station_result} = this.props.Admin;
      if (load_station_result != null){
        const {stationList} = load_station_result;
        if (stationList != null){
          const {station} = stationList;
          //get the largest element width & height
          // const style = {width: document.getElementById('stationList').clientWidth,
          //  height: document.getElementById('container').clientHeight};
            return (
                <div className="alertContainer" >
                  <div onClick={this.clearLoadStation.bind(this)} className="alertBackground" >&nbsp;</div>
                  <div className="table">
                    <div className="row">
                      <div className="cell">Address</div>
                      <div className="cell"><input onChange={this.changeAddress.bind(this)} value={this.state.address} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">DistrictL</div>
                      <div className="cell">{this.renderDistrictL()}</div>
                    </div>
                    <div className="row">
                      <div className="cell">DistrictS</div>
                      <div className="cell">{this.renderDistrictS()}</div>
                    </div>
                    <div className="row">
                      <div className="cell">Img</div>
                      <div className="cell"><input onChange={this.changeImg.bind(this)} value={this.state.img} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Approved</div>
                      <div className="cell">
                      <select onChange={this.changeApproved.bind(this)} value={this.state.is_approved}>
                        <option value="1">True</option>
                        <option value="0">False</option>
                      </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="cell">Language</div>
                      <div className="cell"><input onChange={this.changeLang.bind(this)} value={this.state.lang} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Latitude</div>
                      <div className="cell"><input onChange={this.changeLat.bind(this)} value={this.state.lat} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Longitude</div>
                      <div className="cell"><input onChange={this.changeLng.bind(this)} value={this.state.lng} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Location</div>
                      <div className="cell"><input onChange={this.changeLocation.bind(this)} value={this.state.location} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">No</div>
                      <div className="cell"><input onChange={this.changeNo.bind(this)} value={this.state.no} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Parking No</div>
                      <div className="cell"><input onChange={this.changeParkingNo.bind(this)} value={this.state.parkingNo} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Provider</div>
                      <div className="cell"><input onChange={this.changeProvider.bind(this)} value={this.state.provider} /></div>
                    </div>
                    <div className="row">
                      <div className="cell">Type</div>
                      <div className="cell">{this.renderType()}</div>
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


    renderDistrictL(){
      return (
        <select onChange={this.changeDistrictL.bind(this)} value={this.state.districtL} >
          <option value="Hong Kong Island">Hong Kong Island</option>
          <option value="Kowloon">Kowloon</option>
          <option value="New Territories">New Territories</option>
          <option value="Outlying Islands">Outlying Islands</option>
        </select>
      )
    }

    renderType(){
      return (
        <select onChange={this.changeType.bind(this)} value={this.state.type} >
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
        <select onChange={this.changeDistrictS.bind(this)} value={this.state.districtS}  >
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

  //start: change input functions
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
