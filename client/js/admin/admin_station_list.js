
const {connect} = ReactRedux

class AdminStationListComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      no: '',location: '',
      type: '',district: '',
      address: '',provider: '',
    }
  }

  componentWillUpdate(nextProps, nextState){
    switch (nextProps.Admin.type){
      case 'update_station_success':
      case 'delete_station_success':
        this.reload();
        break;
    }
  }

  componentDidMount(){
    this.reload();
  }

  clickStation(no){
    this.props.dispatch({type:'load_station', no: no, dispatch: this.props.dispatch});
  }

  clickReload(){
    this.reload();
  }

  reload(){
    this.props.dispatch({type:'load_stations', dispatch: this.props.dispatch});
  }

  filterStations(stations){
    const filterStations = stations.filter((item, index, array)=>{
      if (this.state.no != '' || this.state.location != ''
      || this.state.type != '' || this.state.district != ''
      || this.state.address != '' || this.state.provider != ''){

        let result = true;

        if (this.state.no != '' && item.no.indexOf(this.state.no) === -1)
           result = result && false;
        if (this.state.location != '' && item.location.toUpperCase().indexOf(this.state.location.toUpperCase()) === -1)
           result = result && false;
        if (this.state.type != '' && item.type.toUpperCase().indexOf(this.state.type.toUpperCase()) === -1)
           result = result && false;
        if (this.state.district != '' && (item.districtL.toUpperCase().indexOf(this.state.district.toUpperCase()) === -1 || item.districtS.toUpperCase().indexOf(this.state.district.toUpperCase()) === -1))
           result = result && false;
        if (this.state.address != '' && item.address.toUpperCase().indexOf(this.state.address.toUpperCase()) === -1)
           result = result && false;
        if (this.state.provider != '' && item.provider.toUpperCase().indexOf(this.state.provider.toUpperCase()) === -1)
           result = result && false;

        return result;
      } else {
        return true;
      }
    });

    return filterStations;
  }

  changeNo(e){
    this.setState({no: e.target.value});
  }

  changeLocation(e){
    this.setState({location: e.target.value});
  }

  changeType(e){
    this.setState({type: e.target.value});
  }

  changeDistrict(e){
    this.setState({district: e.target.value});
  }

  changeAddress(e){
    this.setState({address: e.target.value});
  }

  changeProvider(e){
    this.setState({provider: e.target.value});
  }

  renderHeader(){
    return (
      <ul>
        <li><img onClick={this.clickReload.bind(this)} alt="reload" src="./img/reload_64.png" /></li>
        <li>No</li>
        <li><input onChange={this.changeNo.bind(this)} className="searchInput" type="text" /></li>
        <li>Location</li>
        <li><input onChange={this.changeLocation.bind(this)} className="searchInput" type="text"  /></li>
        <li>Type</li>
        <li><input onChange={this.changeType.bind(this)} className="searchInput" type="text"  /></li>
        <li>District</li>
        <li><input onChange={this.changeDistrict.bind(this)} className="searchInput" type="text"  /></li>
        <li>Address</li>
        <li><input onChange={this.changeAddress.bind(this)} className="searchInput" type="text"  /></li>
        <li>Provider</li>
        <li><input onChange={this.changeProvider.bind(this)} className="searchInput" type="text" /></li>
      </ul>
    )
  }

  renderStationsHeader(){
    return (
      <div className="row">
        <div className="header cell">ID</div><div className="header cell">No</div>
        <div className="header cell">Location</div><div className="header cell">Latitude</div>
        <div className="header cell">Longitude</div><div className="header cell">Type</div>
        <div className="header cell">DistrictL</div><div className="header cell">DistrictS</div>
        <div className="header cell">Address</div><div className="header cell">Provider</div>
        <div className="header cell">Parking No</div><div className="header cell">Image</div>
        <div className="header cell">Language</div><div className="header cell">Approved</div>
      </div>
    )
  }

  renderStations(){
    try {
      const {load_stations_result} = this.props.Admin;
      if (load_stations_result != null){
        const {stationList} = load_stations_result;
        if (load_stations_result != null && stationList.station.length > 0){
          let stations = stationList.station;
          const filterStations = this.filterStations(stations);
          return (
            <div>
              {this.renderHeader()}
              <div className="stationListTable">
              {this.renderStationsHeader()}
              </div>
              <div id="stationList" className="stationList">
                <div className="stationListTable">
                  {filterStations.map((station, index) => {
                    const cell_style = (index%2==0)?"cell cell1":"cell cell2";
                    return (
                      <div onClick={this.clickStation.bind(this, station.no)} className="row" key={station.no}>
                        <div className={cell_style}>{station._id}</div><div className={cell_style}>{station.no}</div>
                        <div className={cell_style}>{station.location}</div><div className={cell_style}>{station.lat}</div>
                        <div className={cell_style}>{station.lng}</div><div className={cell_style}>{station.type}</div>
                        <div className={cell_style}>{station.districtL}</div><div className={cell_style}>{station.districtS}</div>
                        <div className={cell_style}>{station.address}</div><div className={cell_style}>{station.provider}</div>
                        <div className={cell_style}>{station.parkingNo}</div><div className={cell_style}>{station.img}</div>
                        <div className={cell_style}>{station.lang}</div><div className={cell_style}>{station.is_approved}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (e){
      console.log(e);
    }
  }

  render(){
    return (
      <div id="stationListContainer" className="stationListContainer">
        <div className="title">Modify/Delete Station List</div>
        {this.renderStations()}
      </div>
    )
  }
}

const AdminStationList = connect(state=>state, null)(AdminStationListComponent);
