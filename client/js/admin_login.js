const {connect} = ReactRedux;

class AdminLoginComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  changeUsername(e){
    this.setState({username: e.target.value});
  }

  changePassword(e){
    this.setState({password: e.target.value});
  }

  clickLoginButton(){
    this.props.dispatch({type:'login', payload: {username:this.state.username, password:this.state.password}});
  }

  render(){
    return (
      <div style={{position:"absolute", marginLeft:-100, marginTop:-100, top:"50%", left:"50%"}}>
        <div style={{textAlign: "center"}}>Admin Login</div>
        <div style={{marginTop:10}}>
          <input type="text" value={this.state.username} onChange={(e)=>this.changeUsername(e)} name="username" placeholder="Email" />
        </div>
        <div style={{marginTop:10}}>
          <input type="password" value={this.state.password} onChange={(e)=>this.changePassword(e)} name="password" placeholder="Password" />
        </div>
        <div style={{marginTop:10, textAlign: "center"}}>
          <input onClick={this.clickLoginButton.bind(this)} type="button" value="Submit" />
        </div>
      </div>
    );
  }
}

const AdminLogin = connect(state=>state, null)(AdminLoginComponent);
