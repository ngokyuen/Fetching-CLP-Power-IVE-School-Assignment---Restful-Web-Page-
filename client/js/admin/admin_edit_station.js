
const {connect} = ReactRedux;

class AdminEditStationComponent extends React.Component {

  constructor(props){
    super(props);
  }

  render(){

    try {
      const {load_station_result} = this.props.Admin;
      if (load_station_result != null){
        const {stationList} = load_station_result;
        if (stationList != null){
          const {station} = stationList;

            return (
                <div>
                  <div>
                    <div>Address</div>
                    <div><input value={station.address} /></div>
                  </div>
                  <div>
                    <div>DistrictL</div>
                    <div><input value={station.districtL} /></div>
                  </div>
                  <div>
                    <div>DistrictS</div>
                    <div><input value={station.districtS} /></div>
                  </div>
                  <div>
                    <div>Img</div>
                    <div><input value={station.img} /></div>
                  </div>
                  <div>
                    <div>Approved</div>
                    <div><input value={station.is_approved} /></div>
                  </div>
                  <div>
                    <div>Language</div>
                    <div><input value={station.lang} /></div>
                  </div>
                  <div>
                    <div>Latitude</div>
                    <div><input value={station.lat} /></div>
                  </div>
                  <div>
                    <div>Longitude</div>
                    <div><input value={station.lng} /></div>
                  </div>
                  <div>
                    <div>Location</div>
                    <div><input value={station.location} /></div>
                  </div>
                  <div>
                    <div>No</div>
                    <div><input value={station.no} /></div>
                  </div>
                  <div>
                    <div>Parking No</div>
                    <div><input value={station.parkingNo} /></div>
                  </div>
                  <div>
                    <div>Provider</div>
                    <div><input value={station.provider} /></div>
                  </div>
                  <div>
                    <div>Type</div>
                    <div><input value={station.type} /></div>
                  </div>
                  <div>
                    <div><button>Submit</button></div>
                    <div><button>Delete</button></div>
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
}

const AdminEditStation = connect(state=>state, null)(AdminEditStationComponent);
