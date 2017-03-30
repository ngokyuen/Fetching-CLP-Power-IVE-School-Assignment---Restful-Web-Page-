
class IndexComponent extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const root = RootReducerStore;
    return (
      <div>
        <Contact store={root} />
        <Menu store={root} />
        <MapFilter store={root} />
        <Map store={root} />
        <SearchMapKeyword store={root} />
        <AddMap store={root} />
      </div>
    );
  }
};

const root = RootReducerStore;
const Index = connect(state=>state,null)(IndexComponent);

ReactDOM.render(
  <Index store={root} />
  ,document.getElementById('content')
);
