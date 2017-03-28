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
    this.props.dispatch({dispatch:this.props.dispatch, type:'login', payload: {username:this.state.username, password:this.state.password}});
  }

  render(){
    const {login_result} = this.props.Admin;
    if (!login_result) {
      return (
        <div>
          <div className="login">
          <div><img src="./img/admin_logo_96.png" /></div>
            <div className="title">Admin Login</div>
            <div className="input">
              <input type="text" value={this.state.username} onChange={(e)=>this.changeUsername(e)} name="username" placeholder="Email" />
            </div>
            <div className="input">
              <input type="password" value={this.state.password} onChange={(e)=>this.changePassword(e)} name="password" placeholder="Password" />
            </div>
            { (this.props.Admin.login_result == false)? <div>{this.props.Admin.login_error_msg}</div> : null}
            <div className="input">
              <input onClick={(e)=>this.clickLoginButton(e)} type="button" value="Sign in" />
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }

  }
}

const AdminLogin = connect(state=>state, null)(AdminLoginComponent);
