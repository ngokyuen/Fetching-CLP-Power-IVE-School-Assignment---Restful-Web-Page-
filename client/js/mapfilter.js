const {connect} = ReactRedux;

class MapFilterComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      filterAddress: '',
      filterProvider: '',
    }
  }

  componentWillUpdate(nextProps, nextState){

    if (nextState.filterAddress != this.state.filterAddress || nextState.filterProvider != this.state.filterProvider){
      // const stations = nextProps.Map.result.stationList.station;
      // nextState.markers = stations.filter((item, index, array)=>{
      //   if (item.address.toUpperCase().indexOf(nextState.filterAddress.toUpperCase()) > -1)
      //     return true;
      // });
      nextProps.dispatch({type:'filterMapItems',filterAddress:nextState.filterAddress, filterProvider:nextState.filterProvider, dispatch: nextProps.dispatch});
    }
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   if (nextState.filterAddress != this.state.filterAddress || nextState.filterProvider != this.state.filterProvider){
  //     return true;
  //   }
  //   return false;
  // }

    changeFilterAddress(e){
      this.setState({filterAddress: e.target.value});
    }

    changeFilterProvider(e){
      this.setState({filterProvider: e.target.value});
    }

  render(){
    return (
      <div className="mapFilterContainer">
        <div className="header">Filter</div>
        <div className="mapFilter">
          <span className="field">Address</span>
          <input onChange={this.changeFilterAddress.bind(this)} placeholder="Enter Address" value={this.state.filterAddress} />
          <span className="field">Provider</span>
          <input onChange={this.changeFilterProvider.bind(this)} placeholder="Enter Provider" value={this.state.filterProvider} />
        </div>
      </div>
    );
  }
}

const MapFilter = connect(state=>state, null)(MapFilterComponent);
