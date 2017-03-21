
class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      map: null,
      markers: null,
    }
  }

  componentDidMount(){
    this.initMap();
    this.fetchMarker();
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextState.markers != null && this.state.markers != nextState.markers){
      return true;
    }

    return false;
  }

  componentWillUpdate(nextProps, nextState){
    if (nextState.markers != null && this.state.markers != nextState.markers){
      this.initMarker(nextState);
    }
  }

  clickMapListItem(marker){
    const latlng = new google.maps.LatLng(marker.lat, marker.lng);
    this.state.map.panTo(latlng);
    this.state.map.setZoom(18);
  }

  async fetchMarker() {
    try {
      const result = await fetch ("http://localhost:81/coursework/api/api.php?format=json&lang=en");
      const json = await result.json();
      console.log(json);
      this.setState({markers: json.stationList.station });

    } catch (e){
      console.log(e);
    }
  }

  initMarker(nextState){
    for (const markerJSON of nextState.markers){
      const marker = new google.maps.Marker({
        map: nextState.map,
        animation: google.maps.Animation.DROP,
        label: markerJSON.no,
        position: {lat: parseFloat(markerJSON.lat), lng: parseFloat(markerJSON.lng)}
      });
      marker.addListener('click', () => {

        let content = "";
        if (markerJSON.no)
          content += "<p>No: " + markerJSON.no + "</p>";
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
    }
  }

  initMap(){
    const map = new google.maps.Map(this.refs.map, {
      center: {lat: 22.25, lng: 114.1667},
      zoom: 10
    });

    this.setState({map: map});
  }

  renderMapList(){

      if (this.state.markers) {
        return <div id='markerListItem_Container'>{this.state.markers.map(marker=>
          <div onClick={()=>this.clickMapListItem(marker)} style={{borderStyle:'solid',borderWidth:1,padding:8}} key={marker.no}>
             <div style={{color:'white',padding:2,backgroundColor:"green", display:"inline"}} >{marker.no}</div>
             <div style={{padding:4,display:"inline"}}>{marker.address}</div>
             <div style={{ fontSize: 12, color:'white',backgroundColor:"blue", padding:1,display:"inline"}}>Provider: {marker.provider}</div>
           </div>
         )}
         </div>;
      }
    }

  render(){
    const root = RootReducerStore;
    return (
      <div style={{}}>
        <SearchMapKeyword store={root} />
        <div style={{marginTop: 10, float:'left'}}  id="mapList" ref="mapList">{this.renderMapList()}</div>
        <div style={{marginTop: 10, float:"left"}} id="map" ref="map"></div>
        <AddMap store={root} />
      </div>
    );
  }
};

ReactDOM.render(
  <Map />
  ,document.getElementById('content')
);
