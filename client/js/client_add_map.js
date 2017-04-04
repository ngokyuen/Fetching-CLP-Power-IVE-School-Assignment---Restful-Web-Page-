
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

          <div className="inputs">Provider <input onChange={this.changeProvider.bind(this)} value={this.state.provider} placeholder="Enter Your Name" /><button onClick={this.submitClientAddMap.bind(this)}>Submit</button></div>
        </div>
      );
    } else {
      return null;
    }

  }

}

const ClientAddMap = connect(state=>state, null)(ClientAddMapComponent);
