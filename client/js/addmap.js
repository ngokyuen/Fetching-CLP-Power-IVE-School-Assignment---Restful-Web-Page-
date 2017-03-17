const {connect} = ReactRedux;

class AddMapComponent extends React.Component {

  constructor(props){
    super(props);
  }

  clickDelete(place_id){
    this.props.dispatch({type:"deleteMapListItem", payload:place_id});
  }

  renderAddMapList(){
    const {addMapListItems} = this.props.Map;
    if (addMapListItems != null && addMapListItems.length > 0){

      return (
        <div>
          <div style={{padding:20}}>Ready to add</div>
          {addMapListItems.map((mapdetail,index)=>{
            const {result} = mapdetail;
            return (<div style={{padding: 15}} key={index}>
              <div style={{display:'inline'}}>{result.formatted_address}</div>
              <div onClick={()=>this.clickDelete(result.place_id)} style={{display:'inline', padding:10}}><img width="20" src="./img/delete_64.png" /></div>
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
        <div style={{width:"100%"}}>
          <div>Provider</div>
          <div><input style={{width:"100%",}} type="text" name="provider" placeholder="Enter Your Name or Contact" /></div>
        </div>
        <div style={{width:"100%",textAlign:"center", padding:10,}}>
          <div style={{display:'inline-block'}}><button>Submit</button></div>
        </div>
      </div>
    )
  }

  render(){
    return (
      <div style={{paddingTop: 630,}} id="addmap" ref="addmap">{this.renderAddMap()}</div>
    );
  }
}

const AddMap = connect(state=>state, null)(AddMapComponent);
