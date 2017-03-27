
const {connect} = ReactRedux

class AdminStationListComponent extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.dispatch({type:'load_stations', dispatch: this.props.dispatch});
  }

  clickReload(){
    alert("test");
  }

  renderHeader(){
    return (
      <ul>
        <li><img onClick={this.clickReload.bind(this)} alt="reload" src="./img/reload_64.png" /></li>
        <li>No</li>
        <li><input className="searchInput" type="text" /></li>
        <li>Location</li>
        <li><input className="searchInput" type="text"  /></li>
        <li>Type</li>
        <li><input className="searchInput" type="text"  /></li>
        <li>District</li>
        <li><input className="searchInput" type="text"  /></li>
        <li>Address</li>
        <li><input className="searchInput" type="text"  /></li>
        <li>Provider</li>
        <li><input className="searchInput" type="text" /></li>
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
          return (
            <div>
              {this.renderHeader()}
              <div className="table">
              {this.renderStationsHeader()}
              </div>
              <div className="stationList">
                <div className="table">
                  {stations.map((station, index) => {
                    const cell_style = (index%2==0)?"cell cell1":"cell cell2";
                    return (
                      <div className="row" key={station._id}>
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
      <div className="stationListContainer">
        <div className="title">Modify/Delete Station List</div>
        {this.renderStations()}
      </div>
    )
  }
}

const AdminStationList = connect(state=>state, null)(AdminStationListComponent);
