
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
    return (
      <div className="clientAddMarkers">
        
      </div>
    )
  }

  render(){
    return (
      <div className="clientAddMapComponent">
        <div className="header"><img src="./img/flag2_256.png" /><span>Your recommend new station</span><img src="./img/flag2_256.png" /></div>
        {this.renderClientAddMarkers()}
        <div className="inputs">Provider <input onChange={this.changeProvider.bind(this)} value={this.state.provider} placeholder="Enter Your Name" /><button onClick={this.submitClientAddMap.bind(this)}>Submit</button></div>
      </div>
    );
  }
}

const ClientAddMap = connect(state=>state, null)(ClientAddMapComponent);
