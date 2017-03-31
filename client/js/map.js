const {connect} = ReactRedux;

class MapComponent extends React.Component {

  //init
  constructor(props){
    super(props);
    this.state = {
      map: null,
      stations: [],
      markers: [],
      clientAddMarkers: [],
    }
  }

  //after component mount
  componentDidMount(){
    this.initMap();
    this.fetchMarker();
  }

  //determate whether update the component
  shouldComponentUpdate(nextProps, nextState){
    if (nextState.stations != null && this.state.stations != nextState.stations){
      return true;
    } else if (nextProps.Map.type=='getMapItemsSuccess'){
      return true;
    } else if (nextProps.Map.type=='filterMapItems'){
      return true;
    }

    //special case for clientMarkers
    if (nextProps.Map.type=="addClientMarkers"){
      //alert(nextState.clientAddMarkers.length);
      this.props.dispatch({type:'addClientMarkersSuccess'});
    }

    return false;
  }

  componentWillUpdate(nextProps, nextState){
    //when get map items success
    if (nextProps.Map.type == 'getMapItemsSuccess'){
      nextState.stations = nextProps.Map.result;
      nextProps.dispatch({type:'getMapItemsCompleted'});
      this.initMarker(nextProps, nextState);
    //filter case
    } else if (nextProps.Map.type == 'filterMapItems') {
      nextState.stations = nextProps.Map.temp_result;
      nextProps.dispatch({type:'filterMapItemsSuccess'});
      this.initMarker(nextProps, nextState);
    } else if (nextState.stations != null && nextState.stations != nextState.stations){
    // } else if (nextState.markers != null && this.state.markers != nextState.markers){
      this.initMarker(nextProps, nextState);
    }

  }

  //when click the map list item
  //to move the google map to specify location
  clickMapListItem(marker){
    const latlng = new google.maps.LatLng(marker.lat, marker.lng);
    this.state.map.panTo(latlng);
    this.state.map.setZoom(18);
  }

  fetchMarker(){
    this.props.dispatch({type:'getMapItems', dispatch: this.props.dispatch});
  }

  //init the google map marker
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

        //add click listener
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

        //store the variable to state
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

  //start to render the map
  initMap(){
    const map = new google.maps.Map(this.refs.map, {
      center: {lat: 22.4, lng: 114.3000},
      zoom: 11
    });
    //client click new map marker
    map.addListener('click', (e)=>{

      let clientAddMarker = new google.maps.Marker({
        position: e.latLng,
        map: this.state.map,
        draggable: true,
        icon: './img/flag2_32.png',
        label: this.state.clientAddMarkers.length+1+"",
      });

      this.state.clientAddMarkers.push(clientAddMarker);
      this.props.dispatch({type:'addClientMarkers', payload: this.state.clientAddMarkers})
      console.log(e);
    })
    this.setState({map: map});
  }

  //render the map list component
  renderMapList(){
    if (this.state.stations) {
      return <div id="mapList" ref="mapList" className="mapListContainer">{this.state.stations.map((marker,index)=>{
        //change the layout no to 3 digtial
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
  //render the layout
  render(){
    return (
        <div className="mapContainer">
          {this.renderMapList()}
          <div id="map" ref="map"></div>
        </div>
    )
  }
}

//use redux to connect whole Component
const Map = connect(state=>state, null)(MapComponent);
