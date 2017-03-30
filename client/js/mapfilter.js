const {connect} = ReactRedux;

class MapFilterComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      address: '',
      provider: '',
    }
  }

  changeAddress(e){
    this.setState({address: e.target.value});
    this.startFilter();
  }

  changeProvider(e){
    this.setState({provider: e.target.value});
    this.startFilter();
  }

  startFilter(){
    if (this.state.address != '' || this.state.provider != '')
      this.props.dispatch({type:'filterMap', address:this.state.address, provider:this.state.provider});
  }

  render(){
    return (
      <div className="mapFilterContainer">
        <div className="header">Filter</div>
        <div className="mapFilter">
          <span className="field">Address</span>
          <input onChange={this.changeAddress.bind(this)} placeholder="Enter Address" value={this.state.address} />
          <span className="field">Provider</span>
          <input onChange={this.changeProvider.bind(this)} placeholder="Enter Provider" value={this.state.provider} />
        </div>

      </div>
    );
  }
}

const MapFilter = connect(state=>state, null)(MapFilterComponent);
