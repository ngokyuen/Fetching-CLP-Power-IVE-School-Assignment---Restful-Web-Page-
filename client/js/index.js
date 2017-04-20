
class IndexComponent extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.dispatch({type:'connect_ws', dispatch:this.props.dispatch});
  }

  render(){
    const root = RootReducerStore;
    return (
      <div>
        <Contact store={root} />
        <Menu store={root} />
        <MapFilter store={root} />
        <Map store={root} />
        <MapRightFloatShortcut store={root} />
        <ClientAddMap store={root} />
      </div>
    );
  }
};

/*
<SearchMapKeyword store={root} />
<AddMap store={root} />
*/

const root = RootReducerStore;
const Index = connect(state=>state,null)(IndexComponent);

ReactDOM.render(
  <Index store={root} />
  ,document.getElementById('content')
);
