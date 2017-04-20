const {connect} = ReactRedux;

class AddMapComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      provider: '',
    }
  }

  clickDelete(place_id){
    this.props.dispatch({type:"deleteMapListItem", payload:place_id});
  }

  clickSubmit(){
    this.props.dispatch({type:"addMapListItemsToApi", dispatch: this.props.dispatch, payload: {"provider": this.state.provider , "mapdetails": this.props.Map.addMapListItems}});
  }

  providerChange(e){
    this.setState({provider: e.target.value});
  }

  renderAddMapList(){
    const {addMapListItems} = this.props.Map;
    if (addMapListItems != null && addMapListItems.length > 0){

      return (
        <div>
          <div >Ready to add</div>
          {addMapListItems.map((mapdetail,index)=>{
            const {result} = mapdetail;
            return (<div key={index}>
              <div>{result.formatted_address}</div>
              <div onClick={()=>this.clickDelete(result.place_id)} ><img width="20" src="./img/delete_64.png" /></div>
            </div>)
          })}
        </div>
      )
    }
  }

  renderAddMap(){
    return (
      <div>
        {this.renderAddMapList()}
        <div>
          <div>Provider</div>
          <div><input  onChange={(e)=>this.providerChange(e)} value={this.state.provider} type="text" name="provider" placeholder="Enter Your Name or Contact" /></div>
        </div>
        <div >
          <div ><button onClick={this.clickSubmit.bind(this)}>Submit</button></div>
        </div>
      </div>
    )
  }

  render(){
    return (
      <div  id="addmap" ref="addmap">{this.renderAddMap()}</div>
    );
  }
}

const AddMap = connect(state=>state, null)(AddMapComponent);
