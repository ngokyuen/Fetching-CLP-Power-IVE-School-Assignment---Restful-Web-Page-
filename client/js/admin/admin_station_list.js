
const {connect} = ReactRedux

class AdminStationListComponent extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.dispatch({type:'load_stations', dispatch: this.props.dispatch});
  }

  renderHeader(){
    return (
      <div>
        <div>ID</div><div>No</div>
        <div>Location</div><div>Latitude</div>
        <div>Longitude</div><div>Type</div>
        <div>DistrictL</div><div>DistrictS</div>
        <div>Address</div><div>Provider</div>
        <div>Parking No</div><div>Image</div>
        <div>Language</div><div>Approved</div>
      </div>
    )
  }

  renderStations(){
    return (<div>
      <div>{station._id}</div><div>{station.no}</div>
      <div>{station.location}</div><div>{station.lat}</div>
      <div>{station.lng}</div><div>{station.type}</div>
      <div>{station.districtL}</div><div>{station.districtS}</div>
      <div>{station.address}</div><div>{station.provider}</div>
      <div>{station.parkingNo}</div><div>{station.img}</div>
      <div>{station.lang}</div><div>{station.is_approved}</div>
    </div>);
  }

  render(){
    return (
      <div>
        <div>Station List</div>
        {this.renderHeader()}

      </div>
    )
  }
}

const AdminStationList = connect(state=>state, null)(AdminStationListComponent);
