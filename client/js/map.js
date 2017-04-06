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
    } else if (nextProps.Map.type=="deleteClientAddMarker"){
      this.clearEmptyClientAddMarker(nextProps, nextState);
      this.initClientAddMarkers(nextProps, nextState);
      this.props.dispatch({type:'deleteClientAddMarkerSuccess'});
    }

    if (nextProps.Map.type == 'mapMoveTo'){
      const latlng = new google.maps.LatLng(nextProps.Map.lat, nextProps.Map.lng);
      this.state.map.panTo(latlng);
      this.state.map.setZoom(18);
    }
    return false;
  }

  componentWillUpdate(nextProps, nextState){

    //when get map items success
    if (nextProps.Map.type == 'getMapItemsSuccess'){
      nextState.stations = nextProps.Map.Markers;
      nextProps.dispatch({type:'getMapItemsCompleted'});
      this.initMarker(nextProps, nextState);
    //filter case
    } else if (nextProps.Map.type == 'filterMapItems') {
      nextState.stations = nextProps.Map.FilteredMarkers;
      nextProps.dispatch({type:'filterMapItemsSuccess'});
      this.initMarker(nextProps, nextState);
    } else if (nextState.stations != null && nextState.stations != nextState.stations){
    // } else if (nextState.markers != null && this.state.markers != nextState.markers){
      this.initMarker(nextProps, nextState);
    }
  }

  clearEmptyClientAddMarker(nextProps, nextState){
    //clear the client added marker which map attribute is null
    nextState.clientAddMarkers = nextState.clientAddMarkers.filter((clientAddMarker, index)=>{
      if (nextProps.Map.delete_index == index){
        clientAddMarker.setMap(null);
        return false;
      } else {
        return true;
      }
    });
  }

  initClientAddMarkers(nextProps, nextState){
    //reset client added marker label
    nextState.clientAddMarkers.map((clientAddMarker, index)=>{
      clientAddMarker.setLabel(index+1+"");
    });
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

    //add place autocomplete
    const input = document.getElementById('pac-input');
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var infowindow = new google.maps.InfoWindow();
    // var marker = new google.maps.Marker({
    //   map: map,
    // });


    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      infowindow.close();
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
      }
      
      map.setZoom(20);

      // Set the position of the marker using the place ID and location.
      // marker.setPlace(/** @type {!google.maps.Place} */ ({
      //   placeId: place.place_id,
      //   location: place.geometry.location
      // }));
      // marker.setVisible(true);

      // infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
      //     'Place ID: ' + place.place_id + '<br>' +
      //     place.formatted_address + '</div>');
      // infowindow.open(map, marker);
  });

    //client click new map marker
    map.addListener('click', (e)=>{
      if (this.state.clientAddMarkers.length+1 <= 10 ){
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
      } else {
        alert("You cant create more than 10 markers")
      }
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
          <input className="mapSearch" id="pac-input" />
        </div>
    )
  }
}

//use redux to connect whole Component
const Map = connect(state=>state, null)(MapComponent);
