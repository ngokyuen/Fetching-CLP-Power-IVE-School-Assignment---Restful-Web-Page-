const {connect} = ReactRedux;

class MapComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      map: null,
      stations: [],
      markers: [],
    }
  }

  componentDidMount(){
    this.initMap();
    this.fetchMarker();
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextState.stations != null && this.state.stations != nextState.stations){
      return true;
    // if (nextState.markers != null && this.state.markers != nextState.markers){
    //   return true;
    } else if (nextProps.Map.type=='getMapItemsSuccess'){
      return true;
    } else if (nextProps.Map.type=='filterMapItems'){
      return true;
    }
    return false;
  }

  componentWillUpdate(nextProps, nextState){

    if (nextProps.Map.type == 'getMapItemsSuccess'){

      nextState.stations = nextProps.Map.result;
      nextProps.dispatch({type:'getMapItemsCompleted'});
      this.initMarker(nextProps, nextState);
    } else if (nextProps.Map.type == 'filterMapItems') {
      nextState.stations = nextProps.Map.temp_result;
      nextProps.dispatch({type:'filterMapItemsSuccess'});
      this.initMarker(nextProps, nextState);
    } else if (nextState.stations != null && nextState.stations != nextState.stations){
    // } else if (nextState.markers != null && this.state.markers != nextState.markers){
      this.initMarker(nextProps, nextState);
    }

  }

  clickMapListItem(marker){
    const latlng = new google.maps.LatLng(marker.lat, marker.lng);
    this.state.map.panTo(latlng);
    this.state.map.setZoom(18);
  }

  fetchMarker(){
    this.props.dispatch({type:'getMapItems', dispatch: this.props.dispatch});
  }

  initMarker(nextProps, nextState){
    this.clearMarkers(nextState);
    nextState.stations.map((markerJSON,index)=> {
    //nextState.markers.map((markerJSON,index)=> {
        const temp_index = index + 1;
        const marker = new google.maps.Marker({
          map: nextState.map,
          animation: google.maps.Animation.DROP,
          label: temp_index+"",
          position: {lat: parseFloat(markerJSON.lat), lng: parseFloat(markerJSON.lng)}
        });
        marker.addListener('click', () => {
          let content = "";
          if (markerJSON.no)
            content += "<p>No: " + temp_index + "</p>";
          if (markerJSON.address)
            content += "<p>Address: " + markerJSON.address + "</p>";
          if (markerJSON.provider)
            content += "<p>Provider: " + markerJSON.provider + "</p>";
          if (markerJSON.parkingNo)
            content += "<p>Parking No: " + markerJSON.parkingNo + "</p>";

          const infoWindow = new google.maps.InfoWindow({
            content: content
          });
          infoWindow.open(nextState.map, marker);
        })
        nextState.markers.push(marker);
      }
    );
  }

  clearMarkers(nextState){
    nextState.markers.map((marker)=>{
      marker.setMap(null);
    })
    nextState.markers = [];
  }

  initMap(){
    const map = new google.maps.Map(this.refs.map, {
      center: {lat: 22.4, lng: 114.3000},
      zoom: 11
    });
    map.addListener('click', (e)=>{
      console.log(e);
    })
    this.setState({map: map});
  }

  renderMapList(){
    if (this.state.stations) {
      // if (this.state.markers) {
      return <div id="mapList" ref="mapList" className="mapListContainer">{this.state.stations.map((marker,index)=>{
        // return <div id="mapList" ref="mapList" className="mapListContainer">{this.state.markers.map((marker,index)=>{
          const temp_index = index + 1;
          const no = (index < 9)? "00" + temp_index : (index < 99)? "0" + temp_index : temp_index;
          return (<div className="mapList" onClick={()=>this.clickMapListItem(marker)}  key={marker.no}>
            <div className="sub_left">
              <div className="no">{no}</div>
            </div>

             <div className="sub_right">
               <div className="address">{marker.address}</div>
               <div className="provider">Provider: {marker.provider}</div>
             </div>
           </div>
         )})}
         </div>;
      }
  }

  render(){
    return (
        <div className="mapContainer">
          {this.renderMapList()}
          <div id="map" ref="map"></div>
        </div>
    )
  }
}

const Map = connect(state=>state, null)(MapComponent);
