
const {connect} = ReactRedux;

class ClientAddMapComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      provider: '',
    }
  }

  submitClientAddMap(){

  }

  changeProvider(e){
    this.setState({provider: e.target.value});
  }

  renderClientAddMarkers(){
    const {clientAddMarkers} = this.props.Map;
    return (
      <div className="clientAddMarkers">
        <div className="title">Your Recommendation</div>
        {clientAddMarkers.map((clientAddMarker, index)=>{
          return (
            <div key={index} className="clientAddMarker">
                <div><img src="./img/flag3_565_720.png" /></div>
                <div>{index+1}</div>
            </div>
          )
        })}
      </div>
    )
  }

  render(){
    const {clientAddMarkers} = this.props.Map;
    if (clientAddMarkers != null) {
      return (
        <div className="clientAddMapComponent">

          {this.renderClientAddMarkers()}
          <div className="inputs">Provider <input onChange={this.changeProvider.bind(this)} value={this.state.provider} placeholder="Enter Your Name" /><button onClick={this.submitClientAddMap.bind(this)}>Submit</button></div>
        </div>
      );
    } else {
      return null;
    }

  }

  renderClientAddMarkerDetail(){
    return (

      <div className="sub_right">
        <div>Location<input /></div>
        <div>Latitude<input value={clientAddMarker.position.lat()} /></div>
        <div>Longitude<input value={clientAddMarker.position.lng()} /></div>
        <div>Type
          <input type="checkbox" name="type" value="Standard" />Standard
          <input type="checkbox" name="type" value="SemiQuick" />SemiQuick
          <input type="checkbox" name="type" value="Quick" />Quick
        </div>
        <div>DistrictL
          <select name="districtL">
            <option value=""></option>
            <option value="Kowloon">Kowloon</option>
            <option value="New Territories">New Territories</option>
            <option value="Outlying Islands">Outlying Islands</option>
            <option value="Hong Kong Island">Hong Kong Island</option>
          </select>
        </div>
        <div>DistrictS
          <select name="districtS">
            <option value=""></option>
            <option value="Wong Tai Sin">Wong Tai Sin</option>
            <option value="Kwun Tong">Kwun Tong</option>
            <option value="Sai Kung">Sai Kung</option>
            <option value="Kwai Tsing">Kwai Tsing</option>
            <option value="Outlying Islands">Outlying Islands</option>
            <option value="North">North</option>
            <option value="Yau Tsim Mong">Yau Tsim Mong</option>
            <option value="Tai Po">Tai Po</option>
            <option value="Sham Shui Po">Sham Shui Po</option>
            <option value="Tuen Mun">Tuen Mun</option>
            <option value="Tsuen Wan">Tsuen Wan</option>
            <option value="Shatin">Shatin</option>
            <option value="Yuen Long">Yuen Long</option>
            <option value="Central and Western">Central and Western</option>
            <option value="Eastern">Eastern</option>
            <option value="Southern">Southern</option>
            <option value="Wan Chai">Wan Chai</option>
            <option value="Kowloon City">Kowloon City</option>
          </select>
        </div>
        <div>Address<input /></div>
        <div>Parking No<input /></div>
        <div>Img<input /></div>
        <div>Lang
        <select name="lang">
          <option value="EN">English</option>
        </select>
        </div>
        </div>
    )
  }
}

const ClientAddMap = connect(state=>state, null)(ClientAddMapComponent);
