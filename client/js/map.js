
class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      map: null,
      markers: null,
      searchMapKeyword: null,
      searchMapKeywordResult: null,
      showSearchMapKeywordResult: false,
    }
  }

  componentDidMount(){
    this.initMap();
    this.fetchMarker();
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextState.markers != null && this.state.markers != nextState.markers){
      return true;
    } else if (nextState.searchMapKeywordResult != null && this.statesearchMapKeywordResult != nextState.searchMapKeywordResult){
      return true;
    }

    return false;
  }

  componentWillUpdate(nextProps, nextState){
    if (nextState.markers != null){
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
        //animation: google.maps.Animation.BOUNCE,
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
      // marker.setMap(this.state.map);
    }
  }

  initMap(){
    const map = new google.maps.Map(this.refs.map, {
      center: {lat: 22.25, lng: 114.1667},
      zoom: 10
    });

    this.setState({map: map});
  }

  changeSearchMapKeyword(e){
    const keyword = encodeURI(e.target.value);
    this.setState({searchMapKeyword: keyword});

    if (keyword.length > 3) {
      setTimeout(()=>{
        if (keyword == this.state.searchMapKeyword){
          this.feedSearchMapKeyword(keyword);
        }
      },1000)
    }

  }

  async feedSearchMapKeyword(keyword){
    try {
      const query = await fetch("http://localhost:81/coursework/api/api.php?format=json&lang=en&searchMapKeyword=" + keyword);
      const response = await query.json();
      // const result = await response.json();
      //alert(result);
      this.setState({searchMapKeywordResult: response});

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  async changeSearchMapKeywordResult(request){
    this.setState({showSearchMapKeywordResult: request});
  }

  clickSearchMapKeywordResultItem(place_id){
    console.log(place_id);
    this.changeSearchMapKeywordResult(false)
    // alert(place_id);
  }

  renderSearchMapResult(){

    if (this.state.searchMapKeywordResult != null && this.state.searchMapKeywordResult.stationList.station.status == "OK"){
      return <div style={{position:'absolute',width:900, zIndex:9999}}>{this.state.searchMapKeywordResult.stationList.station.predictions.map(search=>
        <div onClick={(e)=>this.clickSearchMapKeywordResultItem(search.place_id)} style={{padding:20, borderStyle:'solid',borderWidth:1,backgroundColor:'white'}} key={search.id}>
          <div>{search.description}</div>
        </div>
      )}</div>
    }

  }

  renderAddMap(){
    return (
      <div>
        <div>
          <div></div>
          <div></div>
        </div>
        <div style={{width:"100%"}}>
          <div>Provider</div>
          <div><input style={{width:"100%",}} type="text" name="provider" placeholder="Enter Your Name or Contact" /></div>
        </div>
        <div style={{width:"100%",textAlign:"center", padding:10,}}>
          <div style={{ display:'inline-block'}}><button>Submit</button></div>
          <div style={{display:'inline-block'}}><button>Reset</button></div>
        </div>
      </div>
    )
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

  renderSearchMap(){
    return (
      <div>
        <div>Search</div>
        <div><input onFocus={()=>this.changeSearchMapKeywordResult(true)} onBlur={()=>this.changeSearchMapKeywordResult(false)}  onChange={this.changeSearchMapKeyword.bind(this)} autoComplete="off" style={{width:"100%"}} type="text" name="searchmap_keyword" placeholder="Enter any place keywords" /></div>
        {(this.state.showSearchMapKeywordResult)?this.renderSearchMapResult():null}
      </div>
    )
  }

  render(){
    return (
      <div style={{}}>
        <div style={{}} id="searchmap" ref="searchmap">{this.renderSearchMap()}</div>
        <div style={{marginTop: 10, float:'left'}}  id="mapList" ref="mapList">{this.renderMapList()}</div>
        <div style={{marginTop: 10, float:"left"}} id="map" ref="map"></div>
          <div style={{paddingTop: 630,}} id="addmap" ref="addmap">{this.renderAddMap()}</div>
      </div>
    );
  }
};

ReactDOM.render(
  <Map />
  ,document.getElementById('content')
);
