const {connect} = ReactRedux;

class MapFilterComponent extends React.Component {

  //init variables
  constructor(props){
    super(props);
    this.state = {
      filterAddress: '',
      filterProvider: '',
      timer: null,
    }
  }

  componentWillUpdate(nextProps, nextState){

    //check input not equal before
    if (nextState.filterAddress != this.state.filterAddress || nextState.filterProvider != this.state.filterProvider){

      //clear the timer when user input
      clearTimeout(this.state.timer);
      this.setState({timer: setTimeout(()=>{
        //notify to filter items
        nextProps.dispatch({type:'filterMapItems',filterAddress:nextState.filterAddress, filterProvider:nextState.filterProvider, dispatch: nextProps.dispatch});
      },1000)});
    }
  }

  //change the address of filter
    changeFilterAddress(e){
      this.setState({filterAddress: e.target.value});
    }

    //change the address of filter
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
