const {connect} = ReactRedux;

class SearchMapKeywordComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchMapKeyword: null,
      searchMapKeywordResult: null,
      showSearchMapKeywordResult: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextState.searchMapKeywordResult != null && this.state.statesearchMapKeywordResult != nextState.searchMapKeywordResult){
      return true;
    }

    return false;
  }

  clickSearchMapKeywordResultItem(place_id){
    console.log(place_id);
    this.feedGetMapDetailByPlaceId(place_id);
    this.changeSearchMapKeywordResult(false);
  }

  async feedGetMapDetailByPlaceId(place_id){
    try {
      const query = await fetch("http://localhost:81/coursework/api/api.php?format=json&lang=en&searchMapDetailByPlaceId=" + place_id);
      const response = await query.json();
      this.props.dispatch({type:'addMapListItem', payload: response});
      console.log(response);
    } catch (e){
      console.log(e);
    }
  }

  async feedSearchMapKeyword(keyword){
    try {
      const query = await fetch("http://localhost:81/coursework/api/api.php?format=json&lang=en&searchMapKeyword=" + keyword);
      const response = await query.json();
      this.setState({searchMapKeywordResult: response});
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  changeSearchMapKeyword(e){
    const keyword = encodeURI(e.target.value);
    this.setState({searchMapKeyword: keyword});

    if (keyword.length > 3) {
      setTimeout(()=>{
        if (keyword == this.state.searchMapKeyword){
          this.feedSearchMapKeyword(keyword);
        }
      },1000)
    }
  }

  changeSearchMapKeywordResult(request){
    this.setState({showSearchMapKeywordResult: request});
  }

  renderSearchMapResult(){
    if (this.state.searchMapKeywordResult != null && this.state.searchMapKeywordResult.stationList.station.status == "OK"){
      return <div >{this.state.searchMapKeywordResult.stationList.station.predictions.map(search=>
        <div onClick={(e)=>this.clickSearchMapKeywordResultItem(search.place_id)}  key={search.id}>
          <div>{search.description}</div>
        </div>
      )}</div>
    }
  }

  render(){
    return (
      <div id="searchmap" ref="searchmap">
        <div onFocus={()=>this.changeSearchMapKeywordResult(true)} onMouseEnter={()=>this.changeSearchMapKeywordResult(true)} onMouseLeave={()=>this.changeSearchMapKeywordResult(false)} >
          <div>Search</div>
          <div><input onChange={this.changeSearchMapKeyword.bind(this)} autoComplete="off" type="text" name="searchmap_keyword" placeholder="Enter any place keywords" /></div>
          {(this.state.showSearchMapKeywordResult)?this.renderSearchMapResult():null}
        </div>
      </div>
    );
  }
}

const SearchMapKeyword = connect(state=>state,null)(SearchMapKeywordComponent);
