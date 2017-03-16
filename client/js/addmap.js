const {connect} = ReactRedux;

class AddMapComponent extends React.Component {

  constructor(props){
    super(props);
  }


    renderAddMapList(){
      // if (this.state.searchMapDetailResult.length > 0){
      //
      //   return (
      //     <div>
      //       {this.state.searchMapDetailResult.map(mapdetail=>{
      //         const {result}= mapdetail.stationList.station;
      //         return <div key={result.place_id}>{result.formatted_address}</div>
      //       })}
      //     </div>
      //   );
      // }
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
            <div style={{display:'inline-block'}}><button>Reset</button></div>
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
