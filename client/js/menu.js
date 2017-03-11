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
      <div style={{padding:30}}>
        <ul>
          <li style={{padding:10, display:"inline"}}><a href="javascript:;">Main</a></li>
          <li style={{padding:10, display:"inline"}}><a href="javascript:;">Sign</a></li>
          <li style={{padding:10, display:"inline"}}><a href="javascript:;">Contact us</a></li>
          <li style={{padding:10, display:"inline"}}><a href="../admin/admin.php">Admin</a></li>
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
