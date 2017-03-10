class Menu extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
  }

  componentDidMount(){

  }

  render(){
    return (
      <div>
        <ul>
          <li><a href="javascript:void(0)">Main</a></li>
          <li><a href="javascript:void(0)">Sign</a></li>
        </ul>
      </div>
    )
  }
}

// var Test = React.createClass({
//   render: function() {
//     return (
//       <div>234</div>
//     );
//   }
// });

ReactDOM.render(
  <Menu />
  ,document.getElementById('menu')
);
