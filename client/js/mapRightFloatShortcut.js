const {connect} = ReactRedux;

class MapRightFloatShortcutComponent extends React.Component {

  constructor(props){
    super(props);
  }

  clickMapRightFloatItem(index){
    const {clientAddMarkers} = this.props.Map;
    const lat = clientAddMarkers[index].position.lat();
    const lng = clientAddMarkers[index].position.lng();
    this.props.dispatch({type: 'mapMoveTo', lat: lat, lng: lng});
  }

  render() {
    const {clientAddMarkers} = this.props.Map;
    if (clientAddMarkers != null && clientAddMarkers.length > 0){
      return (
        <div className="mapRightFloatShortcutContainer">
          {clientAddMarkers.map((clientAddMarker, index)=>{
            return (
              <div className="mapRightFloatItem" key={index} onClick={this.clickMapRightFloatItem.bind(this, index)}>
                <img src="./img/flag3_565_720.png" />{(index) < 9 ? "0"+(index+1) : index+1}
              </div>
            )
          })}
        </div>
      )
    } else {
      return null;
    }

  }
}

const MapRightFloatShortcut = connect(state=>state, null)(MapRightFloatShortcutComponent);
