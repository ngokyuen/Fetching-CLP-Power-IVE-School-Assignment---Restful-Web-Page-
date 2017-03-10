class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      map: null,
      markers: null,
    }
  }

  componentWillMount(){
    this.fetchMarker();
  }

  componentDidMount(){
    this.initMap();
  }

  shouldComponentUpdate(nexProps, nextState){
    if (nextState.markers){
      this.fetchMarker();
      return true;
    } else {
      return false;
    }
  }

  async fetchMarker() {
    try {
      const result = await fetch ("http://localhost/coursework/api/api.php?format=json&lang=en");
      const json = await result.json();

      this.setState({markers: json.stationList.station });

    } catch (e){
      console.log(e);
    }
  }

  initMarker(){
    for (let markerJSON of this.state.markers){
      const marker = new google.maps.Marker({
        position: {lat: parseFloat(markerJSON.lat), lng: parseFloat(markerJSON.lng)}
      });
      marker.setMap(this.state.map);
    }
  }

  initMap(){
    const map = new google.maps.Map(this.refs.map, {
      center: {lat: 22.25, lng: 114.1667},
      zoom: 10
    });

    this.setState({map: map});
  }

  render(){
    return (
      <div>
        <div>123</div>
        <div id="map" ref="map"></div>
      </div>
    );
  }
};

ReactDOM.render(
  <Map />
  ,document.getElementById('content')
);
